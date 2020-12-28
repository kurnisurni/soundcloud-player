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
        SoundcloudAPI.renderTracks(tracks);
    });
}

SoundcloudAPI.getTrack("Towa Tei");

/* Display the cards */
SoundcloudAPI.renderTracks = function(tracks) {

    tracks.forEach(function(track) {
        //card
        var card = document.createElement('div');
        card.classList.add('card');

        //image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';

        imageDiv.appendChild(image_img);

        //content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

        //button
        var button = document.createElement('div');
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';

        //append child
        content.appendChild(header);

        button.appendChild(icon);
        button.appendChild(buttonText);

        button.addEventListener('click', function() {
            SoundcloudAPI.getEmbed(track.permalink_url); //connect this button to embed below, and pass on url permalink in the prop
        })

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        var searchResults = document.querySelector(".js-search-results");
        searchResults.appendChild(card);
    });
}

//wrap the add playlist button to a function so it can connect to the embed music
SoundcloudAPI.getEmbed = function(trackURL) {
    console.log("Click in get embed");

    /* Add to playlist and play */
    SC.oEmbed(trackURL, {
        auto_play: true
    }).then(function(embed) {
        console.log('oEmbed response: ', embed);

        var sidePlayer = document.querySelector('.js-playlist');
        sidePlayer.innerHTML = embed.html;
    });
}