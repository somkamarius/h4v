import json
import os

class PromptReader:
    
    locationFilePath = "back/Prompts/LocationPrompts.json"
    characterFilePath = "back/Prompts/CharacterPrompts.json"

    @staticmethod
    def GetScenarioPrompt(id):
        return PromptReader.__GetPrompt__(id, PromptReader.locationFilePath)

    @staticmethod
    def GetCharacterPrompt(id):
        return PromptReader.__GetPrompt__(id, PromptReader.characterFilePath)

    @staticmethod
    def __GetPrompt__(id, path):
        try:
            print(os.path.join(os.getcwd(), path))
            with open(os.path.join(os.getcwd(), path), 'r') as file:
                print(file)
                data = json.load(file)
                if id in data:
                    info = data[id]
                    return info.get('prompt', f"No string found for ID '{id}'")
                else:
                    return f"ID '{id}' not found in JSON data."
        except FileNotFoundError:
            return "JSON file not found."
