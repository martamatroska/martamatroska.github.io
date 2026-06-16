function utrack(event, props) {
    if (typeof umami !== 'undefined') {
        props ? umami.track(event, props) : umami.track(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('btn');
    const originalText = btn.textContent;

    btn.addEventListener('click', function handleClick() {
        if (btn.textContent === originalText) {
            btn.textContent = 'Contact → marta.castillo(at)canadacanada(dot)com // casfemarta(at)gmail(dot)com';
        } else {
            btn.textContent = originalText;
        }

        utrack('contact_click');
    });

    document.getElementById('click_work_page').addEventListener('click', function() {
        utrack('work_page_click');
    });

    document.getElementById('click_external_canada').addEventListener('click', function() {
        utrack('canada_link_click');
    });

    document.getElementById('click_barcelona_map').addEventListener('click', function() {
        utrack('barcelona_map_click');
    });

    document.querySelectorAll('.portfolio-site-link').forEach(link => {
        link.addEventListener('click', function() {
            utrack('portfolio_site_click', { url: this.href });
        });
    });

    document.getElementById('click').addEventListener('click', function() {
        utrack('clickclick_page_click');
    });

    document.getElementById('desktop').addEventListener('click', function() {
        utrack('more_things_click');
    });

    document.getElementById('tabloid').addEventListener('click', function(e) {
        e.preventDefault();

        if (document.body.classList.contains('tabloid-bg')) {
            document.body.classList.remove('tabloid-bg');
        } else {
            document.body.classList.add('tabloid-bg');
        }

        utrack('tabloid_bg_switch');
    });

    document.getElementById('egg').addEventListener('click', async (e) => {
        const infoBox = document.getElementById('info');

        if (infoBox.style.display !== "block") {
            utrack('egg_info_view');
        }

        if (infoBox.style.display === "block") {
            infoBox.style.display = "none";
            return;
        }

        const ip = await getIP();
        const ua = navigator.userAgent;
        const lang = navigator.language;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        infoBox.textContent =
            `IP Address: ${ip}\n` +
            `Browser / OS: ${ua}\n` +
            `Language: ${lang}\n` +
            `Time Zone: ${tz}`;

        infoBox.style.display = "block";
    });

});

let count = 0;
const counter = document.getElementById("counter");
let recordTarget = getRandomTarget();

const messages = [
    "what if",
    "we all",
    "quit our jobs and",
    "just",
    "hang out"
];

let currentMessageIndex = 0;

function getRandomTarget() {
    return Math.floor(Math.random() * 10) + 5;
}

document.getElementById("star").addEventListener("click", function(e) {
    e.preventDefault();
    count++;
    counter.textContent = count;
    counter.style.display = "inline";

    utrack('star_click', { count: count });

    if (count === recordTarget && currentMessageIndex < messages.length) {
        alert(messages[currentMessageIndex]);
        currentMessageIndex++;
        recordTarget = count + getRandomTarget();
    }
});

let frogClickCount = 0;
const showBg = document.getElementById('showBg');
const fotos = [
    'assets/foto01.png',
    'assets/foto02.png',
    'assets/foto03.png',
    'assets/foto04.png'
];

const textos = [
    "Born: Granada\n \n(data loaded 13%)",
    "Born: Granada\nRaised: Valencia\n \n(data loaded 41%)",
    "Born: Granada\nRaised: Valencia\nBased: Barcelona\n \n(data loaded 75%)",
    "Born: Granada\nRaised: Valencia\nBased: Barcelona\n \nI enjoy geeky stuff, quiet environments, people (in small doses), animals (in all doses),\nbooks, <2h movies, >2h playlists,\nnature, and watching the world like it's a documentary.\nI studied oceanography, now I tweak pixels as a VFX artist.\nEternally learning.\n \n(data loaded 100%)"
];

const textoDiv = document.createElement('div');
textoDiv.style.position = 'fixed';
textoDiv.style.left = '50%';
textoDiv.style.transform = 'translate(-50%, -50%)';
textoDiv.style.color = 'black';
textoDiv.style.fontFamily = '"Times New Roman", Times, serif';
textoDiv.style.fontSize = '11pt';
textoDiv.style.maxWidth = '80%';
textoDiv.style.wordWrap = 'break-word';
textoDiv.style.textAlign = 'center';
textoDiv.style.whiteSpace = 'pre-line';
textoDiv.style.zIndex = '10';
document.body.appendChild(textoDiv);

const isMobile = () => window.innerWidth <= 768;

showBg.addEventListener('click', function(e) {
    e.preventDefault();

    utrack('frog_easter_egg', { click_num: frogClickCount + 1 });

    document.body.style.backgroundImage = `url('${fotos[frogClickCount]}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    if (isMobile()) {
        showBg.style.position = 'fixed';
        showBg.style.bottom = '40px';
        showBg.style.left = '10px';
        textoDiv.style.top = '35%';
    } else {
        const randomBottom = Math.floor(Math.random() * (window.innerHeight - showBg.offsetHeight));
        const randomLeft = Math.floor(Math.random() * (window.innerWidth - showBg.offsetWidth));
        showBg.style.position = 'absolute';
        showBg.style.bottom = `${randomBottom}px`;
        showBg.style.left = `${randomLeft}px`;
        textoDiv.style.top = '80%';
    }

    textoDiv.textContent = textos[frogClickCount];

    frogClickCount = (frogClickCount + 1) % fotos.length;
});

async function getIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    } catch {
        return 'Unavailable';
    }
}
