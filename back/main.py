from flask import Flask
from bardapi import Bard

app = Flask(__name__)

@app.route("/")
def hello_world():
    token = 'bwjdzYkKZLN0hs4mGfKomne_wtWygro3QufxGZWycxLb3Ch9X-MSPwU32zChOPoCtQGA4Q.'
    bard = Bard(token=token)
    return bard.get_answer("How to cure cancer?")['content']