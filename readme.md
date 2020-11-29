# ex1

- search your movie
- print the cards result
- add more info button
- clicking on the more info button will return additional info according the API
  using IMDBid
  http://www.omdbapi.com/?plot=full&apikey=ce8afb69&i=tt0499549

exmple of result

```javascript

{"Title":"Avatar","Year":"2009","Rated":"PG-13","Released":"18 Dec 2009","Runtime":"162 min","Genre":"Action, Adventure, Fantasy, Sci-Fi","Director":"James Cameron","Writer":"James Cameron","Actors":"Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang","Plot":"When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora. There he learns of greedy corporate figurehead Parker Selfridge's intentions of driving off the native humanoid \"Na'vi\" in order to mine for the precious material scattered throughout their rich woodland. In exchange for the spinal surgery that will fix his legs, Jake gathers intel for the cooperating military unit spearheaded by gung-ho Colonel Quaritch, while simultaneously attempting to infiltrate the Na'vi people with the use of an \"avatar\" identity. While Jake begins to bond with the native tribe and quickly falls in love with the beautiful alien Neytiri, the restless Colonel moves forward with his ruthless extermination tactics, forcing the soldier to take a stand - and fight back in an epic battle for the fate of Pandora.","Language":"English, Spanish","Country":"USA","Awards":"Won 3 Oscars. Another 86 wins & 130 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Rotten Tomatoes","Value":"82%"},{"Source":"Metacritic","Value":"83/100"}],"Metascore":"83","imdbRating":"7.8","imdbVotes":"1,107,342","imdbID":"tt0499549","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"Dune, Lightstorm Entertainment, Ingenious Film Partners","Website":"N/A","Response":"True"}


```

- present the Actors
- run another query to Countries API vased on the following query:
  https://restcountries.eu/rest/v2/name/usa
  use the country given from IMDB api:

```json
Country":"USA",
```
