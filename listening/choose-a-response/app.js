const EXAM_SIZE=10;
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b;}
let exam=[],currentIdx=0,qState=[];
function initState(){exam=shuffle(chooseResponseQuestions).slice(0,EXAM_SIZE);currentIdx=0;qState=exam.map(()=>({selected:-1,checked:false,revealed:false,played:false}));}
function goTo(idx){if(idx<0||idx>=EXAM_SIZE)return;speechSynthesis.cancel();currentIdx=idx;render();}
function handleNext(){speechSynthesis.cancel();if(currentIdx<EXAM_SIZE-1)goTo(currentIdx+1);else showScore();}

function speakHeard(){
  speechSynthesis.cancel();
  const utt=new SpeechSynthesisUtterance(exam[currentIdx].heard);
  utt.lang='en-US'; utt.rate=0.9;
  utt.onend=()=>{ qState[currentIdx].played=true; render(); };
  speechSynthesis.speak(utt);
  // animate button
  const btn=document.getElementById('tts-btn');
  if(btn){btn.textContent='⏹'; btn.disabled=true;}
}

function render(){
  const q=exam[currentIdx],s=qState[currentIdx],n=currentIdx+1;
  document.getElementById('q-counter').textContent=`${n} / ${EXAM_SIZE}`;
  document.getElementById('progress-fill').style.width=`${(n/EXAM_SIZE)*100}%`;
  document.getElementById('btn-prev').disabled=currentIdx===0;
  document.getElementById('btn-next').textContent=currentIdx===EXAM_SIZE-1?'Finish exam ✓':'Next →';
  const card=document.getElementById('main-card');card.innerHTML='';

  // TTS bar
  const ttsBar=document.createElement('div');ttsBar.className='tts-bar';
  ttsBar.innerHTML=`
    <button class="tts-play" id="tts-btn" onclick="speakHeard()">▶</button>
    <div class="tts-info">
      <div class="tts-title">Listen to the sentence</div>
      <div class="tts-sub">${s.played?'Played — you can replay anytime':'Press play to hear the sentence'}</div>
      <div class="tts-progress-wrap"><div class="tts-progress-fill" id="tts-prog"></div></div>
    </div>
  `;
  card.appendChild(ttsBar);

  // Info strip
  if(!s.played){
    const info=document.createElement('div');info.className='info-strip';info.style.marginBottom='1rem';
    info.innerHTML='<span>🎧</span><span>Press play to hear the sentence, then choose the best response below.</span>';
    card.appendChild(info);
  }

  const sl=document.createElement('div');sl.className='q-number';sl.textContent='Choose the most appropriate response:';card.appendChild(sl);

  const letters=['A','B','C','D'];
  const opts=document.createElement('div');opts.className='options';
  q.options.forEach((optText,oi)=>{
    const opt=document.createElement('button');opt.className='option';
    const isSel=s.selected===oi,isCorr=q.answer===oi;
    if(s.checked||s.revealed){opt.classList.add('disabled');if(isCorr)opt.classList.add('correct-answer');else if(isSel&&!isCorr)opt.classList.add('wrong-answer');}
    else{if(isSel)opt.classList.add('selected');opt.onclick=()=>{s.selected=oi;render();};}
    const ltr=document.createElement('span');ltr.className='option-letter';ltr.textContent=letters[oi]+')';opt.appendChild(ltr);
    opt.appendChild(document.createTextNode(optText));opts.appendChild(opt);
  });
  card.appendChild(opts);

  const br=document.createElement('div');br.className='btn-row';br.style.marginTop='1.5rem';
  const cb=document.createElement('button');cb.className='btn btn-primary';
  cb.textContent=s.checked?(s.selected===q.answer?'Correct ✓':'Wrong ✗'):'Check answer ↗';
  cb.disabled=s.selected===-1||s.checked||s.revealed;cb.onclick=()=>{s.checked=true;render();};br.appendChild(cb);
  const sb=document.createElement('button');sb.className='btn btn-outline';sb.textContent=s.revealed?'Answer shown':'Show answer';sb.disabled=s.revealed;
  sb.onclick=()=>{s.selected=q.answer;s.revealed=true;render();};br.appendChild(sb);
  const rb=document.createElement('button');rb.className='btn';rb.textContent='Reset';rb.disabled=s.checked||s.revealed;
  rb.onclick=()=>{qState[currentIdx]={selected:-1,checked:false,revealed:false,played:s.played};render();};br.appendChild(rb);
  card.appendChild(br);

  if(s.checked){const fb=document.createElement('div');fb.className='feedback '+(s.selected===q.answer?'correct':'wrong');fb.style.display='block';fb.innerHTML=s.selected===q.answer?'<strong>Correct!</strong>':'<strong>Not quite.</strong> The correct response is highlighted.';card.appendChild(fb);}
}

function showScore(){
  qState.forEach((s,i)=>{if(!s.checked&&!s.revealed)s.checked=true;});
  const correct=qState.filter((s,i)=>s.selected===exam[i].answer).length,pct=Math.round((correct/EXAM_SIZE)*100);
  document.getElementById('quiz-view').style.display='none';
  document.getElementById('score-screen').style.display='block';
  document.getElementById('score-num').textContent=`${correct}/${EXAM_SIZE}`;
  document.getElementById('score-msg').textContent=pct===100?'Perfect!':pct>=80?'Great job!':pct>=60?'Good effort!':'Keep going!';
  const list=document.getElementById('review-list');list.innerHTML='';const letters=['A','B','C','D'];
  exam.forEach((q,i)=>{
    const s=qState[i],ok=s.selected===q.answer,item=document.createElement('div');
    item.className='review-item '+(ok?'correct-item':'wrong-item');
    const given=s.selected===-1?'(not answered)':`${letters[s.selected]}) ${q.options[s.selected]}`;
    item.innerHTML=`<div class="tag ${ok?'tag-correct':'tag-wrong'}" style="margin-bottom:6px">${ok?'✓ Correct':'✗ Incorrect'}</div><div class="review-q-text" style="font-style:italic">"${q.heard}"</div><div class="review-row">${ok?`<span class="label">Your answer:</span><span class="ok">${given} ✓</span>`:`<span class="label">Your answer:</span><span class="given">${given}</span><br><span class="label">Correct:</span><span class="correct">${letters[q.answer]}) ${q.options[q.answer]}</span>`}</div>`;
    list.appendChild(item);
  });
}
function restart(){speechSynthesis.cancel();document.getElementById('score-screen').style.display='none';document.getElementById('quiz-view').style.display='block';initState();render();}
initState();render();