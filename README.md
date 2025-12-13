# Weihnachtskarten Generator (christmas-card-generator)

Eine kleine Web-App zum Erstellen von digitalen Weihnachtskarten. Inhalte (Anrede, Name, Nachricht, Gruß) werden erfasst, komprimiert und als Link/QR-Code geteilt. Die Karte kann über den Link im Browser angezeigt werden.

## Voraussetzungen

- Python 3.10+ installiert

## Setup (virtuelles Environment)

```bash
# Im Projektverzeichnis
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Starten der App

```bash
# Aktiviertes venv vorausgesetzt
python app.py
```

Die Anwendung ist danach unter http://localhost:8080 erreichbar.

## Tech-Stack

- Backend: Python mit Flask
  - Routing und Rendering über `app.py`
  - Serverseitige Templates in `templates/` (`base.html`, `home.html`, `edit.html`, `card.html`)
- Frontend: HTML, JavaScript, CSS
  - Statische Assets in `static/` (`style.css`, `snow.css`, `app.js`)
  - Externe Libraries: QRCode.js (für QR-Codes), pako (für Deflate-Komprimierung)
  - Dynamische Effekte: Schneeflocken-Animation und QR-Link-Erzeugung im Browser

## Credits

- QR-Code: QRCode.js (CDN: https://cdnjs.com/libraries/qrcodejs)
- Komprimierung: pako (CDN: https://cdnjs.com/libraries/pako)
- Snowflake-Effekt: Inspiration/Beispiele von https://freefrontend.com/css-snow-effects/
