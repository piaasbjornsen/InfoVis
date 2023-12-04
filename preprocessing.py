import pandas as pd
import numpy as np
import re

# df = pd.read_csv(r'annual-number-of-deaths-by-cause.csv')
# # print(df.info)
# # print(df.isnull().sum())

# num_columns_to_loop = 34
# def replace_column_names(df):
    
#     for i in range(3,num_columns_to_loop):
#         test_str = df.columns[i]
 
#         sub1 = "-"
#         sub2 = "- Sex"

#         s=str(re.escape(sub1))
#         e=str(re.escape(sub2))

#         res=re.findall(s+"(.*)"+e,test_str)[0]
#         df = df.rename(columns={test_str: res})    
#     return df

# result = replace_column_names(df)
# result.to_csv("annual-number-of-deaths-by-cause.csv")

df2 = pd.read_csv(r'gtd.csv')
# print(df2.iyear.unique())
df3=df2['iyear'].value_counts().sort_index()
df3.to_csv("number_deaths_per_year_terrorism.csv")













