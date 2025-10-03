export default function ServicesTopSection({ section }) {
  if (!section) return null;
  return (
    <div >
      <div className="row justify-content-between mil-p-120-60">
        <div className="col-lg-12">
          {(section.title || section.heading) && (
            <h3 className="mil-up mil-mb-60" dangerouslySetInnerHTML={{ __html: section.title || section.heading }} />
          )}
        </div>
        <div className="col-lg-12">
          {(section.content || section.description) && (
            <div className="mil-up " dangerouslySetInnerHTML={{ __html: section.content || section.description }} />
          )}
        </div>
      </div>
      {/* Show image if present and valid */}
      {section.image && section.image.url && (
        <div style={{margin: '16px 0'}}>
          <img src={section.image.url} alt={section.image.alt || section.title || ''} style={{maxWidth: '100%', height: 'auto', borderRadius: 8}} />
        </div>
      )}
      {Array.isArray(section.image) && section.image.length > 0 && (
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', margin: '16px 0'}}>
          {section.image.map((img, idx) => img.url && (
            <img key={img.id || idx} src={img.url} alt={img.alt || ''} style={{maxWidth: 200, height: 'auto', borderRadius: 8}} />
          ))}
        </div>
      )}
      {Array.isArray(section.trusted_by) && section.trusted_by.length > 0 && (
        <div className="row">
            {section.trusted_by.map((logo, idx) => (
              <div key={logo.id || logo.ID || idx} className="col-md-6 col-lg-2">
                <div className="mil-service-card-lg mil-other-card custom mil-more mil-mb-30 services_inner" >
                  <img src={logo.url} alt={logo.alt || logo.title || ''} />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
