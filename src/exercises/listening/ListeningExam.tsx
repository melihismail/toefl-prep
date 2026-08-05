import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { useListeningExam } from './useListeningExam.ts';
import type { ListeningPassage } from '../../data/listening/types.ts';
import type { TranslationKey } from '../../i18n/translations.ts';

const LETTERS = ['A', 'B', 'C', 'D'];

type Props = {
  data: ListeningPassage[];
  titleKey: TranslationKey;
  backTo: string;
  backLabelKey: TranslationKey;
};

export function ListeningExam({ data, titleKey, backTo, backLabelKey }: Props) {
  const { t } = useLanguage();
  const { exam, state, currentIdx, finished, size, goTo, next, restart, patch, patchQuestion, score } =
    useListeningExam(data);
  const [speaking, setSpeaking] = useState(false);

  const passage = exam[currentIdx];
  const s = state[currentIdx];

  function speak() {
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(passage.transcript);
    utt.lang = 'en-US';
    utt.rate = 0.88;
    utt.onend = () => {
      setSpeaking(false);
      patch(currentIdx, { played: true });
    };
    setSpeaking(true);
    speechSynthesis.speak(utt);
  }

  function stop() {
    speechSynthesis.cancel();
    setSpeaking(false);
  }

  if (finished) {
    return (
      <div className="section-listening">
        <LanguageToggle />
        <div className="app score-screen" style={{ display: 'block' }}>
          <div className="score-hero">
            <div className="score-circle">
              <span className="big">
                {score.correct}/{score.total}
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
            <div id="review-list">
              {exam.map((p, pi) => {
                const ps = state[pi];
                const allCorrect = p.questions.every((q, qi) => ps.qSelected[qi] === q.answer);
                return (
                  <div key={p.id} className={`review-item ${allCorrect ? 'correct-item' : 'wrong-item'}`}>
                    <div className="review-passage">
                      Passage {pi + 1} — {p.title}
                    </div>
                    {p.questions.map((q, qi) => {
                      const chosen = ps.qSelected[qi];
                      const match = chosen === q.answer;
                      const given = chosen === -1 ? '(not answered)' : `${LETTERS[chosen]}) ${q.options[chosen]}`;
                      return (
                        <div key={qi}>
                          <div className="review-q-text">
                            Q{qi + 1}: {q.stem}
                          </div>
                          <div className="review-row">
                            <span className="label">Your answer:</span>{' '}
                            {match ? (
                              <span className="ok">{given} ✓</span>
                            ) : (
                              <>
                                <span className="given">{given}</span>
                                <br />
                                <span className="label">Correct:</span>{' '}
                                <span className="correct">
                                  {LETTERS[q.answer]}) {q.options[q.answer]}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
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
          <Link to={backTo} className="back-btn">
            {t(backLabelKey)}
          </Link>
          <div className="exam-label">{t(titleKey)}</div>
          <div className="q-counter">
            Passage {currentIdx + 1} of {size}
          </div>
        </div>

        <div className="progress-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / size) * 100}%` }} />
        </div>

        <div className="card">
          <div className="topic-tag">{passage.subject || 'Conversation'}</div>
          <div className="passage-title">{passage.title}</div>

          <div className="tts-bar">
            <button className="tts-play" onClick={speaking ? stop : speak} title={speaking ? 'Stop' : 'Play'}>
              {speaking ? '⏹' : '▶'}
            </button>
            <div className="tts-info">
              <div className="tts-title">{passage.title}</div>
              <div className="tts-sub">{s.played ? 'Played — you can replay' : 'Press play to listen'}</div>
              <div className="tts-progress-wrap">
                <div className="tts-progress-fill" />
              </div>
            </div>
          </div>

          <button
            className="btn btn-outline"
            style={{ fontSize: 12, padding: '6px 14px', marginBottom: '1rem' }}
            onClick={() => patch(currentIdx, { transcriptOpen: !s.transcriptOpen })}
          >
            {s.transcriptOpen ? '📄 Hide Transcript' : '📄 Show Transcript'}
          </button>

          {s.transcriptOpen && (
            <div className="transcript-box visible">
              <div className="transcript-label">Transcript</div>
              {passage.transcript
                .split('\n\n')
                .filter((l) => l.trim())
                .map((line, i) => (
                  <p key={i} style={{ marginBottom: '.75rem' }}>
                    {line}
                  </p>
                ))}
            </div>
          )}

          <div className="section-label" style={{ marginTop: '1rem' }}>
            Questions
          </div>

          {passage.questions.map((q, qi) => {
            const locked = s.qChecked[qi] || s.qRevealed[qi];
            return (
              <div key={qi} style={{ marginBottom: '1.5rem' }}>
                <div className="q-number">
                  Q{qi + 1} <span className="q-type-badge">{q.type}</span>
                </div>
                <div className="q-stem">{q.stem}</div>
                <div className="options">
                  {q.options.map((opt, oi) => {
                    const isSel = s.qSelected[qi] === oi;
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
                      <button
                        key={oi}
                        className={cls.join(' ')}
                        disabled={locked}
                        onClick={() => patchQuestion(currentIdx, 'qSelected', qi, oi)}
                      >
                        <span className="option-letter">{LETTERS[oi]})</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <div className="btn-row" style={{ marginTop: '.75rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: 12 }}
                    disabled={s.qSelected[qi] === -1 || locked}
                    onClick={() => patchQuestion(currentIdx, 'qChecked', qi, true)}
                  >
                    {s.qChecked[qi] ? (s.qSelected[qi] === q.answer ? 'Correct ✓' : 'Wrong ✗') : 'Check ↗'}
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: 12 }}
                    disabled={s.qRevealed[qi]}
                    onClick={() => {
                      patchQuestion(currentIdx, 'qSelected', qi, q.answer);
                      patchQuestion(currentIdx, 'qRevealed', qi, true);
                    }}
                  >
                    {s.qRevealed[qi] ? 'Shown' : 'Show answer'}
                  </button>
                </div>

                {s.qChecked[qi] && (
                  <div
                    className={`feedback ${s.qSelected[qi] === q.answer ? 'correct' : 'wrong'}`}
                    style={{ display: 'block' }}
                  >
                    {s.qSelected[qi] === q.answer ? (
                      <strong>Correct!</strong>
                    ) : (
                      <>
                        <strong>Not quite.</strong> Correct answer highlighted.
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="nav-row">
          <button className="btn" disabled={currentIdx === 0} onClick={() => goTo(currentIdx - 1)}>
            ← Previous
          </button>
          <button className="btn btn-primary" onClick={next}>
            {currentIdx === size - 1 ? 'Finish exam ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
