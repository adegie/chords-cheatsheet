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

const formulaTable = document.querySelector("#formula-table");
const rootFilter = document.querySelector("#root-filter");
const familyFilter = document.querySelector("#family-filter");
const searchFilter = document.querySelector("#search-filter");
const chordGroups = document.querySelector("#chord-groups");
const chordSummary = document.querySelector("#chord-summary");

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

function keyboardHtml(activePcs) {
  const whiteKeys = whiteKeyNames.map((name, index) => {
    const active = activePcs.has(whiteKeyPcs[index]) ? " active" : "";
    return `<span class="white-key${active}">${name}</span>`;
  }).join("");

  const blackKeyHtml = blackKeys.map((key) => {
    const active = activePcs.has(key.pc) ? " active" : "";
    return `<span class="black-key${active}" style="left: ${key.left}%">${key.name}</span>`;
  }).join("");

  return `<div class="keyboard" aria-hidden="true"><div class="white-keys">${whiteKeys}</div>${blackKeyHtml}</div>`;
}

function cardHtml(root, type) {
  const notes = chordNotes(root, type);
  const activePcs = chordPitchClasses(root, type);
  const name = chordName(root, type);

  return `
    <article class="chord-card" data-name="${escapeHtml(name)}" data-family="${escapeHtml(type.family)}">
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
      && (!searchValue || searchable.includes(searchValue));
  });
}

function renderChordLibrary() {
  const filtered = getFilteredChords();
  const grouped = roots.map((root) => ({
    root,
    chords: filtered.filter((item) => item.root.name === root.name)
  })).filter((group) => group.chords.length > 0);

  chordSummary.textContent = `Showing ${filtered.length} chord${filtered.length === 1 ? "" : "s"} from ${roots.length * chordTypes.length} total.`;

  if (grouped.length === 0) {
    chordGroups.innerHTML = `<div class="empty-state">No chords match the current filters.</div>`;
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
  const majorKeys = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];
  const minorKeys = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m/Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm"];
  const size = 520;
  const center = size / 2;
  const majorRadius = 194;
  const minorRadius = 126;
  const spokeRadius = 224;

  const items = majorKeys.map((major, index) => {
    const angle = (index * 30 - 90) * Math.PI / 180;
    const majorX = center + Math.cos(angle) * majorRadius;
    const majorY = center + Math.sin(angle) * majorRadius;
    const minorX = center + Math.cos(angle) * minorRadius;
    const minorY = center + Math.sin(angle) * minorRadius;
    const spokeX = center + Math.cos(angle) * spokeRadius;
    const spokeY = center + Math.sin(angle) * spokeRadius;

    return `
      <line class="wheel-spoke" x1="${center}" y1="${center}" x2="${spokeX.toFixed(2)}" y2="${spokeY.toFixed(2)}"></line>
      <text class="wheel-major" x="${majorX.toFixed(2)}" y="${majorY.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${major}</text>
      <text class="wheel-minor" x="${minorX.toFixed(2)}" y="${minorY.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${minorKeys[index]}</text>
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
      <text x="${center}" y="${center - 8}" text-anchor="middle" fill="#f8f3e8" font-size="20" font-weight="800">5ths</text>
      <text x="${center}" y="${center + 18}" text-anchor="middle" fill="#c6bdad" font-size="13">clockwise</text>
    </svg>
  `;
}

function init() {
  renderFormulaTable();
  renderFilters();
  renderCircleOfFifths();
  renderChordLibrary();

  rootFilter.addEventListener("change", renderChordLibrary);
  familyFilter.addEventListener("change", renderChordLibrary);
  searchFilter.addEventListener("input", renderChordLibrary);
}

init();
