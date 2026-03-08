import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2 } from 'lucide-react';

import { getCountdownParts } from '../lib/countdown.js';

function buildTimeLeftText(parts) {
  return `${parts.years}y ${parts.months}m ${parts.days}d ${parts.hours}h ${parts.minutes}m ${parts.seconds}s left from now`;
}

export default function ShareCard({ result, userName }) {
  const [status, setStatus] = useState('');
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

  const timeLeftText = buildTimeLeftText(parts);
  const shareText = `${userName || 'My'} Death Clock shows ${timeLeftText}. ${result.signatureLabel}.`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Death Clock result',
          text: shareText
        });
        setStatus('Shared.');
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setStatus('Summary copied.');
    } catch {
      setStatus('Share cancelled.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setStatus('Copied to clipboard.');
    } catch {
      setStatus('Clipboard unavailable.');
    }
  };

  return (
    <motion.section
      className="card-panel share-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <span className="eyebrow">Shareable result</span>
      <div className="share-surface">
        <span className="share-title">Death Clock</span>
        <strong>{userName || 'Your'} remaining time</strong>
        <p>{result.signatureLabel}</p>
        <p>{timeLeftText}</p>
        <div className="share-score-row">
          <span>Clock</span>
          <span>Live from now</span>
        </div>
      </div>

      <div className="share-actions">
        <button className="ghost-button" onClick={handleCopy} type="button">
          <Copy size={16} />
          Copy
        </button>
        <button className="primary-button" onClick={handleShare} type="button">
          <Share2 size={16} />
          Share
        </button>
      </div>

      {status ? <p className="feedback success">{status}</p> : null}
    </motion.section>
  );
}
