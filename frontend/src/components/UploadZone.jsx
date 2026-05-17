export default function UploadZone({ onUpload }) {
  return (
    <div className="upload-zone">
      <input type="file" accept="video/*" onChange={onUpload} />

      <div className="upload-title">Drop your footage here</div>
      <div className="upload-sub">or click to browse</div>
    </div>
  );
}
