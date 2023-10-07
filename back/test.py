from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi
import os

print(StableDiffusionApi.GetGeneratedImageFromText("19 century lady, stylized, black and white", '', 1, 'no', 'no', None))