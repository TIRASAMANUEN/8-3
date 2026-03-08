const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
const starsContainer = document.getElementById("starsContainer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Hàm tạo Galaxy trắng sáng - Chống đốm đen tuyệt đối
function buildGalaxy() {
  if (!starsContainer) return;
  
  // Xóa sạch để làm mới
  starsContainer.innerHTML = "";
  
  // Ép container hiện lên trên cùng của lớp nền
  starsContainer.style.position = "absolute";
  starsContainer.style.inset = "0";
  starsContainer.style.zIndex = "1";
  starsContainer.style.pointerEvents = "none";

  for (let i = 0; i < 160; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2 + 0.8;
    const duration = Math.random() * 3 + 2;
    
    // Thiết lập từng thuộc tính để ép trình duyệt bỏ qua CSS cũ
    star.style.position = "absolute";
    star.style.backgroundColor = "#ffffff"; // Trắng tinh khiết
    star.style.borderRadius = "50%";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    
    // Tạo quầng sáng trắng quanh sao
    star.style.boxShadow = `0 0 ${size * 2}px #ffffff, 0 0 ${size * 4}px rgba(255,255,255,0.8)`;
    
    star.style.opacity = Math.random() * 0.7 + 0.3;
    star.style.zIndex = "2";
    
    // Gán animation lấp lánh
    star.style.animation = `pureSparkle ${duration}s infinite ease-in-out`;
    
    starsContainer.appendChild(star);
  }
}

// 2. Chèn trực tiếp Animation vào tài liệu
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pureSparkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  /* Đảm bảo trái tim luôn nằm trên sao */
  #heartBtn { z-index: 100 !important; position: relative; }
`;
document.head.appendChild(styleSheet);

// Chạy ngay khi tải trang
buildGalaxy();

// 3. Hàm tính toán vị trí ảnh (Vòng Elip nghệ thuật)
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
  img.style.zIndex = "50";
  img.style.transform = `rotate(${rotation}deg) scale(0)`;
  img.style.transition = "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  
  scene.appendChild(img);
  setTimeout(() => { img.style.transform = `rotate(${rotation}deg) scale(1)`; }, 50);
}

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
    z-index: 200; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
  `;
  scene.appendChild(box);
  setTimeout(() => { box.style.transform = "translate(-50%, -50%) scale(1)"; }, 100);
}

// 4. Sự kiện Click
heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(() => {});
  
  if (clickCount < totalPhotos) {
    clickCount++;
    // Hiệu ứng đập tim
    heartBtn.classList.add("clicked");
    setTimeout(() => heartBtn.classList.remove("clicked"), 700);
    
    spawnPhoto(clickCount);
    
    if (clickCount === totalPhotos) {
      setTimeout(showFinal, 600);
    }
  }
});

// Cập nhật lại sao khi thay đổi kích thước màn hình
window.addEventListener("resize", buildGalaxy);
