import json
import os

class PromptReader:
    
    locationFilePath = "Prompts/LocationPrompts.json"
    characterFilePath = "Prompts/CharacterPrompts.json"

    @staticmethod
    def GetScenarioPrompt(id):
        return PromptReader.__GetPrompt__(id, PromptReader.locationFilePath)

    @staticmethod
    def GetCharacterPrompt(id):
        return PromptReader.__GetPrompt__(id, PromptReader.characterFilePath)

    @staticmethod
    def __GetPrompt__(id, path):
        try:
            with open(os.path.join(os.getcwd(), path), 'r') as file:
                data = json.load(file)
                if id in data:
                    info = data[id]
                    return info
                else:
                    return None
        except FileNotFoundError:
            return "JSON file not found."
