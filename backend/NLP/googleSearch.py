import re
from googleapiclient.discovery import build
def googleSearch(query,numberOfResults):
    api_key = "AIzaSyBE7Dphy-kgwtjVkOWHJXRHIPj5FIAca5A"
    resource = build("customsearch", 'v1', developerKey=api_key).cse()
    result = resource.list(q=query, cx='f1df5b7295d8b453d').execute()
    links = [0 for _ in range(numberOfResults)]
    titles = [0 for _ in range(numberOfResults)]
    for i in range(numberOfResults):
        titles[i] = result['items'][i]['title']
        links[i] = result['items'][i]['link']
    return titles,links