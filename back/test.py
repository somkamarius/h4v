from Prompts.PromptReader import PromptReader
from StableDiffusionApi.StableDiffusionApi import StableDiffusionApi
import os

print(StableDiffusionApi.GetGeneratedImageFromText("Vytautas the great", '', 1, 'no', 'no', None))