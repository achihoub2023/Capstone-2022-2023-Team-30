import requests
import config
import nltk
import numpy as np
import pandas as pd
import seaborn as sns
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from transformers import BertForSequenceClassification, BertTokenizer
import torch
from bs4 import BeautifulSoup
from urllib.request import urlopen
import re

class Sentiment_Utils:
    def __init__(self):
        nltk.download("vader_lexicon")
        tokenizer = BertTokenizer.from_pretrained('ProsusAI/finbert')
        model = BertForSequenceClassification.from_pretrained('ProsusAI/finbert')

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
    
     #main function takes a dataframe of text and article name and returns a dataframe with the  2 different sentiment scores attached
    def analyze(self,urls):
        print(urls)
        df = self.urlscraper(urls)
        if df is not None:
            df = self.vader_ratings(df)
            df = self.finbert_ratings(df)
        return df   
    
    #takes a list of urls and scrapes them to create the correct dataframe
    def urlscraper(self,urls):
        out = pd.DataFrame(columns=['source', 'text'])
        d = {}
        d["ArticleSource"] = []
        d["ArticleText"] = []
        for url in urls:
        #url = "https://www.foxbusiness.com/energy/chevron-ceo-denies-biden-oil-lease-claim-details-practical-energy-policy"
        #url = "https://www.reuters.com/business/energy/chevrons-output-gains-venezuela-limited-by-political-risk-ceo-says-2023-02-28/"
            try:
                page = urlopen(url)
                html = page.read().decode("utf-8")
                soup = BeautifulSoup(html, "html.parser")
                #out = json.dumps(soup.get_text())
                source = re.search(re.escape('www.')+'(.*?)'+re.escape('.com'), url).group(0)
                text = soup.get_text()
                d["ArticleText"].append(text)
                d["ArticleSource"].append(source)
                out = pd.DataFrame.from_dict(d)
            except:
                d["ArticleText"].append("")
                d["ArticleSource"].append("")

        return out


    
    #creates the vader polarities column of the dataframe
    def vader_ratings(self,df):
        sent_analyzer = SentimentIntensityAnalyzer()
        articles = df["ArticleText"]
        ratings = []
        for article in articles:
            sentiment_dict = sent_analyzer.polarity_scores(article)
            #print(sentiment_dict)
            ratings.append(sentiment_dict['compound'])
        df["VaderPolarities"] = ratings
        return df
        
        
    #median mean standard deviation of vader sentiments
    def vader_stats(self,df):
        ratings = df["VaderPolarities"]
        mean_rating = ratings.mean()
        median_rating = ratings.median()
        std_rating = ratings.std()
        stats = [mean_rating, median_rating, std_rating]
        #print(stats)
        return stats
    
    #countplot of vader scores
    def plot_vader_scores_count(self,df,i):
        plot = sns.countplot(x = "VaderPolarities", data = df)
        plot.set_xlabel("Sentiment",fontsize = 10)
        plot.set_ylabel("Density",fontsize = 10)
        plot.set_title("Distribution of Vader Sentiment Among News Sources",fontsize = 10)
        plt = plot.get_figure()
        plt.savefig("src/STATIC/VADER_Count_Plot_{i}.png".format(i))
        return
    
    #histogram plot of vader scores
    def plot_vader_scores_dist(self,df,i):
        plot = sns.distplot(df["VaderPolarities"], kde = True, hist = False)
        plot.set_xlabel("Sentiment",fontsize = 10)
        plot.set_ylabel("Density",fontsize = 10)
        plot.set_title("Distribution of Vader Sentiment Among News Sources",fontsize = 10)
        plt = plot.get_figure()
        plt.savefig("src/STATIC/VADER_Dist_Plot_{i}.png".format(i))
        return
    
    def finbert_score_string(self,df):
        ratings =  df["FinBertSentiments"].tolist()
        print(ratings)
        Finbert_score_string = "".join(str(e )+"," for e in ratings)[:-1]
        print(Finbert_score_string)
        # for i in range(len(ratings)):
        #     if i == (len(ratings) -1):
        #         Finbert_score_string  = Finbert_score_string.join(str(ratings[i]))  
        #     else:
        #         Finbert_score_string  = Finbert_score_string.join(str(ratings[i]) + ",")
        return Finbert_score_string
    
    
    def vader_score_string(self,df):
        print(type(df))
        vader_score_count = []
        ratings = df["VaderPolarities"]
        print(ratings)
        for rating in ratings:
            
            if (rating < -0.20): #negative
                vader_score_count.append(1)
            elif (rating >0.20): #positive
                vader_score_count.append(0)
            else: #neutral
                vader_score_count.append(2)
        vader_score_string = "".join(str(e )+"," for e in  vader_score_count)[:-1]
        print(vader_score_string)
        # for i in range(len(vader_score_count)):
        #     if i == (len(vader_score_count) -1):
        #         vader_score_string = vader_score_string.join(str(vader_score_count[i]))  
        #     else:
        #         vader_score_string = vader_score_string.join(str(vader_score_count[i]) + ",")
        return vader_score_string
    #generates rating for specific article

    def finbert_rate_article(self,model, tokenizer, article):
        text = article
        tokens = tokenizer.encode_plus(text, add_special_tokens=False,
                                    return_tensors='pt')
            # define target chunksize
        chunksize = 512

        # split into chunks of 510 tokens, we also convert to list (default is tuple which is immutable)
        input_id_chunks = list(tokens['input_ids'][0].split(chunksize - 2))
        mask_chunks = list(tokens['attention_mask'][0].split(chunksize - 2))

        # loop through each chunk
        for i in range(len(input_id_chunks)):
            # add CLS and SEP tokens to input IDs
            input_id_chunks[i] = torch.cat([
                torch.tensor([101]), input_id_chunks[i], torch.tensor([102])
            ])
            # add attention tokens to attention mask
            mask_chunks[i] = torch.cat([
                torch.tensor([1]), mask_chunks[i], torch.tensor([1])
            ])
            # get required padding length
            pad_len = chunksize - input_id_chunks[i].shape[0]
            # check if tensor length satisfies required chunk size
            if pad_len > 0:
                # if padding length is more than 0, we must add padding
                input_id_chunks[i] = torch.cat([
                    input_id_chunks[i], torch.Tensor([0] * pad_len)
                ])
                mask_chunks[i] = torch.cat([
                    mask_chunks[i], torch.Tensor([0] * pad_len)
                ])

        input_ids = torch.stack(input_id_chunks)
        attention_mask = torch.stack(mask_chunks)

        input_dict = {
            'input_ids': input_ids.long(),
            'attention_mask': attention_mask.int()
        }     
        outputs = model(**input_dict)
        probs = torch.nn.functional.softmax(outputs[0], dim=-1)
        means = probs.mean(dim=0)
        rating = torch.argmax(means).item()
        return rating
    
    #call this to get the finbert ratings on the dataframe of articles

    def finbert_ratings(self,df):
        tokenizer = BertTokenizer.from_pretrained('ProsusAI/finbert')
        model = BertForSequenceClassification.from_pretrained('ProsusAI/finbert')
        articles = df["ArticleText"]
        ratings = []
        for article in articles:
            rating = self.finbert_rate_article(model, tokenizer, article)
            #print(rating)
            ratings.append(rating)
        df["FinBertSentiments"] = ratings
        return df
    

    #median mean standard deviation for finbert
    def finbert_stats(self,df):
        ratings = df["FinBertSentiments"]
        mean_rating = ratings.mean()
        median_rating = ratings.median()
        std_rating = ratings.std()
        stats = [mean_rating, median_rating, std_rating]
        #print(stats)
        return stats
    
    #countplot for finbert
    def plot_finbert_scores_count(self,df,i):

        plot = sns.countplot(x = "FinBertSentiments", data = df)
        plot.set_xlabel("Sentiment",fontsize = 10)
        plot.set_ylabel("Density",fontsize = 10)
        plot.set_title("Distribution of FinBert Sentiment Among News Sources",fontsize = 10)
        plt = plot.get_figure()
        plt.savefig("/Users/anischihoub/Documents/Rutgers_Classes/Spring_2023_Classes/Capstone_2022_2023_Team_30/backend/NLP/STATIC/Finbert_Count_Plot_{i}.png".format(i))
        return
    
    #histogramplot for finbert
    def plot_finbert_scores_dist(self,df,i):

        plot = sns.distplot(df["FinBertSentiments"], kde = True, hist = False)
        plot.set_xlabel("Sentiment",fontsize = 10)
        plot.set_ylabel("Density",fontsize = 10)
        plot.set_title("Distribution of FinBert Sentiment Among News Sources",fontsize = 10)
        plt = plot.get_figure()
        plt.savefig("/Users/anischihoub/Documents/Rutgers_Classes/Spring_2023_Classes/Capstone_2022_2023_Team_30/backend/NLP/STATIC/Finbert_Dist_Plot_{i}.png".format(i))
        return