import { useCallback, useMemo, useState } from 'react';
import type { ListeningPassage } from '../../data/listening/types.ts';

export type PassageState = {
  transcriptOpen: boolean;
  qSelected: number[];
  qChecked: boolean[];
  qRevealed: boolean[];
  played: boolean;
};

function shuffle<T>(a: readonly T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function freshState(exam: ListeningPassage[]): PassageState[] {
  return exam.map((p) => ({
    transcriptOpen: false,
    qSelected: p.questions.map(() => -1),
    qChecked: p.questions.map(() => false),
    qRevealed: p.questions.map(() => false),
    played: false,
  }));
}

export function useListeningExam(data: ListeningPassage[], examSize = 3) {
  const [exam, setExam] = useState<ListeningPassage[]>(() => shuffle(data).slice(0, examSize));
  // Derived from `exam`, not a second shuffle — the two must describe the same passages.
  const [state, setState] = useState<PassageState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = exam.length;

  const patch = useCallback((idx: number, change: Partial<PassageState>) => {
    setState((prev) => prev.map((s, i) => (i === idx ? { ...s, ...change } : s)));
  }, []);

  const patchQuestion = useCallback(
    (idx: number, key: 'qSelected' | 'qChecked' | 'qRevealed', qi: number, value: number | boolean) => {
      setState((prev) =>
        prev.map((s, i) => {
          if (i !== idx) return s;
          const next = [...s[key]] as (number & boolean)[];
          next[qi] = value as number & boolean;
          return { ...s, [key]: next };
        }),
      );
    },
    [],
  );

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= size) return;
      speechSynthesis.cancel();
      setCurrentIdx(idx);
    },
    [size],
  );

  const next = useCallback(() => {
    speechSynthesis.cancel();
    if (currentIdx < size - 1) setCurrentIdx(currentIdx + 1);
    else setFinished(true);
  }, [currentIdx, size]);

  const restart = useCallback(() => {
    speechSynthesis.cancel();
    const fresh = shuffle(data).slice(0, examSize);
    setExam(fresh);
    setState(freshState(fresh));
    setCurrentIdx(0);
    setFinished(false);
  }, [data, examSize]);

  const score = useMemo(() => {
    let total = 0;
    let correct = 0;
    exam.forEach((p, i) => {
      p.questions.forEach((q, qi) => {
        total++;
        if (state[i]?.qSelected[qi] === q.answer) correct++;
      });
    });
    return { total, correct, pct: total ? Math.round((correct / total) * 100) : 0 };
  }, [exam, state]);

  return { exam, state, currentIdx, finished, size, goTo, next, restart, patch, patchQuestion, score };
}
