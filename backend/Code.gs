/**
 * XENESIS 4.0 – Registration backend (Google Apps Script, bound to the Google Sheet)
 * Handles: validation, duplicate check, screenshot -> Drive, row -> Sheet, and a registration RECEIPT email.
 * The team verifies payments manually and sends confirmation on WhatsApp (no verification emails are sent).
 * The Sheet menu only marks a row Verified / Rejected.
 */
const SHEET_NAME  = "Registrations";
const FOLDER_NAME = "Xenesis 4.0 Payment Screenshots";
const FROM_NAME   = "XENESIS 4.0 · CSE, GCE Keonjhar";   // display name students see
const REPLY_TO    = "info@xenesis.tech";            // optional: a team email; if set, student replies go here
const LOGO_URL    = "https://www.xenesis.tech/logo.png";   // optional: public https URL of xenesis-logo.png to show the logo in emails
// NOTE: "Entry Type" is a NEW column added at the END, so your existing rows/columns are not disturbed.
const HEAD = ["Timestamp","Reg ID","Type","Event","Participants","Team Size","Mobile","Email","Amount (₹)","Screenshot","Payment Status","Confirmation Mail","Status Mail","Entry Type"];
const C = {TS:1,ID:2,TYPE:3,EVENT:4,MEM:5,SIZE:6,MOB:7,EMAIL:8,AMT:9,SHOT:10,STATUS:11,MAIL:12,SMAIL:13,ENTRY:14};

/* Must match events-data.js (id, name, min, max, fee, modes).
   "modes" = entry types with their own team size / fee (Solo vs Group, or which game). */
const EVENTS = {
 /* ---- TECH ---- */
 "robo-drift":{n:"Robo Drift",min:1,max:4,fee:50,tech:1},
 "wordlord":{n:"WordLord — The Typing Battle",min:1,max:1,fee:49,tech:1},
 "codemon":{n:"Codemon — Build Under Pressure",min:2,max:4,fee:199,tech:1},
 "kbc":{n:"KBC — Kon Banega Coder",min:1,max:1,fee:49,tech:1},
 "prompt-wars":{n:"Prompt Wars",min:1,max:1,fee:49,tech:1},
 /* ---- NON-TECH ---- */
 "battle-verse":{n:"Battle Verse — Free Fire & BGMI",modes:{
    "free-fire":{l:"Free Fire",min:4,max:4,fee:99},
    "bgmi":{l:"BGMI",min:4,max:4,fee:99}}},
 "one-piece":{n:"One Piece — Campus Treasure Hunt",min:2,max:4,fee:99},
 "perfect-partner":{n:"Perfect Partner",min:2,max:2,fee:69},
 "dumb-charades":{n:"Dumb Charades — Silent Signal",min:2,max:4,fee:49},
 "memography":{n:"Memography — The Memory Arc",min:1,max:1,fee:29},
 "ad-mad":{n:"Ad-Mad",min:1,max:4,fee:49},
 "ipl-auction":{n:"IPL Auction",min:2,max:3,fee:99},
 "chess":{n:"Chess — The Grandmaster Gambit",min:1,max:1,fee:49},
 "reels":{n:"Reels x Render",min:1,max:1,fee:29},
 "xen-z-show":{n:"The Xen-Z Show",modes:{
    "solo":{l:"Solo",min:1,max:1,fee:49},
    "group":{l:"Group",min:2,max:10,fee:99}}}
};
const typeOf = id => (EVENTS[id] && EVENTS[id].tech) ? "tech" : "non-tech";   // safe for unknown ids
/* Resolve the effective rules for an event + entry type. Returns null if the entry type is missing/invalid. */
function rule_(ev, modeId){
  if(!ev.modes) return {min:ev.min,max:ev.max,fee:ev.fee,label:""};
  const m = ev.modes[String(modeId||"")];
  return m ? {min:m.min,max:m.max,fee:m.fee,label:m.l} : null;
}

/* ---------- run once from the editor to create the sheet/folder and grant permissions ---------- */
function setup(){
  sheet_(); folder_();
  MailApp.getRemainingDailyQuota();
  Logger.log("Setup OK. Now deploy as a Web app.");
}

/* ---------- optional: run from the editor to test the whole flow (change the email first!) ---------- */
function testRegistration(){
  const tiny = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
  const res = doPost({postData:{contents:JSON.stringify({
    type:"non-tech", eventId:"chess", eventName:"Chess — The Grandmaster Gambit", mode:"",
    members:["Test Student"], mobile:"9876543210", email:"YOUR_EMAIL@gmail.com", amount:49,
    screenshot:{name:"t.jpg",mime:"image/jpeg",data:tiny}, website:""})}});
  Logger.log(res.getContent());
}

function doGet(){ return out_({status:"ok",message:"XENESIS registration endpoint is running."}); }

