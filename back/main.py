from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

import os
import openai
from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/request", methods=['POST'])
@cross_origin()
def request_conversation():
    load_dotenv()

    apiKey = os.environ["api_key"]

    scenario = request.json['scenario']
    conversation = request.json['conversation']

    prompt = PromptReader.GetScenarioPrompt(scenario)

    if prompt is None:
        return jsonify(
            status='failed',
            scenario=scenario,
            conversation=conversation,
            message='Prompt not found'
        )

    if len(conversation) == 0:
        conversation.append({"role": "system", "content": prompt.get('prompt')})
        conversation.append({"role": "user", "content": prompt.get('first_message')})

    lastContent = conversation[-1]["content"]
    if len(conversation) == 7:
        conversation[-1]["content"] = conversation[-1]["content"] + " Finish this story and not give any options or choices"


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
     
    conversation[-1]["content"] = lastContent
    conversation.append({"role": "assistant", "content": completion.choices[0].message.content})

    return jsonify(
        status='success',
        scenario=scenario,
        conversation=conversation
    )

@app.route("/request-image", methods=['POST'])
@cross_origin()
def request_image():
    scenario = request.json['scenario']
    
    prompt = PromptReader.GetCharacterPrompt(scenario)

    imgUrl = StableDiffusionApi.GetGeneratedImageFromText(prompt.get('prompt'), '', 1, 'no', 'no', None)

    return jsonify(
        url=imgUrl[0]
    )