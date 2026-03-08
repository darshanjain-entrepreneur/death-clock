export default function HistoryRail({ history }) {
  return (
    <section className="card-panel history-panel">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Habit history</span>
          <h2>Previous projections</h2>
        </div>
      </div>

      <div className="history-list">
        {history?.length ? (
          history.map((entry) => (
            <article className="history-item" key={entry._id}>
              <div>
                <strong>{entry.estimatedLifespan} years</strong>
                <span>{entry.remainingYears} years left</span>
              </div>
              <div>
                <strong>{entry.lifeScore}/100</strong>
                <span>{new Date(entry.createdAt).toLocaleString()}</span>
              </div>
            </article>
          ))
        ) : (
          <p className="muted-copy">No habit history yet. The first calculation becomes your benchmark.</p>
        )}
      </div>
    </section>
  );
}
