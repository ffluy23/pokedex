/* ═══════════════════════════════════════════════
   유틸리티
═══════════════════════════════════════════════ */
const TYPE_COLORS = {
  "노말":"#949495","불꽃":"#e56c3e","물":"#5185c5","전기":"#fbb917",
  "풀":"#66a945","얼음":"#6dc8eb","격투":"#e09c40","독":"#735198",
  "땅":"#9c7743","바위":"#bfb889","비행":"#a2c3e7","에스퍼":"#dd6b7b",
  "벌레":"#9fa244","고스트":"#684870","드래곤":"#535ca8","악":"#4c4948",
  "강철":"#69a9c7","페어리":"#dab4d4",
};

function typeColor(t) { return TYPE_COLORS[t] || "#888"; }

function badge(text, color) {
  return `<span class="badge" style="background:${color}">${text}</span>`;
}

/* ═══════════════════════════════════════════════
   초기화
═══════════════════════════════════════════════ */
const moves     = Object.values(MOVES);
const filterRow = document.getElementById("filter-row");
const grid      = document.getElementById("grid");
const empty     = document.getElementById("empty");
const countEl   = document.getElementById("result-count");
const searchEl  = document.getElementById("search");
const overlay   = document.getElementById("overlay");

let activeType = "전체";

// 타입 목록 추출
const types = ["전체", ...new Set(moves.map(m => m.type))];
types.forEach(t => {
  const btn = document.createElement("button");
  btn.className = "filter-btn" + (t === "전체" ? " active" : "");
  btn.textContent = t;
  btn.addEventListener("click", () => {
    activeType = t;
    document.querySelectorAll("#filter-row .filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
  filterRow.appendChild(btn);
});

/* ═══════════════════════════════════════════════
   렌더링
═══════════════════════════════════════════════ */
function render() {
  const q = searchEl.value.trim().toLowerCase();
  const filtered = moves.filter(m => {
    const matchSearch = q === "" || m.name.toLowerCase().includes(q);
    const matchType   = activeType === "전체" || m.type === activeType;
    return matchSearch && matchType;
  });

  grid.innerHTML = "";
  countEl.textContent = `총 ${filtered.length}개의 기술`;

  if (filtered.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  filtered.forEach((m, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 30}ms`;
    const powerVal = m.power    != null ? m.power    : "—";
    const accVal   = m.accuracy != null ? m.accuracy + "%" : (m.alwaysHit ? "∞" : "—");
    const rankVal  = m.rankChange
      ? `${m.rankChange.target === "self" ? "자신" : "상대"} ${({atk:"공격",def:"방어",spd:"속도",spatk:"특수공격",spdef:"특수방어"})[m.rankChange.stat] || m.rankChange.stat} ${m.rankChange.stage > 0 ? "+" : ""}${m.rankChange.stage}`
      : "—";
    card.innerHTML = `
      <div class="card-name">${m.name}</div>
      <div class="card-meta">
        ${badge(m.type, typeColor(m.type))}
      </div>
      <div class="card-stats">
        <div class="card-stat">
          <span class="card-stat-label">위력</span>
          <span class="card-stat-value ${m.power == null ? 'na' : ''}">${powerVal}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">명중</span>
          <span class="card-stat-value ${m.accuracy == null && !m.alwaysHit ? 'na' : ''}">${accVal}</span>
        </div>
        <div class="card-stat rank">
          <span class="card-stat-label">랭크</span>
          <span class="card-stat-value rank-text ${!m.rankChange ? 'na' : ''}">${rankVal}</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openModal(m));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   모달
═══════════════════════════════════════════════ */
function openModal(m) {
  document.getElementById("m-name").textContent = m.name;

  // 배지 (타입만)
  const badges = document.getElementById("m-badges");
  badges.innerHTML =
    badge(m.type, typeColor(m.type)) +
    (m.alwaysHit ? badge("반드시 명중", "#60c080") : "");

  // 본문
  const body = document.getElementById("m-body");
  body.innerHTML = "";

  // 스탯 그리드
  const statNames = { atk:"공격", def:"방어", spd:"속도", spatk:"특수공격", spdef:"특수방어" };
  const rankText = m.rankChange
    ? `${m.rankChange.target === "self" ? "자신" : "상대"} ${statNames[m.rankChange.stat] || m.rankChange.stat} ${m.rankChange.stage > 0 ? "+" : ""}${m.rankChange.stage}`
    : null;
  const stats = [
    { label: "위력",      value: m.power    ?? null, unit: "" },
    { label: "명중률",    value: m.accuracy ?? null, unit: "%" },
    { label: "PP",        value: m.pp,                unit: "" },
    { label: "랭크 변화", value: rankText,             unit: "" },
  ];
  const sg = document.createElement("div");
  sg.className = "stat-grid";
  stats.forEach(s => {
    const isNA = s.value === null;
    sg.innerHTML += `
      <div class="stat-item">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value ${isNA ? "na" : ""}">
          ${isNA ? "—" : s.value + s.unit}
        </div>
      </div>
    `;
  });
  body.appendChild(sg);

  // 추가 효과
  if (m.effect) {
    const el = document.createElement("div");
    el.className = "info-block";
    el.innerHTML = `<div class="info-label">추가 효과</div>
                    <div class="info-text">${m.effect}</div>`;
    body.appendChild(el);
  }

  // 설명
  if (m.description) {
    const el = document.createElement("div");
    el.className = "info-block";
    el.innerHTML = `<div class="info-label">설명</div>
                    <div class="info-text">${m.description}</div>`;
    body.appendChild(el);
  }

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("close-btn").addEventListener("click", closeModal);
overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ═══════════════════════════════════════════════
   이벤트
═══════════════════════════════════════════════ */
searchEl.addEventListener("input", render);

// 초기 렌더
render();
