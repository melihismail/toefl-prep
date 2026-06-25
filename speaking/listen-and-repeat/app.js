const sentences = [
  "The university library offers extended hours during the examination period.",
  "Despite the heavy rain, the outdoor graduation ceremony went ahead as planned.",
  "She submitted her assignment three days before the deadline to avoid any technical issues.",
  "The professor encouraged students to ask questions during the lecture rather than waiting until the end.",
  "Regular physical exercise has been shown to improve concentration and reduce stress levels significantly.",
  "The government has announced a series of new policies aimed at reducing carbon emissions by 2035.",
  "It is important to review your notes within twenty-four hours of a lecture to retain the information.",
  "Scientists have discovered a previously unknown species of deep-sea fish near the coast of New Zealand.",
  "The scholarship application requires a personal statement of no more than five hundred words.",
  "Many students find group study sessions more motivating than studying alone in their rooms.",
  "Being able to communicate clearly and confidently is one of the most valuable professional skills.",
  "The research team spent three years collecting data before publishing their findings.",
  "Climate change is one of the most complex challenges that scientists and governments must address together.",
  "The city council voted unanimously to approve the construction of a new public transport line.",
  "Developing critical thinking skills is essential for success in both academic and professional environments."
];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

const EXAM_SIZE = 10;
const RECORD_TIME = 15;
const CIRCUMFERENCE = 2 * Math.PI * 36;

let exam=[], currentIdx=0, results={};
let mediaRecorder=null, audioChunks=[], recordingActive=false;
let recognition=null, transcript='';
let phaseTimer=null, phaseVal=0, phase='idle';

function initState(){
  exam=shuffle(sentences).slice(0,EXAM_SIZE);
  currentIdx=0; results={};
}

function goTo(idx){ if(idx<0||idx>=EXAM_SIZE)return; stopAll(); currentIdx=idx; render(); }
function handleNext(){ stopAll(); if(currentIdx<EXAM_SIZE-1)goTo(currentIdx+1); else showScore(); }

function stopAll(){
  clearInterval(phaseTimer);
  speechSynthesis.cancel();
  if(recordingActive&&mediaRecorder) mediaRecorder.stop();
  if(recognition) try{recognition.stop();}catch(e){}
  phase='idle'; recordingActive=false;
}

// ── Beep ────────────────────────────────────────────────────────────────────
function beep(onDone){
  try{
    const ctx=new AudioContext();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value=880;
    gain.gain.setValueAtTime(0.3,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.25);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime+0.25);
    setTimeout(onDone,300);
  }catch(e){onDone();}
}

// ── Circle timer helpers ─────────────────────────────────────────────────────
function setCircle(remaining, total){
  const el=document.getElementById('ct-progress');
  const lbl=document.getElementById('ct-label');
  if(!el||!lbl)return;
  const offset=CIRCUMFERENCE*(1-remaining/total);
  el.style.strokeDashoffset=offset;
  lbl.textContent=remaining;
  lbl.className='ct-label'+(remaining<=5?' urgent':'');
}

// ── Word comparison ──────────────────────────────────────────────────────────
function compareWords(original, spoken){
  const clean=s=>s.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim();
  const orig=clean(original).split(/\s+/);
  const spok=clean(spoken||'').split(/\s+/);
  return orig.map((w,i)=>({word:w,correct:spok[i]===w}));
}

// ── Speech recognition ───────────────────────────────────────────────────────
function startRecognition(){
  const SpeechRec=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRec){console.warn('No speech recognition');return;}
  recognition=new SpeechRec();
  recognition.lang='en-US'; recognition.continuous=true; recognition.interimResults=true;
  transcript='';
  recognition.onresult=e=>{
    let final='';
    for(let i=0;i<e.results.length;i++) if(e.results[i].isFinal) final+=e.results[i][0].transcript+' ';
    transcript=final.trim()||transcript;
  };
  try{recognition.start();}catch(e){}
}

// ── Main flow ────────────────────────────────────────────────────────────────
function startSentence(){
  phase='speaking'; transcript=''; render();
  const utt=new SpeechSynthesisUtterance(exam[currentIdx]);
  utt.lang='en-US'; utt.rate=0.88;
  utt.onend=()=>{ beep(()=>startRecording()); };
  speechSynthesis.speak(utt);
}

