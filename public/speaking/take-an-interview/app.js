const interviewQuestions = [
  "Tell me about a place you have visited that made a strong impression on you. Why was it memorable?",
  "Describe a skill you have learned outside of school. How did you learn it and how has it been useful?",
  "What is one change you would make to your city or town to improve daily life for residents? Why?",
  "Talk about a person who has had a significant influence on how you think or behave.",
  "Some people prefer working in a team while others prefer working alone. Which do you prefer, and why?",
  "Describe a time when you had to make a difficult decision. What did you decide and what did you learn?",
  "What is a subject you studied in school that you found particularly interesting? What made it interesting?",
  "Talk about a goal you have set for yourself in the next few years. How do you plan to achieve it?",
  "Describe a tradition or celebration that is important in your culture or family. Why is it meaningful?",
  "Do you think people today spend too much time on their phones? Why or why not?"
];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

const EXAM_SIZE=5, THINK_TIME=15, TALK_TIME=45;
const CIRCUMFERENCE=2*Math.PI*36;

let exam=[], currentIdx=0, transcripts={}, audioUrls={};
let mediaRecorder=null, audioChunks=[], recordingActive=false;
let recognition=null, currentTranscript='';
let phaseTimer=null, phaseVal=0, phase='idle';

function initState(){ exam=shuffle(interviewQuestions).slice(0,EXAM_SIZE); currentIdx=0; transcripts={}; audioUrls={}; }
function goTo(idx){ if(idx<0||idx>=EXAM_SIZE)return; stopAll(); currentIdx=idx; render(); }
function handleNext(){ stopAll(); if(currentIdx<EXAM_SIZE-1)goTo(currentIdx+1); else showScore(); }

function stopAll(){
  clearInterval(phaseTimer); speechSynthesis.cancel();
  if(recordingActive&&mediaRecorder) mediaRecorder.stop();
  if(recognition) try{recognition.stop();}catch(e){}
  phase='idle'; recordingActive=false;
}

function beep(onDone){
  try{
    const ctx=new AudioContext(), osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value=880;
    gain.gain.setValueAtTime(0.3,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.25);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime+0.25);
    setTimeout(onDone,350);
  }catch(e){onDone();}
}

function setCircle(remaining, total, accent){
  const el=document.getElementById('ct-progress'), lbl=document.getElementById('ct-label');
  if(!el||!lbl)return;
  el.style.stroke=accent||'var(--accent)';
  el.style.strokeDashoffset=CIRCUMFERENCE*(1-remaining/total);
  lbl.textContent=remaining;
  lbl.className='ct-label'+(remaining<=5?' urgent':'');
}

function startRecognition(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return;
  recognition=new SR(); recognition.lang='en-US'; recognition.continuous=true; recognition.interimResults=true;
  currentTranscript='';
  recognition.onresult=e=>{ let f=''; for(let i=0;i<e.results.length;i++) if(e.results[i].isFinal) f+=e.results[i][0].transcript+' '; currentTranscript=f.trim()||currentTranscript; };
  try{recognition.start();}catch(e){}
}

// ── Flow ─────────────────────────────────────────────────────────────────────
function startQuestion(){
  phase='speaking'; currentTranscript=''; render();
  const utt=new SpeechSynthesisUtterance(exam[currentIdx]);
  utt.lang='en-US'; utt.rate=0.88;
  utt.onend=()=>startThinking();
  speechSynthesis.speak(utt);
}

function startThinking(){
  phase='thinking'; phaseVal=THINK_TIME; render();
  setCircle(phaseVal, THINK_TIME, '#d97706');
  phaseTimer=setInterval(()=>{
    phaseVal--;
    setCircle(phaseVal, THINK_TIME, '#d97706');
    if(phaseVal<=0){ clearInterval(phaseTimer); beep(()=>startRecording()); }
  },1000);
}

async function startRecording(){
  phase='recording'; phaseVal=TALK_TIME; render();
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    audioChunks=[]; mediaRecorder=new MediaRecorder(stream);
    mediaRecorder.ondataavailable=e=>audioChunks.push(e.data);
    mediaRecorder.onstop=()=>{
      const blob=new Blob(audioChunks,{type:'audio/webm'});
      audioUrls[currentIdx]=URL.createObjectURL(blob);
      transcripts[currentIdx]=currentTranscript;
      stream.getTracks().forEach(t=>t.stop());
      recordingActive=false; phase='done'; render();
    };
    mediaRecorder.start(); recordingActive=true;
    startRecognition();
    phaseTimer=setInterval(()=>{
      phaseVal--;
      setCircle(phaseVal, TALK_TIME);
      if(phaseVal<=0){ clearInterval(phaseTimer); stopRecording(); }
    },1000);
  }catch(e){ phase='error'; render(); }
}

function stopRecording(){
  clearInterval(phaseTimer);
  if(recognition) try{recognition.stop();}catch(e){}
  if(mediaRecorder&&recordingActive) mediaRecorder.stop();
}

