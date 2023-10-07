from flask import Flask
from flask import request
from flask import jsonify
from dotenv import load_dotenv

import os
import openai
from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi

app = Flask(__name__)

@app.route("/request", methods=['POST'])
def request_conversation():
    load_dotenv()

    apiKey = os.environ["api_key"]

    scenario = request.json['scenario']
    conversation = request.json['conversation']

    result = []

    prompt = PromptReader.GetScenarioPrompt(scenario)

    if len(conversation) == 0:
        conversation.append({"role": "system", "content": prompt.get('prompt')})
        conversation.append({"role": "user", "content": prompt.get('first_message')})


    openai.api_key = apiKey

    try:
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation, temperature=0.7, max_tokens=1000)
    except Exception as exception:
        return jsonify(
            status='failed',
            scenario=scenario,
            conversation=conversation,
            message=str(exception)
        )

    conversation.append({"role": "assistant", "content": completion.choices[0].message.content})

    return jsonify(
        status='success',
        scenario=scenario,
        conversation=conversation
    )

@app.route("/request-image", methods=['POST'])
def request_image():
    scenario = request.json['scenario']
    
    prompt = PromptReader.GetCharacterPrompt(scenario)

    imgUrl = StableDiffusionApi.GetGeneratedImageFromText(prompt.get('prompt'), '', 1, 'no', 'no', None)

    return jsonify(
        url=imgUrl
    )