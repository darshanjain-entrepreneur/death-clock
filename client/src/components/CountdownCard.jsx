import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { getCountdownParts } from '../lib/countdown.js';

const units = [
  { key: 'years', label: 'Years' },
  { key: 'months', label: 'Months' },
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' }
];

export default function CountdownCard({ result, userName }) {
  const [parts, setParts] = useState(() => getCountdownParts(result?.deathDate));

  useEffect(() => {
    setParts(getCountdownParts(result?.deathDate));

    const id = window.setInterval(() => {
      setParts(getCountdownParts(result?.deathDate));
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [result?.deathDate]);

  return (
    <motion.section
      className="card-panel countdown-card"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="countdown-copy">
        <span className="eyebrow">Time left from now</span>
        <h2>{userName ? `${userName}, this is the time still on your clock.` : 'This is the time still on your clock.'}</h2>
        <p>{result.narrative}</p>
      </div>

      <div className="countdown-grid">
        {units.map((unit, index) => (
          <motion.div
            className="countdown-cell"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={unit.key}
            transition={{ delay: index * 0.06 }}
          >
            <span className="countdown-value">{String(parts[unit.key]).padStart(2, '0')}</span>
            <span className="countdown-label">{unit.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="countdown-note">The countdown updates live from this moment forward and is shown only as remaining time.</p>
    </motion.section>
  );
}
