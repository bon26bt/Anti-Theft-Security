# Anti-Theft Android — v1.4 (English: README.md)

App kun Samsung A17 irratti safe-area (geofence) hordofa. Bilbilli naannoo sana yoo ba'e ykn deebi'e notification agarsiisa, backend yoo qophaa'e immoo email (Google Maps link waliin) ni erga.

Afaan app: Ingiliffaa (duraan) fi Afaan Oromoo (afaan bilbilaa hordofa).

## Hanga hin dandeenye
Android app idilee password dogoggoraa lock-screen irratti dubbisuu ykn camera dhoksaan banuu hin danda'u. App kun kana hin yaalu.

## 1) Backend Netlify irratti (bilisaa, kaardii hin barbaachisu)
1. https://resend.com irratti `bonsa26tefera@gmail.com` waliin account uumii API key argadhu.
2. Node.js (LTS) https://nodejs.org irraa install godhi; sana booda folder kana keessatti:
   ```
   npm i -g netlify-cli
   netlify login
   netlify init
   ```
   "Create & configure a new project" filadhu. (Ykn folder kana GitHub irratti kaa'ii app.netlify.com irratti import godhi.)
3. Environment variable lama kaa'i:
   ```
   netlify env:set RESEND_API_KEY "re_xxxxx"
   netlify env:set ALERT_TOKEN "<jecha dheeraa dhoksaa>"
   ```
   Token: `openssl rand -hex 24` ykn ofii kee jecha dheeraa barreessi.
4. Deploy: `netlify deploy --prod`
5. Endpoint kee: `https://<site-kee>.netlify.app/alert`
6. Qori:
   ```
   curl -X POST https://<site-kee>.netlify.app/alert \
     -H "Authorization: Bearer <ALERT_TOKEN>" -H "Content-Type: application/json" \
     -d '{"event":"Test alert","lat":7.673,"lon":36.835}'
   ```
   `ok` jedhee email dhufuu qaba.

Hubachiisa: Resend domain hin mirkaneessine yoo, `onboarding@resend.dev` email Resend account keessan qofatti erga. Kanaaf tarkaanfii 1 irratti `bonsa26tefera@gmail.com` fayyadamne.
Netlify drag-and-drop deploy function hin ijaaru; CLI ykn GitHub fayyadami.

## 2) App
1. `gradle.properties` keessatti `ALERT_URL=https://<site-kee>.netlify.app/alert` fi `ALERT_TOKEN=` (token wal fakkaataa) galchi.
2. Android Studio keessatti bani → Gradle sync → Samsung A17 irratti install.
3. Latitude/longitude/radius galchi (ykn "USE MY CURRENT LOCATION") → "SAVE SAFE AREA".
4. Location: "Allow all the time"; Notifications: Allow.
5. Samsung: Settings > Apps > Anti-Theft > Battery > Unrestricted.

## Yaadannoo nageenyaa
- ALERT_TOKEN APK keessa jira; kan kee dhuunfaaf gahaadha. Namni APK baasee dubbisu token argata, alert sobaa erguu danda'a. Yoo dhiphate token jijjiiri (Netlify fi `gradle.properties` lamaan), app irra deebi'ii ijaari.
- Safe-area bakka mana keetii ta'uu danda'a; APK ykn config nama biraa waliin hin qoodin.
- Geofence battuu hin ta'u; Android battery policy irraa kan ka'e daqiiqaa muraasa turuu danda'a.
