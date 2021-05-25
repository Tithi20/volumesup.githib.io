const wrapper = document.querySelector('.wrapper'),
  musicImg = wrapper.querySelector('.img-area img'),
  musicName = wrapper.querySelector('.song-details .name'),
  musicArtist = wrapper.querySelector('.song-details .artist'),
  playPauseBtn = wrapper.querySelector('.play-pause'),
  prevBtn = wrapper.querySelector('#prev'),
  nextBtn = wrapper.querySelector('#next'),
  mainAudio = wrapper.querySelector('#main-audio'),
  progressArea = wrapper.querySelector('.progress-area'),
  progressBar = progressArea.querySelector('.progress-bar'),
  musicList = wrapper.querySelector('.music-list'),
  moreMusicBtn = wrapper.querySelector('#more-music'),
  closemoreMusic = musicList.querySelector('#close');
  const menuList= document.querySelector("#menu-list");
  const menu= document.querySelector("#menu");


  //load random music on load
let musicIndex = Math.floor((Math.random() * allMusic.length)+1);

window.addEventListener('load', () => {
  loadMusic(musicIndex); //calling load music function once window loaded
  playingNow();
});

//load music function
function loadMusic(indexNumb) {
  musicName.innerHTML = allMusic[indexNumb - 1].name;
  musicArtist.innerHTML = allMusic[indexNumb - 1].artist;
  musicImg.src = allMusic[indexNumb - 1].img;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}


//play music function
function playMusic() {
  wrapper.classList.add('paused');
  playPauseBtn.querySelector('i').innerHTML = 'pause';
  mainAudio.play();
}

//pause music function
function pauseMusic() {
  wrapper.classList.remove('paused');
  playPauseBtn.querySelector('i').innerHTML = 'play_arrow';
  mainAudio.pause();
}

