from flask import Flask, render_template, request
import base64
import json
import zlib

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/card")
def card():
    data_param = request.args.get("data")

    if data_param:
        try:
            # Padding für Base64 auffüllen
            padded = data_param + "==="

            # URL-safe Base64 → Bytes
            try:
                compressed_bytes = base64.urlsafe_b64decode(padded)
            except Exception:
                compressed_bytes = base64.b64decode(padded)

            # Entpacken (Deflate)
            utf8_bytes = zlib.decompress(compressed_bytes)

            # UTF-8 String
            decoded_json = utf8_bytes.decode("utf-8")
            data = json.loads(decoded_json)

            return render_template(
                "card.html",
                content=data.get("content", ""),
                to_name=data.get("to_name", ""),
                from_name=data.get("from_name", ""),
                salutation=data.get("salutation", ""),
                greeting=data.get("greeting", "")
            )
        except json.JSONDecodeError as e:
            return f"Fehler beim Parsen der JSON-Daten: {e}", 400
        except Exception as e:
            return f"Fehler beim Decoden/Entpacken: {e}. Bitte überprüfen Sie den Link.", 400

@app.route("/edit")
def edit():
    return render_template("edit.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)
