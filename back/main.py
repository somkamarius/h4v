from flask import Flask
from flask import request
from flask import jsonify
from dotenv import load_dotenv

import os
import openai
from Prompts.PromptReader import PromptReader

app = Flask(__name__)

@app.route("/request", methods=['POST'])
def main():
    load_dotenv()

    apiKey = os.environ["api_key"]

    scenario = request.json['scenario']
    conversation = request.json['conversation']

    result = []

    prompt = PromptReader.GetScenarioPrompt(scenario)

    if len(conversation) == 0:
        message = {"role": "system", "content": prompt}
        conversation.append(message)


    openai.api_key = apiKey
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation)

    conversation.append({"role": "assistant", "content": completion.choices[0].message.content})

    return jsonify(
        scenario=scenario,
        conversation=conversation
    )