function doPost(e){
  if(!e || !e.postData) return fail_("No data received. This endpoint only accepts form submissions from the website.");
  const lock = LockService.getScriptLock();
  try{
    lock.waitLock(30000);
    const d = JSON.parse(e.postData.contents);
    if(d.website) return fail_("Your browser auto-filled a hidden field. Please refresh the page and submit again.");   // honeypot (never fake success)

    const ev = EVENTS[d.eventId];
    if(!ev) return fail_("Unknown or closed event.");
    if(d.type !== typeOf(d.eventId)) return fail_("Event type mismatch.");
    const rule = rule_(ev, d.mode);
    if(!rule) return fail_("Please choose a valid entry type for this event.");
    const members = Array.isArray(d.members) ? d.members.map(s=>String(s).trim().replace(/\s+/g," ")) : [];
    if(members.length<rule.min || members.length>rule.max) return fail_("Invalid number of participants for this event.");
    if(members.some(n=>!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(n))) return fail_("Invalid participant name.");
    const mobile = String(d.mobile||"").replace(/\D/g,"").slice(-10);
    if(!/^[6-9]\d{9}$/.test(mobile)) return fail_("Invalid mobile number.");
    const email = String(d.email||"").trim().toLowerCase();
    if(email.length>254 || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) return fail_("Invalid email address.");
    const sh = d.screenshot||{};
    if(sh.mime!=="image/jpeg" || !sh.data || sh.data.length>4000000) return fail_("Invalid or oversized payment screenshot.");

    const s = sheet_(), rows = s.getLastRow()>1 ? s.getRange(2,1,s.getLastRow()-1,HEAD.length).getValues() : [];
    // duplicate = same event + same entry type (e.g. Free Fire vs BGMI are separate) + same email or mobile, unless rejected
    const dup = rows.some(r=>r[C.EVENT-1]===ev.n && String(r[C.ENTRY-1]||"")===rule.label && r[C.STATUS-1]!=="Rejected" &&
                (String(r[C.EMAIL-1]).toLowerCase()===email || String(r[C.MOB-1]).replace(/\D/g,"")===mobile));
    if(dup) return fail_("This email or mobile number is already registered for this event"+(rule.label?" ("+rule.label+")":"")+".");

    const props = PropertiesService.getScriptProperties(), tt = typeOf(d.eventId)==="tech"?"TECH":"NT";
    const n = (+props.getProperty("seq_"+tt)||0)+1; props.setProperty("seq_"+tt,String(n));
    const regId = "XEN4-"+tt+"-"+("000"+n).slice(-4);

    // Reserve the row FIRST (fast), so the lock is held for ~1s instead of the 5-15s a Drive upload + email take.
    s.appendRow([new Date(),regId,tt==="TECH"?"Tech":"Non-Tech",ev.n,members.join(", "),members.length,"'"+mobile,"'"+email,rule.fee,"(uploading)","Pending","","",rule.label]);
    const row = s.getLastRow();
    SpreadsheetApp.flush();
    try{lock.releaseLock()}catch(_){}

    // Slow work happens outside the lock; a failure here no longer loses the registration.
    try{
      const file = folder_().createFile(Utilities.newBlob(Utilities.base64Decode(sh.data),"image/jpeg",regId+".jpg"));
      s.getRange(row,C.SHOT).setValue(file.getUrl());
    }catch(upErr){ console.error(upErr); s.getRange(row,C.SHOT).setValue("UPLOAD FAILED - ask student to resend on WhatsApp"); }

    const evLabel = ev.n + (rule.label ? " ("+rule.label+")" : "");
    const mail = sendMail_(email,"Registration receipt · "+regId,
      body_("Registration receipt",regId,evLabel,members,rule.fee,
      "Thank you for registering! This email is your <b>registration receipt</b> and your proof of registration. Please keep your <b>Registration ID</b> safe: you will need it for any query and at the event.",
      "Our team will verify your payment and send your confirmation on <b>WhatsApp</b> to the number you registered. Date, time and venue will be shared via WhatsApp and email. If the payment is found to be fake or incorrect, the registration will be cancelled."));
    s.getRange(row,C.MAIL).setValue(mail);
    return out_({status:"success",regId:regId,mail:mail});
  }catch(err){
    console.error(err); return fail_("Something went wrong. Please try again.");
  }finally{ try{lock.releaseLock()}catch(_){} }
}

