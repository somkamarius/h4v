from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi
from dotenv import load_dotenv
import os

print(StableDiffusionApi.GetGeneratedImageFromText("Honda accord", '', 550, 550, 1, 'no', 'no', None))