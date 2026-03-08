const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;

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

// 2. Hàm bổ trợ chuyển động (Hàm này cực kỳ quan trọng)
function applyMotion(el) {
  const shootX = (Math.random() - 0.5) * 500;
  const shootY = (Math.random() - 0.5) * 500;
  const finalX = (Math.random() - 0.5) * 400;
  const finalY = (Math.random() - 0.5) * 400;
  const rotation = (Math.random() - 0.5) * 45;

  el.style.setProperty("--shoot-x", `${shootX}px`);
  el.style.setProperty("--shoot-y", `${shootY}px`);
  el.style.setProperty("--final-x", `${finalX}px`);
  el.style.setProperty("--final-y", `${finalY}px`);
  el.style.setProperty("--rotation", `${rotation}deg`);
  el.style.setProperty("--duration", "5s");
}

// 3. Hàm tạo ảnh kỷ niệm bay ra
function createImageElement(index) {
  const img = document.createElement("img");
  // Thử tìm ảnh ở ngoài trước, nếu lỗi thì tìm trong thư mục "ảnh"
  img.src = `anh${index}.jpg`;
  img.onerror = function() {
    this.src = `ảnh/anh${index}.jpg`;
  };
  
  img.className = "phrase shooting";
  img.style.cssText = `
    width: 200px;
    height: auto;
    border-radius: 15px;
    border: 5px solid #fff;
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
    position: absolute;
    z-index: 100;
  `;
  
  applyMotion(img);
  scene.appendChild(img);
  img.addEventListener("animationend", () => img.remove());
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