//next music function
function nextMusic() {
  //here we will just increment of index by 1
  musicIndex++;

  //if musicIndex is greater than array length then musicIndex will be 1 so the first song will play
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//previous music function
function prevMusic() {
  //there will just be decrement of index by 1
  musicIndex--;
  //if music is less than 1 then musicIndex will be array length so the last song will play

  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//play or pause music button event
playPauseBtn.addEventListener('click', () => {
  const isMusicPaused = wrapper.classList.contains('paused');
  //if isMusicPaused is true then call pauseMusic else call playMusic
  isMusicPaused ? pauseMusic() : playMusic();
  playingNow();
});

//next music btn event
nextBtn.addEventListener('click', () => {
  nextMusic(); //calling next music function
});

//previous music btn event
prevBtn.addEventListener('click', () => {
  prevMusic(); //calling previous music function
});

//update progress bar width according to music current time
mainAudio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime; //getting current time of song
  const duration = e.target.duration; //getting duration of song

  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector('.current'),
    musicDuration = wrapper.querySelector('.duration');

  mainAudio.addEventListener('loadeddata', () => {
    //update song total duration

    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    //adding 0 if sec is less than 10
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    musicDuration.innerHTML = `${totalMin}:${totalSec}`;
  });

  //update playing song duration

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  //adding 0 if sec is less than 10
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`;
});

//let us update playing song current time according to the progress bar width
progressBar.addEventListener('click', (e) => {
  let progressWidthval = progressBar.clientWidth; //getting width of progress bar
  let clickedOffSetX = e.offsetX; //getting offset X value
  let songDuration = mainAudio.duration; //getting the total song duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
});

//let us update playing song current time according to the progress bar width
progressArea.addEventListener('click', (e) => {
  let progressWidthval = progressArea.clientWidth; //getting width of progress bar
  let clickedOffSetX = e.offsetX; //getting offset X value
  let songDuration = mainAudio.duration; //getting the total song duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  playMusic();
});

//let us work on repeat, shuffle song according to the icon
const repeatBtn = wrapper.querySelector('#repeat-plist');

repeatBtn.addEventListener('click', () => {
  //first we get the innertext of the icon then we will change accordingly
  let getText = repeatBtn.innerHTML; //getting innerHTML of icon
  //let us do different changes on different icon click using switch case
  switch (getText) {
    case 'repeat': //if this icon then change it to repeat_one
      repeatBtn.innerHTML = 'repeat_one';
      repeatBtn.setAttribute('title', 'Song looped');
      break;

    case 'repeat_one': //if icon is repeat_one then change it to shuffle
      repeatBtn.innerHTML = 'shuffle';
      repeatBtn.setAttribute('title', 'Playback shuffle');
      break;

    //if shuufle is found then change icon to repeat again
    case 'shuffle':
      repeatBtn.innerHTML = 'repeat';
      repeatBtn.setAttribute('title', 'Playlist looped');
      break;
  }
});

//above we just changed the icon, now function will be added

//after the song ended

mainAudio.addEventListener('ended', () => {
  //we will do according to the icon, means if user has set icon to loop song then we will repeat the current song and do further accordingly

  let getText = repeatBtn.innerHTML; //getting innerHTML of icon
  //let us do different changes on different icon click using switch case
  switch (getText) {
    case 'repeat': //if this icon is repeat then simply we call the nextMusic func so the next song will play
      nextMusic();
      break;

    case 'repeat_one': //if icon is repeat_one then we will change the current playing song current to 0 so song will play again
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;

    //if shuufle is found then change icon to repeat again
    case 'shuffle':
      //generating random index between max range of array length
      let randIndex = Math.floor(Math.random() * allMusic.length + 1);

      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == randIndex); //this loop will run until the next random number wont be the same or
      musicIndex = randIndex; //passing random Index to music Index so the random song will play

      loadMusic(musicIndex); //calling loadMusic function
      playMusic(); //calling playMusic function
      playingNow();
      break;
  }
});

// show music list onclick of music icon
moreMusicBtn.addEventListener('click', () => {
  musicList.classList.toggle('showw');
});
closemoreMusic.addEventListener('click', () => {
  moreMusicBtn.click();
});


const ulTag= wrapper.querySelector("ul");

//let us create li according to the array length

for(let i=0; i< allMusic.length; i++){
   
  //let us pass the song name, artist from the array to li

  let liTag = `<li li-index="${i+1}">
  <div class="row">
     <p>
        <span>${allMusic[i].name}</span>
        <span>${allMusic[i].artist}</span>
     </p>
  </div>
  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
  <span id="${allMusic[i].src}" class="audio-duration"></span>
</li>`;

  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);


  liAudioTag.addEventListener("loadeddata",()=>{
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    //adding 0 if sec is less than 10
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    liAudioDuration.innerHTML = `${totalMin}:${totalSec}`;

    //adding t duration attribute which we will use below

    liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//let us work on play particular sonng on click

const allLiTags = ulTag.querySelectorAll("li");
function playingNow(){
  for(let j=0; j<allLiTags.length; j++){

    let audioTag= allLiTags[j].querySelector(".audio-duration");

    //let's remove playing class from all other li except selected one

    if(allLiTags[j].classList.contains("playing")){
      allLiTags[j].classList.remove("playing");
      //let us get that audio duration value and pass to .audio-duration innerHTML

      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerHTML= adDuration;
    }

    //if there is an li tag which li-index is equal to musicIndex then this music is playing now and we will style it
  
    if(allLiTags[j].getAttribute("li-index")== musicIndex){
      allLiTags[j].classList.add("playing");
      audioTag.innerHTML ="Playing";
    }
  
  
    //adding onclick attribute in all li tags
    allLiTags[j].setAttribute("onclick","clicked(this)");
  }
}

//let us play song on li click

function clicked(element){
  //getting li index of particular clicked li tag
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //passing that li-index to music Index
  loadMusic(musicIndex);
  playMusic();
  playingNow();
  
}

//on clicking menu icon, menu will open
//we will use onclick 

// function menu(){
// menuList.classList.toggle("menu_show");
// console.log("ff");
// }

menu.addEventListener("click",()=>{
  if(menuList.style.opacity=="1"){
    menuList.style.opacity="0";
    
  }
  else{
    menuList.style.opacity="1";
   
  }
  console.log("fer");


});
