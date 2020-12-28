/* search the music*/
let UI = {};


UI.handleEnterPress = function() {
    document.querySelector(".js-search").addEventListener('keypress', function(e) {
        if (e.which === 13) {
            var inputValue = e.target.value;
            // onValueRead( inputValue );
            //console.log(inputValue);
            SoundCloudAPI.getTrack(inputValue);

        }
    });
}

UI.handleSubmitClick = function() {
    document.querySelector(".js-submit").addEventListener('click', function(e) {
        var inputValue = document.querySelector(".js-search").value;
        //onValueRead( inputValue );
        //console.log(inputValue);
        SoundCloudAPI.getTrack(inputValue);
    });
}

UI.handleEnterPress();
UI.handleSubmitClick();

/* Query Soundcloud API (step 1)*/
//make an object
var SoundCloudAPI = {};

//encapsulate function
SoundCloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundCloudAPI.init();

//Search - https://developers.soundcloud.com/docs/api/guide#search
SoundCloudAPI.getTrack = function(inputValue) {

    // find all sounds
    return SC.get('/tracks', {
        q: inputValue
    }).then(function(tracks) {
        console.log(tracks);

        //MOVING this here (away from renderTrack) only makes sense once you put it there to build
        //and then find that the innerHTML text only should get removed once 
        var searchResult = document.querySelector('.js-search-results');
        searchResult.innerHTML = "";

        SoundCloudAPI.renderTrack(tracks, searchResult);
    });
}

//SoundcloudAPI.getTrack("Towa Tei");

/* Display the cards */
SoundCloudAPI.renderTrack = function(tracks, searchResult) {

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

        content.appendChild(header);

        searchResult.appendChild(content);

        //button
        var button = document.createElement('div');
        button.setAttribute('data-id', track.id);
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';

        button.appendChild(icon);
        button.appendChild(buttonText);

        button.addEventListener('click', function() {
            SoundCloudAPI.getEmbed(track.uri); //connect this button to embed below, and pass on url permalink in the prop
        });

        //card
        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        //var searchResults = document.querySelector(".js-search-results");
        searchResult.appendChild(card);
    });
}

//wrap the add playlist button to a function so it can connect to the embed music
//embedding
//https://developers.soundcloud.com/docs/api/sdks#embedding
SoundCloudAPI.getEmbed = function(trackPermalink) {
    // return SC.oEmbed( trackPermalink, {
    // 	maxheight: 200,
    // 	show_comments: false
    // }).then(function(oEmbed){
    // 	console.log(oEmbed)
    // });

    /* Add to playlist and play */
    SC.oEmbed(trackPermalink, {
        auto_play: true
    }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);

        var sidePlayer = document.querySelector('.col-left');

        // var playListArray = [];
        // playListArray.push(oEmbed.html)

        var box = document.createElement('div');
        box.innerHTML = oEmbed.html;

        sidePlayer.insertBefore(box, sidePlayer.firstChild);

        //set local storage so we can call it after refresh 
        localStorage.setItem("key", sidePlayer.innerHTML);

        // grab the widget object
        var SCWidget = SoundCloudAPI.getWidget(embed.childNodes[0]);

        // bind the finish event to init
        SCWidget.bind('finish', function() {
            alert("FINISHED");
            // Playlist.next();

            // var nextEmbed = sidebar.childNodes[ Playlist.currentTrack ];
            // var nextWidget = SoundCloudAPI.getWidget( nextEmbed.childNodes[ 0 ] );

            // nextWidget.play();
        });
        SCWidget.bind('play', function() {
            var widgetIndex = Array.from(sidePlayer.childNodes).indexOf(embed);
            Playlist.currentTrack = widgetIndex;
        });
    });
}

SoundCloudAPI.getWidget = function(embedElement) {
    return SC.Widget(embedElement);
}

//populate the track list from local storage
var sidePlayer = document.querySelector('.col-left');
sidePlayer.innerHTML = localStorage.getItem("key");