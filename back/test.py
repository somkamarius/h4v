from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi
import os

url = StableDiffusionApi.GetGeneratedImageFromText("Great dutchy of Lithuania villager, painting, portrait, black and white, no colors", '', 812, 512, 0, 'no', 'no', None)
print(url)
