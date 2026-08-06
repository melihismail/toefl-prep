import { WritingPrompt } from './WritingPrompt.tsx';
import { discussionPrompts } from '../../data/writing/academicDiscussion.ts';
import type { DiscussionPrompt } from '../../data/writing/types.ts';

export function AcademicDiscussion() {
  return (
    <WritingPrompt<DiscussionPrompt>
      prompts={discussionPrompts}
      titleKey="academic_discussion"
      backLabelKey="back_writing"
      tagLabel="Academic Discussion Task"
      totalSeconds={600}
      timerLabel="Time remaining (10 min)"
      placeholder="Write your response here…"
      minWords={(p) => p.minWords}
      modelAnswer={(p) => p.modelAnswer}
      renderBrief={(p) => (
        <>
          <div className="discussion-box">
            <div className="discussion-professor">👩‍🏫 {p.professorName}</div>
            <div className="discussion-question">{p.question}</div>
          </div>

          <div className="q-number">Student responses</div>
          {[p.studentA, p.studentB].map((st) => (
            <div className="student-response" key={st.name}>
              <div className="student-name">💬 {st.name}</div>
              <div className="student-text">{st.response}</div>
            </div>
          ))}

          <div style={{ fontSize: 13, color: 'var(--muted)', margin: '1rem 0 0.5rem' }}>
            Now write your own contribution to this discussion. Add your own perspective — agree, disagree, or build
            on what has been said.
          </div>
        </>
      )}
    />
  );
}
