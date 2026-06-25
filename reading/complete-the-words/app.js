// ── Constants ────────────────────────────────────────────────────────────────
const EXAM_SIZE = 10;

// ── Utility ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── State ────────────────────────────────────────────────────────────────────
let exam = [];
let currentIdx = 0;
let qState = [];  // { inputs: ["word1typed", "word2typed", ...], checked, revealed, isCorrect }

function initState() {
  exam = shuffle(missingQuestions).slice(0, EXAM_SIZE);
  currentIdx = 0;
  qState = exam.map(q => ({
    inputs: q.blanks.map(() => ""),
    checked: false,
    revealed: false,
    isCorrect: null
  }));
}

// ── Navigation ───────────────────────────────────────────────────────────────
function goTo(idx) {
  if (idx < 0 || idx >= EXAM_SIZE) return;
  saveInputs();
  currentIdx = idx;
  render();
}

function handleNext() {
  saveInputs();
  if (currentIdx < EXAM_SIZE - 1) goTo(currentIdx + 1);
  else showScore();
}

// Read inputs from DOM into state before leaving
function saveInputs() {
  const inputs = document.querySelectorAll(".letter-input");
  const s = qState[currentIdx];
  const q = exam[currentIdx];
  let domIdx = 0;
  q.blanks.forEach((blank, bi) => {
    let val = "";
    for (let li = 0; li < blank.answer.length; li++) {
      val += (inputs[domIdx] ? inputs[domIdx].value : "");
      domIdx++;
    }
    s.inputs[bi] = val;
  });
}

// ── Render ───────────────────────────────────────────────────────────────────
function render() {
  const q = exam[currentIdx];
  const s = qState[currentIdx];
  const n = currentIdx + 1;

  document.getElementById("q-counter").textContent = `${n} / ${EXAM_SIZE}`;
  document.getElementById("progress-fill").style.width = `${(n / EXAM_SIZE) * 100}%`;
  document.getElementById("btn-prev").disabled = currentIdx === 0;
  document.getElementById("btn-next").textContent = currentIdx === EXAM_SIZE - 1 ? "Finish exam ✓" : "Next →";

  const card = document.getElementById("main-card");
  card.innerHTML = "";

  const instr = document.createElement("div");
  instr.className = "q-number";
  instr.textContent = "Fill in the missing letters in the paragraph.";
  card.appendChild(instr);

  // Build paragraph with inline letter inputs
  const para = document.createElement("p");
  para.className = "para";

  let blankIdx = 0;
  let inputRefs = [];

  const parts = q.paragraph.split("__BLANK__");
  parts.forEach((part, pi) => {
    if (part) para.appendChild(document.createTextNode(part));

    if (pi < parts.length - 1) {
      const blank = q.blanks[blankIdx];
      const answer = blank.answer;

      for (let li = 0; li < answer.length; li++) {
        const inp = document.createElement("input");
        inp.type = "text";
        inp.maxLength = 1;
        inp.className = "letter-input";
        inp.dataset.blank = blankIdx;
        inp.dataset.letter = li;
        inp.disabled = s.checked || s.revealed;

        const savedWord = s.inputs[blankIdx] || "";
        inp.value = savedWord[li] || "";

        if (s.checked || s.revealed) {
          const userWord = s.inputs[blankIdx] || "";
          if (s.revealed) {
            inp.value = answer[li];
            inp.classList.add("correct");
          } else {
            const correct = userWord[li]?.toLowerCase() === answer[li].toLowerCase();
            inp.classList.add(correct ? "correct" : "wrong");
          }
        }

        inp.addEventListener("input", (e) => {
          if (e.target.value.length === 1) {
            const next = inputRefs[inputRefs.indexOf(e.target) + 1];
            if (next) next.focus();
          }
        });
        inp.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && e.target.value === "") {
            const prev = inputRefs[inputRefs.indexOf(e.target) - 1];
            if (prev) { prev.focus(); prev.value = ""; }
          }
        });

        inputRefs.push(inp);
        para.appendChild(inp);
      }
      blankIdx++;
    }
  });
  card.appendChild(para);

  // Buttons
  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn btn-primary";
  checkBtn.textContent = s.checked ? (s.isCorrect ? "Correct ✓" : "Wrong ✗") : "Check answer ↗";
  checkBtn.disabled = s.checked || s.revealed;
  checkBtn.onclick = () => { saveInputs(); checkAnswer(); };
  btnRow.appendChild(checkBtn);

  const showBtn = document.createElement("button");
  showBtn.className = "btn btn-outline";
  showBtn.textContent = s.revealed ? "Answer shown" : "Show answer";
  showBtn.disabled = s.revealed;
  showBtn.onclick = () => { saveInputs(); revealAnswer(); };
  btnRow.appendChild(showBtn);

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn";
  resetBtn.textContent = "Reset";
  resetBtn.disabled = s.checked || s.revealed;
  resetBtn.onclick = resetQuestion;
  btnRow.appendChild(resetBtn);

  card.appendChild(btnRow);

  if (s.checked) {
    const fb = document.createElement("div");
    fb.className = "feedback " + (s.isCorrect ? "correct" : "wrong");
    fb.style.display = "block";
    fb.innerHTML = s.isCorrect
      ? "<strong>All correct!</strong> Great work."
      : "<strong>Not quite.</strong> Wrong letters are highlighted in red. Try \"Show answer\" to see the full solution.";
    card.appendChild(fb);
  }

  if (s.revealed) {
    const rfb = document.createElement("div");
    rfb.className = "feedback reveal";
    rfb.style.display = "block";
    const words = q.blanks.map(b => `<strong>${b.answer}</strong>`).join(", ");
    rfb.innerHTML = `<strong>Correct answers:</strong> ${words}`;
    card.appendChild(rfb);
  }
}

