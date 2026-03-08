const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
const starsContainer = document.getElementById("starsContainer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Hàm tạo sao rực rỡ - Ép lên tầng trên lớp Nebula
function createGalaxy() {
  starsContainer.innerHTML = ""; // Xóa cũ tạo mới
  
  // Tạo 120 ngôi sao với kích thước khác nhau
  for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2.5 + 1;
    
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
      z-index: 2; /* Ép sao hiện trên lớp Nebula của CSS */
      pointer-events: none;
      --duration: ${Math.random() * 3 + 2}s;
      animation: starTwinkle var(--duration) ease-in-out infinite;
    `;
    starsContainer.appendChild(star);
  }
}

createGalaxy();

// 2. Thuật toán xếp 10 ảnh thành vòng Elip cân đối
function getEllipseSpot(index, total, w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  
  // Bán kính Elip chiếm khoảng 35-38% màn hình để không bị tràn
  const rx = Math.min(sw * 0.35, sw / 2 - 120);
  const ry = Math.min(sh * 0.38, sh / 2 - 120);
  
  // Chia đều 360 độ cho 10 ảnh
  const angle = (index - 1) * (Math.PI * 2) / total - Math.PI / 2;

  return {
    x: sw / 2 + rx * Math.cos(angle) - w / 2,
    y: sh / 2 + ry * Math.sin(angle) - h / 2
  };
}

// 3. Hàm tạo ảnh khi click
function spawnPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };
  
  const w = 150, h = 210;
  const spot = getEllipseSpot(index, totalPhotos, w, h);
  const rotation = (Math.random() - 0.5) * 20; // Nghiêng nhẹ cho nghệ thuật

  img.style.cssText = `
    position: absolute; 
    width: ${w}px; 
    height: ${h}px;
    left: ${spot.x}px; 
    top: ${spot.y}px;
    border: 5px solid white; 
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6); 
    object-fit: cover;
    z-index: 10; 
    transform: rotate(${rotation}deg) scale(0);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  scene.appendChild(img);
  setTimeout(() => { 
    img.style.transform = `rotate(${rotation}deg) scale(1)`; 
  }, 50);
}

// 4. Lời chúc đỗ NV1 xuất hiện cuối cùng
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

// 5. Sự kiện bấm tim
heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(()=>{});
  
  if (clickCount < totalPhotos) {
    clickCount++;
    // Hiệu ứng đập tim mạnh (mượn từ CSS của bạn)
    heartBtn.classList.add("clicked");
    setTimeout(() => heartBtn.classList.remove("clicked"), 700);
    
    spawnPhoto(clickCount);
    
    if (clickCount === totalPhotos) {
      setTimeout(showFinal, 500);
    }
  }
});

// Cập nhật lại sao khi xoay màn hình
window.addEventListener('resize', createGalaxy);
