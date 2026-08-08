import { WritingPrompt } from './WritingPrompt.tsx';
import { emailPrompts } from '../../data/writing/writeAnEmail.ts';
import type { EmailPrompt } from '../../data/writing/types.ts';

export function WriteAnEmail() {
  return (
    <WritingPrompt<EmailPrompt>
      prompts={emailPrompts}
      titleKey="write_an_email"
      backLabelKey="back_writing"
      tagLabel="Email Writing Task"
      totalSeconds={420}
      timerLabel="Time remaining (7 min)"
      placeholder="Write your email here…"
      minWords={(p) => p.minWords}
      modelAnswer={(p) => p.modelAnswer}
      renderBrief={(p) => (
        <>
          <div className="q-number">Situation</div>
          <div className="passage-box" style={{ marginBottom: '1rem' }}>
            {p.situation}
          </div>
          <div className="q-number">Your task</div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--text)',
              lineHeight: 1.6,
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            {p.task}
          </div>
        </>
      )}
    />
  );
}
