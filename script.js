const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const placedPhotos = [];

// 1. Tạo sao lấp lánh (dựa trên class của style.css)
function createStars() {
  const container = document.getElementById("starsContainer");
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = Math.random() * 3 + "px";
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
    container.appendChild(star);
  }
}
createStars();

// 2. Thuật toán tìm chỗ an toàn (Tránh đè lời chúc và đè nhau)
function getSafeSpot(w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const cx = sw / 2;
  const cy = sh / 2;
  const safeR = 250; // Vùng cấm to ra một chút để lời chúc thoáng hơn

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * (sw - w - 40) + 20;
    const y = Math.random() * (sh - h - 40) + 20;

    const dist = Math.sqrt(Math.pow(x + w/2 - cx, 2) + Math.pow(y + h/2 - cy, 2));
    if (dist < safeR) continue;

    let hit = false;
    for (const p of placedPhotos) {
      if (!(x + w + 15 < p.x || x > p.x + p.w + 15 || y + h + 15 < p.y || y > p.y + p.h + 15)) {
        hit = true; break;
      }
    }
    if (!hit) {
      placedPhotos.push({x, y, w, h});
      return {x, y};
    }
  }
  return {x: Math.random() * (sw-w), y: Math.random() * (sh-h)};
}

// 3. Hiện ảnh (Code này miễn nhiễm với mọi lỗi biến mất)
function spawnPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };

  const w = 170; const h = 230;
  const spot = getSafeSpot(w, h);

  // Viết thẳng CSS vào ảnh để không bị file css bên ngoài can thiệp
  img.style.cssText = `
    position: absolute;
    width: ${w}px;
    height: ${h}px;
    left: ${spot.x}px;
    top: ${spot.y}px;
    border: 6px solid white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    object-fit: cover;
    z-index: 10;
    transform: rotate(${(Math.random() - 0.5) * 30}deg) scale(0);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;

  scene.appendChild(img);
  setTimeout(() => { img.style.transform = img.style.transform.replace("scale(0)", "scale(1)"); }, 50);
}

// 4. Lời chúc cuối cùng
function showFinal() {
  const el = document.createElement("div");
  el.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
  el.style.cssText = `
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 30px 50px;
    border-radius: 50px;
    color: white;
    font-size: 1.8rem;
    font-family: 'Pattaya', sans-serif;
    text-align: center;
    box-shadow: 0 0 50px rgba(255, 43, 79, 0.8);
    z-index: 100;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
  `;
  scene.appendChild(el);
  setTimeout(() => el.style.transform = "translate(-50%, -50%) scale(1)", 100);
}

// 5. Nút bấm
heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(()=>{});
  clickCount++;
  
  // Kích hoạt class "clicked" để nháy hiệu ứng trong style.css của bạn
  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 800);

  if (clickCount <= 9) spawnPhoto(clickCount);
  if (clickCount === 10) showFinal();
});
