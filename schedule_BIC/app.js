let CONFIG = null;
const BELL_SCHEDULE = {
  weekdays: [
    { start: "08:30", end: "10:00" },
    { start: "10:10", end: "11:40" },
    { start: "12:10", end: "13:40" },
    { start: "13:50", end: "15:20" },
    { start: "15:30", end: "17:00" },
    { start: "17:10", end: "18:40" },
    { start: "18:50", end: "20:20" },
    { start: "20:30", end: "22:00" }
  ],

  saturday: [
    { start: "08:30", end: "09:50" },
    { start: "10:00", end: "11:20" },
    { start: "11:30", end: "12:50" },
    { start: "13:00", end: "14:20" },
    { start: "14:30", end: "15:50" },
    { start: "16:00", end: "17:20" },
    { start: "17:30", end: "18:50" },
    { start: "19:00", end: "20:20" }
  ]
};

const tabsEl  = document.getElementById("tabs");
const stateEl = document.getElementById("state");
const wrapEl  = document.getElementById("table-wrap");
const tableEl = document.getElementById("table");
const theadEl = tableEl.querySelector("thead");
const tbodyEl = tableEl.querySelector("tbody");

let currentSheetIndex = 0;

function initMaxBridge() {
  if (window.MaxBridge && typeof window.MaxBridge.ready === "function") {
    try { window.MaxBridge.ready(); } catch (e) {}
    return;
  }
  const s = document.createElement("script");
  s.src = "https://static.max.ru/bridge/bridge.js";
  s.async = true;
  s.onload = () => {
    if (window.MaxBridge && typeof window.MaxBridge.ready === "function") {
      try { window.MaxBridge.ready(); } catch (e) {}
    }
  };
  s.onerror = () => {
    console.warn("MAX Bridge не загрузился — мини-приложение работает без него.");
  };
  document.head.appendChild(s);
}

async function loadConfig() {
  const res = await fetch("config.json", { cache: "no-store" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

function buildGvizUrl(sheet) {
  const base = `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq`;
  const params = new URLSearchParams();
  params.set("tqx", "out:json");
  params.set("headers", "1");
  params.set("gid", sheet.gid);
  return `${base}?${params.toString()}`;
}

function parseGviz(text) {
  const start = text.indexOf("{");
  const end   = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Некорректный ответ Google");
  return JSON.parse(text.slice(start, end + 1));
}

function normalize(data) {
  const cols = (data.table && data.table.cols) || [];
  const rows = (data.table && data.table.rows) || [];

  const headers = cols.map((c, i) => (c && (c.label || c.id)) || `Колонка ${i + 1}`);

  const out = rows.map(r => (r.c || []).map(cell => {
    if (!cell) return "";
    if (typeof cell.f === "string" && cell.f.length) return cell.f;
    if (cell.v === null || cell.v === undefined) return "";
    if (typeof cell.v === "object") return "";
    return String(cell.v);
  }));

  return { headers, rows: out };
}

function renderTabs() {
  tabsEl.innerHTML = "";
  CONFIG.sheets.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === currentSheetIndex ? " active" : "");
    btn.textContent = s.name;
    btn.addEventListener("click", () => {
      if (i === currentSheetIndex) return;
      currentSheetIndex = i;
      renderTabs();
      loadSheet();
    });
    tabsEl.appendChild(btn);
  });
}

function showState(msg, isError = false) {
  stateEl.textContent = msg;
  stateEl.className = "state" + (isError ? " error" : "");
  stateEl.style.display = "";
  wrapEl.style.display = "none";
}

function showTable() {
  stateEl.style.display = "none";
  wrapEl.style.display = "";
}

function renderTable({ headers, rows }) {
  // Заголовок таблицы (A, B, C и т. д.) не показываем.
  theadEl.innerHTML = "";
  tbodyEl.innerHTML = "";

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = Math.max(1, headers.length);
    td.textContent = "Лист пуст";
    td.style.textAlign = "center";
    td.style.color = "var(--muted)";
    tr.appendChild(td);
    tbodyEl.appendChild(tr);
    return;
  }

  rows.forEach(r => {
    const tr = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
      const td = document.createElement("td");
      const value = r[i] ?? "";

      // В первой колонке показываем день недели и дату двумя строками: "ВТ" / "06.10".
      if (i === 0 && value) {
        const normalized = String(value).replace(/\s*\n\s*/g, " ").trim();
        const match = normalized.match(/^([А-ЯЁA-Z]{2,3})\s+(\d{1,2}\.\d{1,2}(?:\.\d{2,4})?)$/i);
        if (match) {
          td.innerHTML = `<span class="day-week">${match[1]}</span><span class="day-date">${match[2]}</span>`;
        } else {
          td.textContent = value;
        }
        td.classList.add("date-cell");
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    }
    tbodyEl.appendChild(tr);
  });
}

