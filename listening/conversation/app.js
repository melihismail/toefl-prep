const EXAM_SIZE=3;
const DATA=typeof conversationPassages!=='undefined'?conversationPassages:academicTalkPassages;
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b;}
let exam=[],currentIdx=0,qState=[];
function initState(){exam=shuffle(DATA).slice(0,EXAM_SIZE);currentIdx=0;qState=exam.map(p=>({transcriptOpen:false,qSelected:p.questions.map(()=>-1),qChecked:p.questions.map(()=>false),qRevealed:p.questions.map(()=>false),played:false}));}
function goTo(idx){if(idx<0||idx>=EXAM_SIZE)return;speechSynthesis.cancel();currentIdx=idx;render();}
function handleNext(){speechSynthesis.cancel();if(currentIdx<EXAM_SIZE-1)goTo(currentIdx+1);else showScore();}

function speakPassage(){
  const p=exam[currentIdx];
  speechSynthesis.cancel();
  const utt=new SpeechSynthesisUtterance(p.transcript);
  utt.lang='en-US'; utt.rate=0.88;
  utt.onend=()=>{ qState[currentIdx].played=true; render(); };
  speechSynthesis.speak(utt);
  const btn=document.getElementById('tts-btn');
  if(btn){btn.innerHTML='⏹'; btn.title='Stop';}
}

function stopSpeech(){speechSynthesis.cancel();render();}

function render(){
  const p=exam[currentIdx],s=qState[currentIdx],n=currentIdx+1;
  document.getElementById('q-counter').textContent=`Passage ${n} of ${EXAM_SIZE}`;
  document.getElementById('progress-fill').style.width=`${(n/EXAM_SIZE)*100}%`;
  document.getElementById('btn-prev').disabled=currentIdx===0;
  document.getElementById('btn-next').textContent=currentIdx===EXAM_SIZE-1?'Finish exam ✓':'Next →';
  const card=document.getElementById('main-card');card.innerHTML='';

  // Tag & title
  const tag=document.createElement('div');tag.className='topic-tag';tag.textContent=p.subject||'Conversation';card.appendChild(tag);
  const title=document.createElement('div');title.className='passage-title';title.textContent=p.title;card.appendChild(title);

  // TTS bar
  const ttsBar=document.createElement('div');ttsBar.className='tts-bar';
  ttsBar.innerHTML=`
    <button class="tts-play" id="tts-btn" onclick="speakPassage()" title="Play">▶</button>
    <div class="tts-info">
      <div class="tts-title">${p.title}</div>
      <div class="tts-sub">${s.played?'Played — you can replay':'Press play to listen'}</div>
      <div class="tts-progress-wrap"><div class="tts-progress-fill"></div></div>
    </div>
  `;
  card.appendChild(ttsBar);

  // Transcript toggle
  const tcBtn=document.createElement('button');tcBtn.className='btn btn-outline';tcBtn.style.cssText='font-size:12px;padding:6px 14px;margin-bottom:1rem;';
  tcBtn.textContent=s.transcriptOpen?'📄 Hide Transcript':'📄 Show Transcript';
  tcBtn.onclick=()=>{s.transcriptOpen=!s.transcriptOpen;render();};card.appendChild(tcBtn);

  if(s.transcriptOpen){
    const tbox=document.createElement('div');tbox.className='transcript-box visible';
    tbox.innerHTML=`<div class="transcript-label">Transcript</div>${p.transcript.split('\n\n').filter(l=>l.trim()).map(l=>`<p style="margin-bottom:.75rem">${l}</p>`).join('')}`;
    card.appendChild(tbox);
  }

  // Questions
  const ql=document.createElement('div');ql.className='section-label';ql.style.marginTop='1rem';ql.textContent='Questions';card.appendChild(ql);
  const letters=['A','B','C','D'];
  p.questions.forEach((q,qi)=>{
    const qcard=document.createElement('div');qcard.style.marginBottom='1.5rem';
    const qn=document.createElement('div');qn.className='q-number';qn.innerHTML=`Q${qi+1} <span class="q-type-badge">${q.type}</span>`;qcard.appendChild(qn);
    const stem=document.createElement('div');stem.className='q-stem';stem.textContent=q.stem;qcard.appendChild(stem);
    const opts=document.createElement('div');opts.className='options';
    q.options.forEach((optText,oi)=>{
      const opt=document.createElement('button');opt.className='option';
      const isSel=s.qSelected[qi]===oi,isCorr=q.answer===oi,ckd=s.qChecked[qi]||s.qRevealed[qi];
      if(ckd){opt.classList.add('disabled');if(isCorr)opt.classList.add('correct-answer');else if(isSel&&!isCorr)opt.classList.add('wrong-answer');}
      else{if(isSel)opt.classList.add('selected');opt.onclick=()=>{s.qSelected[qi]=oi;render();};}
      const ltr=document.createElement('span');ltr.className='option-letter';ltr.textContent=letters[oi]+')';opt.appendChild(ltr);
      opt.appendChild(document.createTextNode(optText));opts.appendChild(opt);
    });
    qcard.appendChild(opts);
    const qbr=document.createElement('div');qbr.className='btn-row';qbr.style.marginTop='.75rem';
    const cb=document.createElement('button');cb.className='btn btn-primary';cb.style.fontSize='12px';
    cb.textContent=s.qChecked[qi]?(s.qSelected[qi]===q.answer?'Correct ✓':'Wrong ✗'):'Check ↗';
    cb.disabled=s.qSelected[qi]===-1||s.qChecked[qi]||s.qRevealed[qi];cb.onclick=()=>{s.qChecked[qi]=true;render();};qbr.appendChild(cb);
    const sb=document.createElement('button');sb.className='btn btn-outline';sb.style.fontSize='12px';sb.textContent=s.qRevealed[qi]?'Shown':'Show answer';sb.disabled=s.qRevealed[qi];
    sb.onclick=()=>{s.qSelected[qi]=q.answer;s.qRevealed[qi]=true;render();};qbr.appendChild(sb);
    qcard.appendChild(qbr);
    if(s.qChecked[qi]){const fb=document.createElement('div');fb.className='feedback '+(s.qSelected[qi]===q.answer?'correct':'wrong');fb.style.display='block';fb.innerHTML=s.qSelected[qi]===q.answer?'<strong>Correct!</strong>':'<strong>Not quite.</strong> Correct answer highlighted.';qcard.appendChild(fb);}
    card.appendChild(qcard);
  });
}

