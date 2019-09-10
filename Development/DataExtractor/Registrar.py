import re
import camelot
import pandas as pd
from xml.dom import minidom as dom

doc = dom.parse('parser.xml')
bench_name = 'Registrar'

def getPattern(doc, bench_name):
    pattern = None
    benches = doc.getElementsByTagName("benches")
    for bench in benches:
        b_name = bench.getElementsByTagName('name')[0].firstChild.data
        if b_name == bench_name:
            pattern = bench.getElementsByTagName('pattern')[0].firstChild.data
    return pattern

def getColumns(doc, bench_name):
    col_list=[]
    benches = doc.getElementsByTagName("benches")
    for bench in benches:
        b_name = bench.getElementsByTagName('name')[0].firstChild.data
        if b_name == bench_name:
            labels = bench.getElementsByTagName('label')
            for l in labels:
                col_list.append(l.firstChild.data)
    return col_list

def cleanString(s):
    return s.replace('\n', '').strip()
pattern = re.compile(r'\d+\.')

def parseTable(df):
    main = []
    for i,j in df.iterrows():
        l = []
        if(pattern.match(j[0]) != None):
            l.append(cleanString(j[0]))
            l.append(cleanString(j[1]))
            l.append(cleanString(j[2]))
            l.append(cleanString(j[3]))
            l.append(cleanString(j[4]))
            l.append(cleanString(j[5]))
            l.append(cleanString(j[6]))
            main.append(l)
            
    df = pd.DataFrame(data=main, columns=getColumns(doc, bench_name))
    return df

tables = camelot.read_pdf('/home/inferno/ai-legal/ai-data/all-bench-data/Registrar NCLT.pdf', compress=True, pages='1-end')
df_list = [parseTable(i.df) for i in tables]

main_df = pd.concat(df_list, ignore_index=True)
main_df.to_csv('Registrar.csv', index=False)
print('Done')