const bellsModal = document.getElementById("bells-modal");
const bellsTitle = document.getElementById("bells-title");
const bellsSubtitle = document.getElementById("bells-subtitle");
const bellsList = document.getElementById("bells-list");

function openBellsModal(dayText, pairNumber) {
  const isSaturday = /^СБ\b/i.test(dayText.trim());
  const schedule = isSaturday
    ? BELL_SCHEDULE.saturday
    : BELL_SCHEDULE.weekdays;

  bellsTitle.textContent = "Расписание звонков";
  bellsSubtitle.textContent = isSaturday
    ? "Суббота"
    : "Понедельник — пятница";

  bellsList.replaceChildren();

  schedule.forEach((pair, index) => {
    const number = index + 1;
    const item = document.createElement("div");
    item.className = "bells-item";

    if (number === pairNumber) {
      item.classList.add("active");
    }

    const numberEl = document.createElement("span");
    numberEl.className = "bells-number";
    numberEl.textContent = `${number}-я пара`;

    const timeEl = document.createElement("div");
    timeEl.className = "bells-time";

    const timeRange = document.createElement("div");
    timeRange.textContent = `${pair.start} — ${pair.end}`;
    timeEl.appendChild(timeRange);

    if (index < schedule.length - 1) {
      const nextStart = schedule[index + 1].start;
      const breakEl = document.createElement("div");
      breakEl.className = "bells-break";
      breakEl.textContent =
        `Перерыв: ${getBreakMinutes(pair.end, nextStart)} мин.`;
      timeEl.appendChild(breakEl);
    }

    item.append(numberEl, timeEl);
    bellsList.appendChild(item);
  });

  bellsModal.classList.add("is-open");
  bellsModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const activeItem = bellsList.querySelector(".active");
  if (activeItem) {
    activeItem.scrollIntoView({ block: "nearest" });
  }
}

function getBreakMinutes(end, start) {
  const toMinutes = time => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return toMinutes(start) - toMinutes(end);
}

function closeBellsModal() {
  bellsModal.classList.remove("is-open");
  bellsModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

bellsModal.querySelectorAll("[data-close-bells]").forEach(el => {
  el.addEventListener("click", closeBellsModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" &&
      bellsModal.classList.contains("is-open")) {
    closeBellsModal();
  }
});

// Обработчик общий: работает и после переключения вкладок.
tbodyEl.addEventListener("click", event => {
  const row = event.target.closest("tr");
  if (!row || !tbodyEl.contains(row)) return;

  const cells = row.querySelectorAll("td");
  if (cells.length < 2) return;

  const dayText = cells[0].innerText.replace(/\s+/g, " ").trim();
  const pairText = cells[1].innerText.trim();
  const match = pairText.match(/\d+/);

  if (!match) return;

  const pairNumber = Number(match[0]);
  if (pairNumber < 1 ||
      pairNumber > Math.max(
        BELL_SCHEDULE.weekdays.length,
        BELL_SCHEDULE.saturday.length
      )) {
    return;
  }

  openBellsModal(dayText, pairNumber);
});

async function loadSheet() {
  const sheet = CONFIG.sheets[currentSheetIndex];
  showState("Загрузка…");

  try {
    const url = buildGvizUrl(sheet);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const json = parseGviz(text);
    const normalized = normalize(json);
    renderTable(normalized);
    showTable();
  } catch (e) {
    console.error(e);
    showState(
      "Не удалось загрузить лист.\n" +
      "Проверьте, что таблица доступна по ссылке " +
      "(Файл → Поделиться → Все, у кого есть ссылка → Читатель) " +
      "и что в config.json верно указаны ID таблицы и gid листов.",
      true
    );
  }
}

async function main() {
  initMaxBridge();
  showState("Загрузка…");
  try {
    CONFIG = await loadConfig();
  } catch (e) {
    console.error(e);
    showState("Не удалось загрузить config.json", true);
    return;
  }
  renderTabs();
  loadSheet();
}

main();
