const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
const starsContainer = document.getElementById("starsContainer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Tạo sao trực tiếp bằng JS - Không dùng class .star của CSS để tránh bị đè opacity
function createGalaxy() {
  starsContainer.innerHTML = ""; 
  // Ép nền scene tối đi để thấy sao rõ hơn
  scene.style.background = "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)";

  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 3 + 2;
    
    // Dùng style.cssText để ghi đè hoàn toàn mọi thuộc tính CSS có sẵn
    star.style.cssText = `
      position: absolute !important;
      background: white !important;
      border-radius: 50% !important;
      width: ${size}px !important;
      height: ${size}px !important;
      left: ${Math.random() * 100}% !important;
      top: ${Math.random() * 100}% !important;
      box-shadow: 0 0 ${size * 2}px #fff !important;
      z-index: 5 !important; 
      pointer-events: none !important;
      opacity: ${Math.random() * 0.7 + 0.3} !important;
      animation: customTwinkle ${duration}s infinite ease-in-out !important;
    `;
    starsContainer.appendChild(star);
  }
}

// Tạo keyframe riêng để không bị trùng với CSS cũ
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes customTwinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
`;
document.head.appendChild(styleSheet);

createGalaxy();

// 2. Xếp 10 ảnh theo vòng Elip cực cân đối
function getEllipseSpot(index, total, w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const rx = Math.min(sw * 0.36, sw / 2 - 120);
  const ry = Math.min(sh * 0.38, sh / 2 - 120);
  const angle = (index - 1) * (Math.PI * 2) / total - Math.PI / 2;
  return {
    x: sw / 2 + rx * Math.cos(angle) - w / 2,
    y: sh / 2 + ry * Math.sin(angle) - h / 2
  };
}

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
    border: 5px solid white; border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6); object-fit: cover;
    z-index: 20; transform: rotate(${rotation}deg) scale(0);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  scene.appendChild(img);
  setTimeout(() => { img.style.transform = `rotate(${rotation}deg) scale(1)`; }, 50);
}

function showFinal() {
  const el = document.createElement("div");
  el.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
  el.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 25px 45px; border-radius: 50px;
    color: white; font-size: 1.6rem; font-family: 'Pattaya', sans-serif;
    text-align: center; box-shadow: 0 0 50px rgba(255, 43, 79, 1);
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
    setTimeout(() => heartBtn.classList.remove("clicked"), 700);
    spawnPhoto(clickCount);
    if (clickCount === totalPhotos) setTimeout(showFinal, 500);
  }
});

window.addEventListener('resize', createGalaxy);
