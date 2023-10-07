import json

class PromptReader:
    
    locationFilePath = "LocationPrompts.json"
    characterFilePath = "CharacterPrompts.json"

    def GetLocationPrompt(id):
        PromptReader.__GetPrompt__(id, PromptReader.locationFilePath)

    def GetCharacterPrompt(id):
        PromptReader.__GetPrompt__(id, PromptReader.characterFilePath)
        
    def __GetPrompt__(id, path):
        try:
            with open(path, 'r') as file:
                data = json.load(file)
                if id in data:
                    info = data[id]
                    return info.get('prompt', f"No string found for ID '{id}'")
                else:
                    return f"ID '{id}' not found in JSON data."
        except FileNotFoundError:
            return "JSON file not found."
