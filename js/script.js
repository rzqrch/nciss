/* =========================================================
   1. TARGET WAKTU: 1 Juli 2026, 00:00 (waktu lokal browser)
   ========================================================= */
const targetDate = new Date("2026-06-01T00:00:00");

const countdownScreen = document.getElementById('countdown-screen');
const mainContent = document.getElementById('main-content');
const musicBar = document.getElementById('musicBar');
const bgMusic = document.getElementById('bgMusic');

function unlockContent(){
  countdownScreen.style.display = 'none';
  mainContent.classList.add('show');
  musicBar.style.display = 'flex';
  tryAutoplay();
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
   2. MUSIK AUTOPLAY
   (Browser modern butuh interaksi user pertama kali sebelum
    audio bisa autoplay dengan suara. Script ini coba autoplay,
    kalau diblokir browser, akan otomatis play begitu user
    pertama kali klik/tap di halaman.)
   ========================================================= */
function tryAutoplay(){
  bgMusic.volume = 0.6;
  const playPromise = bgMusic.play();
  if(playPromise !== undefined){
    playPromise.then(()=>{
      document.getElementById('musicToggle').textContent = '⏸';
    }).catch(()=>{
      // Autoplay diblokir, tunggu interaksi pertama
      const resume = () => {
        bgMusic.play();
        document.getElementById('musicToggle').textContent = '⏸';
        document.removeEventListener('click', resume);
        document.removeEventListener('touchstart', resume);
      };
      document.addEventListener('click', resume);
      document.addEventListener('touchstart', resume);
    });
  }
}

document.getElementById('musicToggle').addEventListener('click', ()=>{
  if(bgMusic.paused){
    bgMusic.play();
    document.getElementById('musicToggle').textContent = '⏸';
  } else {
    bgMusic.pause();
    document.getElementById('musicToggle').textContent = '▶';
  }
});

/* =========================================================
   3. GALERI FOTO OTOMATIS
   Taruh file foto di folder assets/photos/ dengan nama:
   foto1.jpg, foto2.jpg, foto3.jpg, dst (atau .png/.jpeg)
   Ganti jumlah TOTAL_PHOTOS di bawah sesuai jumlah foto kamu.
   ========================================================= */
const TOTAL_PHOTOS = 8; // ganti sesuai jumlah foto yang kamu taruh
const PHOTO_EXT = 'png'; // ganti jadi 'jpg' atau 'jpeg' kalau perlu

const gallery = document.getElementById('gallery');
for(let i = 1; i <= TOTAL_PHOTOS; i++){
  const div = document.createElement('div');
  div.className = 'photo';
  const img = document.createElement('img');
  img.src = `assets/photos/foto${i}.${PHOTO_EXT}`;
  img.alt = `Kenangan ${i}`;
  img.onerror = function(){
    div.innerHTML = `<div class="placeholder">Taruh foto<br>foto${i}.${PHOTO_EXT}<br>di assets/photos/</div>`;
  };
  div.appendChild(img);
  gallery.appendChild(div);
}

/* =========================================================
   4. DEKORASI BUNGA DAISY MELAYANG DI BACKGROUND
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
