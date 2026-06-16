emailjs.init({ publicKey: "l06doB2wxnGk4vSmz" });

const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('touchstart', e => {
  e.preventDefault();
}, { passive: false });

const btn = document.getElementById('downloadBtn');
const eraserBtn = document.getElementById('eraserBtn');
const eraserSizeInput = document.getElementById('eraserSize');
const colorPicker = document.getElementById('colorPicker');
const gallery = document.getElementById("gallery");

let isPointerDown = false;
let lastPos = null;
let currentColor = colorPicker.value;
let eraserMode = false;

function updateEraserButtonText() {
  eraserBtn.textContent = eraserMode ? "⊹ ࣪ ˖eraser: (ON) " : "⊹ ࣪ ˖eraser: (OFF) ";
}

updateEraserButtonText();

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
  const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function drawLine(from, to, size, erase) {
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = size;

  if (erase) {
    ctx.globalCompositeOperation = 'destination-out';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = currentColor;
  }

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();

  ctx.globalCompositeOperation = 'source-over';
}

canvas.addEventListener('pointerdown', e => {
  isPointerDown = true;
  lastPos = getPos(e);
  const penSize = 2;
  const size = eraserMode ? Number(eraserSizeInput.value) : penSize;
  drawLine(lastPos, lastPos, size, eraserMode);
  canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener('pointermove', e => {
  if (!isPointerDown) return;
  const pos = getPos(e);
  const penSize = 2;
  const size = eraserMode ? Number(eraserSizeInput.value) : penSize;
  drawLine(lastPos, pos, size, eraserMode);
  lastPos = pos;
});

canvas.addEventListener('pointerup', e => {
  isPointerDown = false;
  lastPos = null;
  try {
    canvas.releasePointerCapture(e.pointerId);
  } catch(_) {
  }
});

colorPicker.addEventListener('change', e => {
  currentColor = e.target.value;
  eraserMode = false;
  updateEraserButtonText();
});

eraserBtn.addEventListener('click', () => {
  eraserMode = !eraserMode;
  updateEraserButtonText();
});

const savedImages = JSON.parse(localStorage.getItem("galleryImages") || "[]");

function loadGallery() {
  savedImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    if (gallery) gallery.appendChild(img);
  });
}
loadGallery();

function compressCanvasDataURL(dataURL, maxWidth, maxHeight, format = "image/png") {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      const ratio = Math.min(maxWidth / width, maxHeight / height);

      width *= ratio;
      height *= ratio;

      tempCanvas.width = width;
      tempCanvas.height = height;

      tempCtx.drawImage(img, 0, 0, width, height);

      resolve(tempCanvas.toDataURL(format));
    };
    img.src = dataURL;
  });
}

btn.addEventListener('click', async () => {
  const originalDataURL = canvas.toDataURL("image/png");

  const img = document.createElement("img");
  img.src = originalDataURL;
  if (gallery) gallery.appendChild(img);
  savedImages.push(originalDataURL);
  localStorage.setItem("galleryImages", JSON.stringify(savedImages));

  const compressedDataURL = await compressCanvasDataURL(originalDataURL, 350, 350);

  const params = {
    to_email: "casfemarta@gmail.com",
    message: "para descargar en .png primero guardar en Google Fotos y de ahí descargar",
    attachment: compressedDataURL
  };

  btn.disabled = true;
  btn.textContent = "► sending...";

  try {
    await emailjs.send("service_o3jmvle", "template_r72a0hl", params);
    alert(":))");
  } catch (err) {
    console.error("E R R O R", err);
    alert("Error al enviar el dibujo :(");
  } finally {
    btn.disabled = false;
    btn.textContent = "► send more!";
  }
});
