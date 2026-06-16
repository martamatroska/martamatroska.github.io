let currentLang = "en";

const texts = {
    en: {
        headline: "V H S S O I S E",
        intro1: "Tapes degrade. Over time, heat, humidity, and the passage of years wear down the image irreversibly and once it's gone, there's no recovering it. They also take up space, require specific storage conditions, and need hardware that's becoming increasingly hard to find.",
        intro2: "Digitizing them doesn't mean throwing them away. It means they stop being a problem and become a file: accessible from any device, shareable with whoever you want, and at a quality you've probably never seen from that footage.",
        about: "I'm Marta, a post-production and artificial intelligence professional specialized in digitizing home and semi-professional video: <span class=\"wavy\">Betamax, VHS, HDV, MiniDV, and 8mm/Hi8</span>. I deliver in .mp4 or .mov directly to your inbox, in HD, 2K, or 4K UHD depending on the plan.",
        tagline: "Not just digitizing. Recovering.",
        contact: "‧₊˚☏✉@↓",
        delivery_label: "Ready in your inbox in format >>> .mp4 / .mov",
        formatsTitle: "Pricing by format",
        formats: [
            {
                name: "VHS / Betamax",
                dur: "Typical duration: 60–180 min",
                prices: [
                    { label: "Basic (HD)", val: "12 €" },
                    { label: "Standard (2K)", val: "20 €" },
                    { label: "Advanced (4K)", val: "35 €" }
                ],
                note: "Long-duration tapes (LP/EP mode, +180 min) may carry a surcharge after assessment."
            },
            {
                name: "HDV / MiniDV",
                dur: "Typical duration: 60–80 min",
                prices: [
                    { label: "Basic (HD)", val: "10 €" },
                    { label: "Standard (2K)", val: "17 €" },
                    { label: "Advanced (4K)", val: "28 €" }
                ],
                note: ""
            },
            {
                name: "8mm / Hi8",
                dur: "Typical duration: 90–120 min",
                prices: [
                    { label: "Basic (HD)", val: "12 €" },
                    { label: "Standard (2K)", val: "20 €" },
                    { label: "Advanced (4K)", val: "35 €" }
                ],
                note: ""
            }
        ],
        deliveryTitle: "Estimated delivery time",
        deliveries: [
            { plan: "Basic", time: "3–5 days" },
            { plan: "Standard", time: "5–7 days" },
            { plan: "Advanced", time: "7–10 days" }
        ],
        deliveryNote: "* Orders with multiple tapes or heavily degraded material may take longer. Exact estimated delivery confirmed after the free assessment.",
        extraTitle: "Optional add-on",
        extraName: "Image restoration",
        extraDesc: "Color correction, compression artifacts, and image degradation. Available on any plan and format. Subject to prior assessment of the material.",
        extraPrice: "From 10 € · final price after assessment",
        noteTitle: "Free prior assessment.",
        noteBody: "Before confirming any restoration service, I analyze the condition of your material at no cost. Results for stabilization, noise reduction, and restoration depend on the original quality of the tape and cannot be guaranteed in advance."
    },
    es: {
        headline: "V H S S O I S E",
        intro1: "Las cintas de vídeo se deterioran. Con el tiempo, el calor, la humedad y el paso de los años degradan la imagen de forma irreversible y una vez perdida, no hay manera de recuperarla. Además ocupan espacio, necesitan condiciones específicas de almacenamiento y requieren hardware cada vez más difícil de encontrar para poder verse.",
        intro2: "Digitalizarlas no significa tirarlas. Significa que dejan de ser un problema y pasan a ser un archivo: accesible desde cualquier dispositivo, compartible con quien quieras, y con una calidad que probablemente nunca habías visto en ese material.",
        about: "Soy Marta, profesional de la postproducción e inteligencia artificial, especializada en digitalización de vídeo doméstico y semiprofesional: <span class=\"wavy\">Betamax, VHS, HDV, MiniDV y 8mm/Hi8</span>. Entrego en .mp4 o .mov directamente en tu correo, en HD, 2K o 4K UHD según el plan elegido.",
        tagline: "No es solo digitalizar. Es recuperar.",
        contact: "‧₊˚☏✉@↓",
        delivery_label: "Listo en tu correo electrónico en formato >>> .mp4 / .mov",
        formatsTitle: "Tarifas por formato",
        formats: [
            {
                name: "VHS / Betamax",
                dur: "Duración típica: 60–180 min",
                prices: [
                    { label: "Basic (HD)", val: "12 €" },
                    { label: "Standard (2K)", val: "20 €" },
                    { label: "Advanced (4K)", val: "35 €" }
                ],
                note: "Cintas de larga duración (modo LP/EP, +180 min) pueden tener suplemento según valoración."
            },
            {
                name: "HDV / MiniDV",
                dur: "Duración típica: 60–80 min",
                prices: [
                    { label: "Basic (HD)", val: "10 €" },
                    { label: "Standard (2K)", val: "17 €" },
                    { label: "Advanced (4K)", val: "28 €" }
                ],
                note: ""
            },
            {
                name: "8mm / Hi8",
                dur: "Duración típica: 90–120 min",
                prices: [
                    { label: "Basic (HD)", val: "12 €" },
                    { label: "Standard (2K)", val: "20 €" },
                    { label: "Advanced (4K)", val: "35 €" }
                ],
                note: ""
            }
        ],
        deliveryTitle: "Tiempo estimado de entrega",
        deliveries: [
            { plan: "Basic", time: "3–5 días" },
            { plan: "Standard", time: "5–7 días" },
            { plan: "Advanced", time: "7–10 días" }
        ],
        deliveryNote: "* Pedidos con varias cintas o material en mal estado pueden requerir más tiempo. Se confirma el plazo exacto tras la valoración previa.",
        extraTitle: "Extra opcional",
        extraName: "Restauración de imagen",
        extraDesc: "Corrección de color, artefactos de compresión y degradación. Aplicable sobre cualquier plan y formato. Sujeto a valoración previa del material.",
        extraPrice: "Desde 10 € · precio final según valoración",
        noteTitle: "Valoración previa gratuita.",
        noteBody: "Antes de confirmar cualquier servicio de restauración, analizo el estado de tu material sin coste. Los resultados de estabilización, reducción de ruido y restauración dependen de la calidad original de la cinta y no pueden garantizarse de antemano."
    }
};


