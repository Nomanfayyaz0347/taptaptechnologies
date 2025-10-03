export default function ServicesLatestTechStack({ section }) {
  if (!section) return null;
  return (
    <div >
      {section.content && (
        <div style={{ textAlign: 'center', marginBottom: 32, fontSize: 17, color: '#444' }} dangerouslySetInnerHTML={{ __html: section.content }} />
      )}
      {Array.isArray(section.stack_section) && section.stack_section.length > 0 && (
        <div style={{ marginTop: 24 }}>
          {section.stack_section.map((stack, idx) => (
            <div key={idx} style={{ marginBottom: 40 }}>
              {stack.stack_name && (
                <h4 style={{ marginBottom: 16,  fontWeight: 700 }}>{stack.stack_name}</h4>
              )}
              {Array.isArray(stack.stack_inner_section) && stack.stack_inner_section.length > 0 && (
                <div >
                  {stack.stack_inner_section.map((inner, iidx) => (
                    <div key={iidx} >
                      {Array.isArray(inner.images) && inner.images.length > 0 && (
                        <div className="servicesinner_loges">
                          {inner.images.map((img, iii) => (
                            <a key={img.id || iii} href={img.link || '#'} target="_blank" rel="noopener noreferrer">
                              <img
                                src={img.url}
                                alt={img.alt || img.title || ''}
                                title={img.title || ''}
                                style={{ height: 40, width: 'auto', objectFit: 'contain', marginBottom: 4 }}
                              />
                            </a>
                          ))}
                        </div>
                      )}
                      {inner.name && <div style={{ fontSize: 15, color: '#444', marginTop: 6 }}>{inner.name}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
