const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const audio = document.getElementById("audioPlayer");
let clickCount = 0;
const totalPhotos = 10;

// 1. Tự tạo một vùng chứa sao mới (bỏ qua cái cũ trong HTML)
const myGalaxy = document.createElement("div");
myGalaxy.style.cssText = "position:absolute;inset:0;z-index:1;pointer-events:none;";
scene.appendChild(myGalaxy);

function tạoSaoLungLinh() {
    myGalaxy.innerHTML = "";
    // Ép màu nền chuẩn tối để sao nổi lên
    scene.style.background = "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)";
    scene.setAttribute("data-bg", "stars");

    for (let i = 0; i < 150; i++) {
        const s = document.createElement("div");
        const size = Math.random() * 2 + 1;
        // Đặt tên class mới hoàn toàn là 'dom-sao' để không bị CSS cũ đè
        s.style.cssText = `
            position: absolute;
            background: white;
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${size * 2}px #fff;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: saoBay ${Math.random() * 3 + 2}s infinite ease-in-out;
        `;
        myGalaxy.appendChild(s);
    }
}

// Chèn hiệu ứng nhấp nháy mới
const style = document.createElement("style");
style.innerHTML = `
    @keyframes saoBay {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
    }
`;
document.head.appendChild(style);

tạoSaoLungLinh();

// 2. Thuật toán xếp 10 ảnh quanh trái tim (Elip cân đối)
function layViTri(index) {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const rx = Math.min(sw * 0.35, sw / 2 - 130);
    const ry = Math.min(sh * 0.38, sh / 2 - 130);
    const angle = (index - 1) * (Math.PI * 2) / 10 - Math.PI / 2;
    return {
        x: sw / 2 + rx * Math.cos(angle) - 75, // 75 là nửa chiều rộng ảnh
        y: sh / 2 + ry * Math.sin(angle) - 105 // 105 là nửa chiều cao ảnh
    };
}

function hienAnh(index) {
    const img = document.createElement("img");
    img.src = `anh${index}.jpg`;
    img.onerror = () => { img.src = `ảnh/anh${index}.jpg`; };
    
    const pos = layViTri(index);
    const rot = (Math.random() - 0.5) * 20;

    img.style.cssText = `
        position: absolute; width: 150px; height: 210px;
        left: ${pos.x}px; top: ${pos.y}px;
        border: 5px solid white; border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5); object-fit: cover;
        z-index: 10; transform: rotate(${rot}deg) scale(0);
        transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    scene.appendChild(img);
    setTimeout(() => img.style.transform = `rotate(${rot}deg) scale(1)`, 50);
}

function loiChuc() {
    const d = document.createElement("div");
    d.innerHTML = "Chúc cốt 8/3 xinh đẹp<br>và đỗ NV1 nhe!!! ❤️";
    d.style.cssText = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #ff6b81, #ff2b4f);
        padding: 25px 40px; border-radius: 50px;
        color: white; font-size: 1.6rem; font-family: 'Pattaya', sans-serif;
        text-align: center; box-shadow: 0 0 40px #ff2b4f;
        z-index: 100; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        white-space: nowrap;
    `;
    scene.appendChild(d);
    setTimeout(() => d.style.transform = "translate(-50%, -50%) scale(1)", 100);
}

heartBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(()=>{});
    if (clickCount < totalPhotos) {
        clickCount++;
        heartBtn.classList.add("clicked");
        setTimeout(() => heartBtn.classList.remove("clicked"), 500);
        hienAnh(clickCount);
        if (clickCount === totalPhotos) setTimeout(loiChuc, 500);
    }
});

window.onresize = tạoSaoLungLinh;
