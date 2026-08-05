const EXAM_SIZE=8;
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b;}
let exam=[],currentIdx=0,qState=[];
function initState(){exam=shuffle(dailyLifePassages).slice(0,EXAM_SIZE);currentIdx=0;qState=exam.map(p=>({selected:p.questions.map(()=>-1),checked:false,revealed:false,passageOpen:false}));}
function goTo(idx){if(idx<0||idx>=EXAM_SIZE)return;currentIdx=idx;render();}
function handleNext(){if(currentIdx<EXAM_SIZE-1)goTo(currentIdx+1);else showScore();}
function countCorrect(idx){return exam[idx].questions.filter((q,qi)=>qState[idx].selected[qi]===q.answer).length;}
function isAllCorrect(idx){return countCorrect(idx)===exam[idx].questions.length;}

function togglePassage(){
  qState[currentIdx].passageOpen=!qState[currentIdx].passageOpen;
  const body=document.getElementById('passage-body');
  const btn=document.getElementById('passage-toggle');
  const isOpen=qState[currentIdx].passageOpen;
  body.style.maxHeight=isOpen?'600px':'4.5em';
  body.style.webkitMaskImage=isOpen?'none':'linear-gradient(to bottom, black 60%, transparent 100%)';
  body.style.maskImage=isOpen?'none':'linear-gradient(to bottom, black 60%, transparent 100%)';
  btn.textContent=isOpen?'▲ Collapse':'▼ Expand passage';
}

function render(){
  const p=exam[currentIdx],s=qState[currentIdx],n=currentIdx+1;
  document.getElementById('q-counter').textContent=`Passage ${n} of ${EXAM_SIZE}`;
  document.getElementById('progress-fill').style.width=`${(n/EXAM_SIZE)*100}%`;
  document.getElementById('btn-prev').disabled=currentIdx===0;
  document.getElementById('btn-next').textContent=currentIdx===EXAM_SIZE-1?'Finish exam ✓':'Next →';

  // ── Sticky passage ──────────────────────────────────────────────────────
  const sticky=document.getElementById('sticky-passage');
  sticky.innerHTML='';

  const tag=document.createElement('div');tag.className='topic-tag';tag.style.marginBottom='6px';tag.textContent=p.textType;sticky.appendChild(tag);

  const passageBody=document.createElement('div');passageBody.id='passage-body';
  passageBody.style.cssText=`overflow:hidden;transition:max-height .3s ease;max-height:${s.passageOpen?'600px':'4.5em'};line-height:1.85;font-size:14px;color:var(--text);`;
  passageBody.style.webkitMaskImage=s.passageOpen?'none':'linear-gradient(to bottom, black 60%, transparent 100%)';
  passageBody.style.maskImage=s.passageOpen?'none':'linear-gradient(to bottom, black 60%, transparent 100%)';

  if(p.textType==='Email'){
    if(p.subject){const s2=document.createElement('div');s2.className='email-subject';s2.textContent='Subject: '+p.subject;passageBody.appendChild(s2);}
    if(p.from){const f=document.createElement('div');f.className='email-from';f.textContent='From: '+p.from;passageBody.appendChild(f);}
  }
  const pt=document.createElement('div');pt.style.whiteSpace='pre-wrap';pt.textContent=p.passage;passageBody.appendChild(pt);
  sticky.appendChild(passageBody);

  const toggleBtn=document.createElement('button');toggleBtn.id='passage-toggle';
  toggleBtn.style.cssText='background:none;border:none;color:var(--accent);font-size:12px;font-weight:700;cursor:pointer;padding:6px 0 0;font-family:inherit;';
  toggleBtn.textContent=s.passageOpen?'▲ Collapse':'▼ Expand passage';
  toggleBtn.onclick=togglePassage;
  sticky.appendChild(toggleBtn);

  // ── Questions ────────────────────────────────────────────────────────────
  const card=document.getElementById('main-card');card.innerHTML='';
  const letters=['A','B','C','D'];
  p.questions.forEach((q,qi)=>{
    if(qi>0){const hr=document.createElement('hr');hr.className='divider';card.appendChild(hr);}
    const qn=document.createElement('div');qn.className='q-number';qn.textContent=`Question ${qi+1}`;card.appendChild(qn);
    const stem=document.createElement('div');stem.className='q-stem';stem.textContent=q.stem;card.appendChild(stem);
    const opts=document.createElement('div');opts.className='options';
    q.options.forEach((optText,oi)=>{
      const opt=document.createElement('button');opt.className='option';
      const isSel=s.selected[qi]===oi,isCorr=q.answer===oi;
      if(s.checked||s.revealed){opt.classList.add('disabled');if(isCorr)opt.classList.add('correct-answer');else if(isSel&&!isCorr)opt.classList.add('wrong-answer');}
      else{if(isSel)opt.classList.add('selected');opt.onclick=()=>{s.selected[qi]=oi;render();};}
      const ltr=document.createElement('span');ltr.className='option-letter';ltr.textContent=letters[oi]+')';opt.appendChild(ltr);
      const txt=document.createElement('span');txt.textContent=optText;opt.appendChild(txt);
      opts.appendChild(opt);
    });
    card.appendChild(opts);
  });

  const br=document.createElement('div');br.className='btn-row';br.style.marginTop='1.5rem';
  const allAns=s.selected.every(v=>v!==-1);
  const cb=document.createElement('button');cb.className='btn btn-primary';
  cb.textContent=s.checked?(isAllCorrect(currentIdx)?'All correct ✓':'Wrong ✗'):'Check answer ↗';
  cb.disabled=!allAns||s.checked||s.revealed;cb.onclick=()=>{s.checked=true;render();};br.appendChild(cb);
  const sb=document.createElement('button');sb.className='btn btn-outline';sb.textContent=s.revealed?'Answer shown':'Show answer';sb.disabled=s.revealed;
  sb.onclick=()=>{s.selected=exam[currentIdx].questions.map(q=>q.answer);s.revealed=true;render();};br.appendChild(sb);
  const rb=document.createElement('button');rb.className='btn';rb.textContent='Reset';rb.disabled=s.checked||s.revealed;
  rb.onclick=()=>{qState[currentIdx]={selected:exam[currentIdx].questions.map(()=>-1),checked:false,revealed:false,passageOpen:qState[currentIdx].passageOpen};render();};br.appendChild(rb);
  card.appendChild(br);

  if(s.checked){
    const fb=document.createElement('div');fb.className='feedback '+(isAllCorrect(currentIdx)?'correct':'wrong');fb.style.display='block';
    const sc=countCorrect(currentIdx);
    fb.innerHTML=isAllCorrect(currentIdx)?'<strong>All correct!</strong>':'<strong>'+sc+' of '+p.questions.length+' correct.</strong> Wrong answers highlighted.';
    card.appendChild(fb);
  }
}

