let clickCount = 0; 
// THAY LỜI CHÚC CỦA RIÊNG BẠN Ở ĐÂY
const MY_SPECIAL_WISH = "Chúc cốt 8/3 xinh đẹp và đỗ nv1 nhe!!!❤️❤️❤️❤️❤️";

const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const musicPlayer = document.getElementById("musicPlayer");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const toggleBtn = document.getElementById("toggleBtn");

let isProcessing = false;
let firstClick = true;
let isPlaying = false;

function triggerRelease(e) {
  if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
  e.preventDefault();
  if (isProcessing) return;
  isProcessing = true;

  if (firstClick) {
    activateMusic();
    firstClick = false;
  }

  releasePhrase();
  setTimeout(() => { isProcessing = false; }, 300);
}

function releasePhrase() {
  clickCount++; 
  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 700);
  createParticlesBurst();

  if (clickCount <= 10) {
    // 10 lần đầu: Ảnh bay ra và rơi xuống
    createImageElement(clickCount);
  } else if (clickCount === 11) {
    // Lần thứ 11: Hiện lời chúc chính giữa, TỪ TỪ VÀ ĐỨNG YÊN
    showFinalWish();
  }
}

function createImageElement(index) {
  const img = document.createElement("img");
  img.src = ảnh/anh${index}.jpg;
  img.className = "phrase shooting";
  img.style.cssText = `
    width: 200px;
    height: auto;
    border-radius: 15px;
    border: 5px solid #fff;
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
    object-fit: cover;
    z-index: 100;
  `;
  applyMotion(img);
  scene.appendChild(img);
  img.addEventListener("animationend", () => img.remove(), { once: true });
}

function showFinalWish() {
  // Kiểm tra nếu đã có lời chúc rồi thì không tạo thêm nữa
  if (document.getElementById("special-wish")) return;

  const el = document.createElement("div");
  el.id = "special-wish";
  el.textContent = MY_SPECIAL_WISH;
  
  // Style mới dùng transition (tự động chạy không cần CSS bên ngoài)
  el.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 25px 45px;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    font-size: 1.6rem;
    box-shadow: 0 0 40px rgba(255, 43, 79, 0.7);
    z-index: 9999;
    text-align: center;
    white-space: normal;
    max-width: 85%;
    opacity: 0; 
    transition: opacity 2.5s ease; /* Hiện dần trong 2.5 giây */
  `;
  
  scene.appendChild(el);

  // Kích hoạt hiệu ứng hiện dần sau 100ms
  setTimeout(() => {
    el.style.opacity = "1";
  }, 100);
}

// Hàm bổ trợ hiệu ứng bay cho 10 ảnh đầu
function applyMotion(el) {
  const heartRect = heartBtn.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();
  const startX = heartRect.left + heartRect.width / 2 - sceneRect.left;
  const startY = heartRect.top + heartRect.height / 2 - sceneRect.top;

  el.style.left = startX + "px";
  el.style.top = startY + "px";

  const angle = Math.random() * 120 - 150;
  const shootForce = rand(180, 250);
  const shootX = Math.cos((angle * Math.PI) / 180) * shootForce;
  const shootY = Math.sin((angle * Math.PI) / 180) * shootForce;

  el.style.setProperty("--shoot-x", shootX + "px");
  el.style.setProperty("--shoot-y", shootY + "px");
  el.style.setProperty("--final-x", (shootX + rand(-100, 100)) + "px");
  el.style.setProperty("--final-y", (shootY + rand(300, 500)) + "px");
  el.style.setProperty("--rotation", rand(-20, 20) + "deg");
  el.style.setProperty("--final-rotation", rand(-40, 40) + "deg");
  el.style.setProperty("--duration", rand(5, 7) + "s");
}

// Các hàm phụ trợ (Nhạc, Sao, Galaxy) giữ nguyên
function activateMusic() { musicPlayer.classList.add("active"); audioPlayer.play().then(() => { isPlaying = true; showPauseIcon(); }).catch(e => console.log(e)); }
function showPlayIcon() { playIcon.style.display = "block"; pauseIcon.style.display = "none"; }
function showPauseIcon() { playIcon.style.display = "none"; pauseIcon.style.display = "block"; }
function togglePlayPause() { if (isPlaying) { audioPlayer.pause(); showPlayIcon(); isPlaying = false; } else { audioPlayer.play().then(() => { showPauseIcon(); isPlaying = true; }); } }
function updateProgress() { if (audioPlayer.duration) { progressFill.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + "%"; currentTimeEl.textContent = formatTime(audioPlayer.currentTime); totalTimeEl.textContent = formatTime(audioPlayer.duration); } }
function formatTime(s) { return Math.floor(s/60) + ":" + (Math.floor(s%60) < 10 ? "0" : "") + Math.floor(s%60); }
function createParticlesBurst() { const heartRect = heartBtn.getBoundingClientRect(); const sceneRect = scene.getBoundingClientRect(); const centerX = heartRect.left + heartRect.width / 2 - sceneRect.left; const centerY = heartRect.top + heartRect.height / 2 - sceneRect.top; for (let i = 0; i < 12; i++) { const p = document.createElement("div"); p.className = "particle burst"; p.style.left = centerX + "px"; p.style.top = centerY + "px"; const a = Math.random() * 360; const d = rand(50, 90); p.style.setProperty("--particle-x", Math.cos(a * Math.PI / 180) * d + "px"); p.style.setProperty("--particle-y", Math.sin(a * Math.PI / 180) * d + "px"); scene.appendChild(p); p.addEventListener("animationend", () => p.remove()); } }
const starsContainer = document.getElementById("starsContainer");
function initGalaxy() { for (let i = 0; i < 150; i++) createStar("star"); for (let i = 0; i < 20; i++) createStar("star-cross"); setInterval(createShootingStar, 3000); }
function createStar(className) { const star = document.createElement("div"); star.className = className; if (className === "star") { const s = rand(1, 3); star.style.width = s + "px"; star.style.height = s + "px"; } star.style.left = Math.random() * 100 + "%"; star.style.top = Math.random() * 100 + "%"; star.style.setProperty("--duration", rand(2, 5) + "s"); starsContainer.appendChild(star); }
function createShootingStar() { const s = document.createElement("div"); s.className = "shooting-star"; const a = rand(20, 45); s.style.left = rand(-10, 30) + "%"; s.style.top = rand(-10, 40) + "%"; s.style.setProperty("--angle", a + "deg"); s.style.setProperty("--duration", rand(1.2, 2.2) + "s"); s.style.setProperty("--move-x", Math.cos(a * Math.PI / 180) * (window.innerWidth + 500) + "px"); s.style.setProperty("--move-y", Math.sin(a * Math.PI / 180) * (window.innerWidth + 500) + "px"); starsContainer.appendChild(s); s.addEventListener("animationend", () => s.remove()); }
function rand(min, max) { return Math.random() * (max - min) + min; }

heartBtn.addEventListener("click", triggerRelease);
playPauseBtn.addEventListener("click", togglePlayPause);
progressBar.addEventListener("click", (e) => { const rect = progressBar.getBoundingClientRect(); audioPlayer.currentTime = ((e.clientX - rect.left) / rect.width) * audioPlayer.duration; });
audioPlayer.addEventListener("timeupdate", updateProgress);
toggleBtn.addEventListener("click", () => musicPlayer.classList.toggle("minimized"));

initGalaxy();

