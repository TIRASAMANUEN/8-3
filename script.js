const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Khởi tạo vùng chứa sao riêng biệt
const galaxyLayer = document.createElement("div");
galaxyLayer.style.cssText = "position:absolute; inset:0; z-index:1; pointer-events:none; overflow:hidden;";
scene.appendChild(galaxyLayer);

// 2. Hàm tạo sao TRẮNG SÁNG (Xử lý triệt để đốm đen)
function buildGalaxy() {
  galaxyLayer.innerHTML = "";
  // Ép nền tối để sao nổi bật
  scene.style.background = "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)";
  
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2 + 0.5;
    const duration = Math.random() * 3 + 2;
    
    // Gán style trực tiếp để ghi đè mọi CSS cũ
    star.style.cssText = `
      position: absolute;
      background: #ffffff !important;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      box-shadow: 0 0 ${size * 2}px #ffffff, 0 0 ${size * 5}px rgba(255,255,255,0.6);
      opacity: ${Math.random() * 0.8 + 0.2};
      animation: sparkle ${duration}s infinite ease-in-out;
    `;
    galaxyLayer.appendChild(star);
  }
}

// Thêm keyframes cho hiệu ứng lấp lánh
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes sparkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.4); }
  }
`;
document.head.appendChild(styleSheet);

// Chạy hàm tạo sao ngay lập tức
buildGalaxy();

// 3. Logic xếp 10 ảnh quanh trái tim (Vòng Elip)
function getPosition(index) {
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

function showPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };
  
  const pos = getPosition(index);
  const rot = (Math.random() - 0.5) * 25;

  img.style.cssText = `
    position: absolute; width: 150px; height: 210px;
    left: ${pos.x}px; top: ${pos.y}px;
    border: 5px solid white; border-radius: 12px;
    box-shadow: 0 12px 35px rgba(0,0,0,0.6);
    object-fit: cover; z-index: 10;
    transform: rotate(${rot}deg) scale(0);
    transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: none;
  `;
  scene.appendChild(img);
  setTimeout(() => { img.style.transform = `rotate(${rot}deg) scale(1)`; }, 50);
}

// 4. Lời chúc đỗ NV1 (Hiện cuối cùng)
function showFinalMessage() {
  const msg = document.createElement("div");
  msg.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
  msg.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 25px 45px; border-radius: 50px;
    color: white; font-size: 1.6rem; font-family: 'Pattaya', sans-serif;
    text-align: center; box-shadow: 0 0 50px #ff2b4f;
    z-index: 100; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
  `;
  scene.appendChild(msg);
  setTimeout(() => { msg.style.transform = "translate(-50%, -50%) scale(1)"; }, 100);
}

// 5. Xử lý click trái tim
heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(() => {});
  
  if (clickCount < totalPhotos) {
    clickCount++;
    heartBtn.classList.add("clicked");
    setTimeout(() => heartBtn.classList.remove("clicked"), 700);
    
    showPhoto(clickCount);
    
    if (clickCount === totalPhotos) {
      setTimeout(showFinalMessage, 600);
    }
  }
});

// Cập nhật lại khi xoay màn hình
window.onresize = buildGalaxy;
