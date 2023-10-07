from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

import os
import openai
from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi

from threading import Thread
import uuid
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/initial/<string:id>') 
@cross_origin()
def initial_message(id):
    prompt = PromptReader.GetScenarioPrompt(id)
    return prompt.get('initial_message')

@app.route('/facts/<string:id>') 
@cross_origin()
def facts(id):
    prompt = PromptReader.GetScenarioPrompt(id)
    return prompt.get('facts_about')

@app.route("/request", methods=['POST'])
@cross_origin()
def request_conversation():
    load_dotenv()

    apiKey = os.environ["api_key"]

    scenario = request.json['scenario']

    prompt = PromptReader.GetScenarioPrompt(scenario)

    if prompt is None:
        return jsonify(
            status='failed',
            scenario=scenario,
            conversation=conversation,
            message='Prompt not found'
        )

    conversation = request.json['conversation']

    lastContent = ""
    if len(conversation) == 2:
        lastContent = conversation[-1]["content"]
        conversation[-1]["content"] = conversation[-1]["content"] + " Please dont end the story and give new options"
        conversation[-1]["content"] = lastContent

    if len(conversation) == 8:
        lastContent = conversation[-1]["content"]
        conversation[-1]["content"] = conversation[-1]["content"] + " Finish this story and not give any options or choices"

    conversation.insert(0, {"role": "system", "content": prompt.get('prompt')})
    conversation.insert(1, {"role": "user", "content": prompt.get('first_message')})

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
    
    if len(conversation) == 10 or len(conversation) == 4:
        conversation[-1]["content"] = lastContent
    
    conversation.append({"role": "assistant", "content": completion.choices[0].message.content})
    conversation.pop(0)
    conversation.pop(0)

    return jsonify(
        status='success',
        scenario=scenario,
        conversation=conversation
    )

@app.route("/request-streaming", methods=['POST'])
@cross_origin()
def request_streaming():
    scenario = request.json['scenario']

    prompt = PromptReader.GetScenarioPrompt(scenario)

    if prompt is None:
        return jsonify(
            status='failed',
            scenario=scenario,
            conversation=conversation,
            message='Prompt not found'
        )

    conversation = request.json['conversation']

    lastContent = ""
    if len(conversation) == 2:
        lastContent = conversation[-1]["content"]
        conversation[-1]["content"] = conversation[-1]["content"] + " Please dont end the story and give new options"

    if len(conversation) == 8:
        lastContent = conversation[-1]["content"]
        conversation[-1]["content"] = conversation[-1]["content"] + " Finish this story and not give any options or choices"

    conversation.insert(0, {"role": "system", "content": prompt.get('prompt')})
    conversation.insert(1, {"role": "user", "content": prompt.get('first_message')})

    id = str(uuid.uuid4())

    Thread(target = streaming_task, args=(conversation,id,)).start()

    if len(conversation) == 10 or len(conversation) == 4:
        conversation[-1]["content"] = lastContent

    newConversation = conversation.copy()

    newConversation.pop(0)
    newConversation.pop(0)

    return jsonify(
        status='success',
        scenario=scenario,
        conversation=newConversation,
        id = id
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

@app.route("/request-streaming/<id>")
def request_streaming_get(id):

    path = os.getcwd()+"/Cache/"+id+".json"

    if os.path.isfile(path):
        file = open(path, 'r')
        return json.load(file)
    else :
        return jsonify({"message": "", "status": "failed"})

def streaming_task(conversation,id):

    file = open(os.getcwd()+"/Cache/"+id+".json", "w")
    data = {"message": "", "status": "running"}
    json.dump(data, file)
    file.close()

    apiKey = os.environ["api_key"]
    openai.api_key = apiKey

    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation, temperature=0.7, max_tokens=1000, stream=True)

    message = ""

    for chunk in response:
        if chunk['choices'][0]['delta']:
            chunk_message = chunk['choices'][0]['delta']['content']
            message += str(chunk_message)
            data['message'] = message
            file = open(os.getcwd()+"/Cache/"+id+".json", "w")
            json.dump(data, file)
            file.close()

    file = open(os.getcwd()+"/Cache/"+id+".json", "w")
    data['status'] = 'done'
    json.dump(data, file)
    file.close()