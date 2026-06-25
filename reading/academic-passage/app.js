const EXAM_SIZE = 5;
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

let exam=[], currentIdx=0, qState=[];

function initState(){
  exam = shuffle(academicPassages).slice(0, EXAM_SIZE);
  currentIdx = 0;
  qState = exam.map(p => ({
    selected: p.questions.map(() => -1),
    checked: false,
    revealed: false,
    passageOpen: false
  }));
}

function goTo(idx){ if(idx<0||idx>=EXAM_SIZE)return; currentIdx=idx; render(); }
function handleNext(){ if(currentIdx<EXAM_SIZE-1) goTo(currentIdx+1); else showScore(); }
function countCorrect(idx){ return exam[idx].questions.filter((q,qi)=>qState[idx].selected[qi]===q.answer).length; }
function isAllCorrect(idx){ return countCorrect(idx)===exam[idx].questions.length; }

function togglePassage(){
  const s = qState[currentIdx];
  s.passageOpen = !s.passageOpen;
  const body = document.getElementById('passage-body');
  const btn  = document.getElementById('passage-toggle');
  if(!body||!btn) return;
  body.style.maxHeight = s.passageOpen ? '1000px' : '4.5em';
  body.style.webkitMaskImage = s.passageOpen ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 100%)';
  body.style.maskImage        = s.passageOpen ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 100%)';
  btn.textContent = s.passageOpen ? '▲ Collapse' : '▼ Expand passage';
}

function render(){
  const p = exam[currentIdx], s = qState[currentIdx], n = currentIdx+1;

  document.getElementById('q-counter').textContent = `Passage ${n} of ${EXAM_SIZE}`;
  document.getElementById('progress-fill').style.width = `${(n/EXAM_SIZE)*100}%`;
  document.getElementById('btn-prev').disabled = currentIdx===0;
  document.getElementById('btn-next').textContent = currentIdx===EXAM_SIZE-1 ? 'Finish exam ✓' : 'Next →';

  // ── Sticky passage ─────────────────────────────────────────────────────
  const sticky = document.getElementById('sticky-passage');
  sticky.innerHTML = '';

  // Topic tag
  const tag = document.createElement('div');
  tag.className = 'topic-tag';
  tag.style.marginBottom = '6px';
  tag.textContent = p.topic || 'Academic';
  sticky.appendChild(tag);

  // Title
  if(p.title){
    const tl = document.createElement('div');
    tl.style.cssText = 'font-size:15px;font-weight:700;margin-bottom:8px;color:var(--text)';
    tl.textContent = p.title;
    sticky.appendChild(tl);
  }

  // Passage body
  const passageBody = document.createElement('div');
  passageBody.id = 'passage-body';
  passageBody.style.cssText = `overflow:hidden;transition:max-height .35s ease;max-height:${s.passageOpen?'1000px':'4.5em'};line-height:1.85;font-size:14px;color:var(--text);white-space:pre-wrap;`;
  passageBody.style.webkitMaskImage = s.passageOpen ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 100%)';
  passageBody.style.maskImage        = s.passageOpen ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 100%)';
  passageBody.textContent = p.passage;
  sticky.appendChild(passageBody);

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'passage-toggle';
  toggleBtn.style.cssText = 'background:none;border:none;color:var(--accent);font-size:12px;font-weight:700;cursor:pointer;padding:6px 0 2px;font-family:inherit;display:block;';
  toggleBtn.textContent = s.passageOpen ? '▲ Collapse' : '▼ Expand passage';
  toggleBtn.onclick = togglePassage;
  sticky.appendChild(toggleBtn);

  // ── Questions ──────────────────────────────────────────────────────────
  const card = document.getElementById('main-card');
  card.innerHTML = '';
  const letters = ['A','B','C','D'];

  p.questions.forEach((q, qi) => {
    if(qi > 0){ const hr=document.createElement('hr'); hr.className='divider'; card.appendChild(hr); }

    const qn = document.createElement('div');
    qn.className = 'q-number';
    qn.innerHTML = `Question ${qi+1}${q.type ? ' <span class="q-type-badge">'+q.type+'</span>' : ''}`;
    card.appendChild(qn);

    const stem = document.createElement('div');
    stem.className = 'q-stem';
    stem.textContent = q.stem;
    card.appendChild(stem);

    const opts = document.createElement('div');
    opts.className = 'options';
    q.options.forEach((optText, oi) => {
      const opt = document.createElement('button');
      opt.className = 'option';
      const isSel = s.selected[qi]===oi, isCorr = q.answer===oi;
      if(s.checked||s.revealed){
        opt.classList.add('disabled');
        if(isCorr) opt.classList.add('correct-answer');
        else if(isSel&&!isCorr) opt.classList.add('wrong-answer');
      } else {
        if(isSel) opt.classList.add('selected');
        opt.onclick = () => { s.selected[qi]=oi; render(); };
      }
      const ltr = document.createElement('span'); ltr.className='option-letter'; ltr.textContent=letters[oi]+')'; opt.appendChild(ltr);
      const txt = document.createElement('span'); txt.textContent=optText; opt.appendChild(txt);
      opts.appendChild(opt);
    });
    card.appendChild(opts);
  });

  // Buttons
  const br = document.createElement('div'); br.className='btn-row'; br.style.marginTop='1.5rem';
  const allAns = s.selected.every(v=>v!==-1);

  const cb = document.createElement('button'); cb.className='btn btn-primary';
  cb.textContent = s.checked ? (isAllCorrect(currentIdx)?'All correct ✓':'Wrong ✗') : 'Check answer ↗';
  cb.disabled = !allAns||s.checked||s.revealed;
  cb.onclick = () => { s.checked=true; render(); };
  br.appendChild(cb);

  const sb = document.createElement('button'); sb.className='btn btn-outline';
  sb.textContent = s.revealed ? 'Answer shown' : 'Show answer'; sb.disabled = s.revealed;
  sb.onclick = () => { s.selected=p.questions.map(q=>q.answer); s.revealed=true; render(); };
  br.appendChild(sb);

  const rb = document.createElement('button'); rb.className='btn'; rb.textContent='Reset';
  rb.disabled = s.checked||s.revealed;
  rb.onclick = () => { qState[currentIdx]={selected:p.questions.map(()=>-1),checked:false,revealed:false,passageOpen:s.passageOpen}; render(); };
  br.appendChild(rb);
  card.appendChild(br);

  if(s.checked){
    const fb = document.createElement('div');
    fb.className = 'feedback '+(isAllCorrect(currentIdx)?'correct':'wrong');
    fb.style.display = 'block';
    const sc = countCorrect(currentIdx);
    fb.innerHTML = isAllCorrect(currentIdx) ? '<strong>All correct!</strong>' : `<strong>${sc} of ${p.questions.length} correct.</strong> Wrong answers highlighted.`;
    card.appendChild(fb);
  }
}

