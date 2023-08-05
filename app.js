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
let songArtists = ["Montesanto", "Gateway Worship", "Montesanto", "Majo y Dan"];
let songTitles = ["Fiesta en el desierto", "Danzando", "Santo es el que vive", "Espíritu de Dios"];
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
