//Configure dotenv package
require('dotenv').config()

//Import keys.js file
let keys = require('./keys.js')

//Constants for require imports
const fs = require('fs')
const request = require('request')
const moment = require('moment')
const SPOTIFY = require('node-spotify-api');

//Create new SPOTIFY object with keys
let spotify = new SPOTIFY(keys.spotify);

//Search Spotify for songs
function spotifySearch(songName) {
    let getArtistNames = (artist) => {
        return artist.name
    }
    spotify.search({ type: 'track', query: songName }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        let songs = data.tracks.items
    
        console.log(songs)
        for (let i = 0; i < songs.length; i++) {
            console.log(`=================================================`)
            console.log(i)
            console.log(`Artist(s): ${songs[i].artists.map(getArtistNames)}`)
            console.log(`Song Title: ${songs[i].name}`)
            console.log(`Preview Song: ${songs[i].preview_url}`)
            console.log(`Album: ${songs[i].album.name}`)
            console.log(`=================================================`)
        }
    });
}

//Search Bands In Town for concerts
function bandsInTownSearch(artistName) {
    request(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsintown.id}`, function (error, response, body) {
        // Print the error if one occurred
        // console.log('error:', error)
        // Print the response status code if a response was received
        // console.log('statusCode:', response && response.statusCode)
        let concerts = JSON.parse(body)
        for (let i = 0; i < concerts.length; i++) {
            console.log(`=================================================`)
            console.log(i)
            console.log(`Venue: ${concerts[i].venue.name}`)
            console.log(`Location: ${concerts[i].venue.city}, ${concerts[i].venue.region}`)
            let date = moment(concerts[i].datetime, moment.ISO_8601)
            console.log(`Date: ${moment(date).format('MM/DD/YYYY')}`)
            console.log(`=================================================`)
        }
    });
}

//Search OMDB for movies
function omdbSearch(movieTitle) {
    request(`http://www.omdbapi.com/?t=${movieTitle}&apikey=9641550c`, function (error, response, body) {
        // Print the error if one occurred
        // console.log('error:', error)
        // Print the response status code if a response was received
        // console.log('statusCode:', response && response.statusCode)
        let movie = JSON.parse(body)
        console.log(`=================================================`)
        console.log(`Title: ${movie.Title}`)
        console.log(`Release Year: ${movie.Year}`)
        console.log(`IMDB Rating: ${movie.Ratings[0].Value}`)
        console.log(`Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`)
        console.log(`Produced in: ${movie.Country}`)
        console.log(`Language: ${movie.Language}`)
        console.log(`Plot: ${movie.Plot}`)
        console.log(`Actors: ${movie.Actors}`)
        console.log(`=================================================`)
    });
}

//Perform task stored in random.txt
function doWhatItSays() {
    console.log(fs.readFile('./random.txt', 'utf-8', (error, data) => {
        if (error) {
            throw error
        }
        let randomSearch = data.split(',')
        if (randomSearch.length > 1) {
            option(randomSearch[0], randomSearch[1])
        } else {
            option(randomSearch[0])
        }
    }))
}

//Checks and runs search user input
function option(command, itemData) {
    switch (command) {
        case 'spotify-this-song':
            spotifySearch(itemData)
            break
        case 'concert-this':
            bandsInTownSearch(itemData)
            break
        case 'movie-this':
            omdbSearch(itemData)
            break
        case 'do-what-it-says':
            doWhatItSays()
            break
        default:
            console.log('Please enter a LIRI function')
            break
    }
}

//
function runProgram(command, itemData) {
    option(command, itemData)
}

//
runProgram(process.argv[2], process.argv.slice(3, process.argv.length).toString().replace(",", "+"))