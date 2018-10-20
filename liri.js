require('dotenv').config()

// const spotify = require('node-spotify-api')
// const request = require('request')
// const moment = require('moment')

let keys = require('./keys.js')
const SPOTIFY = require('node-spotify-api');

let spotify = new SPOTIFY(keys.spotify);

let getArtistNames = (artist) => {
    return artist.name
}
spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
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
    // console.log(data.tracks.items[0]);
});