/* ---------- Sheet menu: select row(s), then Verified / Rejected ---------- */
function onOpen(){
  SpreadsheetApp.getUi().createMenu("XENESIS")
    .addItem("Mark selected as Verified","markVerified")
    .addItem("Mark selected as Rejected","markRejected").addToUi();
}
function markVerified(){ setStatus_("Verified"); }
function markRejected(){ setStatus_("Rejected"); }
function setStatus_(status){
  const s = SpreadsheetApp.getActiveSheet();
  if(s.getName()!==SHEET_NAME) return SpreadsheetApp.getUi().alert("Open the '"+SHEET_NAME+"' tab first.");
  const r = s.getActiveRange(), first=Math.max(2,r.getRow()), last=r.getLastRow(); let n=0;
  for(let row=first; row<=last; row++){
    const id = s.getRange(row,C.ID).getValue();
    if(!id || s.getRange(row,C.STATUS).getValue()===status) continue;
    s.getRange(row,C.STATUS).setValue(status);
    s.getRange(row,C.SMAIL).setValue("WhatsApp (manual)");   // no email is sent; confirmation goes via WhatsApp
    n++;
  }
  SpreadsheetApp.getActive().toast(n+" row(s) marked "+status+". Send the WhatsApp message to the student.","XENESIS");
}

/* ---------- helpers ---------- */
function sheet_(){
  const ss=SpreadsheetApp.getActiveSpreadsheet(); let s=ss.getSheetByName(SHEET_NAME);
  if(!s){ s=ss.insertSheet(SHEET_NAME); }
  if(s.getLastRow()===0){ s.appendRow(HEAD); s.setFrozenRows(1); s.getRange(1,1,1,HEAD.length).setFontWeight("bold").setBackground("#7a1f24").setFontColor("#fff");
    s.getRange(2,C.STATUS,2000).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(["Pending","Verified","Rejected"],true).build()); }
  // Upgrade an existing sheet (created with the old 13 columns): make room for and label the new "Entry Type" column.
  if(s.getMaxColumns()<HEAD.length) s.insertColumnsAfter(s.getMaxColumns(), HEAD.length-s.getMaxColumns());
  const hc = s.getRange(1,C.ENTRY);
  if(!hc.getValue()) hc.setValue(HEAD[C.ENTRY-1]).setFontWeight("bold").setBackground("#7a1f24").setFontColor("#fff");
  return s;
}
function folder_(){
  const p=PropertiesService.getScriptProperties(), id=p.getProperty("folderId");
  if(id){ try{ return DriveApp.getFolderById(id) }catch(_){} }
  const f=DriveApp.createFolder(FOLDER_NAME); p.setProperty("folderId",f.getId()); return f;   // private by default
}
function sendMail_(to,subject,html){
  try{
    if(MailApp.getRemainingDailyQuota()<1) return "Quota exceeded";
    MailApp.sendEmail({to:to,subject:subject,htmlBody:html,body:html.replace(/<[^>]+>/g," ").replace(/\s+/g," "),name:FROM_NAME,replyTo:REPLY_TO||undefined});
    return "Sent";
  }catch(e){ return "Failed: "+e.message; }
}
const h_ = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function body_(title,regId,event,members,amount,msg,note){
  return `<div style="background:#0b0f12;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:auto;background:#e8e4da;color:#12171b;border-top:5px solid #b0202a;padding:28px 26px">
   ${LOGO_URL?`<img src="${LOGO_URL}" alt="XENESIS" height="48" style="display:block;margin:0 0 10px;background:#0b0f12;padding:8px 12px;border-radius:4px">`:""}
   <p style="margin:0;letter-spacing:5px;font-size:12px;font-weight:bold;color:#7a1f24">XENESIS 4.0</p>
   <h2 style="margin:10px 0 4px;font-size:22px;text-transform:uppercase;letter-spacing:2px">${h_(title)}</h2>
   ${regId?`<p style="margin:10px 0 14px;padding:12px;border:2px dashed #b0202a;text-align:center;font-size:11px;letter-spacing:3px;color:#7a1f24">YOUR REGISTRATION ID<br><span style="font-size:24px;letter-spacing:4px;color:#12171b;font-weight:bold">${h_(regId)}</span></p>`:""}
   <p style="margin:0 0 18px;font-size:14px;line-height:1.6">${msg}</p>
   <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${[["Event",event],["Participants",members.join(", ")],["Amount","₹"+amount]].map(r=>`<tr><td style="padding:8px 0;border-bottom:1px solid #c9c3b3;color:#7a1f24;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:38%">${r[0]}</td><td style="padding:8px 0;border-bottom:1px solid #c9c3b3;font-weight:bold">${h_(r[1])}</td></tr>`).join("")}
   </table>
   <p style="margin:18px 0 0;padding:10px 12px;border-left:3px solid #b0202a;background:#f1ece0;font-size:13px;line-height:1.55">${note}</p>
   <p style="margin:20px 0 0;font-size:12px;opacity:.7">Dept. of Computer Science &amp; Engineering · Government College of Engineering, Keonjhar</p>
  </div></div>`;
}
function out_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function fail_(m){ return out_({status:"error",message:m}); }
