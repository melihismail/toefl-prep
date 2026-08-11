import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import { chooseResponseQuestions } from '../../data/listening/chooseAResponse.ts';
import type { ChooseResponseQuestion } from '../../data/listening/types.ts';
import { useAudioClip } from '../useAudioClip.ts';
import { AnswerControls } from '../AnswerControls.tsx';

const EXAM_SIZE = 8;
const LETTERS = ['A', 'B', 'C', 'D'];

type QState = {
  selected: number;
  checked: boolean;
  revealed: boolean;
  played: boolean;
};

function freshState(exam: ChooseResponseQuestion[]): QState[] {
  return exam.map(() => ({ selected: -1, checked: false, revealed: false, played: false }));
}

export function ChooseAResponse() {
  const { t } = useLanguage();
  const [exam, setExam] = useState<ChooseResponseQuestion[]>(() =>
    shuffle(chooseResponseQuestions).slice(0, EXAM_SIZE),
  );
  const [state, setState] = useState<QState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = exam.length;
  const q = exam[currentIdx];
  const s = state[currentIdx];
  const locked = s.checked || s.revealed;

  const clip = useAudioClip(q.audioFile, () => patch({ played: true }));
  const stopAudio = clip.stop;

  function patch(change: Partial<QState>) {
    setState((prev) => prev.map((v, i) => (i === currentIdx ? { ...v, ...change } : v)));
  }


  const score = useMemo(
    () => {
      const correct = exam.filter((qq, i) => state[i].selected === qq.answer).length;
      return { correct, pct: Math.round((correct / size) * 100) };
    },
    [exam, state, size],
  );

  function finish() {
    stopAudio();
    setState((prev) => prev.map((v) => (v.checked || v.revealed ? v : { ...v, checked: true })));
    setFinished(true);
  }

  function restart() {
    stopAudio();
    const fresh = shuffle(chooseResponseQuestions).slice(0, EXAM_SIZE);
    setExam(fresh);
    setState(freshState(fresh));
    setCurrentIdx(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="section-listening">
        <LanguageToggle />
        <div className="app score-screen" style={{ display: 'block' }}>
          <div className="score-hero">
            <div className="score-circle">
              <span className="big">
                {score.correct}/{size}
              </span>
              <span className="small">correct</span>
            </div>
            <p className="score-msg">
              {score.pct === 100
                ? 'Perfect!'
                : score.pct >= 80
                  ? 'Great job!'
                  : score.pct >= 60
                    ? 'Good effort!'
                    : 'Keep going!'}
            </p>
            <button className="btn btn-primary" onClick={restart}>
              New exam
            </button>
          </div>

          <div className="card">
            <div className="review-title">Your answers</div>
            {exam.map((qq, i) => {
              const chosen = state[i].selected;
              const ok = chosen === qq.answer;
              const given = chosen === -1 ? '(not answered)' : `${LETTERS[chosen]}) ${qq.options[chosen]}`;
              return (
                <div key={qq.id} className={`review-item ${ok ? 'correct-item' : 'wrong-item'}`}>
                  <div className={`tag ${ok ? 'tag-correct' : 'tag-wrong'}`} style={{ marginBottom: 6 }}>
                    {ok ? '✓ Correct' : '✗ Incorrect'}
                  </div>
                  <div className="review-q-text" style={{ fontStyle: 'italic' }}>
                    "{qq.heard}"
                  </div>
                  <div className="review-row">
                    {ok ? (
                      <>
                        <span className="label">Your answer:</span>
                        <span className="ok">{given} ✓</span>
                      </>
                    ) : (
                      <>
                        <span className="label">Your answer:</span>
                        <span className="given">{given}</span>
                        <br />
                        <span className="label">Correct:</span>
                        <span className="correct">
                          {LETTERS[qq.answer]}) {qq.options[qq.answer]}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="restart-row" style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={restart}>
              New exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-listening">
      <LanguageToggle />
      <div className="app">
        <div className="topbar">
          <Link to="/sections/listening" className="back-btn">
            {t('back_listening')}
          </Link>
          <div className="exam-label">{t('choose_a_response')}</div>
          <div className="q-counter">
            {currentIdx + 1} / {size}
          </div>
        </div>
        <div className="progress-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / size) * 100}%` }} />
        </div>

        <div className="card">
          <div className="tts-bar">
            <button className="tts-play" onClick={clip.play} disabled={clip.status !== 'idle'}>
              {clip.status === 'loading' ? '…' : clip.status === 'playing' ? '⏹' : '▶'}
            </button>
            <div className="tts-info">
              <div className="tts-title">Listen to the sentence</div>
              <div className="tts-sub">
                {s.played ? 'Played — you can replay anytime' : 'Press play to hear the sentence'}
              </div>
              <div className="tts-progress-wrap">
                <div className="tts-progress-fill" />
              </div>
            </div>
          </div>

          {!s.played && (
            <div className="info-strip" style={{ marginBottom: '1rem' }}>
              <span>🎧</span>
              <span>Press play to hear the sentence, then choose the best response below.</span>
            </div>
          )}

          <div className="q-number">Choose the most appropriate response:</div>

          <div className="options">
            {q.options.map((opt, oi) => {
              const isSel = s.selected === oi;
              const isCorr = q.answer === oi;
              const cls = ['option'];
              if (locked) {
                cls.push('disabled');
                if (isCorr) cls.push('correct-answer');
                else if (isSel) cls.push('wrong-answer');
              } else if (isSel) {
                cls.push('selected');
              }
              return (
                <button key={oi} className={cls.join(' ')} disabled={locked} onClick={() => patch({ selected: oi })}>
                  <span className="option-letter">{LETTERS[oi]})</span>
                  {opt}
                </button>
              );
            })}
          </div>

          <AnswerControls
            complete={s.selected !== -1}
            attempted={s.selected !== -1}
            checked={s.checked}
            revealed={s.revealed}
            correct={s.selected === q.answer}
            onCheck={() => patch({ checked: true })}
            onReveal={() => patch({ selected: q.answer, revealed: true })}
            onRetry={() => patch({ selected: -1, checked: false, revealed: false })}
          />

          {s.checked && (
            <div className={`feedback ${s.selected === q.answer ? 'correct' : 'wrong'}`} style={{ display: 'block' }}>
              {s.selected === q.answer ? (
                <strong>Correct!</strong>
              ) : (
                <>
                  <strong>Not quite.</strong> The correct response is highlighted.
                </>
              )}
            </div>
          )}
        </div>

        <div className="nav-row">
          <button className="btn" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>
            ← Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => (currentIdx < size - 1 ? setCurrentIdx(currentIdx + 1) : finish())}
          >
            {currentIdx === size - 1 ? 'Finish exam ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
