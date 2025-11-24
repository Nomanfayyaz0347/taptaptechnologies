export default function HomeImageSection({ image }) {
  if (!image || !image.url) return null;
  return (
    <div className="container "  style={{ display: 'none' }}>
      <img src={image.url} alt={image.alt || ''} style={{maxWidth: '100%', height: 'auto', borderRadius: 8}} />
    </div>
  );
}
