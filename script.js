const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const totalPhotos = 10; 

// 1. Tạo sao lấp lánh nền
function createStars() {
  const container = document.getElementById("starsContainer");
  if (!container) return;
  container.innerHTML = "";
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

// 2. Thuật toán xếp ảnh: Đã thu hẹp bán kính để ảnh gần tim và cân đối hơn
function getEllipseSpot(index, total, w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const cx = sw / 2;
  const cy = sh / 2;

  // Giảm tỷ lệ từ 0.70 xuống 0.35 để ảnh sát tim hơn, chụp ảnh sẽ đẹp hơn
  const rx = Math.min(sw * 0.35, sw / 2 - w); 
  const ry = Math.min(sh * 0.35, sh / 2 - h); 

  const angle = (index - 1) * (Math.PI * 2) / total - Math.PI / 2;

  const x = cx + rx * Math.cos(angle) - w / 2;
  const y = cy + ry * Math.sin(angle) - h / 2;

  return { x, y };
}

// 3. Hiện ảnh với hiệu ứng mượt mà
function spawnPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };

  const w = 150; 
  const h = 210; 
  const spot = getEllipseSpot(index, totalPhotos, w, h);

  const randomRotate = (Math.random() - 0.5) * 20; 

  img.style.cssText = `
    position: absolute;
    width: ${w}px;
    height: ${h}px;
    left: ${spot.x}px;
    top: ${spot.y}px;
    border: 5px solid white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.6);
    object-fit: cover;
    z-index: 5; /* Thấp hơn trái tim để không chặn click */
    transform: rotate(${randomRotate}deg) scale(0);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: none; /* QUAN TRỌNG: Để chuột có thể xuyên qua ảnh bấm vào tim */
  `;

  scene.appendChild(img);
  
  setTimeout(() => { 
    img.style.transform = `rotate(${randomRotate}deg) scale(1)`; 
  }, 50);
}

// 4. Lời chúc chốt hạ
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
    box-shadow: 0 0 50px rgba(255, 43, 79, 0.9);
    z-index: 1000;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
  `;
  scene.appendChild(el);
  setTimeout(() => el.style.transform = "translate(-50%, -50%) scale(1)", 100);
}

// 5. Nút bấm (Fix lỗi không click được)
heartBtn.style.position = "relative";
heartBtn.style.zIndex = "100"; // Đảm bảo tim luôn nằm trên ảnh

heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(()=>{});
  
  if (clickCount < totalPhotos) {
    clickCount++;
    
    heartBtn.classList.add("clicked");
    setTimeout(() => heartBtn.classList.remove("clicked"), 500);

    spawnPhoto(clickCount);
    
    if (clickCount === totalPhotos) {
      setTimeout(() => showFinal(), 300);
    }
  }
});
