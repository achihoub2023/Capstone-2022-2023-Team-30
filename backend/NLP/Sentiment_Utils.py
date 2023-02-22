import requests
import config
class Sentiment_Utils:
    def __init__(self):
          pass
      
    def financial_payload(self): 
        API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
        headers = {"Authorization": f"Bearer {config.huggingface_sentiment_key}"}

        def query(payload):
            response = requests.post(API_URL, headers=headers, json=payload)
            return response.json()
            
        output = query({
            "inputs": "I like you. I love you",
        })
        return output