import pandas as pd
import csv

def preprocess(datafile):
    df = pd.read_csv(datafile)

   
    with open('static/Proccesed_county_votes.csv', 'w', encoding='utf-8', newline='') as csvfile:
            filewriter = csv.writer(csvfile, delimiter=',',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
            filewriter.writerow(['State', 'County', 'Votes_Left', 'Votes_Right'])

                
            Votes_left = 0
            Votes_right = 0
            
            for i in range(0,df.shape[0]-1):
                thisline = df.iloc[i]
                nextline = df.iloc[i+1]

                if(thisline['party'] == "DEM"):
                    Votes_right = thisline['votes']
                elif (thisline['party'] == "REP"):
                    Votes_left = thisline['votes']



                if(thisline['county']!=nextline['county']):
                    filewriter.writerow([thisline['state'], thisline['county'], Votes_left, Votes_right])
                    #print(thisline['state'], thisline['county'], Votes_left, Votes_right)
                    Votes_left = 0
                    Votes_right = 0





       








#preprocess("CSV_data/fatal_police_shootings_detailed.xlsx")