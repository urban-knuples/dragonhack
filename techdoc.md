# Tech doc
Just so we don't implement two right legs and no body and try to make it walk.


## Podatki ki se bodo uporabljali:
[ County, State, VotesCounty, VotesState, VotesCandidate {Biden, Trump, Jo, ...}, Timestamp ]
[ Age, gender, Race, Type Of shooting, State, County ]

## PREPROCESSING
- Potrebno bo izbrati samo trenutne vote counte (ker sem videl da uporablja data iz razlicnih timestampov)
- Zbirsati nepotrebne podatke
- Mapirati da ya vsako osebo vidimo v katerem countyju

## API call

## Prediciton
- Uporaba statisticne obdelave, s katero lahko naredimo korelacije med Votingom in shootingi