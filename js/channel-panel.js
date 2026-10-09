/**
 * channel-panel.js — "Join our WhatsApp Channel" slide-in panel
 * ---------------------------------------------------------------------
 * Slides in from the right shortly after a page loads, stays for a few
 * seconds, then slides back out. A small tab stays on the right edge so
 * visitors can open it again any time.
 *
 * Pages: Home, Notes, PYQ, Books, Scholarships, Career, Premium Notes.
 * Self-contained: injects its own markup (and its stylesheet, if the page
 * didn't already link css/channel-panel.css).
 *
 * SPA SAFE: the panel lives directly under <body>, outside the area that
 * js/spa-router.js swaps, so it survives navigation without re-popping.
 *
 * EDIT THE SETTINGS BELOW to change the link, QR image, wording or timing.
 */
(function () {
  "use strict";
  if (window.__bpnChannelLoaded) return;      // never run twice
  window.__bpnChannelLoaded = true;

  /* ── SETTINGS ─────────────────────────────────────────────── */
  var CFG = {
    link:      "https://whatsapp.com/channel/0029Vb7Jky0FHWpznvMaWI3k",
    qr:        "assets/wa-channel-qr.svg",
    eyebrow:   "Official channel",
    title:     "BPUTNotes Updates",
    scanText:  "Scan to join",
    joinText:  "Join Channel",
    shareLabel:"We share free updates on:",
    topics:    ["Scholarships", "Internships", "Career Opportunities"],

    showAfterMs:   1400,   // wait after the page has loaded
    stayOpenMs:    6500,   // how long the auto-peek stays visible
    quietDays:     14      // after someone taps Join, don't auto-peek for this long
  };
  /* ─────────────────────────────────────────────────────────── */

  var SESSION_QUIET = "bpn_ch_quiet";       // set when user closes it by hand
  var JOINED_KEY    = "bpn_ch_joined_at";   // set when user taps Join

  function ss(fn) { try { return fn(window.sessionStorage); } catch (e) { return null; } }
  function ls(fn) { try { return fn(window.localStorage); }  catch (e) { return null; } }

  /* Base path of this script, so css/ and assets/ resolve on every page */
  var scriptEl = document.currentScript;
  var base = "";
  if (scriptEl && scriptEl.src) base = scriptEl.src.replace(/js\/channel-panel\.js.*$/, "");

  function abs(p) { return /^(https?:)?\/\//.test(p) ? p : base + p; }

  function isQuiet() {
    if (ss(function (s) { return s.getItem(SESSION_QUIET); }) === "1") return true;
    var t = parseInt(ls(function (s) { return s.getItem(JOINED_KEY); }), 10);
    return !!t && (Date.now() - t) < CFG.quietDays * 864e5;
  }

  /* Is something else (loader, popup, modal, drawer) on screen right now? */
  function pageBusy() {
    var sel = [
      ".student-corner-overlay.show", ".site-popup-overlay.show",
      "#bput-popup-overlay.show", "#bput-popup-overlay.open", "#bput-popup-overlay.active",
      ".sample-modal.is-open", ".modal-overlay.open", ".mobile-drawer-overlay.open",
      "body.loader-active", "body.is-loading"
    ].join(",");
    if (document.querySelector(sel)) return true;
    var loader = document.getElementById("page-loader");
    if (loader && !loader.classList.contains("hide") && !loader.classList.contains("is-hidden")
        && getComputedStyle(loader).display !== "none" && getComputedStyle(loader).visibility !== "hidden") {
      return true;
    }
    return false;
  }

  var WA_PATH = "M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.6-1.5-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 18.3a8.3 8.3 0 01-4.2-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.3 8.3 0 1112 20.3z";
  var WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function build() {
    if (document.getElementById("bpn-channel")) return null;

    var chips = CFG.topics.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");

    var root = document.createElement("aside");
    root.id = "bpn-channel";
    root.className = "bpn-ch";
    root.setAttribute("aria-label", "Join our WhatsApp channel");
    root.innerHTML =
      '<button type="button" class="bpn-ch__tab" id="bpn-ch-tab" aria-expanded="false" aria-controls="bpn-ch-panel" aria-label="Open WhatsApp channel panel">' +
        '<span class="bpn-ch__dot" aria-hidden="true"></span>' +
        '<svg class="bpn-ch__tab-wa" viewBox="0 0 24 24" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>' +
        '<svg class="bpn-ch__tab-chev" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>' +
      '<div class="bpn-ch__panel" id="bpn-ch-panel" role="region" aria-label="WhatsApp channel">' +
        '<div class="bpn-ch__head">' +
          '<span class="bpn-ch__badge">' + WA + '</span>' +
          '<div class="bpn-ch__titles">' +
            '<div class="bpn-ch__eyebrow"><span class="bpn-ch__live" aria-hidden="true"></span>' + esc(CFG.eyebrow) + '</div>' +
            '<p class="bpn-ch__title">' + esc(CFG.title) + '</p>' +
          '</div>' +
          '<button type="button" class="bpn-ch__close" id="bpn-ch-close" aria-label="Close panel">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<a class="bpn-ch__qr" href="' + esc(CFG.link) + '" target="_blank" rel="noopener" aria-label="WhatsApp channel QR code — tap to open">' +
          '<img src="' + esc(abs(CFG.qr)) + '" alt="QR code to join the BPUTNotes WhatsApp channel" width="130" height="130" decoding="async">' +
        '</a>' +
        '<p class="bpn-ch__scan">' + esc(CFG.scanText) + '</p>' +
        '<a class="bpn-ch__join" id="bpn-ch-join" href="' + esc(CFG.link) + '" target="_blank" rel="noopener">' +
          '<svg class="wa" viewBox="0 0 24 24" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>' +
          '<span>' + esc(CFG.joinText) + '</span>' +
          '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>' +
        '</a>' +
        '<div class="bpn-ch__share">' +
          '<p class="bpn-ch__share-label">' + esc(CFG.shareLabel) + '</p>' +
          '<ul class="bpn-ch__chips">' + chips + '</ul>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);
    return root;
  }

  function ensureStyles() {
    if (document.querySelector('link[href*="channel-panel.css"]')) return Promise.resolve();
    return new Promise(function (resolve) {
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = abs("css/channel-panel.css");
      l.onload = l.onerror = function () { resolve(); };
      document.head.appendChild(l);
    });
  }

  function init() {
    var root = build();
    if (!root) return;

    var tab   = root.querySelector("#bpn-ch-tab");
    var close = root.querySelector("#bpn-ch-close");
    var join  = root.querySelector("#bpn-ch-join");
    var qr    = root.querySelector(".bpn-ch__qr");
    var timer = null;
    var autoOpened = false;      // currently open because of the auto-peek

    function setOpen(open) {
      root.classList.toggle("is-open", open);
      tab.setAttribute("aria-expanded", open ? "true" : "false");
      tab.setAttribute("aria-label", open ? "Close WhatsApp channel panel" : "Open WhatsApp channel panel");
      // keep keyboard focus out of the hidden panel
      var focusables = root.querySelectorAll(".bpn-ch__panel a, .bpn-ch__panel button");
      for (var i = 0; i < focusables.length; i++) focusables[i].tabIndex = open ? 0 : -1;
    }
    function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } }
    function manualClose() {
      clearTimer(); autoOpened = false; setOpen(false);
      ss(function (s) { s.setItem(SESSION_QUIET, "1"); });
    }

    setOpen(false);
    root.classList.add("is-ready");

    tab.addEventListener("click", function () {
      clearTimer(); autoOpened = false;
      if (root.classList.contains("is-open")) manualClose(); else setOpen(true);
    });
    close.addEventListener("click", manualClose);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("is-open")) manualClose();
    });

    function joined() {
      ls(function (s) { s.setItem(JOINED_KEY, String(Date.now())); });
      ss(function (s) { s.setItem(SESSION_QUIET, "1"); });
      clearTimer(); autoOpened = false;
    }
    join.addEventListener("click", joined);
    qr.addEventListener("click", joined);

    /* While someone is reading / hovering / touching it, don't pull it away */
    function hold() { clearTimer(); }
    function release() {
      if (autoOpened && root.classList.contains("is-open")) {
        clearTimer();
        timer = setTimeout(function () { setOpen(false); autoOpened = false; }, 2500);
      }
    }
    root.addEventListener("mouseenter", hold);
    root.addEventListener("mouseleave", release);
    root.addEventListener("focusin", hold);
    root.addEventListener("touchstart", function () { autoOpened = false; clearTimer(); }, { passive: true });

    /* ── auto-peek ── */
    if (isQuiet()) return;

    var waited = 0;
    function peek() {
      if (isQuiet()) return;
      // another popup/loader is up — wait up to ~25s for it to clear
      if (pageBusy() && waited < 25000) { waited += 800; setTimeout(peek, 800); return; }
      if (pageBusy()) return;
      autoOpened = true;
      setOpen(true);
      timer = setTimeout(function () { setOpen(false); autoOpened = false; timer = null; }, CFG.stayOpenMs);
    }

    function start() { setTimeout(peek, CFG.showAfterMs); }
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }

  function boot() { ensureStyles().then(init); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
