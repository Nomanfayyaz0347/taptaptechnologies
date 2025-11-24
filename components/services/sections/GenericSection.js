export default function GenericSection({ section }) {
  if (!section) return null;
  return (
    <div className="">
      {section.title && <h3 className="servicesiner_heading" dangerouslySetInnerHTML={{ __html: section.title }} />}
      {section.heading && <h3 dangerouslySetInnerHTML={{ __html: section.heading }} />}
      {section.content && <div className="servicesiner_pra" dangerouslySetInnerHTML={{ __html: section.content }} />}
      {section.description && <div dangerouslySetInnerHTML={{ __html: section.description }} />}
      {section.image && section.image.url && (
        <div style={{margin: '16px 0'}}>
          <img src={section.image.url} alt={section.image.alt || ''} style={{maxWidth: '100%', height: 'auto', borderRadius: 8}} />
        </div>
      )}
      {Array.isArray(section.image) && section.image.length > 0 && (
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', margin: '16px 0'}}>
          {section.image.map((img, idx) => img.url && (
            <img key={img.id || idx} src={img.url} alt={img.alt || ''} style={{maxWidth: 200, height: 'auto', borderRadius: 8}} />
          ))}
        </div>
      )}
      {Array.isArray(section.listing) && section.listing.length > 0 && (
        <div className=" servicesinner_boxmain">
          {section.listing.map((item, idx) => (
            <div key={idx} className="servicesinner_bxes ">
             <div className="img"> {item.image && item.image.url && (
                <img
                  src={item.image.url}
                  alt={item.image.alt || item.title || ''}
                  style={{ height: 150, width: '100px', objectFit: 'contain', marginBottom: 16 }}
                />
              )}</div>
              <div>
              {item.title && <h4 style={{ margin: '8px 0 12px', fontWeight: 600 }}>{item.title}</h4>}
              {item.content && <div style={{ fontSize: 15, color: '#444' }} dangerouslySetInnerHTML={{ __html: item.content }} />}
           </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
