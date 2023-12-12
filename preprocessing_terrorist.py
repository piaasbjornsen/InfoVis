import pandas as pd
import numpy as np
import os

df = pd.read_csv('annual-number-of-deaths-by-cause.csv')
diseases = list(df)[4:]
total = []
total_years = []
years = np.arange(1990, 2020, 1)
for year in years:
    for disease in diseases:
        df_yr = df[df['Year'] == year]
        total.append(df_yr[disease].sum())
    total_years.append(total)
    total = []

total_rev = []
total_years_rev = []
for disease in diseases:
    for year in years:
        df_yr = df[df['Year'] == year]
        total_rev.append(df_yr[disease].sum())
    total_years_rev.append(total_rev)
    total_rev = []

total_dis = []
for disease in diseases:
    total_dis.append(df[disease].sum())


new_df = pd.DataFrame()
new_df = pd.DataFrame.from_records(total_years, columns=diseases)
new_df['Year'] = years

rev_df = pd.DataFrame()
rev_df = pd.DataFrame.from_records(total_years_rev, columns=years)
rev_df['Diseases'] = diseases

dis_df = pd.DataFrame()
dis_df['Deaths'] = total_dis
dis_df['Diseases'] = diseases
dis_df.sort_values(dis_df.columns[0],inplace=True, ascending=False)
dis_df['Deaths_m'] = (dis_df['Deaths'].astype(float)/1000000).round(3).astype(str) + ' million'

# os.makedirs('./', exist_ok=True)
# new_df.to_csv('./out.csv', index=False)

# os.makedirs('./', exist_ok=True)
# rev_df.to_csv('./out_rev.csv', index=False)

os.makedirs('./', exist_ok=True)
dis_df.to_csv('./out_dis.csv', index=False)
