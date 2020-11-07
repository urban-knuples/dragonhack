import pandas as pd

def filterOnlyCurrentVotes(datafile):
    
    data = pd.read_csv(datafile)


filterOnlyCurrentVotes("CSV data/")