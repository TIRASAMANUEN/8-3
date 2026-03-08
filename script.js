const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const placedPhotos = []; // Lưu vị trí ảnh để tránh đè nhau

// 1. Tạo sao nền
function createStars() {
  const container = document.getElementById("starsContainer");
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
    container.appendChild(star);
  }
}
createStars();

// 2. Thuật toán tìm chỗ trống (Tránh tâm màn hình và tránh nhau)
function findSafeSpot(width, height) {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const centerX = screenW / 2;
  const centerY = screenH / 2;
  const forbiddenRadius = 200; // Vùng cấm xung quanh lời chúc ở giữa

  for (let attempt = 0; attempt < 100; attempt++) {
    const x = Math.random() * (screenW - width);
    const y = Math.random() * (screenH - height);

    // Kiểm tra xem có đè vào giữa không
    const distToCenter = Math.sqrt(Math.pow(x + width/2 - centerX, 2) + Math.pow(y + height/2 - centerY, 2));
    if (distToCenter < forbiddenRadius) continue;

    // Kiểm tra xem có đè lên ảnh cũ không
    let collision = false;
    for (const p of placedPhotos) {
      if (!(x + width < p.x || x > p.x + p.w || y + height < p.y || y > p.y + p.h)) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      placedPhotos.push({x, y, w: width, h: height});
      return {x, y};
    }
  }
  return {x: Math.random() * 50, y: Math.random() * 50}; // Cùng lắm thì dồn vào góc
}

// 3. Tạo ảnh kỷ niệm (Đứng yên vĩnh viễn)
function createImageElement(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = () => img.src = `ảnh/anh${index}.jpg`;

  const w = 180; // Chiều rộng ảnh
  const h = 240; // Chiều cao ảnh
  const spot = findSafeSpot(w, h);

  img.style.cssText = `
    position: absolute;
    width: ${w}px;
    height: ${h}px;
    left: ${spot.x}px;
    top: ${spot.y}px;
    border: 6px solid white;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    object-fit: cover;
    z-index: 10;
    transform: rotate(${(Math.random() - 0.5) * 30}deg) scale(0);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;

  scene.appendChild(img);
  setTimeout(() => img.style.transform += " scale(1)", 50); // Hiệu ứng hiện ra
}

// 4. Lời chúc cuối (Nằm trên cùng)
function showFinalWish() {
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
    font-weight: bold;
    text-align: center;
    box-shadow: 0 0 50px rgba(255, 43, 79, 0.8);
    z-index: 9999;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  scene.appendChild(el);
  setTimeout(() => el.style.transform = "translate(-50%, -50%) scale(1)", 100);
}

heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  clickCount++;
  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 300);

  if (clickCount <= 9) createImageElement(clickCount);
  if (clickCount === 10) showFinalWish();
});
