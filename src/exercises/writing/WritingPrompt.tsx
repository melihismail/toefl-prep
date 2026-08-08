import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import type { TranslationKey } from '../../i18n/translations.ts';

function formatClock(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

type Props<T> = {
  prompts: T[];
  titleKey: TranslationKey;
  backLabelKey: TranslationKey;
  tagLabel: string;
  /** Seconds on the clock, matching the real task allowance. */
  totalSeconds: number;
  timerLabel: string;
  placeholder: string;
  minWords: (p: T) => number;
  modelAnswer: (p: T) => string;
  /** The task-specific block above the writing area. */
  renderBrief: (p: T) => ReactNode;
};

export function WritingPrompt<T>({
  prompts,
  titleKey,
  backLabelKey,
  tagLabel,
  totalSeconds,
  timerLabel,
  placeholder,
  minWords,
  modelAnswer,
  renderBrief,
}: Props<T>) {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState<T>(() => shuffle(prompts)[0]);
  const [text, setText] = useState('');
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const timer = useRef<number | null>(null);

  // The clock starts on the first keystroke and stops at zero, as before.
  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [running]);

  function newPrompt() {
    setPrompt(shuffle(prompts)[0]);
    setText('');
    setSeconds(totalSeconds);
    setRunning(false);
    setShowModel(false);
  }

  const words = countWords(text);
  const min = minWords(prompt);

  return (
    <div className="section-writing">
      <LanguageToggle />
      <div className="app">
        <div className="topbar">
          <Link to="/sections/writing" className="back-btn">
            {t(backLabelKey)}
          </Link>
          <div className="exam-label">{t(titleKey)}</div>
          <div className="q-counter" />
        </div>

        <div className="card">
          <div className="topic-tag">{tagLabel}</div>

          <div className="timer-bar">
            <span className="timer-icon">⏱</span>
            <span className="timer-label">{timerLabel}</span>
            <span className={`timer-num${seconds <= 60 ? ' urgent' : ''}`}>{formatClock(seconds)}</span>
          </div>

          {renderBrief(prompt)}

          <textarea
            className="write-area"
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (!running && seconds > 0) setRunning(true);
            }}
          />

          <div className="word-count-bar">
            <span className={`word-count${words >= min ? ' met' : ''}`}>{words} words</span>
            <span className="word-min-note">Minimum: {min} words</span>
          </div>

          <div className="btn-row">
            <button className="btn btn-outline" onClick={() => setShowModel((v) => !v)}>
              {showModel ? 'Hide model answer' : 'See model answer'}
            </button>
            <button className="btn" onClick={newPrompt}>
              New prompt
            </button>
          </div>

          {showModel && (
            <div className="feedback reveal" style={{ display: 'block' }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '.05em',
                  color: 'var(--muted)',
                  marginBottom: 8,
                }}
              >
                Model Answer
              </div>
              <div className="model-answer">{modelAnswer(prompt)}</div>
            </div>
          )}

          <div className="info-strip" style={{ marginTop: '1.25rem' }}>
            <i className="ti ti-info-circle" aria-hidden="true" />
            <span>
              Practice mode — your writing is not scored and is not saved. Compare it against the model answer.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
