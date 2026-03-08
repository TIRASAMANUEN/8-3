// Bạn cần giữ lại các hàm bổ trợ như applyMotion và các biến clickCount ở đầu file cũ của bạn nhé
// Dưới đây là 2 hàm quan trọng nhất cần thay thế:

function createImageElement(index) {
  const img = document.createElement("img");
  // Thử tìm ảnh ở thư mục gốc trước (anh1.jpg)
  img.src = `anh${index}.jpg`; 
  
  // Nếu không thấy ảnh ở gốc, tự động tìm trong thư mục "ảnh"
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
    object-fit: cover;
    z-index: 100;
  `;
  
  if (typeof applyMotion === "function") {
    applyMotion(img);
  }
  
  document.getElementById("scene").appendChild(img);
  img.addEventListener("animationend", () => img.remove(), { once: true });
}

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
    padding: 35px 50px;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    font-size: 1.8rem;
    box-shadow: 0 0 50px rgba(255, 43, 79, 0.8);
    z-index: 9999;
    text-align: center;
    max-width: 85%;
    opacity: 0; 
    transition: opacity 2s ease;
  `;
  document.getElementById("scene").appendChild(el);
  setTimeout(() => { el.style.opacity = "1"; }, 100);
}