async function startRecording(){
  phase='recording'; phaseVal=RECORD_TIME; render();
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    audioChunks=[]; mediaRecorder=new MediaRecorder(stream);
    mediaRecorder.ondataavailable=e=>audioChunks.push(e.data);
    mediaRecorder.onstop=()=>{
      const blob=new Blob(audioChunks,{type:'audio/webm'});
      results[currentIdx]={audioUrl:URL.createObjectURL(blob),transcript};
      stream.getTracks().forEach(t=>t.stop());
      recordingActive=false; phase='done'; render();
    };
    mediaRecorder.start(); recordingActive=true;
    startRecognition();
    phaseTimer=setInterval(()=>{
      phaseVal--;
      setCircle(phaseVal,RECORD_TIME);
      if(phaseVal<=0){clearInterval(phaseTimer);stopRecording();}
    },1000);
  }catch(e){
    phase='error'; render();
  }
}

function stopRecording(){
  clearInterval(phaseTimer);
  if(recognition) try{recognition.stop();}catch(e){}
  if(mediaRecorder&&recordingActive) mediaRecorder.stop();
}

// ── Render ───────────────────────────────────────────────────────────────────
function render(){
  const n=currentIdx+1;
  document.getElementById('q-counter').textContent=`${n} / ${EXAM_SIZE}`;
  document.getElementById('progress-fill').style.width=`${(n/EXAM_SIZE)*100}%`;
  document.getElementById('btn-prev').disabled=currentIdx===0||(phase!=='idle'&&phase!=='done');
  document.getElementById('btn-next').disabled=(phase==='speaking'||phase==='recording');
  document.getElementById('btn-next').textContent=currentIdx===EXAM_SIZE-1?'Finish ✓':'Next →';

  const card=document.getElementById('main-card'); card.innerHTML='';
  const r=results[currentIdx];

  if(phase==='idle'||(!r&&phase==='idle')){
    // Ready state
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`
      <div class="stage-icon">🔊</div>
      <div class="stage-title">Sentence ${n} of ${EXAM_SIZE}</div>
      <div class="stage-desc">Press Start. A sentence will be spoken — listen carefully, then repeat it after the beep.</div>
      <button class="btn btn-primary" onclick="startSentence()" style="font-size:15px;padding:12px 28px">▶ Start</button>
    `;
    card.appendChild(stage);

  } else if(phase==='speaking'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`
      <div class="stage-icon" style="animation:micpulse 1.2s infinite">🔊</div>
      <div class="stage-title">Listening…</div>
      <div class="stage-desc">Listen carefully to the sentence.</div>
    `;
    card.appendChild(stage);

  } else if(phase==='recording'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`
      <div class="circle-timer-wrap">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle class="ct-bg" cx="45" cy="45" r="36"/>
          <circle class="ct-progress" id="ct-progress" cx="45" cy="45" r="36"
            stroke-dasharray="${CIRCUMFERENCE}" stroke-dashoffset="0"/>
        </svg>
        <div class="ct-label" id="ct-label">${RECORD_TIME}</div>
      </div>
      <div class="mic-active"><div class="mic-dot"></div>Recording…</div>
      <div class="stage-desc">Repeat the sentence you just heard.</div>
      <button class="btn" onclick="stopRecording()" style="margin-top:0.5rem">⏹ Stop early</button>
    `;
    card.appendChild(stage);

  } else if(phase==='done'||r){
    // Results
    const comparison=compareWords(exam[currentIdx], r?.transcript||'');
    const correct=comparison.filter(w=>w.correct).length;
    const total=comparison.length;
    const pct=Math.round((correct/total)*100);

    const stage=document.createElement('div'); stage.className='speaking-stage';

    // Score badge
    const badge=document.createElement('div');
    badge.style.cssText=`font-size:14px;font-weight:700;padding:8px 20px;border-radius:99px;background:${pct>=80?'var(--success-bg)':pct>=50?'var(--accent-light)':'var(--error-bg)'};color:${pct>=80?'var(--success-text)':pct>=50?'var(--accent)':'var(--error-text)'};border:1px solid ${pct>=80?'var(--success-border)':pct>=50?'var(--accent-mid)':'var(--error-border)'};`;
    badge.textContent=`${correct} / ${total} words correct (${pct}%)`;
    stage.appendChild(badge);

    // Word chips
    const wordRow=document.createElement('div'); wordRow.className='word-result';
    comparison.forEach(w=>{
      const chip=document.createElement('span');
      chip.className='word-chip '+(w.correct?'correct':'wrong');
      chip.textContent=w.word;
      wordRow.appendChild(chip);
    });
    stage.appendChild(wordRow);

    // Transcript shown
    if(r?.transcript){
      const tl=document.createElement('div');
      tl.style.cssText='font-size:12px;color:var(--muted);margin-top:0.5rem;';
      tl.textContent=`You said: "${r.transcript}"`;
      stage.appendChild(tl);
    }

    // Playback
    if(r?.audioUrl){
      const audio=document.createElement('audio');
      audio.controls=true; audio.src=r.audioUrl;
      audio.style.cssText='width:100%;margin-top:0.75rem;';
      stage.appendChild(audio);
    }

    // Retry
    const retry=document.createElement('button');
    retry.className='btn btn-outline'; retry.textContent='↩ Try again';
    retry.onclick=()=>{ delete results[currentIdx]; phase='idle'; render(); };
    stage.appendChild(retry);

    card.appendChild(stage);

    // Show original sentence after attempt
    const origBox=document.createElement('div');
    origBox.className='feedback reveal'; origBox.style.display='block'; origBox.style.marginTop='1rem';
    origBox.innerHTML=`<strong>Original sentence:</strong><br>${exam[currentIdx]}`;
    card.appendChild(origBox);

  } else if(phase==='error'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`<div class="stage-icon">⚠️</div><div class="stage-title">Microphone access denied</div><div class="stage-desc">Please allow microphone access in your browser settings and try again.</div><button class="btn btn-primary" onclick="phase='idle';render()">Try again</button>`;
    card.appendChild(stage);
  }
}

