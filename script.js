const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const totalPhotos = 10; 

// 1. Tạo sao lấp lánh nền (Giữ nguyên phong cách của bạn)
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

// 2. Thuật toán xếp ảnh: Đã thu hẹp bán kính để ảnh gần tim hơn
function getEllipseSpot(index, total, w, h) {
  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const cx = sw / 2;
  const cy = sh / 2;

  // ĐIỀU CHỈNH TẠI ĐÂY: 
  // Giảm tỷ lệ từ 0.70 xuống 0.45 để ảnh gom sát vào trái tim hơn
  const rx = Math.min(sw * 0.28, sw / 2 - w); 
  const ry = Math.min(sh * 0.32, sh / 2 - h); 

  const angle = (index - 1) * (Math.PI * 2) / total - Math.PI / 2;

  const x = cx + rx * Math.cos(angle) - w / 2;
  const y = cy + ry * Math.sin(angle) - h / 2;

  return { x, y };
}

// 3. Hiện ảnh mượt mà
function spawnPhoto(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };

  const w = 150; 
  const h = 210; 
  const spot = getEllipseSpot(index, totalPhotos, w, h);

  // Độ nghiêng nhẹ (giảm xuống 15 độ cho đỡ rối khi gom gần)
  const randomRotate = (Math.random() - 0.5) * 15;  

  img.style.cssText = `
    position: absolute;
    width: ${w}px;
    height: ${h}px;
    left: ${spot.x}px;
    top: ${spot.
