import base64
import json
import zlib

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/card")
def card():
    data_param = request.args.get("data")

    if data_param:
        try:
            # Fill padding for Base64 decoding
            padded = data_param + "==="

            # Base64 Decoding
            try:
                compressed_bytes = base64.urlsafe_b64decode(padded)
            except Exception:
                compressed_bytes = base64.b64decode(padded)

            # Decompression - versuche erst raw deflate, dann zlib
            try:
                # Raw deflate (windowBits: -15 vom JavaScript)
                utf8_bytes = zlib.decompress(compressed_bytes, -15)
            except zlib.error:
                # Fallback für alte zlib-komprimierte Daten
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
            return f"Error while parsing UTF-8 data: {e}", 400
        except Exception as e:
            return f"Error during decoding/decompression: {e}. Please check the link.", 400

@app.route("/edit")
def edit():
    return render_template("edit.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
