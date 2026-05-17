export default function VideoPreview({ video }) {
  return (
    <div className="video-preview">
      <video src={video} controls />
    </div>
  );
}
