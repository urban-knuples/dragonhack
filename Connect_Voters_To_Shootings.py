#import sklearn as sk
import pandas as pd
import csv
import time
import datetime
import numpy as np

def process(dataVotes):

    


    dfVotes = pd.read_csv(dataVotes)
    dfVotes['total_shootings'] = dfVotes['State']
    dfVotes['total_shootings'] = 0
    dfVotes['shootings_normalized'] = dfVotes['total_shootings']

    npVotes = dfVotes.to_numpy()
    print(npVotes.shape)

    #state_postal = state_postal.applymap(lambda s:s.lower() if type(s) == str else s)


    max_shooting_rate = 0
    shootinsgByState = postalToState()
    shootinsgByState = shootinsgByState.groupby(['state'])
    for state,data_by_state in shootinsgByState:
        state = state.strip()
        print("State: "+state+".")
        #print(data_by_state['county'].count())
        #shootinsgByCounty = shootinsgByCounty.groupby(['county'])
        for county,data_by_county in data_by_state.groupby(['county']):
            county = county.strip()
            #print(county)
            shootingsByCounty = data_by_county['county'].count()
            #print(shootingsByCounty)
            #print(dfVotes['State'] == state & dfVotes['County'] == county)


            for line in npVotes:
                #print(line.shape)
                if line[0].lower().strip() == state.lower().strip() and (line[1].lower().strip() == county.lower().strip()   or line[1].lower().strip() == (county +" county").lower().strip()       ):
                    line[4] = shootingsByCounty
                    line[5]= int(line[4])/(int(line[3])+int(line[2]))
                    if(line[5]>max_shooting_rate):
                        max_shooting_rate=line[5]

            """
            val = dict()
            for i, row in dfVotes.iterrows():
                a = row["State"] # s tem dobis ven podatek tiste vrtice
                val[a] = None
            """

            """
            #df['total_shootings']=df['b'].apply(lambda x: x if x['state'] ==state  and x['county'] ==county  )
            dfVotes['total_shootings'] = dfVotes['total_shootings'].mask(((dfVotes['State'] == state) & dfVotes['County'] == county),  shootingsByCounty )
            ustrezni = dfVotes[(dfVotes['State'] == state)&(dfVotes['County'] == county)]

            if not ustrezni.empty:
                print(ustrezni)
            """

            """
            for vstate in dfVotes['State']:
                if vstate== state:
                    for vcounty in dfVotes['County']:
                        if vcounty == county:
                            #print(vstate+" == " +state + ", ", vcounty +" == "+county)
                                print(dfVotes[(dfVotes['State'] == state)&(dfVotes['County'] == county)])
            """
                            

                
    for line in npVotes:
         x= float(line[5])/max_shooting_rate
         line[5] = format(x, '.3f')




    #dfVotes.to_csv('CSV_data/Show_data.csv')
    with open('CSV_data/Ready_county_votes.csv', 'w',  encoding='utf-8',newline='') as csvfile:
        filewriter = csv.writer(csvfile, delimiter=',',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
        filewriter.writerow(['State', 'County', 'Votes_Left', 'Votes_Right','Total_shootings','Normalized_Shootings_rate'])
        for line in npVotes:
                #print(line)
                filewriter.writerow([line[0],line[1],line[2],line[3],line[4],line[5]])



def postalToState():

    shootings_file = "CSV_data/fatal_police_shootings_detailed.csv"
    pres_file = "CSV_data/president_county_candidate.csv"
    state_postal_file = "CSV_data/state_postal_code.csv"

    shootings = pd.read_csv(shootings_file)
    presidency = pd.read_csv(pres_file)
    state_postal = pd.read_csv(state_postal_file)

    # turn all strings in dataframe to lowercase
    presidency = presidency.applymap(lambda s:s.lower() if type(s) == str else s)
    state_postal = state_postal.applymap(lambda s:s.lower() if type(s) == str else s)
    shootings = shootings.applymap(lambda s:s.lower() if type(s) == str else s)

    state_postal_dic = {row["postal_code"]:row['state']  for i, row in state_postal.iterrows()}

    # replace every state postal to state
    shootings['state'] = shootings['state'].apply(lambda s: state_postal_dic.get(s, ""))

    shootings=shootings[shootings.county == shootings.county]

    return shootings


#df.insert(2, "Age", [21, 23, 24, 21], True) 





process("CSV_data/Proccesed_county_votes.csv")