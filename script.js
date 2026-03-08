const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");

let clickCount = 0;
const totalPhotos = 10;

// Tính toán vị trí elip
function getEllipsePos(index) {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    
    // Bán kính elip dựa theo màn hình
    const rx = Math.min(sw * 0.35, sw / 2 - 100);
    const ry = Math.min(sh * 0.38, sh / 2 - 100);
    
    // Góc chia đều cho 10 ảnh
    const angle = (index - 1) * (Math.PI * 2) / 10 - Math.PI / 2;
    
    return {
        x: sw / 2 + rx * Math.cos(angle) - 75, // Trừ nửa chiều rộng ảnh
        y: sh / 2 + ry * Math.sin(angle) - 105 // Trừ nửa chiều cao ảnh
    };
}

function spawnPhoto(index) {
    const img = document.createElement("img");
    img.className = "photo-frame";
    
    // Thử các đường dẫn ảnh
    img.src = `anh${index}.jpg`;
    img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };

    const pos = getEllipsePos(index);
    const rotation = (Math.random() - 0.5) * 30; // Xoay ngẫu nhiên cho tự nhiên

    img.style.left = pos.x + "px";
    img.style.top = pos.y + "px";
    img.style.transform = `rotate(${rotation}deg) scale(0)`;
    img.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    scene.appendChild(img);
    
    // Kích hoạt hiệu ứng hiện ra
    setTimeout(() => {
        img.style.transform = `rotate(${rotation}deg) scale(1)`;
    }, 50);
}

function showFinal() {
    const msg = document.createElement("div");
    msg.className = "final-message";
    msg.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);
}

// Xử lý sự kiện click
heartBtn.addEventListener("click", () => {
    // Phát nhạc
    if (audio.paused) {
        audio.play().catch(() => console.log("Cần click để bật nhạc"));
    }

    if (clickCount < totalPhotos) {
        clickCount++;
        
        // Hiệu ứng nút bấm
        heartBtn.classList.add("clicked");
        setTimeout(() => heartBtn.classList.remove("clicked"), 500);

        // Tạo ảnh
        spawnPhoto(clickCount);

        // Kiểm tra nếu đủ ảnh thì hiện thông điệp
        if (clickCount === totalPhotos) {
            setTimeout(showFinal, 1000);
        }
    }
});

// Cập nhật lại vị trí khi đổi kích thước màn hình
window.addEventListener("resize", () => {
    // Bạn có thể viết code để reload lại vị trí ảnh ở đây nếu cần
});
