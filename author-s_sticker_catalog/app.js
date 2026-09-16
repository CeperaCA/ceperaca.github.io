const AUTHOR_URL = "https://max.ru/u/f9LHodD0cOLRILY8hP7b2JKCvhjMraaup_FpnIWKTSAePC2ox04kt8nNsb8";
const STICKERS_DIR = "stickers";
const STICKER_EXT = "webp";

const webApp = window.WebApp;
webApp.ready?.();
webApp.expand?.();

const appContainer = document.getElementById('app');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalStickers = document.getElementById('modalStickers');
const modalClose = document.getElementById('modalClose');
const addSetBtn = document.getElementById('addSetBtn');
const authorLink = document.getElementById('authorLink');

let STICKER_SETS = [];
let TREE = null;
let currentSet = null;
const folderCache = new Map();

function folderPath(set) {
    return `${STICKERS_DIR}/${set.folder}`;
}

function stickerPath(set, name) {
    return `${folderPath(set)}/${name}`;
}

async function loadTree() {
    const host = location.hostname;
    if (!host.endsWith('.github.io')) return null;
    const user = host.split('.')[0];
    const repo = location.pathname.split('/').filter(Boolean)[0];
    if (!user || !repo) return null;
    try {
        const res = await fetch(
            `https://api.github.com/repos/${user}/${repo}/git/trees/main?recursive=1`
        );
        if (!res.ok) return null;
        const data = await res.json();
        return data.tree.filter(t => t.type === 'blob').map(t => t.path);
    } catch {
        return null;
    }
}

function filesFromTree(set) {
    if (!TREE) return null;
    const prefix = folderPath(set).replace(/\/+$/, '') + '/';
    const suffix = `.${STICKER_EXT}`;
    const result = [];
    for (const p of TREE) {
        if (!p.startsWith(prefix)) continue;
        const rest = p.slice(prefix.length);
        if (rest.includes('/')) continue;
        if (!rest.toLowerCase().endsWith(suffix)) continue;
        result.push(rest);
    }
    return result;
}

async function probeFolder(set) {
    const found = [];
    const base = folderPath(set);
    for (let i = 1; i <= 99; i++) {
        const n = String(i).padStart(2, '0');
        const url = `${base}/${n}.${STICKER_EXT}`;
        try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok) {
                found.push(`${n}.${STICKER_EXT}`);
            } else {
                break;
            }
        } catch {
            break;
        }
    }
    return found;
}

async function getStickerFiles(set) {
    if (folderCache.has(set.folder)) return folderCache.get(set.folder);
    let files = filesFromTree(set);
    if (files === null) files = await probeFolder(set);
    files.sort();
    folderCache.set(set.folder, files);
    return files;
}

async function loadSets() {
    try {
        const res = await fetch('sets.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        STICKER_SETS = await res.json();
    } catch (e) {
        console.error('Не удалось загрузить sets.json:', e);
        appContainer.innerHTML =
            '<p class="error">Не удалось загрузить наборы. Попробуйте позже.</p>';
        return false;
    }
    return true;
}

function renderCatalog() {
    appContainer.innerHTML = STICKER_SETS.map((set, i) => `
        <div class="set-card" data-index="${i}">
            <img src="${stickerPath(set, set.cover)}" alt="${set.name}" loading="lazy">
            <div class="set-name">${set.name}</div>
        </div>
    `).join('');

    document.querySelectorAll('.set-card').forEach(card => {
        card.addEventListener('click', () => openPreview(Number(card.dataset.index)));
    });
}

async function openPreview(index) {
    const set = STICKER_SETS[index];
    if (!set) return;

    currentSet = set;
    modalTitle.textContent = set.name;
    modalStickers.innerHTML = '<div class="sticker-loading">Загрузка…</div>';
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const files = await getStickerFiles(set);

    if (!files.length) {
        modalStickers.innerHTML =
            '<div class="sticker-loading">Стикеры не найдены</div>';
        return;
    }

    modalStickers.innerHTML = files.map(name =>
        `<img src="${stickerPath(set, name)}" alt="" loading="lazy">`
    ).join('');
}

function closePreview() {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    currentSet = null;
}

modalClose.addEventListener('click', closePreview);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closePreview();
});

addSetBtn.addEventListener('click', () => {
    if (!currentSet) return;
    webApp.openMaxLink(currentSet.link);
});

authorLink.addEventListener('click', () => {
    webApp.openMaxLink(AUTHOR_URL);
});

(async () => {
    TREE = await loadTree();
    const ok = await loadSets();
    if (ok) renderCatalog();
})();