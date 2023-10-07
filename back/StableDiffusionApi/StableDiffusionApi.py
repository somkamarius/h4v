import requests
import json
import RequestConstants

class StableDiffusionApi:

    def GetGeneratedImageFromText(prompt, negativePrompt, height, width, upScale, highRes, panorama, webHook):
        """
        prompt (str): The text prompt to generate the image from.
        negativePrompt (str): An optional negative text prompt for contrast.
        height (float): The height of the generated image.
        width (float): The width of the generated image.
        upScale (float): Whether to upscale the image.
        highRes (string): Whether to generate a high-resolution image. Pass "yes" or "no".
        panorama (string): Whether to create a panorama-style image. Pass "yes" or "no".
        webHook (str): An optional webhook for notifications.
        """

        payload = json.dumps({
        "key": RequestConstants.key,
        "prompt": prompt,
        "negative_prompt": negativePrompt,
        "width": width,
        "height": height,
        "samples": "1",
        "num_inference_steps": "20",
        "seed": None,
        "guidance_scale": 7.5,
        "safety_checker": "no",
        "multi_lingual": "no",
        "panorama": panorama,
        "self_attention": highRes,
        "upscale": upScale,
        "embeddings_model": "null",
        "webhook": webHook,
        "track_id": None
        })

        response = requests.request("POST", RequestConstants.url, headers = RequestConstants.headers, data = payload)
        
        if response.status_code == 200:
            return response.json()["url"]
        else:
            return None

    
    def GetGeneratedImageFromImage(prompt, negativePrompt, imageUrl, destructionAmount, height, width, webHook):
        """
        prompt (str): The text prompt to generate the image from.
        negativePrompt (str): An optional negative text prompt for contrast.
        destructionAmount (float): 0 -> 1. More means less of original is left.
        imageUrl (str): Sample image url for generation.
        height (float): The height of the generated image.
        width (float): The width of the generated image.
        webHook (str): An optional webhook for notifications.
        """
        payload = json.dumps({
            "key": "",
            "prompt": prompt,
            "negative_prompt": negativePrompt,
            "init_image": imageUrl,
            "width": width,
            "height": height,
            "samples": "1",
            "num_inference_steps": "30",
            "safety_checker": "no",
            "enhance_prompt": "yes",
            "guidance_scale": 7.5,
            "strength": destructionAmount,
            "seed": None,
            "webhook": webHook,
            "track_id": None
            })

        response = requests.request("POST", RequestConstants.url, headers = RequestConstants.headers, data = payload)
        
        if response.status_code == 200:
            return response.json()["url"]
        else:
            return None
