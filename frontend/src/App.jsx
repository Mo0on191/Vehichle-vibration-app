import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadZone from "./components/UploadZone";
import VideoPreview from "./components/VideoPreview";
import Processing from "./components/Processing";
import Results from "./components/Results";
import "./styles.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  // 🆕 HISTORY + UI STATE
  const [history, setHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setVideo(URL.createObjectURL(f));

    // reset current view
    setResults(null);
  }

  async function handleAnalyze() {
    if (!file) return alert("Upload a video first");

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + 10));
    }, 300);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setLoading(false);
        setResults(data);

        // 🆕 ADD TO HISTORY (expects backend to return name + image)
        const newEntry = {
          id: crypto.randomUUID(),
          name: data.name || file.name,
          image: data.image || null,
          video,
          results: data,
        };

        setHistory((prev) => [newEntry, ...prev]);
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  // 🆕 LOAD FROM HISTORY
  function loadFromHistory(item) {
    setResults(item.results);
    setVideo(item.video);
    setFile(null);
    setMenuOpen(false);
  }

  return (
    <>
      <Header />

      {/* ☰ HAMBURGER */}
      <button
  className={`hamburger ${menuOpen ? "open" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span></span>
  <span></span>
  <span></span>
</button>
        ☰
      </button>

      {/* 📜 SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h3>History</h3>

        {history.length === 0 && (
          <p className="muted">No analyzed cars yet</p>
        )}

        {history.map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => loadFromHistory(item)}
          >
            {item.image && (
              <img src={item.image} alt={item.name} />
            )}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main>
        <Hero />

        {/* BEFORE UPLOAD */}
        {!video && <UploadZone onUpload={handleUpload} />}

        {/* DASHBOARD */}
        {video && (
          <div className="dashboard">

            <div className="video-section">
              <VideoPreview video={video} />
            </div>

            <div className="info-section">
              <h2>Video Info</h2>

              <div className="info-card">
                <p><b>Name:</b> {file?.name}</p>
                <p>
                  <b>Size:</b>{" "}
                  {file ? (file.size / 1024 / 1024).toFixed(2) : 0} MB
                </p>
                <p><b>Type:</b> {file?.type}</p>
              </div>

              {!loading && (
                <button
                  className="analyze-btn"
                  onClick={handleAnalyze}
                >
                  Analyze Speedbump Crossing
                </button>
              )}
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && <Processing progress={progress} />}

        {/* RESULTS */}
        {results && <Results results={results} />}
      </main>
    </>
  );
}
