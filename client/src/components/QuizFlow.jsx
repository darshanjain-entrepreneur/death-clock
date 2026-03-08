import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

import { allResponsesComplete, getSliderMeaning, quizQuestions } from '../lib/quiz.js';

export default function QuizFlow({ initialResponses, isBusy, onSubmit }) {
  const [draft, setDraft] = useState(initialResponses || {});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nextDraft = initialResponses || {};
    setDraft(nextDraft);

    const firstIncompleteIndex = quizQuestions.findIndex((question) => !nextDraft[question.key]);
    setActiveIndex(firstIncompleteIndex === -1 ? 0 : firstIncompleteIndex);
  }, [initialResponses]);

  const activeQuestion = quizQuestions[activeIndex];
  const isComplete = allResponsesComplete(draft);
  const selectedValue = Number.isInteger(draft[activeQuestion.key]) ? draft[activeQuestion.key] : 5;
  const hasAnsweredCurrent = Number.isInteger(draft[activeQuestion.key]);

  const handleSelect = (questionKey, value) => {
    setDraft((current) => ({
      ...current,
      [questionKey]: Number(value)
    }));
  };

  return (
    <section className="card-panel quiz-panel">
      <div className="quiz-header-row">
        <div>
          <span className="eyebrow">Ten brutal signals</span>
          <h2>Answer honestly. Most people cannot.</h2>
        </div>
        <div className="progress-meta">
          <span>
            {activeIndex + 1} / {quizQuestions.length}
          </span>
          <div className="progress-bar">
            <span style={{ width: `${((activeIndex + 1) / quizQuestions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="question-map">
        {quizQuestions.map((question, index) => (
          <button
            className={draft[question.key] ? 'map-dot done' : index === activeIndex ? 'map-dot active' : 'map-dot'}
            key={question.key}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            {question.eyebrow}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="question-shell"
          key={activeQuestion.key}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <div className="question-copy">
            <span className="eyebrow">{activeQuestion.label}</span>
            <h3>{activeQuestion.prompt}</h3>
            <p className="question-context">{activeQuestion.context}</p>
          </div>

          <div className="slider-shell">
            <div className="slider-header">
              <span>{activeQuestion.leftLabel}</span>
              <strong>{selectedValue}/10</strong>
              <span>{activeQuestion.rightLabel}</span>
            </div>

            <input
              aria-label={activeQuestion.label}
              className="question-slider"
              max="10"
              min="1"
              onChange={(event) => handleSelect(activeQuestion.key, event.target.value)}
              type="range"
              value={selectedValue}
            />

            <div className="slider-ticks">
              {Array.from({ length: 10 }, (_, index) => {
                const value = index + 1;
                const active = draft[activeQuestion.key] === value;

                return (
                  <button
                    className={active ? 'slider-tick active' : 'slider-tick'}
                    key={value}
                    onClick={() => handleSelect(activeQuestion.key, value)}
                    type="button"
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            <div className={hasAnsweredCurrent ? 'meaning-card active' : 'meaning-card'}>
              <span className="meaning-label">{hasAnsweredCurrent ? `Locked at ${selectedValue}/10` : 'Preview at 5/10'}</span>
              <p>{getSliderMeaning(activeQuestion, selectedValue)}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="quiz-footer-row">
        <button className="ghost-button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))} type="button">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="quiz-footer-actions">
          {activeIndex < quizQuestions.length - 1 ? (
            <button
              className="ghost-button"
              disabled={!hasAnsweredCurrent}
              onClick={() => setActiveIndex((index) => Math.min(index + 1, quizQuestions.length - 1))}
              type="button"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : null}

          <button className="primary-button" disabled={!isComplete || isBusy} onClick={() => onSubmit(draft)} type="button">
            <Sparkles size={16} />
            {isBusy ? 'Calculating...' : 'Reveal my Death Clock'}
          </button>
        </div>
      </div>
    </section>
  );
}
