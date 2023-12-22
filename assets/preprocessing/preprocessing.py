import pandas as pd
import numpy as np
import re


# df1 = pd.read_csv(r'globalterrorismdb.csv')
# df2= pd.read_csv(r'globalterrorismdb_2021Jan-June_1222dist.csv')

# df1['casualities']=df1['nkill']+df1['nwound']
# df2['casualities']=df2['nkill']+df2['nwound']

# df1year= df1.groupby("iyear")["eventid"].count().reset_index().rename(columns={'iyear': 'year','eventid':'numberOfIncidents'})
# df2year= df2.groupby("iyear")["eventid"].count().reset_index().rename(columns={'iyear': 'year','eventid':'numberOfIncidents'})

# frames1=[df1year,df2year]
# result1=pd.concat(frames1,ignore_index=True)
# # print(result1)

# count_cas_per_year1= df1.groupby("iyear").casualities.sum().to_frame().reset_index()
# count_cas_per_year2=df2.groupby("iyear").casualities.sum().to_frame().reset_index()

# frames=[count_cas_per_year1,count_cas_per_year2]
# result= pd.concat(frames,ignore_index=True)
# # print(result)

# result1['casualities']=result['casualities']
# # print(result1)

# result1.to_csv("number_terrorist_attacks_casualties_per_year.csv",index=False)


# country_counts_1 = df1['country_txt'].value_counts().to_frame().reset_index()
# country_counts_1.columns = ['Country', 'Attack_Count']
# # print(country_counts_1)

# country_counts_2 = df2['country_txt'].value_counts().to_frame().reset_index()
# country_counts_2.columns = ['Country', 'Attack_Count']
# # print(country_counts_2)

# frames_2=[country_counts_1,country_counts_2]
# attacks_by_country= pd.concat(frames_2,ignore_index=True)
# attacks_by_country.to_csv("attacks_by_country.csv",index=False)





# file1_df = pd.read_csv('attacks_by_country.csv',usecols=[0,1],names=['name','count'])
# file2_df = pd.read_csv('world_population.csv',usecols=[0,1,2],names=['name','code','pop'])

# file1_df['name']= file1_df['name'].str.upper().to_frame()
# file2_df['name']= file2_df['name'].str.upper().to_frame()


# file1_df['code'] = file1_df['name'].map(dict(file2_df[['name', 'code']].to_numpy())).to_frame()
# file1_df.to_csv("country_attacks_code.csv",index=False)

# new_frame= pd.read_csv(r'country_attacks_code.csv')
# code_attacks=new_frame.groupby('code')['count'].sum().to_frame()
# code_attacks.rename(columns={1 :'attack_count'}, inplace=True )
# code_attacks.to_csv("code_attacks.csv")

# df1 = pd.read_csv(r'globalterrorismdb.csv')
# df2= pd.read_csv(r'globalterrorismdb_2021Jan-June_1222dist.csv')

# filtered_df1= df1.loc[(df1['iyear'])>=2011]
# filtered_df1=filtered_df1[['iyear','country_txt','gname']]

# filtered_df2= df2.loc[(df2['iyear'])>=2011]
# filtered_df2= filtered_df2[['iyear','country_txt','gname']]
                                        
# filtered_frames=[filtered_df1,filtered_df2]
# filtered_result= pd.concat(filtered_frames,ignore_index=True)
# filtered_result.to_csv("terrorist_gnames.csv",index=False)                                  
                                        
# filtered_result_2021= filtered_result.loc[(filtered_result['iyear'])==2021]
# filtered_result_2021['gname'].value_counts().to_frame().reset_index()[:10].to_csv("2021_gattacks.csv",index=False)

# gname_country_filter= df1.loc[(df1['iyear'])==2011]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Communist Party of India - Maoist (CPI-Maoist)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_4,countryspecific_5,countryspecific_6]
# final_result=pd.concat(c_1_2)
# # final_result.to_csv('2011_gcountry.csv')
# df1 = pd.read_csv(r'2011_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2011_gcountry.csv',index=False)

# gname_country_filter= df1.loc[(df1['iyear'])==2012]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in Iraq')].groupby('country_txt').value_counts().to_frame()
# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_4,countryspecific_5,countryspecific_6,countryspecific_7]
# final_result=pd.concat(c_1_2).to_csv('2012_gcountry.csv')
# df1 = pd.read_csv(r'2012_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2012_gcountry.csv',index=False)

# gname_country_filter= df1.loc[(df1['iyear'])==2013]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_4,countryspecific_5,countryspecific_6,countryspecific_7]
# final_result=pd.concat(c_1_2).to_csv('2013_gcountry.csv')
# df1 = pd.read_csv(r'2013_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2013_gcountry.csv',index=False)


