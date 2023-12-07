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

new_df = pd.DataFrame()
new_df = pd.DataFrame.from_records(total_years, columns=diseases)
new_df['Year'] = years

os.makedirs('./', exist_ok=True)
new_df.to_csv('./out.csv', index=False)
