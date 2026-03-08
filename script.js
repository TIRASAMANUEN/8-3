const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
const starsContainer = document.getElementById("starsContainer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Hàm tạo Galaxy - Đảm bảo TRẮNG, SÁNG, NẰM DƯỚI
function buildGalaxy() {
  if (!starsContainer) return;
  
  starsContainer.innerHTML = "";
  
  // Ép vùng chứa sao nằm dưới cùng nhưng trên Nebula
  starsContainer.style.position = "absolute";
  starsContainer.style.inset = "0";
  starsContainer.style.zIndex = "0"; // Nằm dưới trái tim (z-index 100)
  starsContainer.style.pointerEvents = "none";

  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    // Tăng kích thước để không bị thành đốm đen (1.5px - 3.5px)
    const size = Math.random() * 2 + 1.5; 
    const duration = Math.random() * 3 + 2;
    
    star.style.position = "absolute";
    star.style.backgroundColor = "#ffffff"; // Trắng tinh
    star.style.borderRadius = "50%";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    
    // Đổ bóng màu trắng mạnh để tạo độ rực rỡ
    star.style.boxShadow = `0 0 ${size * 2}px #ffffff, 0 0 ${size * 5}px rgba(255,255,255,0.9)`;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.filter = "none"; // Chặn mọi filter làm tối sao
    
    // Gán animation
    star.style.animation = `starFlash ${duration}s infinite ease-in-out`;
    
    starsContainer.appendChild(star);
  }
}

// 2. Chèn CSS bổ sung để cố định thứ tự hiển thị
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes starFlash {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.4); }
  }
  /* Trái tim phải nằm trên cùng */
  .heart-container { z-index: 100 !important; position: relative; }
  #heartBtn { z-index: 101 !important; }
  /* Đảm bảo ảnh cũng nằm trên sao */
  .scene img { z-index: 50 !important; }
`;
document.head.appendChild(styleSheet);

buildGalaxy();

// 3. Logic ảnh (Giữ nguyên thuật toán Elip chuẩn của bạn)
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
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };
  
  const pos = getEllipsePos(index);
  const rotation = (Math.random() - 0.5) * 25;

  img.style.position = "absolute";
  img.style.width = "150px";
  img.style.height = "210px";
  img.style.left = pos.x + "px";
  img.style.top = pos.y + "px";
  img.style.border = "5px solid white";
  img.style.borderRadius = "12px";
  img.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
  img.style.objectFit = "cover";
  img.style.transform = `rotate(${rotation}deg) scale(0)`;
  img.style.transition = "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  
  scene.appendChild(img);
  setTimeout(() => { img.style.transform = `rotate(${rotation}deg) scale(1)`; }, 50);
}

function showFinal() {
  const box = document.createElement("div
