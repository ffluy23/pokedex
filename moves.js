// =============================================
//  moves.js — 스킬 도감 데이터
//
//  필드 설명:
//    name        : 기술 이름 (키와 동일)
//    type        : 타입 (불꽃/물/풀/전기/노말/얼음/격투/독/땅/비행/에스퍼/벌레/바위/고스트/드래곤/악/강철/페어리)
//    category    : 분류 ("물리" | "특수" | "변화")
//    power       : 위력 (변화기는 null)
//    accuracy    : 명중률 (0~100, 반드시 맞으면 null)
//    pp          : 사용 횟수
//    priority    : 우선도 (기본 0, 선제기는 양수, 후공기는 음수)
//    rankChange  : 랭크 변화 객체 (없으면 null)
//                  { target: "self"|"foe", stat: "atk"|"def"|"spd", stage: 정수 }
//    effect      : 추가 효과 문자열 (없으면 null)
//    alwaysHit   : 반드시 맞는지 여부 (기본 false)
//    description : 기술 설명 (도감 표시용)
// =============================================

const MOVES = {

  // ── 노말 ──────────────────────────────────
  "전광석화": {
    name: "전광석화",
    type: "노말",
    category: "물리",
    power: 30,
    accuracy: null,
    pp: 30,
    priority: 1,
    rankChange: null,
    effect: null,
    alwaysHit: true,
    description: "눈에 보이지 않는 굉장한 속도로 상대에게 돌진한다. 반드시 명중한다.",
  },

  "방어": {
    name: "방어",
    type: "노말",
    category: "물리",
    power: null,
    accuracy: null,
    pp: 10,
    priority: 1,
    rankChange: null,
    effect: "방어의 효과는 사용한 턴을 포함해 최대 2턴 지속(자신 기준)",
    alwaysHit: null,
    description: "상대의 공격을 전혀 받지 않는다. 연속으로 쓰면 실패하기 쉽다.",
  },

  "눈물그렁그렁": {
    name: "눈물그렁그렁",
    type: "노말",
    category: "물리",
    power: null,
    accuracy: null,
    pp: 20,
    priority: 1,
    rankChange: { target: "foe", stat: "atk", stage: -1 },
    effect: null,
    alwaysHit: null,
    description: "눈물을 그렁그렁거려 상대의 전의를 상실하게 한다. 상대의 공격이 -1 하락한다.",
  },

  "칼춤": {
    name: "칼춤",
    type: "노말",
    category: "변화",
    power: null,
    accuracy: null,
    pp: 20,
    priority: 0,
    rankChange: { target: "self", stat: "atk", stage: 3 },
    effect: null,
    alwaysHit: false,
    description: "싸움의 춤을 격렬하게 춰서 기세를 높인다. 자신의 공격이 +3 상승한다.",
  },

  "몸통박치기": {
    name: "몸통박치기",
    type: "노말",
    category: "물리",
    power: 30,
    accuracy: 100,
    pp: 35,
    priority: 1,
    rankChange: null,
    effect: null,
    alwaysHit: null,
    description: "상대를 향해서 몸 전체를 부딪쳐가며 공격한다.",
  },

  // ── 불꽃 ───────────────────────────────────
  "화염방사": {
    name: "화염방사",
    type: "불꽃",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 15,
    priority: 0,
    rankChange: null,
    effect: "10% 확률로 상대를 화상 상태로 만든다.",
    alwaysHit: false,
    description: "세찬 불꽃을 상대에게 발사하여 공격한다. 화상 상태로 만들 때가 있다.",
  },

  "불대문자": {
    name: "불대문자",
    type: "불꽃",
    category: "특수",
    power: 60,
    accuracy: 85,
    pp: 5,
    priority: 0,
    rankChange: null,
    effect: "10% 확률로 상대를 화상 상태로 만든다.",
    alwaysHit: false,
    description: "큰 대자의 불꽃으로 상대를 불태운다. 화상 상태로 만들 때가 있다.",
  },

  "불꽃세례": {
    name: "불꽃세례",
    type: "불꽃",
    category: "특수",
    power: 30,
    accuracy: 100,
    pp: 25,
    priority: 0,
    rankChange: null,
    effect: "10% 확률로 상대를 화상 상태로 만든다.",
    alwaysHit: false,
    description: "작은 불꽃을 상대에게 발사하여 공격한다. 화상 상태로 만들 때가 있다.",
  },

  // ── 물 ───────────────────────────────────
  "열탕": {
    name: "열탕",
    type: "물",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 15,
    priority: 0,
    rankChange: null,
    effect: "30% 확률로 상대를 화상 상태로 만든다.",
    alwaysHit: false,
    description: "뜨겁게 끓어오르는 물을 상대에게 발사해서 공격한다. 화상 상태로 만들 때가 있다.",
  },

  "파도타기": {
    name: "파도타기",
    type: "물",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 15,
    priority: 0,
    rankChange: null,
    effect: null,
    alwaysHit: false,
    description: "큰 파도로 주위에 있는 모든 것을 공격한다.",
  },

  "하이드로펌프": {
    name: "하이드로펌프",
    type: "물",
    category: "특수",
    power: 60,
    accuracy: 80,
    pp: 5,
    priority: 0,
    rankChange: null,
    effect: null,
    alwaysHit: false,
    description: "대량의 물을 세찬 기세로 상대에게 발사하여 공격한다.",
  },

  "물대포": {
    name: "물대포",
    type: "물",
    category: "특수",
    power: 30,
    accuracy: 100,
    pp: 25,
    priority: 0,
    rankChange: null,
    effect: null,
    alwaysHit: false,
    description: "물을 기세 좋게 상대에게 발사하여 공격한다.",
  },

  // ── 전기 ─────────────────────────────────
  "10만볼트": {
    name: "10만볼트",
    type: "전기",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 15,
    priority: 0,
    rankChange: null,
    effect: "10% 확률로 상대를 마비 상태로 만든다.",
    alwaysHit: false,
    description: "강한 전격을 상대에게 날려서 공격한다. 마비 상태로 만들 때가 있다.",
  },

  "번개": {
    name: "번개",
    type: "전기",
    category: "특수",
    power: 60,
    accuracy: 70,
    pp: 10,
    priority: 0,
    rankChange: null,
    effect: "30% 확률로 상대를 마비 상태로 만든다.",
    alwaysHit: false,
    description: "강한 번개를 상대에게 떨어뜨려 공격한다. 마비 상태로 만들 때가 있다.",
  },

  // ── 풀 ───────────────────────────────────
  "에너지볼": {
    name: "에너지볼",
    type: "풀",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 10,
    priority: 0,
    rankChange: { target: "foe", stat: "def", stage: -1 },
    effect: null,
    effect: "10% 확률로 상대의 방어가 -1 하락한다.",
    alwaysHit: false,
    description: "자연으로부터 생명의 힘을 모아서 발사한다. 상대의 방어를 떨어뜨릴 때가 있다.",
  },

  // ── 얼음 ─────────────────────────────────
  "냉동빔": {
    name: "냉동빔",
    type: "얼음",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 10,
    priority: 0,
    rankChange: null,
    effect: "10% 확률로 상대를 얼음 상태로 만든다.",
    alwaysHit: false,
    description: "냉동빔을 상대에게 발사하여 공격한다. 얼음 상태로 만들 때가 있다.",
  },

  // ── 격투 ─────────────────────────────────
  "인파이트": {
    name: "인파이트",
    type: "격투",
    category: "물리",
    power: 60,
    accuracy: 100,
    pp: 5,
    priority: 0,
    rankChange: { target: "self", stat: "def", stage: -1 },
    effect: "사용 후 자신의 방어가 -1 하락한다.",
    alwaysHit: false,
    description: "방어를 포기하고 상대 쪽으로 깊숙이 돌격한다. 자신의 방어가 떨어진다.",
  },

  "깨뜨리기": {
    name: "깨뜨리기",
    type: "격투",
    category: "물리",
    power: 45,
    accuracy: 100,
    pp: 15,
    priority: 0,
    rankChange: null,
    effect: null,
    alwaysHit: false,
    description: "수도로 기세 좋게 내려쳐서 상대를 공격한다.",
  },

  "무릎차기": {
    name: "무릎차기",
    type: "격투",
    category: "물리",
    power: 70,
    accuracy: 90,
    pp: 10,
    priority: 0,
    rankChange: null,
    effect: null,
    alwaysHit: false,
    description: "점프해서 무릎차기로 상대를 공격한다. 빗나가면 자신이 전체 HP의 1/4의 피해를 입는다.",
  },

  // ── 에스퍼 ───────────────────────────────
  "사이코키네시스": {
    name: "사이코키네시스",
    type: "에스퍼",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 10,
    priority: 0,
    rankChange: null,
    effect: "10% 확률로 상대의 방어가 -1 하락한다.",
    alwaysHit: false,
    description: "강한 염동력을 상대에게 보내어 공격한다. 상대의 방어를 떨어뜨릴 때가 있다.",
  },

  // ── 악 ───────────────────────────────────
  "악의파동": {
    name: "악의파동",
    type: "악",
    category: "특수",
    power: 50,
    accuracy: 100,
    pp: 15,
    priority: 0,
    rankChange: null,
    effect: "20% 확률로 상대를 풀죽게 만든다.",
    alwaysHit: false,
    description: "몸에서 악의로 가득한 무서운 오라를 발한다. 상대를 풀죽게 만들 때가 있다.",
  },

  // ── 드래곤 ───────────────────────────────
  "용의파동": {
    name: "용의파동",
    type: "드래곤",
    category: "특수",
    power: 40,
    accuracy: 100,
    pp: 10,
    priority: 0,
    rankChange: null,
    effect: null,
    alwaysHit: false,
    description: "큰 입으로 충격파를 일으켜서 상대를 공격한다.",
  },

  // ── 벌레 ───────────────────────────────────
  "달려들기": {
    name: "달려들기",
    type: "벌레",
    category: "특수",
    power: 40,
    accuracy: 100,
    pp: 20,
    priority: 0,
    rankChange: { target: "foe", stat: "spd", stage: -1 },
    effect: null,
    alwaysHit: false,
    description: "상대에게 달려들어 공격한다. 상대의 스피드를 -1 떨어뜨린다.",
  },

 // ── 땅 ───────────────────────────────────
 "머드샷": {
    name: "머드샷",
    type: "땅",
    category: "특수",
    power: 40,
    accuracy: 95,
    pp: 15,
    priority: 0,
    rankChange: { target: "foe", stat: "spd", stage: -1 },
    effect: null,
    alwaysHit: false,
    description: "진흙 덩어리를 상대에게 내던져서 공격한다. 상대의 스피드를 -1 떨어뜨린다.",
  },

};
