// Configure dotenv package
require('dotenv').config()

// Import keys.js file
let keys = require('./keys.js')

// Constants for require imports
const fs = require('fs')
const request = require('request')
const moment = require('moment')
const SPOTIFY = require('node-spotify-api');

// Function to append to log
function writeLog(logData) {
    fs.appendFile('log.txt', logData, function (error) {
        if (error) throw error
    })
}


// Create new SPOTIFY object with keys
let spotify = new SPOTIFY(keys.spotify);

// Search Spotify for songs
function spotifySearch(songName = 'The Sign') {

    spotify.search({ type: 'track', query: songName }, function (error, data) {
        // Print the error if one occurred
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        let logData = ""
        let songs = data.tracks.items
        let getArtistNames = (artist) => {
            return artist.name
        }
        if (songs.length > 0) {
            for (let i = 0; i < songs.length; i++) {

                logData += `=================================================\r\n`
                logData += `${i}\r\n`
                logData += `Artist(s): ${songs[i].artists.map(getArtistNames)}\r\n`
                logData += `Song Title: ${songs[i].name}\r\n`
                logData += `Preview Song: ${songs[i].preview_url}\r\n`
                logData += `Album: ${songs[i].album.name}\r\n`
                logData += `=================================================\r\n`
            }
            console.log(logData)
            writeLog(logData)
        } else {
            choice('spotify-this-song', 'The+Sign')
        }
    });
}

// Search Bands In Town for concerts
function bandsInTownSearch(artistName) {
    request(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsintown.id}`, function (error, response, body) {
        // Print the error if one occurred
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // Print the response status code if a response was received
        // console.log('statusCode:', response && response.statusCode)
        let logData = ""
        let concerts = JSON.parse(body)
        for (let i = 0; i < concerts.length; i++) {
            logData += `=================================================\r\n`
            logData += `${i}\r\n`
            logData += `Venue: ${concerts[i].venue.name}\r\n`
            logData += `Location: ${concerts[i].venue.city}, ${concerts[i].venue.region}\r\n`
            let date = moment(concerts[i].datetime, moment.ISO_8601)
            logData += `Date: ${moment(date).format('MM/DD/YYYY')}\r\n`
            logData += `=================================================\r\n`
        }
        console.log(logData)
        writeLog(logData)
    });
}

// Search OMDB for movies
function omdbSearch(movieTitle = 'Mr. Nobody') {
    request(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${keys.omdb.id}`, function (error, response, body) {
        // Print the error if one occurred
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // Print the response status code if a response was received
        // console.log('statusCode:', response && response.statusCode)
        let logData = ""
        let movie = JSON.parse(body)
        logData += `=================================================\r\n`
        logData += `Title: ${movie.Title}\r\n`
        logData += `Release Year: ${movie.Year}\r\n`
        logData += `IMDB Rating: ${movie.Ratings[0].Value}\r\n`
        logData += `Rotten Tomatoes Rating: ${movie.Ratings[1].Value}\r\n`
        logData += `Produced in: ${movie.Country}\r\n`
        logData += `Language: ${movie.Language}\r\n`
        logData += `Plot: ${movie.Plot}\r\n`
        logData += `Actors: ${movie.Actors}\r\n`
        logData += `=================================================\r\n`
        console.log(logData)
        writeLog(logData)
    });
}

// Perform task stored in random.txt
function doWhatItSays() {
    console.log(fs.readFile('./random.txt', 'utf-8', (error, data) => {
        if (error) {
            throw error
        }
        let randomSearch = data.split(',')
        if (randomSearch.length > 1) {
            choice(randomSearch[0], randomSearch[1])
        } else {
            choice(randomSearch[0])
        }
    }))
}

// Checks and runs search user input
function choice(command, itemData) {
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

// If itemData contains empty string, set to undefined
function runProgram(command, itemData) {
    if (itemData === '') {
        itemData = undefined
    }
    choice(command, itemData)
}

// Takes user input for arguments
runProgram(process.argv[2], process.argv.slice(3, process.argv.length).toString().replace(",", "+"))