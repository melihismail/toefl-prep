function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b;}
let currentPrompt=null,timerInterval=null,seconds=420,timerRunning=false;

// ── API Key ──────────────────────────────────────────────────────────────────
function getApiKey(){return localStorage.getItem('toefl_api_key')||'';}
function saveApiKey(){const k=document.getElementById('api-key-input').value.trim();if(k){localStorage.setItem('toefl_api_key',k);closeApiModal();showToast('API key saved ✓');}else alert('Please enter a valid key.');}
function clearApiKey(){localStorage.removeItem('toefl_api_key');closeApiModal();showToast('API key cleared');}
function showApiKeyModal(){document.getElementById('api-key-input').value=getApiKey();document.getElementById('api-modal').classList.add('visible');}
function closeApiModal(){document.getElementById('api-modal').classList.remove('visible');}
function showToast(msg){const t=document.createElement('div');t.style.cssText='position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);background:#1e1b4b;color:#fff;padding:8px 18px;border-radius:99px;font-size:13px;z-index:200;';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500);}

// ── Timer ────────────────────────────────────────────────────────────────────
function startTimer(){
  if(timerRunning)return;timerRunning=true;
  timerInterval=setInterval(()=>{
    seconds--;updateTimer();
    if(seconds<=0){clearInterval(timerInterval);showToast('⏱ Time is up!');}
  },1000);
}
function updateTimer(){
  const m=Math.floor(seconds/60),s=seconds%60;
  const el=document.getElementById('timer-num');
  if(el){el.textContent=`${m}:${s.toString().padStart(2,'0')}`;el.className='timer-num'+(seconds<=60?' urgent':'');}
}
function resetTimer(){clearInterval(timerInterval);timerRunning=false;seconds=420;}

// ── Word count ───────────────────────────────────────────────────────────────
function countWords(text){return text.trim().split(/\s+/).filter(w=>w.length>0).length;}
function updateWordCount(){
  const ta=document.getElementById('response-area');if(!ta)return;
  const wc=countWords(ta.value);
  const el=document.getElementById('word-count');
  if(el){el.textContent=`${wc} words`;el.className='word-count'+(wc>=currentPrompt.minWords?' met':'');}
}

// ── Render ───────────────────────────────────────────────────────────────────
function render(){
  resetTimer();
  currentPrompt=shuffle(emailPrompts)[0];
  document.getElementById('ai-feedback').style.display='none';
  const card=document.getElementById('main-card');card.innerHTML='';

  const tag=document.createElement('div');tag.className='topic-tag';tag.textContent='Email Writing Task';card.appendChild(tag);

  // Timer
  const tb=document.createElement('div');tb.className='timer-bar';
  tb.innerHTML=`<span class="timer-icon">⏱</span><span class="timer-label">Time remaining (7 min)</span><span class="timer-num" id="timer-num">7:00</span>`;card.appendChild(tb);

  // Situation
  const sl=document.createElement('div');sl.className='q-number';sl.textContent='Situation';card.appendChild(sl);
  const sit=document.createElement('div');sit.className='passage-box';sit.style.marginBottom='1rem';sit.textContent=currentPrompt.situation;card.appendChild(sit);

  // Task
  const tl=document.createElement('div');tl.className='q-number';tl.textContent='Your task';card.appendChild(tl);
  const task=document.createElement('div');task.style.cssText='font-size:14px;color:var(--text);line-height:1.6;margin-bottom:1rem;font-weight:500;';task.textContent=currentPrompt.task;card.appendChild(task);

  // Textarea
  const ta=document.createElement('textarea');ta.id='response-area';ta.className='write-area';ta.placeholder='Write your email here…';
  ta.addEventListener('input',()=>{updateWordCount();if(!timerRunning)startTimer();});card.appendChild(ta);

  // Word count
  const wcb=document.createElement('div');wcb.className='word-count-bar';
  wcb.innerHTML=`<span class="word-count" id="word-count">0 words</span><span class="word-min-note">Minimum: ${currentPrompt.minWords} words</span>`;card.appendChild(wcb);

  // Buttons
  const br=document.createElement('div');br.className='btn-row';
  const fb=document.createElement('button');fb.className='btn btn-primary';fb.textContent='Get AI Feedback ✦';
  fb.onclick=getFeedback;br.appendChild(fb);
  const mb=document.createElement('button');mb.className='btn btn-outline';mb.textContent='See model answer';
  mb.onclick=()=>{const mbox=document.getElementById('model-answer-box');if(mbox)mbox.style.display=mbox.style.display==='none'?'block':'none';};br.appendChild(mb);
  const nb=document.createElement('button');nb.className='btn';nb.textContent='New prompt';nb.onclick=render;br.appendChild(nb);
  card.appendChild(br);

  // Model answer (hidden)
  const mbox=document.createElement('div');mbox.id='model-answer-box';mbox.className='feedback reveal';mbox.style.display='none';
  mbox.innerHTML=`<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-bottom:8px">Model Answer</div><div class="ai-model-answer">${currentPrompt.modelAnswer}</div>`;
  card.appendChild(mbox);
}

// ── AI Feedback ──────────────────────────────────────────────────────────────
async function getFeedback(){
  const key=getApiKey();
  if(!key){showApiKeyModal();return;}
  const response=document.getElementById('response-area')?.value?.trim();
  if(!response||countWords(response)<10){alert('Please write at least a few sentences before getting feedback.');return;}

  const box=document.getElementById('ai-feedback');box.style.display='block';
  document.getElementById('ai-score-badge').textContent='Band —';
  document.getElementById('ai-feedback-body').innerHTML='<div class="loading-spinner"><div class="loading-dots"><span></span><span></span><span></span></div> Evaluating your response…</div>';
  box.scrollIntoView({behavior:'smooth',block:'nearest'});

  const systemPrompt=`You are a strict but fair TOEFL Writing evaluator. Evaluate the student's email response and return ONLY a valid JSON object with no markdown, no extra text. Use exactly these keys: score (integer 1-6), band (string like "B2"), summary (2-sentence string), strengths (array of 2-3 strings), improvements (array of 2-3 strings), model_answer (string). Scoring: 6=perfect email, 5=very strong minor errors, 4=good some errors, 3=adequate but noticeable errors, 2=weak limited vocabulary, 1=very weak.`;
  const userMsg=`Situation: ${currentPrompt.situation}\n\nTask: ${currentPrompt.task}\n\nStudent response:\n${response}`;

  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,system:systemPrompt,messages:[{role:'user',content:userMsg}]})
    });
    const data=await res.json();
    const text=data.content.map(i=>i.text||'').join('');
    const clean=text.replace(/```json|```/g,'').trim();
    const parsed=JSON.parse(clean);
    renderFeedback(parsed);
  }catch(err){
    document.getElementById('ai-feedback-body').innerHTML=`<div style="color:var(--error-text);font-size:14px">⚠️ Could not get feedback. Check your API key and try again.<br><small>${err.message}</small></div>`;
  }
}

function renderFeedback(data){
  document.getElementById('ai-score-badge').textContent=`Band ${data.score} — ${data.band}`;
  document.getElementById('ai-feedback-body').innerHTML=`
    <div class="ai-section"><div class="ai-section-title">Overall</div><p>${data.summary}</p></div>
    <div class="ai-section"><div class="ai-section-title">✅ Strengths</div><ul>${data.strengths.map(s=>`<li>${s}</li>`).join('')}</ul></div>
    <div class="ai-section"><div class="ai-section-title">📈 Areas to Improve</div><ul>${data.improvements.map(s=>`<li>${s}</li>`).join('')}</ul></div>
  `;
}

render();
