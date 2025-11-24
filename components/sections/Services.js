import { useState, useEffect } from 'react'
import Link from 'next/link'


export default function Services({ apiData }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get all ACF fields for the top section
  let paragraph = '';
  let heading1 = '';
  let heading2 = '';
  let image = '';
  if (apiData?.acf?.servicessection) {
    paragraph = apiData.acf.servicessection.servicesheadingpra || '';
    heading1 = apiData.acf.servicessection.servicesheading || '';
    heading2 = apiData.acf.servicessection.servicesheading02 || '';
    // Image can be string or object
    const img = apiData.acf.servicessection.servicesheadingimg;
    if (img) {
      if (typeof img === 'string') image = img;
      else if (typeof img === 'object') image = img.url || img.src || img.link || '';
    }
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const res = await fetch('https://taptaptechnologies.com/wp-json/wp/v2/services?per_page=4')
        if (!res.ok) throw new Error('Failed to fetch services')
        const data = await res.json()
        setServices(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])


  return (
    <section className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="container mil-p-120-0">
          <div className="mil-mb-120 services-head">
            <div className="row">
              <div className="col-lg-10">
                {paragraph && (
                  <span className="mil-suptitle mil-light-soft mil-suptitle-right mil-up services-top-pra" dangerouslySetInnerHTML={{ __html: paragraph }} />
                )}
              </div>
            </div>
            {(heading1 || image) && (
              <div className="mil-complex-text justify-content-center align-items-center mil-up mil-mb-15 services-top-hea" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                {image && (
                  <span className="mil-text-image">
                    <img src={image} alt="services" />
                  </span>
                )}
                {heading1 && (
                  <h2 className="mil-h1 mil-muted mil-center " style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: heading1 }} />
                )}
              </div>
            )}
            
            {heading2 && (
              <div className="mil-complex-text justify-content-center align-items-center mil-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                <h2 className="mil-h1 mil-muted mil-center" style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: heading2 }} />
                <Link href="/services" legacyBehavior>
                  <a className="mil-services-button mil-button mil-arrow-place services-button" style={{ marginLeft: 16, marginTop: 8 }}>
                    <span>View All Services</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                      <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"/>
                    </svg>
                  </a>
                </Link>
              </div>
            )}
          </div>
          {loading && <div style={{ color: '#fff', textAlign: 'center', margin: 40 }}>Loading services...</div>}
          {error && <div style={{ color: 'red', textAlign: 'center', margin: 40 }}>{error}</div>}
          <div className="row mil-services-grid m-0">
            {services.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-3 mil-services-grid-item p-0">
                <Link href={`/services/${service.slug}`} legacyBehavior>
                  <a className="mil-service-card-sm mil-up">
                    <h5 className="mil-muted mil-mb-30" style={{ lineHeight: '22px' }} dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
                    <p className="mil-light-soft mil-mb-30" dangerouslySetInnerHTML={{ __html: service.excerpt?.rendered || '' }} />
                    <div className="mil-button mil-icon-button-sm mil-arrow-place">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                        <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"/>
                      </svg>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}