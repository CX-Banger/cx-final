const miniPlayer = document.getElementById('miniPlayer');
const fullPlayer = document.getElementById('fullPlayer');
const miniPlayerContent = document.getElementById('miniPlayerContent');
const closeFullPlayerBtn = document.getElementById('closeFullPlayer');

const miniPlayerThumb = document.getElementById('miniPlayerThumb');
const miniPlayerTitle = document.getElementById('miniPlayerTitle');
const miniPlayerArtist = document.getElementById('miniPlayerArtist');
const miniPlayPauseBtn = document.getElementById('miniPlayPause');

const fullPlayerCover = document.getElementById('fullPlayerCover');
const fullPlayerTitle = document.getElementById('fullPlayerTitle');
const fullPlayerArtist = document.getElementById('fullPlayerArtist');
const fullPlayPauseBtn = document.getElementById('fullPlayPauseBtn');
const fullPrevBtn = document.getElementById('fullPrevBtn');
const fullNextBtn = document.getElementById('fullNextBtn');
const fullShuffleBtn = document.getElementById('fullShuffleBtn');
const fullRepeatBtn = document.getElementById('fullRepeatBtn');
const fullLikeBtn = document.getElementById('fullLikeBtn');
const fullProgress = document.getElementById('fullProgress');
const fullCurrentTime = document.getElementById('fullCurrentTime');
const fullDurationTime = document.getElementById('fullDurationTime');

const bottomNav = document.getElementById('bottomNav');
const lyricsContent = document.getElementById('lyricsContent');

let isPlaying = false;
let isFullPlayerOpen = false;

function showMiniPlayer() {
  miniPlayer.classList.add('visible');
}

function hideMiniPlayer() {
  miniPlayer.classList.remove('visible');
}

function openFullPlayer() {
  isFullPlayerOpen = true;
  fullPlayer.classList.add('active');
  if (bottomNav) {
    bottomNav.classList.add('hidden');
  }
  updateFullPlayerUI();
}

function closeFullPlayer() {
  isFullPlayerOpen = false;
  fullPlayer.classList.remove('active');
  if (bottomNav) {
    bottomNav.classList.remove('hidden');
  }
}

function updateMiniPlayer(title, artist, thumb) {
  miniPlayerTitle.textContent = title;
  miniPlayerArtist.textContent = artist;
  miniPlayerThumb.src = thumb || 'https://github.com/CX-Banger/cx-devdocs/blob/main/assets/disque.jpg?raw=true';
  showMiniPlayer();
}

function updateFullPlayerUI() {
  if (!playlist[currentIndex]) return;

  const track = playlist[currentIndex];
  fullPlayerTitle.textContent = track.title;
  fullPlayerArtist.textContent = track.artist;
  fullPlayerCover.src = track.thumb || 'https://github.com/CX-Banger/cx-devdocs/blob/main/assets/disque.jpg?raw=true';

  updatePlayPauseButtons();
  updateShuffleRepeatButtons();
}

function updatePlayPauseButtons() {
  const icon = isPlaying ? 'fa-pause' : 'fa-play';
  const miniIcon = isPlaying ? '⏸' : '▶';

  miniPlayPauseBtn.textContent = miniIcon;

  const fullIcon = fullPlayPauseBtn.querySelector('i');
  if (fullIcon) {
    fullIcon.className = `fas ${icon}`;
  }
}

function updateShuffleRepeatButtons() {
  if (isShuffle) {
    fullShuffleBtn.classList.add('active');
  } else {
    fullShuffleBtn.classList.remove('active');
  }

  if (isRepeat) {
    fullRepeatBtn.classList.add('active');
  } else {
    fullRepeatBtn.classList.remove('active');
  }
}

function handlePlayPause() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
  updatePlayPauseButtons();
}

function handleNext() {
  if (isShuffle) {
    currentIndex = Math.floor(Math.random() * playlist.length);
    loadAndPlay(currentIndex);
    return;
  }
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    loadAndPlay(currentIndex);
  } else if (isRepeat) {
    currentIndex = 0;
    loadAndPlay(currentIndex);
  }
}

function handlePrev() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  if (currentIndex > 0) {
    currentIndex--;
    loadAndPlay(currentIndex);
  }
}

miniPlayerContent.addEventListener('click', (e) => {
  if (e.target !== miniPlayPauseBtn && !miniPlayPauseBtn.contains(e.target)) {
    openFullPlayer();
  }
});

miniPlayPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  handlePlayPause();
});

closeFullPlayerBtn.addEventListener('click', closeFullPlayer);

fullPlayPauseBtn.addEventListener('click', handlePlayPause);
fullNextBtn.addEventListener('click', handleNext);
fullPrevBtn.addEventListener('click', handlePrev);

fullShuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  updateShuffleRepeatButtons();
});

fullRepeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  updateShuffleRepeatButtons();
});

fullLikeBtn.addEventListener('click', () => {
  const t = playlist[currentIndex];
  if (!t) return;

  if (!userPlaylists['Sons Likés']) userPlaylists['Sons Likés'] = [];

  const alreadyLiked = userPlaylists['Sons Likés'].some(
    song => song.title === t.title && song.artist === t.artist
  );

  if (alreadyLiked) {
    alert('Déjà dans les Sons Likés !');
    return;
  }

  userPlaylists['Sons Likés'].push({
    title: t.title,
    artist: t.artist,
    src: t.src,
    thumb: t.thumb || ''
  });

  savePlaylists();
  renderPlaylists();

  fullLikeBtn.querySelector('i').className = 'fas fa-heart';

  setTimeout(() => {
    fullLikeBtn.querySelector('i').className = 'far fa-heart';
  }, 2000);
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;

  const pct = (audio.currentTime / audio.duration) * 100;
  fullProgress.value = pct;

  fullCurrentTime.textContent = formatTime(audio.currentTime);
  fullDurationTime.textContent = formatTime(audio.duration);
});

fullProgress.addEventListener('input', () => {
  if (!audio.duration) return;
  const pct = fullProgress.value;
  audio.currentTime = (pct / 100) * audio.duration;
});

audio.addEventListener('play', () => {
  isPlaying = true;
  updatePlayPauseButtons();
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  updatePlayPauseButtons();
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
    return;
  }
  if (isShuffle) {
    currentIndex = Math.floor(Math.random() * playlist.length);
    loadAndPlay(currentIndex);
    return;
  }
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    loadAndPlay(currentIndex);
  } else {
    isPlaying = false;
    updatePlayPauseButtons();
  }
});

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

window.updateMiniPlayer = updateMiniPlayer;
window.updateFullPlayerUI = updateFullPlayerUI;
window.showMiniPlayer = showMiniPlayer;
window.hideMiniPlayer = hideMiniPlayer;
