export default function ServicesElevenSection({ section }) {
  if (!section) return null;
  return (
    <div style={{ marginTop: 40, background: 'rgb(237 237 237)', padding: 24, borderRadius: 8 }}>
      {section.title && (
        <h3 className="servicesiner_heading " dangerouslySetInnerHTML={{ __html: section.title }} />
      )}
      {section.image && section.image.url && (
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src={section.image.url}
            alt={section.image.alt || section.image.title || ''}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          />
        </div>
      )}
      {Array.isArray(section.list) && section.list.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
          marginTop: 24,
        }}>
          {section.list.map((item, idx) => (
            <div key={idx} style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              padding: 24,
              textAlign: 'center',
              minHeight: 120,
            }}>
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: 8, 
                  minHeight: 48
                }}
              >
                {/* Main number and percent, styled larger */}
                <span 
                  style={{ 
                    fontSize: 32, 
                    fontWeight: 800, 
                    color: '#6e00ff',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 4
                  }}
                  dangerouslySetInnerHTML={{ __html: (item.text || '').split('<div')[0] }}
                />
                {/* Sub-label, if present */}
                {item.text && item.text.includes('<div') && (
                  <div 
                    style={{ fontSize: 15, color: '#222', marginTop: 2, fontWeight: 500 }}
                    dangerouslySetInnerHTML={{ __html: '<div' + item.text.split('<div')[1] }}
                  />
                )}
              </div>
              <div style={{ fontSize: 15, color: '#444' }}>{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
