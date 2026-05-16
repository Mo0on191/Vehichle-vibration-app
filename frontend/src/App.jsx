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

  function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setVideo(URL.createObjectURL(f));
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
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        <Hero />

        <UploadZone onUpload={handleUpload} />

        {video && <VideoPreview video={video} />}

        {video && !loading && (
          <button className="analyze-btn" onClick={handleAnalyze}>
            Analyze Speedbump Crossing
          </button>
        )}

        {loading && <Processing progress={progress} />}

        {results && <Results results={results} />}
      </main>
    </>
  );
}