// ── Score ─────────────────────────────────────────────────────────────────────
function showScore(){
  let totalWords=0, correctWords=0;
  exam.forEach((s,i)=>{
    const r=results[i];
    const comp=compareWords(s, r?.transcript||'');
    totalWords+=comp.length;
    correctWords+=comp.filter(w=>w.correct).length;
  });
  const pct=Math.round((correctWords/totalWords)*100);
  document.getElementById('quiz-view').style.display='none';
  document.getElementById('score-screen').style.display='block';
  document.getElementById('score-num').textContent=`${correctWords}/${totalWords}`;
  document.getElementById('score-msg').textContent=pct>=90?'Excellent pronunciation!':pct>=70?'Good job! Keep practising.':pct>=50?'Getting there — keep going!':'Practise daily to improve.';

  const list=document.getElementById('review-list'); list.innerHTML='';
  exam.forEach((s,i)=>{
    const r=results[i]; const comp=compareWords(s, r?.transcript||'');
    const c=comp.filter(w=>w.correct).length, t=comp.length;
    const ok=c===t;
    const item=document.createElement('div'); item.className='review-item '+(ok?'correct-item':'wrong-item');
    const chips=comp.map(w=>`<span class="word-chip ${w.correct?'correct':'wrong'}" style="font-size:12px;padding:3px 8px">${w.word}</span>`).join('');
    item.innerHTML=`<div class="tag ${ok?'tag-correct':'tag-wrong'}" style="margin-bottom:6px">${c}/${t} words</div><div class="word-result" style="justify-content:flex-start">${chips}</div>`;
    if(r?.audioUrl){const a=document.createElement('audio');a.controls=true;a.src=r.audioUrl;a.style.cssText='width:100%;margin-top:6px;';item.appendChild(a);}
    list.appendChild(item);
  });
}

function restart(){
  document.getElementById('score-screen').style.display='none';
  document.getElementById('quiz-view').style.display='block';
  initState(); render();
}

initState(); render();