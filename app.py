from flask import Flask, render_template, request
import base64
import json

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

            decoded_json = base64.urlsafe_b64decode(padded).decode("utf-8")
            data = json.loads(decoded_json)

            return render_template(
                "card.html",
                content=data.get("content", ""),
                to_name=data.get("to_name", ""),
                from_name=data.get("from_name", ""),
                salutation=data.get("salutation", ""),
                greeting=data.get("greeting", "")
            )
        except Exception as e:
            return f"Fehler beim Decoden: {e}", 400

    # Fallback: alte Klartext-URL
    # content = request.args.get("content", "Frohe Weihnachten!")
    # to_name = request.args.get("to_name", "")
    # from_name = request.args.get("from_name", "")
    # salutation = request.args.get("salutation", "")
    # greeting = request.args.get("greeting", "")

    # return render_template("card.html", content=content, to_name=to_name, from_name=from_name, salutation=salutation, greeting=greeting)

@app.route("/edit")
def edit():
    return render_template("edit.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)
