const roots = [
  { name: "C", pc: 0 },
  { name: "Db", pc: 1 },
  { name: "D", pc: 2 },
  { name: "Eb", pc: 3 },
  { name: "E", pc: 4 },
  { name: "F", pc: 5 },
  { name: "F#", pc: 6 },
  { name: "G", pc: 7 },
  { name: "Ab", pc: 8 },
  { name: "A", pc: 9 },
  { name: "Bb", pc: 10 },
  { name: "B", pc: 11 }
];

const chordTypes = [
  { name: "Major", symbol: "", family: "Triads", formula: "1-3-5", semitones: [0, 4, 7], sound: "Bright, stable" },
  { name: "Minor", symbol: "m", family: "Triads", formula: "1-b3-5", semitones: [0, 3, 7], sound: "Dark, stable" },
  { name: "Diminished", symbol: "dim", family: "Triads", formula: "1-b3-b5", semitones: [0, 3, 6], sound: "Tense, narrow" },
  { name: "Augmented", symbol: "aug", family: "Triads", formula: "1-3-#5", semitones: [0, 4, 8], sound: "Floating, unstable" },
  { name: "Suspended 2", symbol: "sus2", family: "Suspended", formula: "1-2-5", semitones: [0, 2, 7], sound: "Open, unresolved" },
  { name: "Suspended 4", symbol: "sus4", family: "Suspended", formula: "1-4-5", semitones: [0, 5, 7], sound: "Lifted, unresolved" },
  { name: "Major 6", symbol: "6", family: "Sixths", formula: "1-3-5-6", semitones: [0, 4, 7, 9], sound: "Warm, jazzy" },
  { name: "Minor 6", symbol: "m6", family: "Sixths", formula: "1-b3-5-6", semitones: [0, 3, 7, 9], sound: "Moody, elegant" },
  { name: "Major 7", symbol: "maj7", family: "Sevenths", formula: "1-3-5-7", semitones: [0, 4, 7, 11], sound: "Lush, dreamy" },
  { name: "Dominant 7", symbol: "7", family: "Sevenths", formula: "1-3-5-b7", semitones: [0, 4, 7, 10], sound: "Bluesy, resolving" },
  { name: "Minor 7", symbol: "m7", family: "Sevenths", formula: "1-b3-5-b7", semitones: [0, 3, 7, 10], sound: "Soft, soulful" },
  { name: "Half-diminished 7", symbol: "m7b5", family: "Sevenths", formula: "1-b3-b5-b7", semitones: [0, 3, 6, 10], sound: "Jazz tension" },
  { name: "Diminished 7", symbol: "dim7", family: "Sevenths", formula: "1-b3-b5-bb7", semitones: [0, 3, 6, 9], sound: "Symmetric tension" },
  { name: "Minor-major 7", symbol: "mMaj7", family: "Sevenths", formula: "1-b3-5-7", semitones: [0, 3, 7, 11], sound: "Mysterious" },
  { name: "Add 9", symbol: "add9", family: "Extensions", formula: "1-3-5-9", semitones: [0, 4, 7, 14], sound: "Sparkling" },
  { name: "Minor Add 9", symbol: "madd9", family: "Extensions", formula: "1-b3-5-9", semitones: [0, 3, 7, 14], sound: "Tender, modern" },
  { name: "Dominant 9", symbol: "9", family: "Extensions", formula: "1-3-5-b7-9", semitones: [0, 4, 7, 10, 14], sound: "Funky, rich" },
  { name: "Major 9", symbol: "maj9", family: "Extensions", formula: "1-3-5-7-9", semitones: [0, 4, 7, 11, 14], sound: "Glossy, cinematic" },
  { name: "Minor 9", symbol: "m9", family: "Extensions", formula: "1-b3-5-b7-9", semitones: [0, 3, 7, 10, 14], sound: "Deep, spacious" }
];

const pitchNamesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const pitchNamesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const flatRoots = new Set(["Db", "Eb", "F", "Ab", "Bb"]);
const whiteKeyNames = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B"];
const blackKeys = [
  { name: "C#", pc: 1, left: 5.2 },
  { name: "D#", pc: 3, left: 12.4 },
  { name: "F#", pc: 6, left: 26.8 },
  { name: "G#", pc: 8, left: 34.0 },
  { name: "A#", pc: 10, left: 41.1 },
  { name: "C#", pc: 1, left: 55.4 },
  { name: "D#", pc: 3, left: 62.5 },
  { name: "F#", pc: 6, left: 76.9 },
  { name: "G#", pc: 8, left: 84.0 },
  { name: "A#", pc: 10, left: 91.1 }
];
const whiteKeyPcs = [0, 2, 4, 5, 7, 9, 11, 0, 2, 4, 5, 7, 9, 11];
const miniBlackKeys = [
  { name: "C#", pc: 1, left: 10.6 },
  { name: "D#", pc: 3, left: 24.9 },
  { name: "F#", pc: 6, left: 53.4 },
  { name: "G#", pc: 8, left: 67.7 },
  { name: "A#", pc: 10, left: 82.0 }
];

const formulaTable = document.querySelector("#formula-table");
const rootFilter = document.querySelector("#root-filter");
const familyFilter = document.querySelector("#family-filter");
const searchFilter = document.querySelector("#search-filter");
const chordGroups = document.querySelector("#chord-groups");
const chordSummary = document.querySelector("#chord-summary");
const themeToggle = document.querySelector("#theme-toggle");
const guitarModeToggle = document.querySelector("#guitar-mode-toggle");
const selectedOnlyToggle = document.querySelector("#selected-only-toggle");
const clearSelectionButton = document.querySelector("#clear-selection");
const selectedChords = new Set();
let showSelectedOnly = false;
let showGuitarView = false;
let selectedFifthsIndex = 0;

