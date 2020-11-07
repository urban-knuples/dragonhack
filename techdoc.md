# Tech doc
Just so we don't implement two right legs and no body and try to make it walk.


## Podatki ki se bodo uporabljali:
[ County, State, VotesCounty, VotesState, VotesCandidate {Biden, Trump, Jo, ...}, Timestamp ]
[ Age, date-of-death, gender, Race, Type Of shooting, State, County ]

## PREPROCESSING
- Potrebno bo izbrati samo trenutne vote counte (ker sem videl da uporablja data iz razlicnih timestampov)
- Zbirsati nepotrebne podatke
- Mapirati da ya vsako osebo vidimo v katerem countyju
- Ustvariti seznam, kjer bo vsako mesto shranjeno v svoj pripadajoci county (need city to county mapper!)
- Gender and race

## API call
- Moznost filtirati glede na leto shootingov - dolocanje rangov
- Dobiti 

## Prediciton
- Pogledati 
- Uporaba statisticne obdelave, s katero lahko naredimo korelacije med Votingom in shootingi