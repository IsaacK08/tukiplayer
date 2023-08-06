let playing = true;
let random = false;
const playButton = document.querySelector(".player-play");
const nextButton = document.querySelector(".player-next");
const prevButton = document.querySelector(".player-prev");
const thumbnail = document.querySelector(".player-image");
const song = document.querySelector("#song");
const songList = document.querySelectorAll(".song");
const songArtist = document.querySelector(".player-author");
const songTitle = document.querySelector(".player-title");
const progressBar = document.querySelector("#progress-bar");

let songIndex = 0;
let songs = [
  "./files/Fiesta en el desierto.mp3",
  "./files/Danzando.mp3",
  "./files/Santo es el que vive.mp3",
  "./files/Espíritu de Dios.mp3",
  
];
let thumbnails = [
  "img/party.jpg",
  "img/danzando.jpg",
  "img/santo.jpg",
  "img/god spirit.jpg",
];
let songArtists = ["Montesanto", "Gateway Worship", "Montesanto", "Majo y Dan", "Averly Morillo", "Barak", "Un Corazón", "Elevation Worship"];
let songTitles = ["Fiesta en el desierto", "Danzando", "Santo es el que vive", "Espíritu de Dios", "Santo Espíritu", "Fuego y Poder", "X Siempre", "Lo harás otra vez"];
function handleClickEachSong(e) {
  const index = parseInt(e.target.dataset.index);
  nextSong(index);
}
function playPause() {
  if (playing) {
    const song = document.querySelector("#song");
    song.play();
    thumbnail.classList.add("is-playing");
    playButton.classList.add("fa-pause");

    playing = false;
  } else {
    thumbnail.classList.remove("is-playing");
    playButton.classList.remove("fa-pause");
    song.pause();
    playing = true;
  }
}

function nextSong(index = -1) {
  if (index >= 0) {
    songIndex = index;
  } else {
    songIndex++;
  }
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];

  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 1;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}

function updateProgressValue() {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  document.querySelector(".player-remaining").innerHTML = formatTime(
    Math.floor(song.currentTime)
  );
  if (document.querySelector(".player-duration").innerHTML === "NaN:NaN") {
    document.querySelector(".player-duration").innerHTML = "0:00";
  } else {
    document.querySelector(".player-duration").innerHTML = formatTime(
      Math.floor(song.duration)
    );
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
setInterval(updateProgressValue, 500);
function changeProgressBar() {
  song.currentTime = progressBar.value;
}
progressBar.addEventListener("change", changeProgressBar);
playButton.addEventListener("click", playPause);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);
song.addEventListener("ended", function () {
  nextSong();
});

songList.forEach((el) => el.addEventListener("click", handleClickEachSong));


const searchInput = document.querySelector("#search-input");
const songElements = document.querySelectorAll(".song");
const searchSuggestions = document.querySelector("#search-suggestions");
const playerPopup = document.querySelector("#player-popup");
const blurredBackground = document.querySelector("#blurred-background");
const menuToggle = document.querySelector("#menu-toggle");
const sidebar = document.querySelector(".sidebar");
const billboardItems = document.querySelectorAll(".billboard-item img");

let currentSongIndex = -1;

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const suggestions = generateSearchSuggestions(searchTerm);

  displaySearchSuggestions(suggestions);

  songElements.forEach((songElement) => {
    const songTitle = songElement.querySelector(".song-title").textContent.toLowerCase();
    const songArtist = songElement.querySelector(".song-album").textContent.toLowerCase();

    if (songTitle.includes(searchTerm) || songArtist.includes(searchTerm)) {
      songElement.style.display = "flex";
    } else {
      songElement.style.display = "none";
    }
  });
}



function generateSearchSuggestions(searchTerm) {
  const uniqueSuggestions = new Set();

  songElements.forEach((songElement) => {
    const songTitle = songElement.querySelector(".song-title").textContent;
    const songArtist = songElement.querySelector(".song-album").textContent;

    if (songTitle.toLowerCase().includes(searchTerm)) {
      uniqueSuggestions.add(songTitle);
    }

    if (songArtist.toLowerCase().includes(searchTerm)) {
      uniqueSuggestions.add(songArtist);
    }
  });

  return Array.from(uniqueSuggestions);
}

function displaySearchSuggestions(suggestions) {
  searchSuggestions.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.classList.add("search-suggestion");
    suggestionElement.textContent = suggestion;

    suggestionElement.addEventListener("click", function () {
      searchInput.value = suggestion;
      searchSuggestions.innerHTML = "";
      handleSearch();
      playSelectedSong(suggestion);
      showPlayerPopupAndPlay(suggestion);
    });

    searchSuggestions.appendChild(suggestionElement);
  });
}

function playSelectedSong(songTitle) {
  songElements.forEach((songElement, index) => {
    const title = songElement.querySelector(".song-title").textContent;
    if (title === songTitle) {
      currentSongIndex = index;
      playSong(currentSongIndex);
    }
  });
}

function playSong(index) {
  const audioPlayer = document.querySelector("#song");
  const thumbnail = document.querySelector(".player-image");

  const songs = ["./files/Fiesta en el desierto.mp3", "./files/Danzando.mp3", "./files/Santo es el que vive.mp3", "./files/Espíritu de Dios.mp3", "./files/Santo Espíritu.mp3", "./files/Fuego y Poder.mp3", "./files/X Siempre.mp3", "./files/Lo harás otra vez.mp3", "./files/La bendición.mp3"];
  const thumbnails = ["img/party.jpg", "img/danzando.jpg", "img/santo.jpg", "img/god spirit.jpg", "./img/holy spirit.jpg", "./img/fuego y poder.jpg", "./img/x siempre.jpg", "./img/do it again.jpg", "./img/La bendición.jpg"];
  const songArtists = ["Montesanto", "Gateway Worship", "Montesanto", "Majo y Dan", "Averly Morillo", "Barak", "Un Corazón", "Elevation Worship", "Latinoamérica"];
  const songTitles = ["Fiesta en el desierto", "Danzando", "Santo es el que vive", "Espíritu de Dios", "Santo Espíritu", "Fuego & Poder", "X Siempre", "Lo harás otra vez", "La Bendición"];

  audioPlayer.src = songs[index];
  thumbnail.src = thumbnails[index];

  const songArtist = document.querySelector(".player-author");
  const songTitle = document.querySelector(".player-title");
  const playButton = document.querySelector(".player-play");

  songArtist.innerHTML = songArtists[index];
  songTitle.innerHTML = songTitles[index];

  playButton.click(); // Activa manualmente el evento 'click' en el botón de reproducción
  thumbnail.classList.add("is-playing"); // Agrega la clase 'is-playing' a la imagen

  audioPlayer.play();
}

function showPlayerPopupAndPlay(songTitle) {
  playerPopup.style.display = "flex";
  blurredBackground.style.display = "block";
  playSelectedSong(songTitle);
  const playButton = document.querySelector(".player-play");
  playButton.click();
  setTimeout(hidePlayerPopup, 3000);
}

function hidePlayerPopup() {
  playerPopup.style.display = "none";
  blurredBackground.style.display = "none";
  playSong(currentSongIndex);
}

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


/*REPRODUCIR CANCIÓN AL DAR EN LAS IMÁGENES*/

billboardItems.forEach((image) => {
  image.addEventListener("click", handleBillboardItemClick);
});

function handleBillboardItemClick(event) {
  const clickedImage = event.target;
  const songIndex = clickedImage.getAttribute("data-song-index");
  playSong(songIndex);
}



