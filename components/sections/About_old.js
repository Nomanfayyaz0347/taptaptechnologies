import { useState, useEffect } from 'react'

export default function About({ apiData }) {
  const [aboutData, setAboutData] = useState({
    aboutheading: "",
    aboutpra: "",
    aboutceopic: "",
    aboutceoheading: "",
    aboutceopra: "",
    aboutpic: ""
  })
  const [loading, setLoading] = useState(true)

  const getImageUrl = (imageData) => {
    if (!imageData) return ""
    if (typeof imageData === 'string') return imageData
    if (typeof imageData === 'object') return imageData.url || imageData.src || imageData.link || ""
    return ""
  }

  useEffect(() => {
    if (!apiData?.acf) {
      setLoading(false)
      return
    }

    const data = apiData

    try {
      if (data.acf.aboutsection_) {
        setAboutData({
          aboutheading: data.acf.aboutsection_.aboutheading || "",
          aboutpra: data.acf.aboutsection_.aboutpra || "",
          aboutceopic: getImageUrl(data.acf.aboutsection_.aboutceopic),
          aboutceoheading: data.acf.aboutsection_.aboutceoheading || "",
          aboutceopra: data.acf.aboutsection_.aboutceopra || "",
          aboutpic: getImageUrl(data.acf.aboutsection_.aboutpic)
        })
      } else if (data.acf.aboutsection) {
        const aboutSection = data.acf.aboutsection
        const aboutObj = aboutSection.about
        const ceoImage = (aboutObj && typeof aboutObj === 'object' && aboutObj.url) ? aboutObj.url : getImageUrl(aboutSection.aboutceopic)
        setAboutData({
          aboutheading: aboutSection.aboutheading || "",
          aboutpra: aboutSection.aboutpra || "",
          aboutceopic: ceoImage || "",
          aboutceoheading: aboutSection.aboutceoheading || "",
          aboutceopra: aboutSection.aboutceopra || "",
          aboutpic: getImageUrl(aboutSection.aboutpic)
        })
      }
    } catch (e) {
      // keep silent on errors to avoid noisy console logs
    } finally {
      setLoading(false)
    }
  }, [apiData])

  return (
    <section id="about">
      <div className="mi-invert-fix" style={{ position: 'relative' }}>
        <div className="container mil-p-120-30" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6 col-xl-5">
              <div className="mil-mb-90">
                {loading ? (
                  <h2 className="mil-up mil-mb-60">Loading...</h2>
                ) : aboutData.aboutheading ? (
                  <h2 className="mil-up mil-mb-60" dangerouslySetInnerHTML={{ __html: aboutData.aboutheading }}></h2>
                ) : (
                  <h2 className="mil-up mil-mb-60">Discover <br/>Our <span className="mil-thin">Studio</span></h2>
                )}

                {loading ? (
                  <p className="mil-up mil-mb-30">Loading content...</p>
                ) : aboutData.aboutpra ? (
                  <div className="mil-up mil-mb-60" dangerouslySetInnerHTML={{ __html: aboutData.aboutpra }}></div>
                ) : (
                  <>
                    <p className="mil-up mil-mb-30">At our design studio, we are a collective of talented individuals ignited by our unwavering passion for transforming ideas into reality. With a harmonious blend of diverse backgrounds and a vast array of skill sets, we join forces to create compelling solutions for our esteemed clients.</p>
                    <p className="mil-up mil-mb-60">Collaboration is at the heart of what we do. Our team thrives on the synergy that arises when unique perspectives converge, fostering an environment of boundless creativity. By harnessing our collective expertise, we produce extraordinary results that consistently surpass expectations.</p>
                  </>
                )}

                <div className="mil-about-quote">
                  <div className="mil-avatar mil-up">
                    {loading ? (
                      <img src="/img/faces/customers/2.jpg" alt="Loading" />
                    ) : (aboutData.aboutceopic && aboutData.aboutceopic.length > 0) ? (
                      <img src={aboutData.aboutceopic} alt="CEO" onError={(e) => { e.target.src = '/img/faces/customers/2.jpg'; }} />
                    ) : (
                      <img src="/img/faces/customers/2.jpg" alt="Founder" />
                    )}
                  </div>
                  {loading ? (
                    <h6 className="mil-quote mil-up">Loading quote...</h6>
                  ) : aboutData.aboutceoheading && aboutData.aboutceopra ? (
                    <div className="mil-quote mil-up">
                      <h6 className="" dangerouslySetInnerHTML={{ __html: aboutData.aboutceoheading }}></h6>
                      <h6 className="mil-up" dangerouslySetInnerHTML={{ __html: aboutData.aboutceopra }}></h6>
                    </div>
                  ) : (
                    <h6 className="mil-quote mil-up">Passionately Creating <span className="mil-thin">Design Wonders:</span> Unleashing <span className="mil-thin">Boundless Creativity</span></h6>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="mil-about-photo mil-mb-90">
                <div className="mil-lines-place">{/* SVG preserved in original file */}</div>
                <div className="mil-up mil-img-frame" style={{paddingBottom: '160%'}}>
                  {loading ? (
                    <img src="/img/photo/1.jpg" alt="Loading" className="mil-scale" />
                  ) : (aboutData.aboutpic && aboutData.aboutpic.length > 0) ? (
                    <img src={aboutData.aboutpic} alt="About us" className="mil-scale" onError={(e) => { e.target.src = '/img/photo/1.jpg'; }} />
                  ) : (
                    <img src="/img/photo/1.jpg" alt="img" className="mil-scale" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}