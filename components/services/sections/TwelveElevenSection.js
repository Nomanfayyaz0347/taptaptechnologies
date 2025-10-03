export default function TwelveElevenSection({ section }) {
  if (!section) return null;
  return (
    <div style={{
          
          marginTop: 50,
          marginBottom: 50
        }}>
      {section.title && (
        <h3 style={{ textAlign: 'center', marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: section.title }} />
      )}
      {section.content && (
        <div style={{ textAlign: 'center', marginBottom: 32, fontSize: 17, color: '#444' }} dangerouslySetInnerHTML={{ __html: section.content }} />
      )}
      {Array.isArray(section.list) && section.list.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 4,
          marginTop: 30,
          marginBottom: 30
        }}>
          {section.list.map((item, idx) => (
            <div key={idx} style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              padding: 24,
              textAlign: 'center',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {item.image && item.image.url && (
                <img
                  src={item.image.url}
                  alt={item.image.alt || item.title || ''}
                  style={{ height: 56, width: 'auto', objectFit: 'contain', marginBottom: 16 }}
                />
              )}
              {item.title && <h4 style={{ margin: '8px 0 12px', fontWeight: 600 }}>{item.title}</h4>}
              {item.content && <div style={{ fontSize: 15, color: '#444' }} dangerouslySetInnerHTML={{ __html: item.content }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
