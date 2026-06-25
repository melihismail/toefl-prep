const EXAM_SIZE = 16;
function shuffle(a) { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }

let exam = [], currentIdx = 0, qState = [];

function initState() {
  exam = shuffle(questions).slice(0, EXAM_SIZE);
  currentIdx = 0;
  qState = exam.map(q => ({
    // bank = correct words + one distractor, shuffled
    bank: shuffle([...q.correct, q.distractor]),
    placed: [],
    checked: false,
    revealed: false,
    isCorrect: null
  }));
}

function goTo(idx) { if (idx < 0 || idx >= EXAM_SIZE) return; currentIdx = idx; render(); }
function handleNext() { if (currentIdx < EXAM_SIZE - 1) goTo(currentIdx + 1); else showScore(); }

function render() {
  const q = exam[currentIdx], s = qState[currentIdx], n = currentIdx + 1;
  document.getElementById("q-counter").textContent = `${n} / ${EXAM_SIZE}`;
  document.getElementById("progress-fill").style.width = `${(n / EXAM_SIZE) * 100}%`;
  document.getElementById("btn-prev").disabled = currentIdx === 0;
  document.getElementById("btn-next").textContent = currentIdx === EXAM_SIZE - 1 ? "Finish exam ✓" : "Next →";

  const card = document.getElementById("main-card");
  card.innerHTML = "";

  // ── Dialogue question ────────────────────────────────────────────────────
  const ql = document.createElement("div");
  ql.className = "q-number";
  ql.textContent = "Complete the response to this question:";
  card.appendChild(ql);

  const qbox = document.createElement("div");
  qbox.style.cssText = "background:var(--accent-light);border:1px solid var(--accent-mid);border-radius:var(--radius-sm);padding:10px 14px;margin-bottom:1rem;font-size:15px;font-weight:500;color:var(--text);font-style:italic;";
  qbox.textContent = `"${q.question}"`;
  card.appendChild(qbox);

  // ── Blank indicators + prompt ────────────────────────────────────────────
  const totalWords = q.correct.length;
  const indRow = document.createElement("div");
  indRow.style.cssText = "display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:1rem;";

  // Prompt word
  const promptSpan = document.createElement("span");
  promptSpan.style.cssText = "font-size:15px;font-weight:700;color:var(--accent);margin-right:2px;";
  promptSpan.textContent = q.prompt;
  indRow.appendChild(promptSpan);

  // One box per correct word
  for (let i = 0; i < totalWords; i++) {
    const box = document.createElement("div");
    box.className = "blank-box";
    if (i < s.placed.length) {
      box.textContent = s.placed[i];
      box.classList.add("filled");
      if (s.checked || s.revealed) {
        const ok = s.placed[i] === q.correct[i];
        box.style.color = ok ? "var(--success-text)" : "var(--error-text)";
        box.style.borderBottomColor = ok ? "var(--success-text)" : "var(--error-text)";
      }
    } else {
      box.classList.add("empty");
      box.textContent = "—";
    }
    indRow.appendChild(box);
  }
  card.appendChild(indRow);

  // ── Word bank ────────────────────────────────────────────────────────────
  const wb = document.createElement("div");
  wb.className = "word-bank";
  s.bank.forEach((word, ci) => {
    const chip = document.createElement("button");
    // Mark distractor differently after reveal
    const isDistractor = word === q.distractor;
    chip.className = "bank-chip";
    if (s.placed.includes(word) && s.bank.filter((w,i) => w === word).length === s.placed.filter(w => w === word).length) {
      chip.classList.add("used");
    }
    chip.textContent = word;
    chip.disabled = s.checked || s.revealed;

    // Track used slots properly
    chip.onclick = () => {
      if (s.placed.length >= totalWords) return;
      // count how many times this word is already placed vs available in bank
      const timesInBank = s.bank.filter(w => w === word).length;
      const timesPlaced = s.placed.filter(w => w === word).length;
      if (timesPlaced >= timesInBank) return;
      s.placed.push(word);
      render();
    };
    wb.appendChild(chip);
  });
  card.appendChild(wb);

  // Highlight used chips
  const chips = wb.querySelectorAll(".bank-chip");
  const placedCopy = [...s.placed];
  chips.forEach(chip => {
    const word = chip.textContent;
    const idx = placedCopy.indexOf(word);
    if (idx !== -1) {
      chip.classList.add("used");
      placedCopy.splice(idx, 1);
    }
  });

  // ── Buttons ──────────────────────────────────────────────────────────────
  const br = document.createElement("div");
  br.className = "btn-row";

  const allPlaced = s.placed.length === totalWords;
  const cb = document.createElement("button");
  cb.className = "btn btn-primary";
  cb.textContent = s.checked ? (s.isCorrect ? "Correct ✓" : "Wrong ✗") : "Check answer ↗";
  cb.disabled = !allPlaced || s.checked || s.revealed;
  cb.onclick = () => {
    s.isCorrect = s.placed.join(" ") === q.correct.join(" ");
    s.checked = true;
    render();
  };
  br.appendChild(cb);

  const sb = document.createElement("button");
  sb.className = "btn btn-outline";
  sb.textContent = s.revealed ? "Answer shown" : "Show answer";
  sb.disabled = s.revealed;
  sb.onclick = () => { s.revealed = true; render(); };
  br.appendChild(sb);

  const rb = document.createElement("button");
  rb.className = "btn";
  rb.textContent = "Reset";
  rb.disabled = s.checked || s.revealed;
  rb.onclick = () => {
    qState[currentIdx] = { bank: shuffle([...q.correct, q.distractor]), placed: [], checked: false, revealed: false, isCorrect: null };
    render();
  };
  br.appendChild(rb);

  // Undo button
  if (!s.checked && !s.revealed && s.placed.length > 0) {
    const ub = document.createElement("button");
    ub.className = "btn";
    ub.textContent = "↩ Undo";
    ub.onclick = () => { s.placed.pop(); render(); };
    br.appendChild(ub);
  }
  card.appendChild(br);

  // ── Feedback ─────────────────────────────────────────────────────────────
  if (s.checked) {
    const fb = document.createElement("div");
    fb.className = "feedback " + (s.isCorrect ? "correct" : "wrong");
    fb.style.display = "block";
    fb.innerHTML = s.isCorrect
      ? `<strong>Correct!</strong> "${q.prompt} ${q.correct.join(" ")}"`
      : `<strong>Not quite.</strong> Correct: <em>${q.prompt} ${q.correct.join(" ")}</em>`;
    card.appendChild(fb);
  }
  if (s.revealed) {
    const rfb = document.createElement("div");
    rfb.className = "feedback reveal";
    rfb.style.display = "block";
    rfb.innerHTML = `<strong>Answer:</strong> ${q.prompt} <em>${q.correct.join(" ")}</em> &nbsp;|&nbsp; <strong>Distractor:</strong> <span style="color:var(--error-text)">${q.distractor}</span>`;
    card.appendChild(rfb);
  }
}

