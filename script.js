const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const placedPhotos = [];

// 1. Tạo sao
function createStars() {
  const container = document.getElementById("starsContainer");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = star.style.height = Math.random() * 3 + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
    container.appendChild(star);
  }
}
createStars();

// 2. Tìm vị trí không đè nhau và né tâm
function getSafeSpot(w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const cx = sw / 2;
  const cy = sh / 2;
  const safeR = 220; // Vùng cấm ở giữa

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * (sw - w - 40) + 20;
    const y = Math.random() * (sh - h - 40) + 20;

    // Né tâm
    const dist = Math.sqrt(Math.pow(x + w/2 - cx, 2) + Math.pow(y + h/2 - cy, 2));
    if (dist < safeR) continue;

    // Né ảnh cũ
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
  return {x: 10, y: 10};
}

// 3. Hiện ảnh (Vĩnh viễn)
function spawnPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => img.src = `ảnh/anh${index}.jpg`;
  img.className = "photo-item";

  const w = 160; const h = 220;
  const spot = getSafeSpot(w, h);

  img.style.width = w + "px";
  img.style.height = h + "px";
  img.style.left = spot.x + "px";
  img.style.top = spot.y + "px";
  img.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg) scale(0)`;
  img.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

  scene.appendChild(img);
  setTimeout(() => img.style.transform += " scale(1)", 50);
}

// 4. Hiện lời chúc
function showFinal() {
  const el = document.createElement("div");
  el.id = "final-wish";
  el.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
  scene.appendChild(el);
  setTimeout(() => el.style.transform = "translate(-50%, -50%) scale(1)", 100);
}

heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  clickCount++;
  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 500);

  if (clickCount <= 9) spawnPhoto(clickCount);
  if (clickCount === 10) showFinal();
});
