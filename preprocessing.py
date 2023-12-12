import pandas as pd
import numpy as np
import re


df1 = pd.read_csv(r'assets/csv/globalterrorismdb.csv')
df2= pd.read_csv(r'assets/csv/globalterrorismdb_2021Jan-June_1222dist.csv')

df1['casualities']=df1['nkill']+df1['nwound']
df2['casualities']=df2['nkill']+df2['nwound']

df1year= df1.groupby("iyear")["eventid"].count().reset_index().rename(columns={'iyear': 'year','eventid':'numberOfIncidents'})
df2year= df2.groupby("iyear")["eventid"].count().reset_index().rename(columns={'iyear': 'year','eventid':'numberOfIncidents'})

frames1=[df1year,df2year]
result1=pd.concat(frames1,ignore_index=True)
# print(result1)

count_cas_per_year1= df1.groupby("iyear").casualities.sum().to_frame().reset_index()
count_cas_per_year2=df2.groupby("iyear").casualities.sum().to_frame().reset_index()

frames=[count_cas_per_year1,count_cas_per_year2]
result= pd.concat(frames,ignore_index=True)
# print(result)

result1['casualities']=result['casualities']
# print(result1)

result1.to_csv("assets/csv/number_terrorist_attacks_casualties_per_year.csv",index=False)


country_counts_1 = df1['country_txt'].value_counts().to_frame().reset_index()
country_counts_1.columns = ['Country', 'Attack_Count']
# print(country_counts_1)

country_counts_2 = df2['country_txt'].value_counts().to_frame().reset_index()
country_counts_2.columns = ['Country', 'Attack_Count']
# print(country_counts_2)

frames_2=[country_counts_1,country_counts_2]
attacks_by_country= pd.concat(frames_2,ignore_index=True)
attacks_by_country.to_csv("assets/csv/attacks_by_country.csv",index=False)





file1_df = pd.read_csv('assets/csv/attacks_by_country.csv',usecols=[0],names=['name'])
file2_df = pd.read_csv('assets/csv/world_population.csv',usecols=[0],names=['name'])

#Converting both the files first column to uppercase to make it case insensitive
file1_df['name'] = file1_df['name'].str.upper()
file2_df['name'] = file2_df['name'].str.upper()

#Merging both the Dataframe using left join
comparison_result = pd.merge(file1_df,file2_df,on='name',how='left',indicator=True)

#Filtering only the rows that are available in left(file1)
comparison_result = comparison_result.loc[comparison_result['_merge'] == 'left_only']

print(comparison_result)
