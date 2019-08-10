import pandas as pd
import urllib
import requests

import warnings
warnings.filterwarnings("ignore")

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

root_path = "D:/Vijay/BNPP/AI-Legal/data/Chennai Bench/"
file_path = root_path + "chennai" + ".csv"
pdf_path = root_path + "pdf/"

def download_file(url_download):
	r = requests.get(url_download, allow_redirects=True, verify=False)
	print(url_download)
	with open(pdf_path+url_download.rsplit('/',1)[1], 'wb') as f:
		f.write(r.content)

if __name__ == "__main__":
	df = pd.read_csv(file_path, sep='\t', header=None)    
	for _, row in df.iterrows():
		download_file(urllib.parse.unquote(row[4]))