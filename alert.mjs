// Anti-Theft alert endpoint: POST /alert  (Authorization: Bearer <ALERT_TOKEN>)
// Env vars (Netlify): RESEND_API_KEY, ALERT_TOKEN. Optional: TO_EMAIL, FROM_EMAIL.

export const config = { path: "/alert" };

const text = (body, status) => new Response(body, { status });

export default async (req) => {
  if (req.method !== "POST") return text("POST only", 405);

  const token = Netlify.env.get("ALERT_TOKEN");
  const apiKey = Netlify.env.get("RESEND_API_KEY");
  if (!token || !apiKey) return text("Server not configured", 500);
  if (req.headers.get("authorization") !== `Bearer ${token}`) return text("Unauthorized", 401);

  let data;
  try { data = await req.json(); } catch { return text("Bad request", 400); }
  const { event, time, lat, lon } = data || {};
  if (typeof event !== "string" || event.length > 200) return text("Bad request", 400);

  const to = Netlify.env.get("TO_EMAIL") || "bonsa26tefera@gmail.com";
  // Domain hin mirkaneessine yoo, onboarding@resend.dev email Resend account keessan qofatti ergama.
  const from = Netlify.env.get("FROM_EMAIL") || "Anti-Theft <onboarding@resend.dev>";

  const when = new Date(Number(time) || Date.now()).toISOString();
  const hasLoc = typeof lat === "number" && typeof lon === "number";
  const body =
    `${event}\nTime (UTC): ${when}\n` +
    (hasLoc ? `Location: https://maps.google.com/?q=${lat},${lon}` : "Location: not available");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: `Anti-Theft: ${event}`, text: body }),
  });
  if (!r.ok) return text("Email failed", 502);
  return text("ok", 200);
};
