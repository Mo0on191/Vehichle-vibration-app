import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Results({ results }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!results) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            data: [28, 28, 27, 24, 19, 18, 18, 18],
            borderColor: "#7aa2ff",
            backgroundColor: "rgba(122,162,255,0.12)",
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  }, [results]);

  return (
    <div className="results">
      <div className="results-card">
        <div className="speed-label">Optimal crossing speed</div>

        <div className="speed">
          {results.optimal_speed || 18}
        </div>

        <div style={{ color: "#8b93a7" }}>km/h</div>

        <div className="meta-grid">
          <div className="meta-card">
            <div className="meta-key">Make</div>
            <div>{results.make || "N/A"}</div>
          </div>

          <div className="meta-card">
            <div className="meta-key">Model</div>
            <div>{results.model || "N/A"}</div>
          </div>

          <div className="meta-card">
            <div className="meta-key">Year</div>
            <div>{results.year || "N/A"}</div>
          </div>
        </div>
      </div>

      <div className="chart-wrap">
        <h2 style={{ marginBottom: 20 }}>Speed Analysis</h2>
        <div style={{ height: 350 }}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