function showScore(){
  qState.forEach(s=>{if(!s.checked&&!s.revealed)s.checked=true;});
  let totalQ=0,totalC=0;exam.forEach((p,i)=>{totalQ+=p.questions.length;totalC+=countCorrect(i);});
  const pct=Math.round((totalC/totalQ)*100);
  document.getElementById('quiz-view').style.display='none';
  document.getElementById('score-screen').style.display='block';
  document.getElementById('score-num').textContent=`${totalC}/${totalQ}`;
  document.getElementById('score-msg').textContent=pct===100?'Perfect!':pct>=80?'Great job!':pct>=60?'Good effort!':'Keep going!';
  const list=document.getElementById('review-list');list.innerHTML='';const letters=['A','B','C','D'];
  exam.forEach((p,pi)=>{
    const s=qState[pi],ok=isAllCorrect(pi);
    const item=document.createElement('div');item.className='review-item '+(ok?'correct-item':'wrong-item');
    item.innerHTML=`<div class="tag ${ok?'tag-correct':'tag-wrong'}" style="margin-bottom:6px">${ok?'✓ All correct':'✗ Some incorrect'}</div><div class="review-passage">Passage ${pi+1} — ${p.textType}: ${p.title}</div>`;
    p.questions.forEach((q,qi)=>{
      const chosen=s.selected[qi],correct=q.answer,match=chosen===correct;
      const qd=document.createElement('div');qd.className='review-q-text';qd.textContent=`Q${qi+1}: ${q.stem}`;item.appendChild(qd);
      const row=document.createElement('div');row.className='review-row';
      const given=chosen===-1?'(not answered)':`${letters[chosen]}) ${q.options[chosen]}`;
      row.innerHTML=match?`<span class="label">Your answer:</span><span class="ok">${given} ✓</span>`:`<span class="label">Your answer:</span><span class="given">${given}</span><br><span class="label">Correct:</span><span class="correct">${letters[correct]}) ${q.options[correct]}</span>`;
      item.appendChild(row);
    });
    list.appendChild(item);
  });
}
function restart(){document.getElementById('score-screen').style.display='none';document.getElementById('quiz-view').style.display='block';initState();render();}
initState();render();
