require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment')
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);


function userInput(){
    var name = "";
    var action = ""; 
    for (var i = 2; i < process.argv.length; i++) {
      if (i > 2 && i < process.argv.length) {
        name = (name + " " + process.argv[i]).trim();
      }
      else {
        action = process.argv[i];
      }
    }
    runCommand(action, name);
  }
  
  // Movie Section
  
  function getMovies(name){
  
    if (name == ""){
      name = "mr.nobody";
    }
  
  // Then run a request to the OMDB API with the movie specified
      var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
      
      axios.get(queryUrl).then(
        function(response) {
          console.log("Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("Rated: " + response.data.Rated);
          console.log("IMDB Rating: " + response.data.imdbRating);
          if (response.data.Ratings[1]){
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value)
          }
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          console.log("Box Office: " + response.data.BoxOffice);
        }
      );
  }
  

  
  // Band Section 
  
  function getBands(artistName){
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
  
  axios.get(queryUrl).then(
    function(response) {
      console.log("Title: " + response.data.Band);
     
    }
  );
  }
  
  // Spotify Section 
  
  function getSongs(name){
  
    if (!name){
      name = "redbone";
    }
  
    spotify.search(
      {type: "track",
      query: name
      },
      function(error, response){
        if (error){
          console.log(error);
          return;
        }
        var songs = response.tracks.items;
        for (var i = 0; i < songs.length; i++){
          console.log("Song Name: " + songs[i].name);
          var artistArray = songs[i].artists;
          var artist = [];
          for (var j = 0; j < artistArray.length; j++){
            artist.push(artistArray[j].name);
          }
          console.log("artist: " + artist.join(", "));
          console.log("preview: " + songs[i].preview_url);
          console.log("Album Name: " + songs[i].album.name);
  
          console.log("-----------------");
        }
      }
    )
  }
  
  // get Random section
  
  function getRandom(){
    console.log("inside Random");
  }
  
  function runCommand(action, name){
    switch (action){
      case "concert-this":
        getBands(name);
        break;
      case "spotify-this-song":
        getSongs(name);
        break;
      case "movie-this":
        getMovies(name);
        break;
      case "do-what-it-says":
        getRandom();
        break;
      default:
        console.log("please choose valid command");
    }
  }
  userInput();