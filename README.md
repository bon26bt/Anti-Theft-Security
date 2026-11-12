# Anti-Theft Android — v1.4 (English · Afaan Oromoo)

Tracks a safe area (geofence) on a Samsung A17. When the phone leaves or returns to the area it shows a notification and, once the backend is set up, sends an email with a Google Maps link.

App languages: English (default) and Afaan Oromoo (follows the phone's language).
Docs: README.md (English), README_OROMO.md (Afaan Oromoo).

## What it cannot do
Ordinary Android apps cannot read wrong lock-screen passwords or secretly open the camera. This app does not attempt either.

## 1) Backend on Netlify (free, no card needed)
1. Create a Resend account at https://resend.com with `bonsa26tefera@gmail.com` and create an API key.
2. Install Node.js (LTS) from https://nodejs.org, then in this folder:
   ```
   npm i -g netlify-cli
   netlify login
   netlify init
   ```
   Choose "Create & configure a new project". (Or push this folder to GitHub and import it at app.netlify.com.)
3. Set the environment variables (Site configuration > Environment variables, or CLI):
   ```
   netlify env:set RESEND_API_KEY "re_xxxxx"
   netlify env:set ALERT_TOKEN "<long random string>"
   ```
   Make the token with `openssl rand -hex 24` (or type a long secret).
4. Deploy: `netlify deploy --prod`
5. Your endpoint is `https://<your-site>.netlify.app/alert`.
6. Test it (replace values):
   ```
   curl -X POST https://<your-site>.netlify.app/alert \
     -H "Authorization: Bearer <ALERT_TOKEN>" -H "Content-Type: application/json" \
     -d '{"event":"Test alert","lat":7.673,"lon":36.835}'
   ```
   It should print `ok` and an email should arrive.

Note: without a verified domain, Resend's `onboarding@resend.dev` sender only delivers to your own Resend account email. That is why step 1 uses `bonsa26tefera@gmail.com`.
Netlify's drag-and-drop deploy does not build functions; use the CLI or GitHub.

## 2) App
1. In `gradle.properties` set `ALERT_URL=https://<your-site>.netlify.app/alert` and `ALERT_TOKEN=` (same token as above).
2. Open in Android Studio, Gradle sync, install on the phone.
3. Enter latitude/longitude/radius (or tap "Use my current location"), then "Save safe area".
4. Location: "Allow all the time". Notifications: Allow.
5. Samsung: Settings > Apps > Anti-Theft > Battery > Unrestricted.

## Security notes
- ALERT_TOKEN is inside the APK. Fine for personal use, but anyone who extracts the APK could send fake alerts. Rotate the token (change it in Netlify and in `gradle.properties`, rebuild) if abused.
- Your safe area is probably your home. Don't share the APK or config with others.
- Geofence alerts are not instant; Android battery policies can delay them by minutes.