function countPassageCorrect(idx){return exam[idx].questions.filter((q,qi)=>qState[idx].qSelected[qi]===q.answer).length;}
function showScore(){
  let totalQ=0,totalC=0;exam.forEach((p,i)=>{p.questions.forEach((q,qi)=>{totalQ++;if(qState[i].qSelected[qi]===q.answer)totalC++;});});
  const pct=Math.round((totalC/totalQ)*100);
  document.getElementById('quiz-view').style.display='none';
  document.getElementById('score-screen').style.display='block';
  document.getElementById('score-num').textContent=`${totalC}/${totalQ}`;
  document.getElementById('score-msg').textContent=pct===100?'Perfect!':pct>=80?'Great job!':pct>=60?'Good effort!':'Keep going!';
  const list=document.getElementById('review-list');list.innerHTML='';const letters=['A','B','C','D'];
  exam.forEach((p,pi)=>{
    const s=qState[pi],ok=countPassageCorrect(pi)===p.questions.length;
    const item=document.createElement('div');item.className='review-item '+(ok?'correct-item':'wrong-item');
    item.innerHTML=`<div class="review-passage">Passage ${pi+1} — ${p.title}</div>`;
    p.questions.forEach((q,qi)=>{
      const chosen=s.qSelected[qi],match=chosen===q.answer;
      const qd=document.createElement('div');qd.className='review-q-text';qd.textContent=`Q${qi+1}: ${q.stem}`;item.appendChild(qd);
      const row=document.createElement('div');row.className='review-row';
      const given=chosen===-1?'(not answered)':`${letters[chosen]}) ${q.options[chosen]}`;
      row.innerHTML=match?`<span class="label">Your answer:</span><span class="ok">${given} ✓</span>`:`<span class="label">Your answer:</span><span class="given">${given}</span><br><span class="label">Correct:</span><span class="correct">${letters[q.answer]}) ${q.options[q.answer]}</span>`;
      item.appendChild(row);
    });
    list.appendChild(item);
  });
}
function restart(){speechSynthesis.cancel();document.getElementById('score-screen').style.display='none';document.getElementById('quiz-view').style.display='block';initState();render();}
initState();render();