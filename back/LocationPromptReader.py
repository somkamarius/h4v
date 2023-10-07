import json

filePath = "LocationPrompts.json"

def GetLocationPrompt(locationId):
    try:
        with open(filePath, 'r') as file:
            data = json.load(file)
            if locationId in data:
                info = data[locationId]
                return info.get('prompt', f"No string found for ID '{locationId}'")
            else:
                return f"ID '{locationId}' not found in JSON data."
    except FileNotFoundError:
        return "JSON file not found."
