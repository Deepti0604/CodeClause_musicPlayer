// play back buttons script
const play = document.querySelector(".play"),
previous = document.querySelector(".prev"),
next = document.querySelector(".next"),

// Song description script
songImage = document.querySelector(".song_image"),
songName = document.querySelector(".name"),
songArtist = document.querySelector(".artist"),

// song slider & song duration script 
currTime = document.querySelector(".current_time"),
totalDuration = document.querySelector(".duration"),
slider = document.querySelector(".duration_slider"),

// Volume control script
currVolume = document.querySelector("#volume"),
volumeIcon = document.querySelector("#volume-icon"),
showVolume = document.querySelector("#show_volume"),

// auto play button script
autoPlay = document.querySelector(".play_all"),

// hamburger playlist closeicon script
hamBurger = document.querySelector(".fa-bars"),
closeIcon = document.querySelector(".fa-xmark"),

// song playlist scipt
songPlaylist = document.querySelector(".song_playlist"),
playlistDiv = document.querySelector(".playlist_songs"),
playList = document.querySelector(".playlist");

// music playlist
let musicList = [
    {
        name: "Chaleya",
        path: "./music/chaleya.mp3",
        img: "./images/chleya.jpg",
        singer: "Arijit Singh, Shilpa Rao",
    },
    {
        name: "Enni Soni",
        path: "./music/ennisoni.mp3",
        img: "./images/ennisoni.jpg",
        singer: "Tulsi Kumar, Guru Randhawa",
    },
    {
        name: "Moonrise",
        path: "./music/moonrise.mp3",
        img: "./images/moonrise.jpg",
        singer: "Guru Randhawa, Sanjoy",
    },
    {
        name: "Nadaaniyan",
        path: "./music/nadaniya.mp3",
        img: "./images/nadaniya.jpg",
        singer: "Akshath",
    },
    {
        name: "Naina",
        path: "./music/naina.mp3",
        img: "./images/naina.jpg",
        singer: "Diljit Dosanjh, Raj Ranjodh, Badshah",
    },
    {
        name: "Soulmate",
        path: "./music/soulmate.mp3",
        img: "./images/soulmate.jpg",
        singer: "Badshah, Arijit Singh",
    },
    {
        name: "Ve Haaniyaan",
        path: "./music/ve haniya.mp3",
        img: "./images/ve haniya.jpg",
        singer: "Danny, Avvy Sra and Saga",
    }
]


let timer;
let autoplay = 0;
let indexTrack = 0;
let songPlaying = false;
let soundTrack = document.createElement("audio");

// Event listener script
play.addEventListener("click", playPause);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
autoPlay.addEventListener("click", playAllSongs);
volumeIcon.addEventListener("click", muteTrack);
currVolume.addEventListener("change", changeVolume);
slider.addEventListener("change", changeDuration);
soundTrack.addEventListener("timeupdate", songTimeUpdate);
hamBurger.addEventListener("click", showPlaylist);
closeIcon.addEventListener("click", closePlaylist);

// Load the music tracks
function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();
    soundTrack.src = musicList[indexTrack].path;
    songName.innerHTML = musicList[indexTrack].name;
    songArtist.innerHTML = musicList[indexTrack].singer;
    songImage.src = musicList[indexTrack].img;
    soundTrack.load();
    timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

// Play the music tracks
function playTrack() {
    soundTrack.play();
    songPlaying = true;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Pause the music tracks
function pauseTrack() {
    soundTrack.pause();
    songPlaying = false;
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// Pause & play tha music track
function playPause() {
    if (songPlaying == false) {
        playTrack();
    } else {
        pauseTrack();
    }
}

// Play next music track 
function nextSong() {
    if (indexTrack < musicList.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playTrack();
    } else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playTrack();
    }
}

// Play next music track 
function previousSong() {
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playTrack();
    } else {
        indexTrack = musicList.length - 1;
        loadTrack(indexTrack);
        playTrack();
    }
}

// Auto play all the songs in queue
function playAllSongs() {
    if (autoplay == 0) {
        autoplay = 1;
        autoPlay.style.color = "rgb(1,61,71)";
        autoPlay.style.background = "rgb(210, 230, 230)"; 
    } else {
        autoplay = 0;
        autoPlay.style.background = "rgb(1,61,71)";
        autoPlay.style.color = "rgb(210, 230, 230)";
    }
}

// Mute the sound track
function muteTrack() {
    soundTrack.volume = 0;
    showVolume.innerHTML = 0;
    currVolume.value = 0;
    volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
}

// Change the volume of sound track
function changeVolume() {
    showVolume.value = currVolume.value;
    showVolume.innerHTML = showVolume.value + "%";
    soundTrack.volume = currVolume.value / 100;
    if (currVolume.value < 50) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}


// Reset the slider
function resetSlider() {
    slider.value = 0;
}

// Update the slider
function updateSlider() {
    let position = 0;
    if (!isNaN(soundTrack.duration)) {
        position = soundTrack.currentTime * (100 / soundTrack.duration);
        slider.value = position;
    }
    if (soundTrack.ended) {
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (autoplay == 1 && indexTrack < musicList.length -1) {
            indexTrack++;
            loadTrack(indexTrack);
            playTrack();
        } else if (autoplay == 1 && indexTrack == musicList.length -1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playTrack();
        }
    }
}

// Update the song time
function songTimeUpdate() {
    if (soundTrack.duration) {
        let curmins = Math.floor(soundTrack.currentTime/60);
        let cursecs = Math.floor(soundTrack.currentTime - curmins*60);
        let durmins = Math.floor(soundTrack.duration/60);
        let dursecs = Math.floor(soundTrack.duration - durmins*60);
        if (dursecs < 10) {
            dursecs = "0" + dursecs;
        }
        if (curmins < 10) {
            curmins = "0" + curmins;
        }
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }
        if (durmins < 10) {
            durmins = "0" + durmins;
        }
        currTime.innerHTML = curmins + ":" + cursecs;
        totalDuration.innerHTML = durmins + ":" + dursecs;
    } else {
        currTime.innerHTML = "00" + ":" + "00";
        totalDuration.innerHTML = "00" + ":" + "00";
    }
}

// Change the duration of sound track
function changeDuration() {
    let currSliderPosition = soundTrack.duration * (slider.value/100);
    soundTrack.currentTime = currSliderPosition;
}

// Show the playlist
function showPlaylist() {
    songPlaylist.style.transform = "translateX(0)";
}

// Close the playlist
function closePlaylist() {
    songPlaylist.style.transform = "translateX(-100%)";
}

// List of song name in playlist
let songCount = 1;
function showTracks() {
    for (let i = 0; i< musicList.length; i++) {
         let div = document.createElement("div");
         div.classList.add("playlist");
         div.innerHTML = `
            <span class="song-number">${songCount++}</span>
            <p class="song-name">${musicList[i].name}</p> ` ;
         playlistDiv.appendChild(div);
    }
    playSongFromPlaylist();
}
showTracks();

// Play the songs from your playlist
function playSongFromPlaylist() {
    playlistDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("song-name")) {
            const indexVal = musicList.findIndex((item,index) => {
                if (item.name === e.target.innerHTML) {
                    return true;
                }
            });
            loadTrack(indexVal);
            playTrack();
            closePlaylist();
        }
    });
}