// ── Score ─────────────────────────────────────────────────────────────────────
function showScore() {
  qState.forEach((s, i) => {
    if (s.checked || s.revealed) return;
    s.isCorrect = s.placed.join(" ") === exam[i].correct.join(" ");
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
    const s = qState[i], ok = s.isCorrect === true;
    const item = document.createElement("div");
    item.className = "review-item " + (ok ? "correct-item" : "wrong-item");
    const given = s.placed.length > 0 ? `${q.prompt} ${s.placed.join(" ")}` : "(no answer)";
    item.innerHTML = `
      <div class="tag ${ok ? "tag-correct" : "tag-wrong"}" style="margin-bottom:6px">${ok ? "✓ Correct" : "✗ Incorrect"}</div>
      <div class="review-q-text" style="font-style:italic;margin-bottom:4px">"${q.question}"</div>
      <div class="review-row"><span class="label">Your answer:</span><span class="${ok ? "ok" : "given"}">${given}</span></div>
      ${ok ? "" : `<div class="review-row"><span class="label">Correct:</span><span class="correct">${q.prompt} ${q.correct.join(" ")}</span></div>`}
    `;
    list.appendChild(item);
  });
}

function restart() {
  document.getElementById("score-screen").style.display = "none";
  document.getElementById("quiz-view").style.display = "block";
  initState();
  render();
}

initState();
render();