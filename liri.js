//Configure dotenv package
require('dotenv').config()

//Import keys.js file
let keys = require('./keys.js')

//Constants for require imports
const REQUEST = require('request')
const MOMENT = require('moment')
const SPOTIFY = require('node-spotify-api');

//Create new SPOTIFY object with keys
let spotify = new SPOTIFY(keys.spotify);

//Search spotify 
function spotifySearch(songName) {
    let getArtistNames = (artist) => {
        return artist.name
    }
    spotify.search({ type: 'track', query: songName }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        let songs = data.tracks.items
        for (let i = 0; i < songs.length; i++) {
            console.log(i)
            console.log(`Artist(s): ${songs[i].artists.map(getArtistNames)}`)
            console.log(`Song Title: ${songs[i].name}`)
            console.log(`Preview Song: ${songs[i].preview_url}`)
            console.log(`Album: ${songs[i].album.name}`)
            console.log(`=================================================`)
        }
    });
}

function bandsInTownSearch(artistName) {
    REQUEST(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsintown.id}`, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let concert = JSON.parse(body)

        console.log(`Venue: ${JSON.stringify(concert[0].venue.name)}`)
        console.log(`Location: ${JSON.stringify(concert[0].venue.city)}, ${JSON.stringify(concert[0].venue.region)}`)
        console.log(`Date: ${JSON.stringify(concert[0].datetime)}`)
    });
}

//Checks and runs search user input
function option(command, data) {
    switch (command) {
        case 'spotify-this-song':
            spotifySearch(data)
            break
        case 'concert-this':
            bandsInTownSearch(data)
            break
        default:
            console.log('Please enter a LIRI function')
            break
    }
}

//
function runProgram(command, data) {
    option(command, data)
}

//
runProgram(process.argv[2], process.argv.slice(3, process.argv.length).toString().replace(",", "+"))