#import libraries
import concurrent.futures
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import time
from bounded_pool_executor import BoundedThreadPoolExecutor

#define parameters for webscrapper

columns = [str(i) for i in np.array(range(0, 71))]

BASE_URL = ("https://finviz.com/screener.ashx?v={v_page}{signal}{filter}&ft=4{ticker}")

# main url (custom):
main_url = BASE_URL.format(v_page=151, signal="", filter="", ticker="")
main_url += "&c=" + ",".join(columns)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"}

session = requests.Session()
response = session.get(main_url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

cols = [col.text for col in soup.find_all("td", {"class": "table-top"})]
col_no = len(cols)
pages = int(soup.find_all("a", {"class": "screener-pages"})[-1].text)

def scrape(page):
    print("Scraping page: %s", page)
    time.sleep(1)
    response = session.get(page, headers=headers)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        row = []
        data =[]

        for col in soup.find_all("td", {"class": "screener-body-table-nw"}):
            if col.text is not None:
                row.append(col.text)
            if len(row) == col_no:
                data.append(row)
                row = []
                
        return data
    
    else: return "Error"

#create url list
url_list = []
for page in range(0, pages):
    url_list.append(main_url + "&r=" + str(page * 20 + 1))

with BoundedThreadPoolExecutor(max_workers=5) as executor:
    futures = [executor.submit(scrape, url) for url in url_list]
    concurrent.futures.wait(futures, return_when=concurrent.futures.ALL_COMPLETED)
    results = [future.result() for future in futures]


df = pd.DataFrame(columns = cols)

for result in results:
    df2 = pd.DataFrame(result, columns = cols)
    df = pd.concat([df, df2], ignore_index=True)

df.to_json("finviz.json", orient="records")