# gname_country_filter= df1.loc[(df1['iyear'])==2014]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_4,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2014_gcountry.csv')
# df1 = pd.read_csv(r'2014_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2014_gcountry.csv',index=False)


# gname_country_filter= df1.loc[(df1['iyear'])==2015]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# # countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2015_gcountry.csv')
# df1 = pd.read_csv(r'2015_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2015_gcountry.csv',index=False)


# gname_country_filter= df1.loc[(df1['iyear'])==2016]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# #countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2016_gcountry.csv')
# df1 = pd.read_csv(r'2016_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2016_gcountry.csv',index=False)


# gname_country_filter= df1.loc[(df1['iyear'])==2017]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# #countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2017_gcountry.csv')
# df1 = pd.read_csv(r'2017_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2017_gcountry.csv',index=False)

# gname_country_filter= df1.loc[(df1['iyear'])==2018]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# #countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2018_gcountry.csv')
# df1 = pd.read_csv(r'2018_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2018_gcountry.csv',index=False)

# gname_country_filter= df1.loc[(df1['iyear'])==2019]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# #countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2019_gcountry.csv')
# df1 = pd.read_csv(r'2019_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2019_gcountry.csv',index=False)

# gname_country_filter= df1.loc[(df1['iyear'])==2020]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# # countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# #countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2020_gcountry.csv')
# df1 = pd.read_csv(r'2020_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2020_gcountry.csv',index=False)

# gname_country_filter= df2.loc[(df2['iyear'])==2021]
# gname_country_filter=gname_country_filter[['iyear','country_txt','gname']]
# countryspecific_1=gname_country_filter.loc[(gname_country_filter['gname']=='Taliban')].groupby('country_txt').value_counts().to_frame()
# countryspecific_2=gname_country_filter.loc[(gname_country_filter['gname']=='Unknown')].groupby('country_txt').value_counts().to_frame()
# countryspecific_3=gname_country_filter.loc[(gname_country_filter['gname']=='Maoists')].groupby('country_txt').value_counts().to_frame()
# #countryspecific_4=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Qaida in the Arabian Peninsula (AQAP)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_5=gname_country_filter.loc[(gname_country_filter['gname']=='Al-Shabaab')].groupby('country_txt').value_counts().to_frame()
# countryspecific_6=gname_country_filter.loc[(gname_country_filter['gname']=='Boko Haram')].groupby('country_txt').value_counts().to_frame()
# countryspecific_7=gname_country_filter.loc[(gname_country_filter['gname']=='Islamic State of Iraq and the Levant (ISIL)')].groupby('country_txt').value_counts().to_frame()
# countryspecific_8=gname_country_filter.loc[(gname_country_filter['gname']=='Houthi extremists (Ansar Allah)')].groupby('country_txt').value_counts().to_frame()

# c_1_2=[countryspecific_1,countryspecific_2,countryspecific_3,countryspecific_5,countryspecific_6,countryspecific_7,countryspecific_8]
# final_result=pd.concat(c_1_2).to_csv('2021_gcountry.csv')
# df1 = pd.read_csv(r'2021_gcountry.csv')
# filtered_df = df1.loc[df1["country_txt"].isin(["Iraq", "Afghanistan","Pakistan","India","Yemen","Nigeria","Philippines","Somalia","Syria","Thailand"])]
# filtered_df.to_csv('2021_gcountry.csv',index=False)


df1 = pd.read_csv(r'2021_gcountry.csv')
df1= df1[['gname','country_txt','count']]
df1.replace({
    'gname': {
        'Taliban':   '{"source": 11,',
         'Unknown':  '{"source":12,',
         'Maoists':  '{"source":13,',
         'Al-Qaida in the Arabian Peninsula (AQAP)': '{"source":16,',
         'Al-Shabaab':'{"source":15,',
         'Boko Haram':'{"source":14,',
         'Islamic State of Iraq and the Levant (ISIL)':'{"source":17,',
         'Houthi extremists (Ansar Allah)': '{"source":18,'   
    },
    'country_txt':{
        'Afghanistan':'"target":20,',
        'Pakistan':'"target":21,',
        'India':'"target":22,',
        'Iraq':'"target":19,',
        'Nigeria':'"target":24,',
        'Philippines': '"target":25,',
        'Yemen':'"target":23,',
        'Somalia':'"target":26,',
        'Thailand':'"target":28,',
        'Syria':'"target":27,'
    }
},inplace=True)
df1['count'] = '"value":' + df1['count'].astype(str) + '},'
print(df1)