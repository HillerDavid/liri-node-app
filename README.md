# LIRI node app
-----------------------------

LIRI stands for Language Interpretation and Recognition Interface

LIRI allows the user to search Bands in Town for bands' upcoming concerts, song information from Spotify, and movie information from OMDB.

## Set up LIRI
-----------------------------
**_Prerequisites_**
**In order to use LIRI, ensure you have nodeJS installed.**
**Dependent node packages are listed in the package.json file.**

- Download files:
    - Download liri-node-app from GitHub.
    

- Install node packages:
    - Open a terminal.
    - Navigate to liri-node-app folder containing **liri.js**.
    - Enter the command ```npm i```.

## How to use LIRI commands
-----------------------------
**All commands should be entered looking in liri-node-app folder in a terminal.**
![Starting Point](https://raw.github.com/HillerDavid/liri-node-app/tree/master/Screenshots/start.png)

### Search for Concerts

Displays venue names, locations, and date of concert for artists searched:

- ```node liri.js concert-this The Decemberists```

### Search for Songs

Displays artist(s)' name, song title, link to preview the song, and album for song entered:

- ```node liri.js spotify-this-song Dream On```

### Search for Movies

Displays movie title, release year, review scores, production location, language, plot, and actors for movie searched:

- ```node liri.js movie-this Requiem for a Dream```

### Get Random Search

Displays results from command stored in random.txt file.
*Defaults to spotify search for song Liberi Fatali*.

- ```node liri.js do-what-it-says```