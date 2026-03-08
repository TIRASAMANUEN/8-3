const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const totalPhotos = 10;
const placedPhotos = [];

// 1. Hàm tạo bầu trời sao và mây khí (Nebula) rực rỡ
function createGalaxy() {
  const container = document.getElementById("starsContainer");
  
  // Tạo mây khí Nebula bằng code để đảm bảo luôn hiện
  scene.style.background = "radial-gradient(circle at bottom, #1b2735 0%, #090a0f 100%)";
  const nebula = document.createElement("div");
  nebula.style.cssText = `
    position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: radial-gradient(circle at 15% 50%, rgba(75, 0, 130, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(0, 0, 139, 0.15) 0%, transparent 50%);
    filter: blur(60px);
  `;
  scene.appendChild(nebula);

  // Tạo 100 ngôi sao lấp lánh
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 3;
    star.style.cssText = `
      position: absolute;
      background: white;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      box-shadow: 0 0 ${size * 2}px #fff;
      opacity: ${Math.random()};
      animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out;
    `;
    container.appendChild(star);
  }
}

// Thêm keyframe cho sao lấp lánh vào trực tiếp document
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
`;
document.head.appendChild(styleSheet);

createGalaxy();

// 2. Thuật toán xếp ảnh Elip cân đối
function getEllipseSpot(index, total, w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const rx = Math.min(sw * 0.35, sw / 2 - w);
  const ry = Math.min(sh * 0.38, sh / 2 - h);
  const angle = (index - 1) * (Math.PI * 2) / total - Math.PI / 2;
  return {
    x: sw / 2 + rx * Math.cos(angle) - w / 2,
    y: sh / 2 + ry * Math.sin(angle) - h / 2
  };
}

// 3. Hiện ảnh (Khóa cứng vị trí và hiệu ứng)
function spawnPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };
  const w = 150, h = 210;
  const spot = getEllipseSpot(index, totalPhotos, w, h);
  const rotation = (Math.random() - 0.5) * 20;

  img.style.cssText = `
    position: absolute; width: ${w}px; height: ${h}px;
    left: ${spot.x}px; top: ${spot.y}px;
    border: 5px solid white; border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.5); object-fit: cover;
    z-index: 10; transform: rotate(${rotation}deg) scale(0);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  scene.appendChild(img);
  setTimeout(() => { img.style.transform = `rotate(${rotation}deg) scale(1)`; }, 50);
}

// 4. Lời chúc trung tâm
function showFinal() {
  const el = document.createElement("div");
  el.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
  el.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 25px 45px; border-radius: 50px;
    color: white; font-size: 1.6rem; font-family: 'Pattaya', sans-serif;
    text-align: center; box-shadow: 0 0 40px rgba(255, 43, 79, 0.8);
    z-index: 100; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
  `;
  scene.appendChild(el);
  setTimeout(() => el.style.transform = "translate(-50%, -50%) scale(1)", 100);
}

heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(()=>{});
  if (clickCount < totalPhotos) {
    clickCount++;
    heartBtn.classList.add("clicked");
    setTimeout(() => heartBtn.classList.remove("clicked"), 500);
    spawnPhoto(clickCount);
    if (clickCount === totalPhotos) setTimeout(showFinal, 300);
  }
});
