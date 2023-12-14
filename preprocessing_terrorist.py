import pandas as pd
import numpy as np
import re

df1 = pd.read_csv(r'globalterrorismdb.csv')
df2= pd.read_csv(r'globalterrorismdb_2021Jan-June_1222dist.csv')

df_year = df1[df1['iyear'] >= 2011]

country_counts_1 = df_year['country_txt'].value_counts().to_frame().reset_index()
country_counts_1.columns = ['Country', 'Attack_Count']
# print(country_counts_1)

country_counts_2 = df2['country_txt'].value_counts().to_frame().reset_index()
country_counts_2.columns = ['Country', 'Attack_Count']
# print(country_counts_2)

frames_2=[country_counts_1,country_counts_2]
attacks_by_country= pd.concat(frames_2,ignore_index=True)
attacks_by_country.sort_values(attacks_by_country.columns[1],inplace=True, ascending=False)
# attacks_by_country.to_csv("./attacks_by_country_10y.csv",,ndex=False)

attacks_by_country_10 = attacks_by_country.head(10)

# attacks_by_country_10['Attacks'] = (attacks_by_country_10['Attack_Count'].astype(float)/1000000).round(3).astype(str) + ' million'
attacks_by_country_10.to_csv("./attacks_by_country_10y.csv",index=False)
