export default function ReadingPanel({ result }) {
  return (
    <section className="card-panel reading-panel">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Shadow reading</span>
          <h2>{result.signatureLabel || 'Your current signature'}</h2>
        </div>
        <p>{result.shadowProfileSummary || result.narrative}</p>
      </div>

      <div className="reading-grid">
        {result.factorBreakdown?.map((reading) => (
          <article className={`reading-card ${reading.tone || 'balanced'}`} key={reading.key}>
            <span className="reading-kicker">{reading.label}</span>
            <strong>{reading.selectedLabel}</strong>
            <p>{reading.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
