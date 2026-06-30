/* =========================================================
   1. TARGET WAKTU: 1 Juli 2026, 00:00 (waktu lokal browser)
   ========================================================= */
const targetDate = new Date("2026-06-01T00:00:00");

const countdownScreen = document.getElementById('countdown-screen');
const mainContent = document.getElementById('main-content');

function unlockContent(){
  countdownScreen.style.display = 'none';
  mainContent.classList.add('show');
}

function updateCountdown(){
  const now = new Date();
  const diff = targetDate - now;

  if(diff <= 0){
    unlockContent();
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================================================
   2. NAVBAR / SWITCH HALAMAN
   ========================================================= */
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.page;

    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${target}`).classList.add('active');

    window.scrollTo({top:0, behavior:'smooth'});
  });
});

/* =========================================================
   3. GALERI FOTO OTOMATIS + LIGHTBOX
   Taruh file foto di folder assets/photos/ dengan nama:
   foto1.png, foto2.png, foto3.png, dst
   Ganti TOTAL_PHOTOS sesuai jumlah foto kamu.
   ========================================================= */
const TOTAL_PHOTOS = 8;
const PHOTO_EXT = 'png';

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

for(let i = 1; i <= TOTAL_PHOTOS; i++){
  const div = document.createElement('div');
  div.className = 'photo';
  const img = document.createElement('img');
  const src = `assets/photos/foto${i}.${PHOTO_EXT}`;
  img.src = src;
  img.alt = `Kenangan ${i}`;
  img.onerror = function(){
    div.innerHTML = `<div class="placeholder">Taruh foto<br>foto${i}.${PHOTO_EXT}<br>di assets/photos/</div>`;
  };
  div.appendChild(img);
  div.addEventListener('click', () => {
    if(!div.querySelector('.placeholder')){
      lightboxImg.src = src;
      lightbox.classList.add('show');
    }
  });
  gallery.appendChild(div);
}

lightboxClose.addEventListener('click', () => lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) lightbox.classList.remove('show');
});

/* =========================================================
   4. MUSIC PLAYER (halaman Musik)
   Taruh file lagu di folder assets/music/
   Tambah lagu baru cukup tambahkan object baru di array `tracks`.
   TIDAK autoplay — user harus tekan tombol play sendiri.
   ========================================================= */
const tracks = [
  { title: "Shape Of My Heart", artist: "Wopyuuu", src: "assets/music/song.mp3" }
  // Tambah lagu lain di sini, contoh:
  // { title: "Judul Lagu 2", artist: "Artis 2", src: "assets/music/song2.mp3" }
];

let currentTrack = 0;
let isPlaying = false;

const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const musicArt = document.getElementById('musicArt');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const nowPlayingSub = document.getElementById('nowPlayingSub');
const playlistEl = document.getElementById('playlist');

function renderPlaylist(){
  playlistEl.innerHTML = '';
  tracks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = i === currentTrack ? 'active' : '';
    li.innerHTML = `<span class="track-icon">${i === currentTrack && isPlaying ? '🔊' : '🎵'}</span> ${t.title} — <span style="opacity:.7;font-size:0.85em;">${t.artist}</span>`;
    li.addEventListener('click', () => {
      loadTrack(i);
      playTrack();
    });
    playlistEl.appendChild(li);
  });
}

function loadTrack(index){
  currentTrack = (index + tracks.length) % tracks.length;
  const t = tracks[currentTrack];
  bgMusic.src = t.src;
  nowPlayingTitle.textContent = t.title;
  nowPlayingSub.textContent = t.artist;
  renderPlaylist();
}

function playTrack(){
  bgMusic.play().then(() => {
    isPlaying = true;
    playBtn.textContent = '⏸';
    musicArt.classList.add('playing');
    nowPlayingSub.textContent = tracks[currentTrack].artist;
    renderPlaylist();
  }).catch(() => {
    // diam saja kalau gagal, user bisa coba tekan lagi
  });
}

function pauseTrack(){
  bgMusic.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
  musicArt.classList.remove('playing');
  renderPlaylist();
}

playBtn.addEventListener('click', () => {
  if(isPlaying){
    pauseTrack();
  } else {
    if(!bgMusic.src) loadTrack(currentTrack);
    playTrack();
  }
});

nextBtn.addEventListener('click', () => {
  const wasPlaying = isPlaying;
  loadTrack(currentTrack + 1);
  if(wasPlaying) playTrack();
});

prevBtn.addEventListener('click', () => {
  const wasPlaying = isPlaying;
  loadTrack(currentTrack - 1);
  if(wasPlaying) playTrack();
});

bgMusic.addEventListener('ended', () => {
  loadTrack(currentTrack + 1);
  playTrack();
});

// Init (tidak diputar otomatis)
loadTrack(0);

/* =========================================================
   5. DEKORASI BUNGA DAISY MELAYANG DI BACKGROUND
   ========================================================= */
const daisySVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g>
    <ellipse cx="50" cy="22" rx="11" ry="20" fill="#ffffff"/>
    <ellipse cx="78" cy="50" rx="20" ry="11" fill="#ffffff"/>
    <ellipse cx="50" cy="78" rx="11" ry="20" fill="#ffffff"/>
    <ellipse cx="22" cy="50" rx="20" ry="11" fill="#ffffff"/>
    <ellipse cx="68" cy="32" rx="11" ry="20" fill="#ffffff" transform="rotate(45 68 32)"/>
    <ellipse cx="68" cy="68" rx="11" ry="20" fill="#ffffff" transform="rotate(-45 68 68)"/>
    <ellipse cx="32" cy="68" rx="11" ry="20" fill="#ffffff" transform="rotate(45 32 68)"/>
    <ellipse cx="32" cy="32" rx="11" ry="20" fill="#ffffff" transform="rotate(-45 32 32)"/>
    <circle cx="50" cy="50" r="14" fill="#ffd23f"/>
  </g>
</svg>`;

const daisyField = document.getElementById('daisyField');
const DAISY_COUNT = 35;
for(let i = 0; i < DAISY_COUNT; i++){
  const d = document.createElement('div');
  d.className = 'daisy';
  d.innerHTML = daisySVG;
  const size = 30 + Math.random()*50;
  d.style.width = size + 'px';
  d.style.height = size + 'px';
  d.style.left = Math.random()*100 + 'vw';
  d.style.top = Math.random()*100 + 'vh';
  d.style.opacity = 0.5 + Math.random()*0.4;
  d.style.animationDuration = (4 + Math.random()*4) + 's';
  d.style.animationDelay = (Math.random()*4) + 's';
  daisyField.appendChild(d);
}

// daisy kecil di divider countdown
document.getElementById('dd').innerHTML = daisySVG.match(/<g>([\s\S]*)<\/g>/)[1];