// ── Actions ───────────────────────────────────────────────────────────────────
function checkAnswer() {
  const s = qState[currentIdx];
  const q = exam[currentIdx];
  if (s.checked || s.revealed) return;
  s.isCorrect = q.blanks.every((blank, bi) =>
    (s.inputs[bi] || "").toLowerCase() === blank.answer.toLowerCase()
  );
  s.checked = true;
  render();
}

function revealAnswer() {
  const s = qState[currentIdx];
  if (s.revealed) return;
  if (!s.isCorrect) s.isCorrect = false;
  s.revealed = true;
  render();
}

function resetQuestion() {
  const q = exam[currentIdx];
  qState[currentIdx] = { inputs: q.blanks.map(() => ""), checked: false, revealed: false, isCorrect: null };
  render();
}

// ── Score ─────────────────────────────────────────────────────────────────────
function showScore() {
  saveInputs();
  qState.forEach((s, i) => {
    if (s.checked || s.revealed) return;
    const q = exam[i];
    s.isCorrect = q.blanks.every((blank, bi) =>
      (s.inputs[bi] || "").toLowerCase() === blank.answer.toLowerCase()
    );
  });

  const correct = qState.filter(s => s.isCorrect === true).length;
  const pct = Math.round((correct / EXAM_SIZE) * 100);

  document.getElementById("quiz-view").style.display = "none";
  document.getElementById("score-screen").style.display = "block";
  document.getElementById("score-num").textContent = `${correct}/${EXAM_SIZE}`;
  document.getElementById("score-msg").textContent =
    pct === 100 ? "Perfect score! Outstanding." :
    pct >= 80   ? "Great job! A few to review." :
    pct >= 60   ? "Good effort — keep practicing!" :
                  "Keep going — practice makes perfect!";

  const list = document.getElementById("review-list");
  list.innerHTML = "";
  exam.forEach((q, i) => {
    const s = qState[i];
    const ok = s.isCorrect === true;
    const item = document.createElement("div");
    item.className = "review-item " + (ok ? "correct-item" : "wrong-item");
    item.innerHTML = `<div class="tag ${ok ? "tag-correct" : "tag-wrong"}" style="margin-bottom:6px">${ok ? "✓ Correct" : "✗ Incorrect"}</div><div class="review-q-text">Q${i+1}: ${q.title}</div>`;
    q.blanks.forEach((blank, bi) => {
      const given = s.inputs[bi] || "(empty)";
      const match = given.toLowerCase() === blank.answer.toLowerCase();
      const row = document.createElement("div");
      row.className = "review-row";
      row.innerHTML = match
        ? `<span class="label">Blank ${bi+1}:</span><span class="ok">${given} ✓</span>`
        : `<span class="label">Blank ${bi+1}:</span><span class="given">${given}</span> → <span class="correct">${blank.answer}</span>`;
      item.appendChild(row);
    });
    list.appendChild(item);
  });
}

// ── Restart ───────────────────────────────────────────────────────────────────
function restart() {
  document.getElementById("score-screen").style.display = "none";
  document.getElementById("quiz-view").style.display = "block";
  initState();
  render();
}

// Also patch index.html's score screen to use quiz-view pattern
// (index.html uses generic .app:not(#score-screen) toggle — fix by using quiz-view id)

initState();
render();
