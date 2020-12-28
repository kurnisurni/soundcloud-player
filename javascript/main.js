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

    //card
    var card = document.createElement('div');
    card.classList.add('card');

    //image
    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = "http://www.placekitten.com/290/290";

    imageDiv.appendChild(image_img);

    //content
    var content = document.createElement('div');
    content.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<a href="#" target="_blank">Science vs. Romance</a>';

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

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    var searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
}

SoundcloudAPI.renderTracks();
/* Display the cards */


/* Add to playlist and play */