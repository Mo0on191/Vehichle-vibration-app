export default function Processing({ progress }) {
  return (
    <div className="processing">
      <h2>Processing video...</h2>
      <p>Running CV wheel tracking and analysis</p>

      <div className="proc-bar-wrap">
        <div className="proc-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