function setLang(lang) {
    currentLang = lang;
    const t = texts[currentLang];

    document.getElementById("headline").textContent = t.headline;
    document.getElementById("intro1").textContent = t.intro1;
    document.getElementById("intro2").textContent = t.intro2;
    document.getElementById("about").innerHTML = t.about;
    document.getElementById("tagline").textContent = t.tagline;
    document.getElementById("contact").textContent = t.contact;
    document.getElementById("formats-title").textContent = t.formatsTitle;
    document.getElementById("delivery-title").textContent = t.deliveryTitle;
    document.getElementById("delivery-footnote").textContent = t.deliveryNote;
    document.getElementById("extra-name").textContent = t.extraName;
    document.getElementById("extra-desc").textContent = t.extraDesc;
    document.getElementById("extra-price").textContent = t.extraPrice;
    document.getElementById("note-title").textContent = t.noteTitle;
    document.getElementById("note-body").textContent = t.noteBody;
    document.getElementById("lang-btn").textContent = currentLang === "en" ? "ESP" : "ENG";

    t.formats.forEach((fmt, i) => {
        document.getElementById(`fmt-name-${i}`).textContent = fmt.name;
        document.getElementById(`fmt-dur-${i}`).textContent = fmt.dur;
        fmt.prices.forEach((p, j) => {
            document.getElementById(`fmt-plabel-${i}-${j}`).textContent = p.label;
            document.getElementById(`fmt-pval-${i}-${j}`).textContent = p.val;
        });
        const noteEl = document.getElementById(`fmt-note-${i}`);
        noteEl.textContent = fmt.note;
        noteEl.style.display = fmt.note ? "block" : "none";
    });

    t.deliveries.forEach((d, i) => {
        document.getElementById(`del-plan-${i}`).textContent = d.plan;
        document.getElementById(`del-time-${i}`).textContent = d.time;
    });
}

function toggleLang() { setLang(currentLang === "en" ? "es" : "en"); }

window.onload = function() {
    startTime();
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("es")) setLang("es"); else setLang("en");
    document.getElementById("lang-btn").onclick = toggleLang;
}

let icons = document.querySelectorAll(".floating-ico");
let positions = [];
let velocities = [];

icons.forEach((ico, i) => {
    positions.push({ x: parseInt(ico.style.left), y: parseInt(ico.style.top) });
    velocities.push({ dx: 0.5 + i * 0.1, dy: 0.4 + i * 0.1 });
});

function moveIcons() {
    icons.forEach((ico, i) => {
        positions[i].x += velocities[i].dx;
        positions[i].y += velocities[i].dy;

        if (positions[i].x + ico.offsetWidth > window.innerWidth || positions[i].x < 0) {
            velocities[i].dx = -velocities[i].dx;
        }
        if (positions[i].y + ico.offsetHeight > window.innerHeight || positions[i].y < 0) {
            velocities[i].dy = -velocities[i].dy;
        }

        ico.style.left = positions[i].x + "px";
        ico.style.top = positions[i].y + "px";
    });

    requestAnimationFrame(moveIcons);
}

moveIcons();