// ── Render ────────────────────────────────────────────────────────────────────
function render(){
  const n=currentIdx+1;
  document.getElementById('q-counter').textContent=`${n} / ${EXAM_SIZE}`;
  document.getElementById('progress-fill').style.width=`${(n/EXAM_SIZE)*100}%`;
  document.getElementById('btn-prev').disabled=currentIdx===0||(phase!=='idle'&&phase!=='done');
  document.getElementById('btn-next').disabled=(phase==='speaking'||phase==='thinking'||phase==='recording');
  document.getElementById('btn-next').textContent=currentIdx===EXAM_SIZE-1?'Finish ✓':'Next →';

  const card=document.getElementById('main-card'); card.innerHTML='';

  if(phase==='idle'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`
      <div class="stage-icon">🎙️</div>
      <div class="stage-title">Question ${n} of ${EXAM_SIZE}</div>
      <div class="stage-desc">Press Start. The question will be spoken aloud. You will have ${THINK_TIME}s to think, then ${TALK_TIME}s to answer after the beep.</div>
      <button class="btn btn-primary" onclick="startQuestion()" style="font-size:15px;padding:12px 28px">▶ Start</button>
    `;
    card.appendChild(stage);

  } else if(phase==='speaking'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`<div class="stage-icon" style="animation:micpulse 1.2s infinite">🔊</div><div class="stage-title">Listen to the question…</div><div class="stage-desc">You will have ${THINK_TIME} seconds to think after it finishes.</div>`;
    card.appendChild(stage);

  } else if(phase==='thinking'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`
      <div class="circle-timer-wrap">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle class="ct-bg" cx="45" cy="45" r="36"/>
          <circle class="ct-progress" id="ct-progress" cx="45" cy="45" r="36"
            stroke-dasharray="${CIRCUMFERENCE}" stroke-dashoffset="0" style="stroke:#d97706"/>
        </svg>
        <div class="ct-label" id="ct-label">${THINK_TIME}</div>
      </div>
      <div class="stage-title">Think time</div>
      <div class="stage-desc">Prepare your answer. Recording starts automatically after the beep.</div>
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
        <div class="ct-label" id="ct-label">${TALK_TIME}</div>
      </div>
      <div class="mic-active"><div class="mic-dot"></div>Recording your answer…</div>
      <button class="btn" onclick="stopRecording()" style="margin-top:0.5rem">⏹ Stop early</button>
    `;
    card.appendChild(stage);

  } else if(phase==='done'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    const t=transcripts[currentIdx];
    stage.innerHTML=`
      <div class="stage-icon">✅</div>
      <div class="stage-title">Answer recorded</div>
      ${t?`<div class="stage-desc" style="font-style:italic;color:var(--text)">"${t}"</div>`:'<div class="stage-desc">No transcript captured — try Chrome for best results.</div>'}
    `;
    if(audioUrls[currentIdx]){
      const a=document.createElement('audio'); a.controls=true; a.src=audioUrls[currentIdx]; a.style.cssText='width:100%;';
      stage.appendChild(a);
    }
    const retry=document.createElement('button'); retry.className='btn btn-outline'; retry.textContent='↩ Try again';
    retry.onclick=()=>{ delete transcripts[currentIdx]; delete audioUrls[currentIdx]; phase='idle'; render(); };
    stage.appendChild(retry);
    card.appendChild(stage);

  } else if(phase==='error'){
    const stage=document.createElement('div'); stage.className='speaking-stage';
    stage.innerHTML=`<div class="stage-icon">⚠️</div><div class="stage-title">Microphone access denied</div><div class="stage-desc">Please allow microphone access in your browser settings.</div><button class="btn btn-primary" onclick="phase='idle';render()">Try again</button>`;
    card.appendChild(stage);
  }
}

// ── Score / result code ───────────────────────────────────────────────────────
function showScore(){
  document.getElementById('quiz-view').style.display='none';
  document.getElementById('score-screen').style.display='block';

  const resultData={
    decode_prompt:'You are a TOEFL 2026 examiner. Decode the Base64 result below and produce a structured report. Follow these rules strictly: Do not add commentary or encouragement. Score each speaking response on a 1-6 band scale with a one-line justification. Use this exact structure: SPEAKING / WEAK AREAS.',
    version:'TOEFL-2026',
    section:'speaking',
    date:new Date().toISOString().split('T')[0],
    responses:exam.map((q,i)=>({question:q,transcript:transcripts[i]||'(no transcript)'}))
  };
  const encoded=btoa(unescape(encodeURIComponent(JSON.stringify(resultData))));
  const fullPrompt=`You are a TOEFL 2026 examiner. Decode the Base64 result below and produce a structured report. Follow these rules strictly:\n- Do not add commentary or encouragement\n- Score each speaking response on a 1-6 band scale with a one-line justification\n- Use this exact structure: SPEAKING / WEAK AREAS\n\n[TOEFL-2026-RESULT]\n${encoded}`;

  const box=document.getElementById('result-code-box');
  box.innerHTML=`
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-bottom:8px">Your result code</div>
    <div style="font-size:11px;color:var(--muted);word-break:break-all;background:#f8f9fb;border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;margin-bottom:10px;font-family:monospace;max-height:80px;overflow:hidden">${encoded}</div>
    <button class="btn btn-primary" onclick="copyCode()" style="width:100%;justify-content:center" id="copy-btn">📋 Copy full prompt for AI</button>
  `;
  window._fullPrompt=fullPrompt;
}

function copyCode(){
  navigator.clipboard.writeText(window._fullPrompt).then(()=>{
    const btn=document.getElementById('copy-btn'); btn.textContent='✓ Copied!'; setTimeout(()=>btn.textContent='📋 Copy full prompt for AI',2000);
  });
}

function restart(){
  document.getElementById('score-screen').style.display='none';
  document.getElementById('quiz-view').style.display='block';
  initState(); render();
}

initState(); render();