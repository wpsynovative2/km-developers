/**
 * Receives enquiry form submissions and forwards them to the Google Apps Script
 * web app (google-apps-script/Code.gs), which appends a row to the Google Sheet
 * and emails the team. Proxying through here keeps the script URL and secret
 * out of the browser and avoids Apps Script's CORS limitations.
 */

const MAX = { name: 80, phone: 20, email: 120, project: 120, message: 1000, source: 120, page: 300 };

type Field = keyof typeof MAX;

function clean(value: unknown, field: Field) {
  return typeof value === "string" ? value.trim().slice(0, MAX[field]) : "";
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not set; enquiry not delivered.");
    return Response.json({ ok: false, error: "The enquiry service is not configured yet." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots don't retry
  if (typeof body.company === "string" && body.company.length > 0) {
    return Response.json({ ok: true });
  }

  const data = Object.fromEntries((Object.keys(MAX) as Field[]).map((f) => [f, clean(body[f], f)])) as Record<
    Field,
    string
  >;

  if (data.name.length < 2) {
    return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!/^\+?[\d\s-]{10,15}$/.test(data.phone)) {
    return Response.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...data, secret: process.env.GOOGLE_SCRIPT_SECRET ?? "" }),
      redirect: "follow",
    });
    const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !result?.ok) {
      console.error("Apps Script rejected enquiry:", res.status, result);
      return Response.json({ ok: false, error: "We couldn't submit your enquiry. Please try again or call us." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach Apps Script:", err);
    return Response.json({ ok: false, error: "We couldn't submit your enquiry. Please try again or call us." }, { status: 502 });
  }
}
