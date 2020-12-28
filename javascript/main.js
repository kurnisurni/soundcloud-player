/* search */


/* Query Soundcloud API (step 1)*/
//make an object
var SoundcloudAPI = {};

//encapsulate function
SoundcloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundcloudAPI.init();

SoundcloudAPI.getTrack = function(inputValue) {

    // find all sounds
    SC.get('/tracks', {
        q: inputValue
    }).then(function(tracks) {
        console.log(tracks);
    });
}

SoundcloudAPI.getTrack("Sepultura");

SoundcloudAPI.renderTracks = function() {
    var card = document.createElement('div');
    card.classList.add("card");
    var searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
}

SoundcloudAPI.renderTracks();
/* Display the cards */


/* Add to playlist and play */