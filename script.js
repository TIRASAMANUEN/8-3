const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
const starsContainer = document.getElementById("starsContainer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Hàm tạo Galaxy nguyên bản của bạn
function buildGalaxy() {
  if (!starsContainer) return;
  starsContainer.innerHTML = "";
  
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2 + 1.5; 
    const duration = Math.random() * 3 + 2;
    
    star.style.position = "absolute";
    star.style.backgroundColor = "#ffffff";
    star.style.borderRadius = "50%";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.boxShadow = `0 0 ${size * 2}px #ffffff`;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.animation = `starFlash ${duration}s infinite ease-in-out`;
    
    starsContainer.appendChild(star);
  }
}

// Thêm keyframes cho sao lấp lánh trực tiếp qua JS
const style = document.createElement('style');
style.innerHTML = `
@keyframes starFlash {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.4); }
}`;
document.head.appendChild(style);

buildGalaxy();

// 2. Thuật toán ảnh elip chuẩn của bạn
function getEllipsePos(index) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const rx = Math.min(sw * 0.35, sw / 2 - 130);
  const ry = Math.min(sh * 0.38, sh / 2 - 130);
  const angle = (index - 1) * (Math.PI * 2) / 10 - Math.PI / 2;
  
  return {
    x: sw / 2 + rx * Math.cos(angle) - 75,
    y: sh / 2 + ry * Math.sin(angle) - 105
  };
}

function spawnPhoto(index) {
  const img = document.createElement("img");
  img.className = "photo-frame";
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };
  
  const pos = getEllipsePos(index);
  const rotation = (Math.random() - 0.5) * 25;

  img.style.left = pos.x + "px";
  img.style.top = pos.y + "px";
  img.style.transform = `rotate(${rotation}deg) scale(0)`;
  
  scene.appendChild(img);
  setTimeout(() => { img.style.transform = `rotate(${rotation}deg) scale(1)`; }, 50);
}

// 3. Hàm hiển thị lời chúc (Đã fix lỗi cú pháp)
function showFinal() {
  const box = document.createElement("div");
  box.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
  box.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 25px 45px; border-radius: 50px;
    color: white; font-size: 1.6rem; font-family: 'Pattaya', sans-serif;
    text-align: center; box-shadow: 0 0 50px #ff2b4f;
    z-index: 200; transition: transform 0.8s ease;
  `;
  document.body.appendChild(box);
  setTimeout(() => { box.style.transform = "translate(-50%, -50%) scale(1)"; }, 100);
}

// 4. Sự kiện click trái tim
heartBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(e => console.log("Bật nhạc"));
  }
  
  if (clickCount < totalPhotos) {
    clickCount++;
    spawnPhoto(clickCount);
    if (clickCount === totalPhotos) {
      setTimeout(showFinal, 800);
    }
  }
});
