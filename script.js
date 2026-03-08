const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;

// Danh sách lưu vị trí của các ảnh đã hiện để kiểm tra va chạm
const occupiedAreas = [];

// 1. Tạo hiệu ứng sao bay nền
function createStars() {
  const container = document.getElementById("starsContainer");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
    container.appendChild(star);
  }
}
createStars();

// 2. Thuật toán kiểm tra vị trí ngẫu nhiên không va chạm
function getSafeRandomPosition(width, height) {
  const padding = 20; // Khoảng cách tối thiểu giữa các ảnh
  let maxAttempts = 50; // Số lần thử tối đa để tìm vị trí trống
  let pos = { x: 0, y: 0 };

  // Định nghĩa vùng an toàn ở giữa cho lời chúc cuối
  const safeZone = {
    x: scene.clientWidth / 2 - 200, // Chiều rộng vùng an toàn khoảng 400px
    y: scene.clientHeight / 2 - 150, // Chiều cao vùng an toàn khoảng 300px
    width: 400,
    height: 300,
  };

  while (maxAttempts > 0) {
    pos.x = Math.random() * (scene.clientWidth - width - padding * 2) + padding;
    pos.y = Math.random() * (scene.clientHeight - height - padding * 2) + padding;

    // Kiểm tra xem vị trí có nằm trong vùng an toàn của lời chúc không
    const inSafeZone =
      pos.x < safeZone.x + safeZone.width &&
      pos.x + width > safeZone.x &&
      pos.y < safeZone.y + safeZone.height &&
      pos.y + height > safeZone.y;

    if (inSafeZone) {
      maxAttempts--;
      continue; // Thử lại vị trí khác
    }

    // Kiểm tra xem vị trí có va chạm với các ảnh đã tồn tại không
    let isCollision = false;
    for (let area of occupiedAreas) {
      if (
        pos.x < area.x + area.width + padding &&
        pos.x + width > area.x - padding &&
        pos.y < area.y + area.height + padding &&
        pos.y + height > area.y - padding
      ) {
        isCollision = true;
        break;
      }
    }

    if (!isCollision) {
      occupiedAreas.push({ x: pos.x, y: pos.y, width: width, height: height });
      return pos; // Tìm thấy vị trí an toàn
    }
    maxAttempts--;
  }

  // Nếu không tìm thấy, trả về một vị trí mặc định để ảnh không bị "lạc"
  return pos;
}

// 3. Hàm tạo ảnh kỷ niệm bay ra và TỒN TẠI VĨNH VIỄN
function createImageElement(index) {
  const img = document.createElement("img");
  img.src = `anh${index}.jpg`;
  img.onerror = function() {
    this.src = `ảnh/anh${index}.jpg`;
  };

  // Định nghĩa kích thước cố định cho ảnh để thuật toán kiểm tra va chạm hoạt động chính xác
  const imgWidth = 200;
  const imgHeight = 250; // Giả sử ảnh dọc

  img.className = "phrase shooting";
  img.style.cssText = `
    width: ${imgWidth}px;
    height: ${imgHeight}px;
    border-radius: 15px;
    border: 5px solid #fff;
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
    position: absolute;
    z-index: 100;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease, transform 0.5s ease;
  `;

  const pos = getSafeRandomPosition(imgWidth, imgHeight);
  img.style.left = `${pos.x}px`;
  img.style.top = `${pos.y}px`;

  scene.appendChild(img);

  // Hiệu ứng hiện dần lên sau khi tìm được vị trí an toàn
  setTimeout(() => {
    img.style.opacity = "1";
    // Thêm một chút xoay ngẫu nhiên để trông tự nhiên hơn
    img.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
  }, 100);
}

// 4. Hàm hiện lời chúc cuối cùng
function showFinalWish() {
  if (document.getElementById("special-wish")) return;
  const el = document.createElement("div");
  el.id = "special-wish";
  el.textContent = "Chúc cốt 8/3 xinh đẹp và đỗ NV1 nhe!!! ❤️";
  el.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #ff6b81, #ff2b4f);
    padding: 30px 40px;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    box-shadow: 0 0 50px rgba(255, 43, 79, 0.8);
    z-index: 9999;
    text-align: center;
    max-width: 80%;
    opacity: 0; 
    transition: opacity 2s ease;
  `;
  scene.appendChild(el);
  setTimeout(() => { el.style.opacity = "1"; }, 100);
}

// 5. Xử lý khi nhấn vào trái tim
heartBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();

  clickCount++;
  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 700);

  if (clickCount <= 9) {
    createImageElement(clickCount);
  } else if (clickCount === 10) {
    showFinalWish();
  }
});
