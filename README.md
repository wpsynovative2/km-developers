# KM Developers – Company Profile Website

Single-page company profile for KM Developers, built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**. Every project also gets its own page at `/projects/[slug]`. Enquiry forms send leads to a **Google Sheet** and to **email** through Google Apps Script.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Production build: `npm run build && npm start`.

## Where things live

| Path | What it is |
| --- | --- |
| `data/projects.json` | All projects (name, location, status, image, description). Add, edit or remove projects here. A new entry gets its own page automatically. |
| `data/company.json` | All company copy: contact details, stats, journey, vision/mission, founders, services and so on. |
| `app/page.tsx` | The landing page, assembled from the sections in `components/sections/`. |
| `app/projects/[slug]/page.tsx` | The page for a single project. |
| `app/api/enquiry/route.ts` | Receives form submissions and forwards them to Google Apps Script. |
| `google-apps-script/Code.gs` | The Apps Script that saves leads to the sheet and sends the email. |
| `public/images/` | Optimised images used by the site. Project photos are in `public/images/projects/`. |

### Adding a project

1. Put the photo in `public/images/projects/<slug>.jpg` (portrait, about 1000 px wide).
2. Add an entry to `data/projects.json`:

```json
{
  "slug": "my-new-project",
  "name": "My New Project",
  "location": "Mira Road (East)",
  "market": "Mira-Bhayandar",
  "status": "ongoing",
  "featured": true,
  "image": "/images/projects/my-new-project.jpg",
  "description": ["First paragraph.", "Second paragraph."]
}
```

`status` is `ongoing` or `completed`. Set `featured` to `true` to show the project in the "Landmark Developments" carousel. `developer` is optional; use it for group-company projects.

## Enquiry form: Google Sheet and email

Every "Enquire Now" button opens the popup form. The contact section has the same form inline. Submissions go to `/api/enquiry`, which validates them and forwards them to the Apps Script web app.

1. Create a Google Sheet, for example "KM Developers – Enquiries".
2. In the sheet, open **Extensions → Apps Script**. Replace the contents of `Code.gs` with `google-apps-script/Code.gs` from this repo.
3. Change `NOTIFY_EMAILS` at the top of the script to the address (or comma-separated addresses) that should receive leads.
4. Optional, but recommended: in **Project Settings → Script Properties**, add `SHARED_SECRET` with a random string.
5. Click **Deploy → New deployment**, choose type **Web app**, set *Execute as* to **Me** and *Who has access* to **Anyone**, then click **Deploy** and approve the permissions.
6. Copy the web app URL (it ends in `/exec`) into `.env.local`:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SCRIPT_SECRET=the-same-random-string   # only if you did step 4
```

7. Restart the dev server and submit a test enquiry. A new row appears in the "Enquiries" tab and a notification email is sent.

> Whenever you edit the script, publish the change with **Deploy → Manage deployments → Edit → Version: New version**. Otherwise the URL keeps running the old code.

## Before going live

- Contact details (phone, WhatsApp, email, address) live in `data/company.json`.
- Set `NEXT_PUBLIC_SITE_URL` to the live domain so social-share previews work.
- Set `GOOGLE_SCRIPT_URL` (and `GOOGLE_SCRIPT_SECRET`) in your hosting provider's environment variables.
- Source files the site doesn't use, such as the two source PDFs (the company profile PDF is about 640 MB), belong in `source-assets/`. That folder is gitignored, so it exists only on your machine and is never pushed or deployed.
