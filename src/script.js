/* ========= Fusion JS (artistes + albums + lecteur + playlists + recherche) ========= */

/* === Configuration des ressources === */
// URL de base pour les images hébergées sur GitHub
// Option 1: GitHub Pages (recommandé si activé)
// const GITHUB_BASE_URL = 'https://cx-banger.github.io/cx-final-muzikly';
// Option 2: GitHub raw (fallback)
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/CX-Banger/cx-final-muzikly/main';

// URL de base pour les fichiers audio hébergés sur Supabase Storage
const SUPABASE_STORAGE_URL = 'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/';

// URL de base pour les paroles hébergées sur GitHub
const LYRICS_BASE_URL = 'https://raw.githubusercontent.com/CX-Banger/cx-muzik/main/lyrics';

/* === Données artistes (basées sur ton premier code) === */
const artistNames = ['NAN', 'Synaï', 'Elihem', 'Sara', 'Eilynn', 'Melohim', 'Tiim', 'Math'];
const trackTitles = [
  ['Olala', 'Obsédé', 'Etoile', 'Parapluie', 'Love Story', 'Bande', 'Epitre Au Monde #1', 'Mieux', 'Alchimie', 'Compassion', 'Génant', 'Techiyá', 'Kesse', 'Psaumes 151', 'Pourquoi', 'Dispo', 'En Tout Temps', 'Génération', 'Favelas', 'Chemin ft Elihem', 'Sans Effet', 'Victoire ft Eilynn'],
  ['YHWH', 'Freestyle Pour Dieu', 'Zinzin', 'Choisir Papa', 'Le Temps', 'Une Question...', 'Papa Yahweh ft Eilynn', 'Saisir les Bases', 'Dessin', 'Cri du Coeur ft Sara', 'Chargeur Plein', 'The King ft Elihem', 'Je t aime ft Sara'],
  ['In God', 'Visé', 'Minimum', 'Can you hear me ?', 'Evidemment', 'The King ft Synaï', 'Chemin ft NAN'],
  ['Louange à Mon Dieu', 'Tentation', 'Dis moi ft Eilynn', 'Evangéliser', 'Je t aime ft Synaï', 'Cri du Coeur ft Synaï'],
  ['Cendrillon', 'Nouveau Départ', 'Victoire ft NAN', 'Ta Présence', 'A chaque jour', 'Je te retrouverai', 'Flame of Life', 'Papa Yahweh ft Synaï', 'Dis moi ft Sara'],
  ['Ma Carrière', 'Porter Du Fruit', 'Mourir à moi même', 'Mon Histoire', '10.10.2025'],
  ['Tiim 1', 'Tiim 2'],
  ['Math 1', 'Math 2', 'Math 3', 'Math 4', 'Math 5']
];

const artists = artistNames.map((name,i)=>({
  id:i+1,
  name,
  bio:`${name} `,
  photo:`${GITHUB_BASE_URL}/media/artistes/${i+1}.jpg`,  // photo de profil depuis GitHub
  tracks:trackTitles[i].map((title,j)=>({
    id:`son${j+1}`,
    title,
    src:`${SUPABASE_STORAGE_URL}/artiste${i+1}/son${j+1}.mp3`,  // audio depuis Supabase
    cover:`${GITHUB_BASE_URL}/media/artiste${i+1}/cover${j+1}.jpg` // cover depuis GitHub
  }))
}));