function showScore(){
  qState.forEach(s => { if(!s.checked&&!s.revealed) s.checked=true; });
  let totalQ=0, totalC=0;
  exam.forEach((p,i) => { totalQ+=p.questions.length; totalC+=countCorrect(i); });
  const pct = Math.round((totalC/totalQ)*100);

  document.getElementById('quiz-view').style.display = 'none';
  document.getElementById('score-screen').style.display = 'block';
  document.getElementById('score-num').textContent = `${totalC}/${totalQ}`;
  document.getElementById('score-msg').textContent = pct===100?'Perfect!':pct>=80?'Great job!':pct>=60?'Good effort!':'Keep going!';

  const list = document.getElementById('review-list'); list.innerHTML='';
  const letters = ['A','B','C','D'];
  exam.forEach((p,pi) => {
    const s = qState[pi], ok = isAllCorrect(pi);
    const item = document.createElement('div');
    item.className = 'review-item '+(ok?'correct-item':'wrong-item');
    item.innerHTML = `<div class="tag ${ok?'tag-correct':'tag-wrong'}" style="margin-bottom:6px">${ok?'✓ All correct':'✗ Some incorrect'}</div><div class="review-passage">Passage ${pi+1} — ${p.topic}: ${p.title}</div>`;
    p.questions.forEach((q,qi) => {
      const chosen=s.selected[qi], correct=q.answer, match=chosen===correct;
      const qd=document.createElement('div'); qd.className='review-q-text'; qd.textContent=`Q${qi+1}: ${q.stem}`; item.appendChild(qd);
      const row=document.createElement('div'); row.className='review-row';
      const given = chosen===-1 ? '(not answered)' : `${letters[chosen]}) ${q.options[chosen]}`;
      row.innerHTML = match
        ? `<span class="label">Your answer:</span><span class="ok">${given} ✓</span>`
        : `<span class="label">Your answer:</span><span class="given">${given}</span><br><span class="label">Correct:</span><span class="correct">${letters[correct]}) ${q.options[correct]}</span>`;
      item.appendChild(row);
    });
    list.appendChild(item);
  });
}

function restart(){
  document.getElementById('score-screen').style.display='none';
  document.getElementById('quiz-view').style.display='block';
  initState(); render();
}

initState(); render();