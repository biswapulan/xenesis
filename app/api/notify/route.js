// TODO: connect Supabase. Create a table `subscribers(email text unique, created_at timestamptz default now())`,
// add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY to .env.local, then insert here.
export async function POST(req) {
  const { email } = await req.json();
  if (!/^\S+@\S+\.\S+$/.test(email || "")) return Response.json({ ok: false }, { status: 400 });
  console.log("Subscriber (not yet stored):", email);
  return Response.json({ ok: true });
}