/* === Albums list (visuels + quelques sources publiques du second code) === */
const albums = [
  { title:'Freestyle Pour Dieu', artist:'Synaï', image:'https://i.pinimg.com/236x/2c/23/17/2c2317fb606f8dad772f8b2a63dc1b07.jpg', audio:'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/artiste%202/son2.mp3' },
  { title:'Obsédé', artist:'NAN(Rap-Gospel)', image:'https://i.pinimg.com/236x/2c/23/17/2c2317fb606f8dad772f8b2a63dc1b07.jpg', audio:'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/artiste%201/son2.mp3' },
  { title:'In God', artist:'Elihem', image:'https://i.pinimg.com/236x/2c/23/17/2c2317fb606f8dad772f8b2a63dc1b07.jpg', audio:'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/artiste%203/son1.mp3' },
  { title:'Sara 1', artist:'Sara', image:'https://i.pinimg.com/236x/2c/23/17/2c2317fb606f8dad772f8b2a63dc1b07.jpg', audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { title:'Cendrillon', artist:'Kalynn', image:'https://github.com/CX-Banger/profile-page-artiste/blob/main/assets/disque.jpg?raw=true', audio:'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/artiste%205/son1.mp3' },
  { title:'Ma Carrière', artist:'Melohim', image:'https://github.com/CX-Banger/profile-page-artiste/blob/main/assets/disque.jpg?raw=true', audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { title:'Tiim 1', artist:'Tiim', image:'https://github.com/CX-Banger/profile-page-artiste/blob/main/assets/disque.jpg?raw=true', audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { title:'Math 1', artist:'Math', image:'https://github.com/CX-Banger/profile-page-artiste/blob/main/assets/disque.jpg?raw=true', audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

/* === DOM refs === */
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');
const bottomBtns = document.querySelectorAll('.bottom-nav .bt');
const artistsGrid = document.getElementById('artistsGrid');
const featuredDiv = document.getElementById('featured');
const upcomingDiv = document.getElementById('upcoming');
const playlistListDiv = document.getElementById('playlistList');
const playlistTracksDiv = document.getElementById('playlistTracks');
const likedListDiv = document.getElementById('likedList');
const searchInput = document.getElementById('searchInput');
const searchResultsDiv = document.getElementById('searchResults');
const headerSearch = document.getElementById('headerSearch');
const newPlaylistNameInput = document.getElementById('newPlaylistName');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');

/* Player refs */
const audio = document.getElementById('audio');

/* Modal refs */
const artistModal = document.getElementById('artistModal');
const modalName = document.getElementById('modalName');
const modalBio = document.getElementById('modalBio');
const modalTracks = document.getElementById('modalTracks');
const modalClose = document.getElementById('modalClose');

/* state */
let userPlaylists = JSON.parse(localStorage.getItem('playlists') || '{}');
let likedSongs = userPlaylists['Sons Likés'] || [];
let playlist = []; // array of {src,title,artist,thumb}
let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;

/* ===== Navigation ===== */
function showPage(id){
  pages.forEach(p=>p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  // style nav active
  navBtns.forEach(b=>b.classList.toggle('active', b.dataset.page === `page-${id}` || b.dataset.page===id));
  bottomBtns.forEach(b=>b.classList.toggle('active', b.dataset.page === id));
}
navBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    const page = b.dataset.page.replace('page-','');
    // pages are: home, playlists, liked, search, upcoming
    if(page==='page-home') showPage('home'); else showPage(b.dataset.page.replace('page-',''));
  });
});
bottomBtns.forEach(b=>{
  b.addEventListener('click', ()=> showPage(b.dataset.page));
});

/* support header search trigger */
headerSearch.addEventListener('input', e=>{
  const q = e.target.value.trim();
  if(q.length>=2){
    showPage('search');
    document.getElementById('searchInput').value = q;
    doSearch(q);
  }
});

/* ===== Render artistes ===== */
function renderArtists(){
  artistsGrid.innerHTML='';
  artists.forEach(a=>{
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.innerHTML = `
    <img src="${a.photo}" class="avatar" alt="${a.name}">
    <div class="artist-info"><h3>${a.name}</h3><p>${a.bio}</p></div>
    `;

    card.addEventListener('click', ()=> openArtist(a));
    artistsGrid.appendChild(card);
  });
}

function renderFeatured(){
  featuredDiv.innerHTML='';

  const featuredAlbums = [
    { title: "Olala", artist: "NAN", year: "NAN", cover: `${GITHUB_BASE_URL}/media/artiste1/cover1.jpg`, artistIndex: 0 },
    { title: "YHWH", artist: "Synaï", year: "Synaï", cover: `${GITHUB_BASE_URL}/media/artiste2/cover1.jpg`, artistIndex: 1 },
    { title: "In God", artist: "Elihem", year: "Elihem", cover: `${GITHUB_BASE_URL}/media/artiste3/cover1.jpg`, artistIndex: 2 },
    { title: "Louange à Mon Dieu", artist: "Sara", year: "Sara", cover: `${GITHUB_BASE_URL}/media/artiste4/cover1.jpg`, artistIndex: 3 },
    { title: "Cendrillon", artist: "Eilynn", year: "Eilynn", cover: `${GITHUB_BASE_URL}/media/artiste5/cover1.jpg`, artistIndex: 4 },
    { title: "Ma Carrière", artist: "Melohim", year: "Melohim", cover: `${GITHUB_BASE_URL}/media/artiste6/cover1.jpg`, artistIndex: 5 },
    { title: "Tiim 1", artist: "Tiim", year: "Tiim", cover: `${GITHUB_BASE_URL}/media/artiste7/cover1.jpg`, artistIndex: 6 },
    { title: "Math 1", artist: "Math", year: "Math", cover: `${GITHUB_BASE_URL}/media/artiste8/cover1.jpg`, artistIndex: 7 }
  ];

  featuredAlbums.forEach((album, idx) => {
    const card = document.createElement("div");
    card.className = "featured-album";
    card.innerHTML = `
      <img src="${album.cover}" class="featured-album-cover" alt="${album.title}">
      <div class="featured-album-title">${album.title}</div>
      <div class="featured-album-year">${album.year}</div>
    `;

    card.addEventListener("click", () => {
      const artist = artists[album.artistIndex];
      if (artist && artist.tracks) {
        playlist = artist.tracks.map(x => ({
          src: x.src,
          title: x.title,
          artist: artist.name,
          thumb: x.cover || artist.photo
        }));
        currentIndex = 0;
        loadAndPlay(currentIndex);
      }
    });

    featuredDiv.appendChild(card);
  });
}




/* ===== Upcoming ===== */
function renderUpcoming(){
  upcomingDiv.innerHTML = `
    <div class="featured-album">
      <img src="media/sorties/avenir0.jpg" alt="A venir">
      <div class="featured-album-title">"A venir"</div>
      <div class="featured-album-year">artiste - jj/mm/aaaa</div>
    </div>
  `;
} /* mettre le nom de l'album : <div class="title">nom_album </div> :)

/* ===== Playlists (user) ===== */
function savePlaylists(){ localStorage.setItem('playlists', JSON.stringify(userPlaylists)); }
function renderPlaylists(){
  // ensure liked songs are synchronized
  userPlaylists['Sons Likés'] = userPlaylists['Sons Likés'] || likedSongs;
  const list = playlistListDiv;
  list.innerHTML = '';
  Object.keys(userPlaylists).forEach(pl=>{
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.innerHTML = `<div><strong>${pl}</strong> <small>(${userPlaylists[pl].length} titres)</small></div>
                      <div><button class="open">Ouvrir</button> <button class="del">🗑</button></div>`;
    card.querySelector('.open').addEventListener('click', ()=>{
      renderPlaylistTracks(pl);
      // play first if exists
      if(userPlaylists[pl].length>0){
        playlist = userPlaylists[pl];
        currentIndex = 0;
        loadAndPlay(currentIndex);
      }
    });
    card.querySelector('.del').addEventListener('click', ()=>{
      if(confirm(`Supprimer la playlist "${pl}" ?`)){
        delete userPlaylists[pl];
        savePlaylists();
        renderPlaylists();
        playlistTracksDiv.innerHTML = '';
      }
    });
    list.appendChild(card);
  });
  // liked list render
  renderLiked();
}

function renderPlaylistTracks(plName){
  const container = playlistTracksDiv;
  container.innerHTML = `<h3>${plName}</h3>`;
  userPlaylists[plName].forEach((t, idx)=>{
    const row = document.createElement('div');
    row.className = 'playlist-track';
    row.innerHTML = `<div class="info"><div style="width:48px;height:48px;border-radius:8px;background:linear-gradient(135deg,var(--accent),#57b0ff);display:flex;align-items:center;justify-content:center;color:white">${t.thumb || '♪'}</div><div style="margin-left:10px"><strong>${t.title}</strong><small>${t.artist}</small></div></div>
                     <div><button class="play-btn">▶</button> <button class="del-btn">🗑</button></div>`;
    row.querySelector('.play-btn').addEventListener('click', ()=>{
      playlist = userPlaylists[plName];
      currentIndex = idx;
      loadAndPlay(currentIndex);
    });
    row.querySelector('.del-btn').addEventListener('click', ()=>{
      userPlaylists[plName].splice(idx,1);
      savePlaylists();
      renderPlaylists();
      renderPlaylistTracks(plName);
    });
    container.appendChild(row);
  });
}

/* ===== Liked ==== */
function renderLiked(){
  likedListDiv.innerHTML = '';
  const liked = userPlaylists['Sons Likés'] || [];
  if(liked.length===0){ likedListDiv.innerHTML = '<p style="color:var(--muted)">Aucun son liké pour l’instant.</p>'; return; }
  liked.forEach((t,idx)=>{
    const el = document.createElement('div');
    el.className = 'artist-card';

    const thumbElement = t.thumb && (t.thumb.startsWith('http') || t.thumb.includes('.jpg') || t.thumb.includes('.png'))
      ? `<img src="${t.thumb}" class="avatar" style="width:80px;height:80px;border-radius:8px;object-fit:cover;" alt="${t.title}">`
      : `<div class="avatar">♡</div>`;

    el.innerHTML = `${thumbElement}<div class="artist-info"><h3>${t.title}</h3><p>${t.artist}</p></div>`;
    el.addEventListener('click', ()=> {
      playlist = userPlaylists['Sons Likés'];
      currentIndex = idx;
      loadAndPlay(currentIndex);
    });
    likedListDiv.appendChild(el);
  });
}

/* ===== Modal artiste ===== */
function openArtist(a){
  artistModal.setAttribute('aria-hidden','false');
  modalName.textContent = a.name;
  modalBio.textContent = a.bio;
  modalTracks.innerHTML = '';
  a.tracks.forEach((t, idx)=>{
    const tr = document.createElement('div');
    tr.className = 'track';
    tr.style.display = 'flex';
    tr.style.justifyContent='space-between';
    tr.style.alignItems='center';
    tr.style.padding='8px';
    tr.style.borderRadius='10px';
    tr.style.background='rgba(255,255,255,0.02)';
    tr.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px">
        <img src="${t.cover}" class="cover" alt="${t.title}">
        <div>
        <div style="font-weight:600">${t.title}</div>
        <div style="font-size:12px;color:var(--muted)">${a.name}</div>
        </div>
    </div>
    <div style="display:flex;gap:6px;flex-shrink:0">
        <button class="play-btn" style="font-size:14px;padding:6px 10px"><i class="fas fa-play"></i></button>
        <button class="like-btn" style="font-size:14px;padding:6px 10px"><i class="fas fa-heart"></i></button>
        <button class="add-btn" style="font-size:14px;padding:6px 10px"><i class="fas fa-plus"></i></button>
    </div>
    `;

    tr.querySelector('.play-btn').addEventListener('click', ()=>{
      // resolve src: first available
      const src = Array.isArray(t.src) ? t.src[0] : t.src;
      playlist = a.tracks.map(x=>({src: Array.isArray(x.src)? x.src[0] : x.src, title: x.title, artist: a.name, thumb: x.cover || a.photo}));
      currentIndex = idx;
      loadAndPlay(currentIndex);
      artistModal.setAttribute('aria-hidden','true');
    });
    tr.querySelector('.like-btn').addEventListener('click', ()=>{
      if(!userPlaylists['Sons Likés']) userPlaylists['Sons Likés'] = [];
      userPlaylists['Sons Likés'].push({title:t.title,artist:a.name,src:Array.isArray(t.src)?t.src[0]:t.src,thumb:t.cover || a.photo});
      savePlaylists(); renderPlaylists();
      alert('Ajouté aux Sons Likés !');
    });
    tr.querySelector('.add-btn').addEventListener('click', ()=>{
      const plName = prompt('Nom de la playlist :');
      if(plName){
        if(!userPlaylists[plName]) userPlaylists[plName] = [];
        userPlaylists[plName].push({title:t.title,artist:a.name,src:Array.isArray(t.src)?t.src[0]:t.src,thumb:t.cover || a.photo});
        savePlaylists(); renderPlaylists();
        alert(`Ajouté à "${plName}"`);
      }
    });
    modalTracks.appendChild(tr);
  });
}
modalClose.addEventListener('click', ()=> artistModal.setAttribute('aria-hidden','true'));

/* ===== Search ===== */
function doSearch(q){
  const query = q.toLowerCase();
  const results = [];
  artists.forEach(a=>{
    a.tracks.forEach(t=>{
      if(t.title.toLowerCase().includes(query) || a.name.toLowerCase().includes(query)){
        results.push({
  title:t.title,
  artist:a.name,
  src: Array.isArray(t.src)? t.src[0]:t.src,
  thumb: t.cover || a.photo
});

      }
    });
  });
  // include albums
  albums.forEach(al=>{
    if(al.title.toLowerCase().includes(query) || al.artist.toLowerCase().includes(query)){
      results.push({title:al.title, artist:al.artist, src: al.audio, thumb: al.image});
    }
  });

  // render
  searchResultsDiv.innerHTML = '';
  if(results.length===0) { searchResultsDiv.innerHTML = '<p style="color:var(--muted)">Aucun résultat</p>'; return; }
  results.forEach(r=>{
    const card = document.createElement('div');
    card.className = 'track-card';

    const thumbElement = r.thumb && (r.thumb.startsWith('http') || r.thumb.includes('.jpg') || r.thumb.includes('.png'))
      ? `<img src="${r.thumb}" style="width:56px;height:56px;border-radius:8px;object-fit:cover;" alt="${r.title}">`
      : `<div style="width:56px;height:56px;border-radius:8px;background:linear-gradient(135deg,#1DB954,#1ed760);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold">♪</div>`;

    card.innerHTML = `<div style="display:flex;gap:12px;align-items:center">${thumbElement}
                      <div><div class="title">${r.title}</div><div class="sub">${r.artist}</div></div></div>
                      <div><button class="play-btn"><i class="fas fa-play"></i></button></div>`;
    card.querySelector('.play-btn').addEventListener('click', ()=>{
      playlist = [{src:r.src,title:r.title,artist:r.artist,thumb:r.thumb}];
      currentIndex = 0;
      loadAndPlay(currentIndex);
    });
    searchResultsDiv.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', (e)=>{
  const q = e.target.value.trim();
  if(q.length<2){ searchResultsDiv.innerHTML=''; return; }
  doSearch(q);
});

/* header search already wired above */

/* ===== Player functions ===== */
function resolveSrc(src){
  if(Array.isArray(src)){
    // return first reachable — we assume first is local, second is fallback
    return src[0] || src[1];
  }
  return src;
}

/* ===== Lyrics Loading ===== */
async function loadLyrics(track) {
  const lyricsContentDiv = document.getElementById('lyricsContent');

  if (!lyricsContentDiv) return;

  lyricsContentDiv.innerHTML = '<p class="lyrics-placeholder">Chargement des paroles...</p>';

  try {
    const artistIndex = artists.findIndex(a =>
      a.tracks.some(t => t.title === track.title)
    );

    if (artistIndex === -1) {
      lyricsContentDiv.innerHTML = '<p class="lyrics-placeholder">Les paroles ne sont pas encore disponibles pour ce titre.</p>';
      return;
    }

    const artist = artists[artistIndex];
    const trackIndex = artist.tracks.findIndex(t => t.title === track.title);

    if (trackIndex === -1) {
      lyricsContentDiv.innerHTML = '<p class="lyrics-placeholder">Les paroles ne sont pas encore disponibles pour ce titre.</p>';
      return;
    }

    const lyricsUrl = `${LYRICS_BASE_URL}/artiste${artistIndex + 1}/son${trackIndex + 1}.json`;

    const response = await fetch(lyricsUrl);

    if (!response.ok) {
      lyricsContentDiv.innerHTML = '<p class="lyrics-placeholder">Les paroles ne sont pas encore disponibles pour ce titre.</p>';
      return;
    }

    const lyricsData = await response.json();

    let lyricsHTML = '';

    if (lyricsData.lyrics && Array.isArray(lyricsData.lyrics)) {
      lyricsHTML = lyricsData.lyrics
        .map(line => line === '' ? '<br>' : `<p>${line}</p>`)
        .join('');
    } else if (lyricsData.sections && Array.isArray(lyricsData.sections)) {
      lyricsHTML = lyricsData.sections
        .map(section => {
          const sectionClass = section.type ? `lyrics-${section.type}` : '';
          const lines = section.lines
            .map(line => `<p class="${sectionClass}">${line}</p>`)
            .join('');
          return lines;
        })
        .join('<br>');
    } else {
      lyricsContentDiv.innerHTML = '<p class="lyrics-placeholder">Format de paroles non reconnu.</p>';
      return;
    }

    lyricsContentDiv.innerHTML = lyricsHTML || '<p class="lyrics-placeholder">Les paroles ne sont pas encore disponibles pour ce titre.</p>';

  } catch (error) {
    console.error('Erreur lors du chargement des paroles:', error);
    lyricsContentDiv.innerHTML = '<p class="lyrics-placeholder">Les paroles ne sont pas encore disponibles pour ce titre.</p>';
  }
}

function loadTrack(i){
  const t = playlist[i];
  if(!t) return;
  const src = resolveSrc(t.src);
  if(audio.src !== src) audio.src = src;

  if (typeof updateMiniPlayer === 'function') {
    updateMiniPlayer(t.title, t.artist, t.thumb);
  }

  if (typeof updateFullPlayerUI === 'function') {
    updateFullPlayerUI();
  }

  loadLyrics(t);
  saveLastPlayed();
}

function loadAndPlay(i){
  if(!playlist[i]) return;
  currentIndex = i;
  loadTrack(i);

  try{
    audio.play().catch(() => {});
  }catch(e){}
}

/* save/restore last played */
function saveLastPlayed(){
  const t = playlist[currentIndex];
  if(!t) return;
  localStorage.setItem('lastPlayed', JSON.stringify({title:t.title, artist:t.artist, thumb:t.thumb}));
}

function restoreLastPlayed(){
  const st = JSON.parse(localStorage.getItem('lastPlayed') || 'null');
  if(!st) return;
}

/* ===== Hero Banner Click ===== */
const heroArt = document.getElementById('heroArt');
if (heroArt) {
  heroArt.addEventListener('click', () => {
    const obsedeSong = {
      title: 'The King ft Elihem',
      artist: 'Synaï',
      src: 'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/artiste2/son12.mp3',
      thumb: `${GITHUB_BASE_URL}/media/artiste2/cover12.jpg`
    };
    playlist = [obsedeSong];
    currentIndex = 0;
    loadAndPlay(0);
  });
}

/* ===== Voir Plus Button ===== */
const voirPlusBtn = document.getElementById('voirPlusBtn');
if (voirPlusBtn) {
  voirPlusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const featuredGrid = document.getElementById('featured');
    if (featuredGrid.classList.contains('expanded')) {
      featuredGrid.classList.remove('expanded');
      voirPlusBtn.textContent = 'Voir plus';
    } else {
      featuredGrid.classList.add('expanded');
      voirPlusBtn.textContent = 'Voir moins';
    }
  });
}

/* ===== Init render & events ===== */
function init(){
  renderArtists();
  renderFeatured();
  renderUpcoming();
  renderPlaylists();
  restoreLastPlayed();

  // album grid from second project -> also available inside featuredDiv
  // Create starter playlist (first album)
  if(albums.length>0 && playlist.length===0){
    // don't auto play, just set as candidate
    playlist = albums.map(a=>({src:a.audio,title:a.title,artist:a.artist,thumb:a.image}));
  }

  // create playlist button
  if(createPlaylistBtn){
    createPlaylistBtn.addEventListener('click', ()=>{
      const name = newPlaylistNameInput.value.trim();
      if(!name) return alert('Donne un nom à la playlist');
      if(!userPlaylists[name]) userPlaylists[name] = [];
      savePlaylists(); renderPlaylists();
      newPlaylistNameInput.value = '';
    });
  }

  // header search enter wired to page search
  document.getElementById('headerSearch').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      const q = e.target.value.trim();
      if(q.length>=2){ showPage('search'); document.getElementById('searchInput').value = q; doSearch(q); }
    }
  });

  // bottom nav (mobile)
  document.querySelectorAll('.bottom-nav .bt').forEach(b=>{
    b.addEventListener('click', ()=> showPage(b.dataset.page));
  });

  // small nav buttons (sidebar) map to pages
  document.querySelectorAll('.nav-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const pageMap = { 'Découvrir':'home' };
    });
  });
}

/* kick off */
init();

/* Make sure the UI reacts when clicking featured album play icons (delegation) */
document.addEventListener('click', (e)=>{
  if(e.target.closest('.album-item .play-button') || e.target.closest('.album-item')) {
    // handled by album item listeners already
  }
});
