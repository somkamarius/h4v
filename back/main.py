from flask import Flask
from flask import request
from flask import jsonify

import openai

app = Flask(__name__)

@app.route("/request", methods=['POST'])
def main():
    openai.api_key = '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'
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": request.json['question']}])
    return jsonify(
        answer=completion.choices[0].message.content
    )