const fifthsKeys = [
  { major: "C", minor: "Am", signature: "No sharps or flats", accidentals: "Natural notes only", scaleChords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"] },
  { major: "G", minor: "Em", signature: "1 sharp", accidentals: "F#", scaleChords: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"] },
  { major: "D", minor: "Bm", signature: "2 sharps", accidentals: "F#, C#", scaleChords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"] },
  { major: "A", minor: "F#m", signature: "3 sharps", accidentals: "F#, C#, G#", scaleChords: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"] },
  { major: "E", minor: "C#m", signature: "4 sharps", accidentals: "F#, C#, G#, D#", scaleChords: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"] },
  { major: "B", minor: "G#m", signature: "5 sharps", accidentals: "F#, C#, G#, D#, A#", scaleChords: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"] },
  { major: "F#/Gb", minor: "D#m/Ebm", signature: "6 sharps or 6 flats", accidentals: "F# key: F#, C#, G#, D#, A#, E#; Gb key: Bb, Eb, Ab, Db, Gb, Cb", scaleChords: ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#dim"] },
  { major: "Db", minor: "Bbm", signature: "5 flats", accidentals: "Bb, Eb, Ab, Db, Gb", scaleChords: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim"] },
  { major: "Ab", minor: "Fm", signature: "4 flats", accidentals: "Bb, Eb, Ab, Db", scaleChords: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"] },
  { major: "Eb", minor: "Cm", signature: "3 flats", accidentals: "Bb, Eb, Ab", scaleChords: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"] },
  { major: "Bb", minor: "Gm", signature: "2 flats", accidentals: "Bb, Eb", scaleChords: ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"] },
  { major: "F", minor: "Dm", signature: "1 flat", accidentals: "Bb", scaleChords: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"] }
];
const fifthsKeyPcs = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
const diatonicDegrees = [
  { roman: "I", offset: 0, semitones: [0, 4, 7] },
  { roman: "ii", offset: 2, semitones: [0, 3, 7] },
  { roman: "iii", offset: 4, semitones: [0, 3, 7] },
  { roman: "IV", offset: 5, semitones: [0, 4, 7] },
  { roman: "V", offset: 7, semitones: [0, 4, 7] },
  { roman: "vi", offset: 9, semitones: [0, 3, 7] },
  { roman: "vii°", offset: 11, semitones: [0, 3, 6] }
];
const guitarStrings = [
  { name: "E", pc: 4 },
  { name: "A", pc: 9 },
  { name: "D", pc: 2 },
  { name: "G", pc: 7 },
  { name: "B", pc: 11 },
  { name: "E", pc: 4 }
];

function pitchClass(value) {
  return ((value % 12) + 12) % 12;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[character]);
}

function noteName(root, semitone) {
  const names = flatRoots.has(root.name) ? pitchNamesFlat : pitchNamesSharp;
  return names[pitchClass(root.pc + semitone)];
}

function chordName(root, type) {
  return `${root.name}${type.symbol}`;
}

function chordId(root, type) {
  return `${root.name}::${type.symbol || "maj"}`;
}

function chordNotes(root, type) {
  return type.semitones.map((semitone) => noteName(root, semitone));
}

function chordPitchClasses(root, type) {
  return new Set(type.semitones.map((semitone) => pitchClass(root.pc + semitone)));
}

function renderFormulaTable() {
  formulaTable.innerHTML = chordTypes.map((type) => `
    <tr>
      <td><strong>${escapeHtml(type.name)}</strong></td>
      <td>${escapeHtml(type.symbol || "maj")}</td>
      <td>${escapeHtml(type.formula)}</td>
      <td>${escapeHtml(type.semitones.join(" / "))}</td>
      <td>${escapeHtml(type.sound)}</td>
    </tr>
  `).join("");
}

function renderFilters() {
  rootFilter.innerHTML = `<option value="all">All roots</option>${roots.map((root) => `<option value="${root.name}">${root.name}</option>`).join("")}`;
  const families = [...new Set(chordTypes.map((type) => type.family))];
  familyFilter.innerHTML = `<option value="all">All families</option>${families.map((family) => `<option value="${family}">${family}</option>`).join("")}`;
}

function keyboardHtml(activePcs, className = "", singleOctave = false) {
  const classes = ["keyboard", className].filter(Boolean).join(" ");
  const visibleWhiteKeyNames = singleOctave ? whiteKeyNames.slice(0, 7) : whiteKeyNames;
  const visibleWhiteKeyPcs = singleOctave ? whiteKeyPcs.slice(0, 7) : whiteKeyPcs;
  const visibleBlackKeys = singleOctave ? miniBlackKeys : blackKeys;
  const whiteKeys = visibleWhiteKeyNames.map((name, index) => {
    const active = activePcs.has(visibleWhiteKeyPcs[index]) ? " active" : "";
    return `<span class="white-key${active}"></span>`;
  }).join("");

  const blackKeyHtml = visibleBlackKeys.map((key) => {
    const active = activePcs.has(key.pc) ? " active" : "";
    return `<span class="black-key${active}" style="left: ${key.left}%"></span>`;
  }).join("");

  return `<div class="${classes}" aria-hidden="true"><div class="white-keys">${whiteKeys}</div>${blackKeyHtml}</div>`;
}

function miniKeyboardSvg(activePcs) {
  const whiteKeys = [0, 2, 4, 5, 7, 9, 11].map((pc, index) => {
    const active = activePcs.has(pc) ? " active" : "";
    return `<rect class="mini-white${active}" x="${index * 20}" y="0" width="20" height="48" rx="3"></rect>`;
  }).join("");
  const blackKeys = [
    { pc: 1, x: 14 },
    { pc: 3, x: 34 },
    { pc: 6, x: 74 },
    { pc: 8, x: 94 },
    { pc: 10, x: 114 }
  ].map((key) => {
    const active = activePcs.has(key.pc) ? " active" : "";
    return `<rect class="mini-black${active}" x="${key.x}" y="0" width="12" height="30" rx="2"></rect>`;
  }).join("");

  return `<svg class="mini-keyboard-svg" viewBox="0 0 140 48" role="img" aria-hidden="true" focusable="false">${whiteKeys}${blackKeys}</svg>`;
}

function guitarFretboardHtml(root, type) {
  const activePcs = chordPitchClasses(root, type);
  const rootPc = pitchClass(root.pc);
  const left = 32;
  const top = 30;
  const fretWidth = 38;
  const stringGap = 15;
  const fretCount = 5;
  const width = fretWidth * fretCount;
  const stringLines = guitarStrings.map((string, index) => {
    const y = top + index * stringGap;
    return `<line class="guitar-string" x1="${left}" y1="${y}" x2="${left + width}" y2="${y}"></line>`;
  }).join("");
  const fretLines = Array.from({ length: fretCount + 1 }, (_, fret) => {
    const x = left + fret * fretWidth;
    return `<line class="guitar-fret${fret === 0 ? " guitar-nut" : ""}" x1="${x}" y1="${top}" x2="${x}" y2="${top + stringGap * 5}"></line>`;
  }).join("");
  const stringLabels = guitarStrings.map((string, index) => {
    const y = top + index * stringGap + 4;
    return `<text class="guitar-label" x="12" y="${y}">${string.name}</text>`;
  }).join("");
  const fretLabels = Array.from({ length: fretCount + 1 }, (_, fret) => {
    const x = fret === 0 ? left - 13 : left + (fret - 0.5) * fretWidth;
    return `<text class="guitar-fret-label" x="${x}" y="15" text-anchor="middle">${fret}</text>`;
  }).join("");
  const dots = guitarStrings.flatMap((string, stringIndex) => {
    const y = top + stringIndex * stringGap;

    return Array.from({ length: fretCount + 1 }, (_, fret) => {
      const pc = pitchClass(string.pc + fret);
      if (!activePcs.has(pc)) return "";

      const x = fret === 0 ? left - 13 : left + (fret - 0.5) * fretWidth;
      const isRoot = pc === rootPc;
      return `<circle class="guitar-dot${isRoot ? " guitar-root" : ""}" cx="${x}" cy="${y}" r="5.7"></circle>`;
    });
  }).flat().join("");

  return `
    <div class="guitar-view" aria-label="Guitar fret map for ${escapeHtml(chordName(root, type))}">
      <div class="guitar-view-head">
        <strong>Guitar fret map</strong>
        <span>standard tuning, frets 0-5</span>
      </div>
      <svg class="guitar-fretboard" viewBox="0 0 236 122" role="img" aria-hidden="true" focusable="false">
        ${fretLabels}
        ${stringLabels}
        ${stringLines}
        ${fretLines}
        ${dots}
      </svg>
    </div>
  `;
}

function cardHtml(root, type) {
  const notes = chordNotes(root, type);
  const activePcs = chordPitchClasses(root, type);
  const name = chordName(root, type);
  const id = chordId(root, type);
  const isSelected = selectedChords.has(id);

  return `
    <article class="chord-card${isSelected ? " selected" : ""}" data-chord-id="${escapeHtml(id)}" data-name="${escapeHtml(name)}" data-family="${escapeHtml(type.family)}" role="button" tabindex="0" aria-pressed="${String(isSelected)}" aria-label="${isSelected ? "Deselect" : "Select"} ${escapeHtml(name)}">
      <div class="card-head">
        <div>
          <h4 class="chord-name">${escapeHtml(name)}</h4>
          <span class="chord-kind">${escapeHtml(type.name)}</span>
        </div>
        <span class="badge">${escapeHtml(type.family)}</span>
      </div>
      <p class="notes" aria-label="Notes in ${escapeHtml(name)}">${notes.map((note) => `<span class="note-chip">${escapeHtml(note)}</span>`).join("")}</p>
      <div class="meta">
        <span><strong>Formula</strong><br>${escapeHtml(type.formula)}</span>
        <span><strong>Semitones</strong><br>${escapeHtml(type.semitones.join("-"))}</span>
      </div>
      ${keyboardHtml(activePcs)}
      ${showGuitarView ? guitarFretboardHtml(root, type) : ""}
    </article>
  `;
}

function getFilteredChords() {
  const rootValue = rootFilter.value;
  const familyValue = familyFilter.value;
  const searchValue = searchFilter.value.trim().toLowerCase();

  return roots.flatMap((root) => chordTypes.map((type) => ({ root, type }))).filter(({ root, type }) => {
    const notes = chordNotes(root, type).join(" ");
    const searchable = `${chordName(root, type)} ${root.name} ${type.name} ${type.symbol} ${type.family} ${type.formula} ${notes}`.toLowerCase();
    return (rootValue === "all" || root.name === rootValue)
      && (familyValue === "all" || type.family === familyValue)
      && (!searchValue || searchable.includes(searchValue))
      && (!showSelectedOnly || selectedChords.has(chordId(root, type)));
  });
}

function updateSelectionControls() {
  guitarModeToggle.textContent = showGuitarView ? "Hide guitar frets" : "Show guitar frets";
  guitarModeToggle.setAttribute("aria-pressed", String(showGuitarView));
  selectedOnlyToggle.textContent = showSelectedOnly ? "Show all chords" : "Show selected only";
  selectedOnlyToggle.setAttribute("aria-pressed", String(showSelectedOnly));
  clearSelectionButton.disabled = selectedChords.size === 0;
}

function renderChordLibrary() {
  const filtered = getFilteredChords();
  const grouped = roots.map((root) => ({
    root,
    chords: filtered.filter((item) => item.root.name === root.name)
  })).filter((group) => group.chords.length > 0);

  chordGroups.classList.toggle("selected-only-view", showSelectedOnly);
  updateSelectionControls();
  chordSummary.textContent = `Showing ${filtered.length} chord${filtered.length === 1 ? "" : "s"} from ${roots.length * chordTypes.length} total. ${selectedChords.size} selected.`;

  if (grouped.length === 0) {
    chordGroups.innerHTML = `<div class="empty-state">${showSelectedOnly ? "No selected chords match the current filters." : "No chords match the current filters."}</div>`;
    return;
  }

  chordGroups.innerHTML = grouped.map((group) => `
    <section class="root-group" aria-labelledby="root-${group.root.name.replace("#", "sharp")}">
      <h3 id="root-${group.root.name.replace("#", "sharp")}">${escapeHtml(group.root.name)} chords</h3>
      <div class="cards">${group.chords.map(({ root, type }) => cardHtml(root, type)).join("")}</div>
    </section>
  `).join("");
}

function renderCircleOfFifths() {
  const size = 520;
  const center = size / 2;
  const majorRadius = 194;
  const minorRadius = 126;
  const spokeRadius = 224;

  const items = fifthsKeys.map((key, index) => {
    const angle = (index * 30 - 90) * Math.PI / 180;
    const majorX = center + Math.cos(angle) * majorRadius;
    const majorY = center + Math.sin(angle) * majorRadius;
    const minorX = center + Math.cos(angle) * minorRadius;
    const minorY = center + Math.sin(angle) * minorRadius;
    const spokeX = center + Math.cos(angle) * spokeRadius;
    const spokeY = center + Math.sin(angle) * spokeRadius;
    const isSelected = index === selectedFifthsIndex;

    return `
      <g class="wheel-key${isSelected ? " selected" : ""}" data-fifths-index="${index}" role="button" tabindex="0" aria-label="Show ${key.major} major and ${key.minor} minor">
        <line class="wheel-spoke" x1="${center}" y1="${center}" x2="${spokeX.toFixed(2)}" y2="${spokeY.toFixed(2)}"></line>
        <circle class="wheel-hit wheel-hit-major" cx="${majorX.toFixed(2)}" cy="${majorY.toFixed(2)}" r="38"></circle>
        <circle class="wheel-hit wheel-hit-minor" cx="${minorX.toFixed(2)}" cy="${minorY.toFixed(2)}" r="29"></circle>
        <text class="wheel-major" x="${majorX.toFixed(2)}" y="${majorY.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${key.major}</text>
        <text class="wheel-minor" x="${minorX.toFixed(2)}" y="${minorY.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${key.minor}</text>
      </g>
    `;
  }).join("");

  document.querySelector("#circle-of-fifths").innerHTML = `
    <svg viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="fifths-svg-title fifths-svg-desc">
      <title id="fifths-svg-title">Circle of fifths</title>
      <desc id="fifths-svg-desc">Major keys around the outside and relative minor keys inside.</desc>
      <circle class="wheel-ring" cx="${center}" cy="${center}" r="230"></circle>
      <circle class="wheel-ring" cx="${center}" cy="${center}" r="160"></circle>
      <circle class="wheel-ring" cx="${center}" cy="${center}" r="82"></circle>
      ${items}
      <text class="wheel-center-title" x="${center}" y="${center - 8}" text-anchor="middle">5ths</text>
      <text class="wheel-center-subtitle" x="${center}" y="${center + 18}" text-anchor="middle">click a key</text>
    </svg>
  `;

  renderFifthsInfo();
}

function renderFifthsInfo() {
  const key = fifthsKeys[selectedFifthsIndex];
  const keyPc = fifthsKeyPcs[selectedFifthsIndex];
  const previousKey = fifthsKeys[pitchClass(selectedFifthsIndex - 1)];
  const nextKey = fifthsKeys[pitchClass(selectedFifthsIndex + 1)];
  const [one, two, three, four, five, six, seven] = key.scaleChords;
  const diatonicChordCards = diatonicDegrees.map((degree, index) => {
    const rootPc = pitchClass(keyPc + degree.offset);
    const activePcs = new Set(degree.semitones.map((semitone) => pitchClass(rootPc + semitone)));

    return `
      <span>
        <strong>${degree.roman}</strong>
        ${escapeHtml(key.scaleChords[index])}
        ${miniKeyboardSvg(activePcs)}
      </span>
    `;
  }).join("");

  document.querySelector("#fifths-info").innerHTML = `
    <p class="eyebrow">Selected key</p>
    <h3>${escapeHtml(key.major)} major / ${escapeHtml(key.minor)} minor</h3>
    <div class="key-facts">
      <span><strong>Signature</strong>${escapeHtml(key.signature)}</span>
      <span><strong>Accidentals</strong>${escapeHtml(key.accidentals)}</span>
      <span><strong>IV chord</strong>${escapeHtml(four)} from ${escapeHtml(previousKey.major)} side</span>
      <span><strong>V chord</strong>${escapeHtml(five)} from ${escapeHtml(nextKey.major)} side</span>
    </div>
    <h4>How to use the wheel</h4>
    <ul>
      <li><strong>Neighbor keys:</strong> ${escapeHtml(previousKey.major)} and ${escapeHtml(nextKey.major)} are the closest major keys to ${escapeHtml(key.major)}. Borrowing from them usually sounds natural.</li>
      <li><strong>I-IV-V:</strong> use ${escapeHtml(one)} - ${escapeHtml(four)} - ${escapeHtml(five)} for a strong basic progression.</li>
      <li><strong>ii-V-I:</strong> use ${escapeHtml(two)} - ${escapeHtml(five)} - ${escapeHtml(one)} for a jazz/pop resolution.</li>
      <li><strong>Relative minor:</strong> ${escapeHtml(six)} uses the same notes as ${escapeHtml(one)} but feels darker because ${escapeHtml(key.minor.replace(/m/g, ""))} becomes home.</li>
    </ul>
    <div class="diatonic-chords" aria-label="Diatonic triads in ${escapeHtml(key.major)} major">
      ${diatonicChordCards}
    </div>
  `;
}

function selectFifthsKey(index) {
  selectedFifthsIndex = index;
  renderCircleOfFifths();
}

function setTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light-theme", isLight);
  themeToggle.textContent = isLight ? "Dark theme" : "Light theme";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  localStorage.setItem("piano-chords-theme", theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("piano-chords-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  setTheme(savedTheme || preferredTheme);

  themeToggle.addEventListener("click", () => {
    setTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
  });
}

function init() {
  initTheme();
  renderFormulaTable();
  renderFilters();
  renderCircleOfFifths();
  renderChordLibrary();

  rootFilter.addEventListener("change", renderChordLibrary);
  familyFilter.addEventListener("change", renderChordLibrary);
  searchFilter.addEventListener("input", renderChordLibrary);
  guitarModeToggle.addEventListener("click", () => {
    showGuitarView = !showGuitarView;
    renderChordLibrary();
  });
  selectedOnlyToggle.addEventListener("click", () => {
    showSelectedOnly = !showSelectedOnly;
    renderChordLibrary();
  });
  clearSelectionButton.addEventListener("click", () => {
    selectedChords.clear();
    showSelectedOnly = false;
    renderChordLibrary();
  });
  chordGroups.addEventListener("click", (event) => {
    const card = event.target.closest(".chord-card");
    if (!card) return;

    toggleChordSelection(card.dataset.chordId);
  });
  chordGroups.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest(".chord-card");
    if (!card) return;

    event.preventDefault();
    toggleChordSelection(card.dataset.chordId);
  });
  document.querySelector("#circle-of-fifths").addEventListener("click", (event) => {
    const key = event.target.closest(".wheel-key");
    if (!key) return;

    selectFifthsKey(Number(key.dataset.fifthsIndex));
  });
  document.querySelector("#circle-of-fifths").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const key = event.target.closest(".wheel-key");
    if (!key) return;

    event.preventDefault();
    selectFifthsKey(Number(key.dataset.fifthsIndex));
  });
}

function toggleChordSelection(id) {
    if (selectedChords.has(id)) {
      selectedChords.delete(id);
    } else {
      selectedChords.add(id);
    }

    renderChordLibrary();
}

init();
