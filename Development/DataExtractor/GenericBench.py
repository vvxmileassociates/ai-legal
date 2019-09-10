import re
import camelot
import pandas as pd
from xml.dom import minidom as dom

doc = dom.parse('parser.xml')
bench_name = 'Kolkata'

def getPattern(doc, bench_name):
    pattern = None
    benches = doc.getElementsByTagName("bench")
    for bench in benches:
        b_name = bench.getElementsByTagName('name')[0].firstChild.data
        if b_name == bench_name:
            pattern = bench.getElementsByTagName('pattern')[0].firstChild.data
    return pattern

def getColumns(doc, bench_name):
    col_list=[]
    benches = doc.getElementsByTagName("bench")
    for bench in benches:
        b_name = bench.getElementsByTagName('name')[0].firstChild.data
        if b_name == bench_name:
            labels = bench.getElementsByTagName('label')
            for l in labels:
                col_list.append(l.firstChild.data)
    return col_list

def cleanString(s):
    return s.replace('\n', '').strip()

pattern = re.compile(r''+getPattern(doc, bench_name))

def parseTable(df, cols):
    main = []
    for i,j in df.iterrows():
        l = []
        if(pattern.match(j[0]) != None):
            for ci in range(0, len(cols)):
                l.append(cleanString(j[ci]))
            main.append(l)
        df = pd.DataFrame(data=main, columns=cols)
    return df

tables = camelot.read_pdf('/home/inferno/ai-legal/ai-docs/kolkata_bench/3.pdf', compress=True, pages='1-end')
cols = getColumns(doc, bench_name)
df_list = [parseTable(i.df, cols) for i in tables]

main_df = pd.concat(df_list, ignore_index=True)
main_df.to_csv('/home/inferno/ai-legal/ai-docs/kolkata_bench/3.csv', index=False)

print('Done')
