import { motion } from 'framer-motion';

import { habitToggles } from '../lib/quiz.js';

export default function HabitLab({ canInteract, isBusy, selectedHabits, onToggle }) {
  return (
    <section className="card-panel habit-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Habit lab</span>
          <h2>Flip the future in real time</h2>
        </div>
        <p>Toggle upgrades and instantly recalculate the projected horizon against your current answers.</p>
      </div>

      <div className="habit-grid">
        {habitToggles.map((toggle, index) => {
          const active = Boolean(selectedHabits?.[toggle.key]);

          return (
            <motion.button
              className={active ? 'habit-card active' : 'habit-card'}
              disabled={!canInteract || isBusy}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              key={toggle.key}
              onClick={() => onToggle(toggle.key)}
              transition={{ delay: index * 0.05 }}
              type="button"
            >
              <span className="habit-state">{active ? 'On' : 'Off'}</span>
              <span className="habit-title">{toggle.label}</span>
              <span className="habit-caption">{toggle.caption}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
