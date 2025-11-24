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

  useEffect(() => {
    if (!apiData?.acf) return
    
    const data = apiData
    
    // Helper functions for image handling
    const getImageUrl = (imageData) => {
      if (!imageData) return "";
      if (typeof imageData === 'string') return imageData;
      if (typeof imageData === 'object') {
        return imageData.url || imageData.src || imageData.link || "";
      }
      return "";
    }
    
    // Check if aboutsection_ exists (with underscore) 
    if (data.acf.aboutsection_) {
      setAboutData({
        aboutheading: data.acf.aboutsection_.aboutheading || "",
        aboutpra: data.acf.aboutsection_.aboutpra || "",
        aboutceopic: getImageUrl(data.acf.aboutsection_.aboutceopic),
        aboutceoheading: data.acf.aboutsection_.aboutceoheading || "",
        aboutceopra: data.acf.aboutsection_.aboutceopra || "",
        aboutpic: getImageUrl(data.acf.aboutsection_.aboutpic)
      })
      // About data updated from aboutsection_ group
    } else if (data.acf.aboutsection) {
      // Handle aboutsection (without underscore)
      const aboutSection = data.acf.aboutsection
      
      // The 'about' field IS the CEO image in this case
      const getCeoImage = () => {
        const aboutObj = aboutSection.about
        if (aboutObj && typeof aboutObj === 'object' && aboutObj.url) {
          return aboutObj.url
        }
        return ""
      }
      
      setAboutData({
        aboutheading: aboutSection.aboutheading || "",
        aboutpra: aboutSection.aboutpra || "",
        aboutceopic: getCeoImage(),
        aboutceoheading: aboutSection.aboutceoheading || "",
        aboutceopra: aboutSection.aboutceopra || "",
        aboutpic: getImageUrl(aboutSection.aboutpic)
      })
      
      // About data updated from aboutsection group
    }
  }, [apiData])

  return (
    <section id="about" className="mil-about mil-deep-bg">
      <div className="container mil-p-120-30">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6 col-xl-5">
            <div className="mil-mb-90 about-lft">
              {aboutData.aboutheading ? (
                <h2 className="mil-up mil-mb-60 about-head" dangerouslySetInnerHTML={{ __html: aboutData.aboutheading }}></h2>
              ) : (
                <h2 className="mil-up mil-mb-60">Discover <br/>Our <span className="mil-thin">Studio</span></h2>
              )}
              
              {aboutData.aboutpra ? (
                <div className="mil-up mil-mb-60" dangerouslySetInnerHTML={{ __html: aboutData.aboutpra }}></div>
              ) : (
                <>
                  <p className="mil-up mil-mb-30">At our design studio, we are a collective of talented individuals ignited by our unwavering passion for transforming ideas into reality. With a harmonious blend of diverse backgrounds and a vast array of skill sets, we join forces to create compelling solutions for our esteemed clients.</p>
                  <p className="mil-up mil-mb-60">Collaboration is at the heart of what we do. Our team thrives on the synergy that arises when unique perspectives converge, fostering an environment of boundless creativity. By harnessing our collective expertise, we produce extraordinary results that consistently surpass expectations.</p>
                </>
              )}

              <div className="mil-about-quote">
                <div className="mil-avatar mil-up">
                  {(aboutData.aboutceopic && aboutData.aboutceopic.length > 0) ? (
                    <img src={aboutData.aboutceopic} alt="CEO" onError={(e) => {
                      console.error('CEO image failed to load:', aboutData.aboutceopic);
                      e.target.src = '/img/faces/customers/2.jpg';
                    }} />
                  ) : (
                    <img src="/img/faces/customers/2.jpg" alt="Founder" />
                  )}
                </div>
                {aboutData.aboutceoheading && aboutData.aboutceopra ? (
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
             <div className="mil-lines-place">
               <svg width="250" viewBox="0 0 300 1404" fill="none" xmlns="http://www.w3.org/2000/svg" className="mil-lines">
                 <path fillRule="evenodd" clipRule="evenodd" d="M1 892L1 941H299V892C299 809.71 232.29 743 150 743C67.7096 743 1 809.71 1 892ZM0 942H300V892C300 809.157 232.843 742 150 742C67.1573 742 0 809.157 0 892L0 942Z" className="mil-move"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M299 146V97L1 97V146C1 228.29 67.7096 295 150 295C232.29 295 299 228.29 299 146ZM300 96L0 96V146C0 228.843 67.1573 296 150 296C232.843 296 300 228.843 300 146V96Z" className="mil-move"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M299 1H1V1403H299V1ZM0 0V1404H300V0H0Z"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M150 -4.37115e-08L150 1404L149 1404L149 0L150 -4.37115e-08Z"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M150 1324C232.29 1324 299 1257.29 299 1175C299 1092.71 232.29 1026 150 1026C67.7096 1026 1 1092.71 1 1175C1 1257.29 67.7096 1324 150 1324ZM150 1325C232.843 1325 300 1257.84 300 1175C300 1092.16 232.843 1025 150 1025C67.1573 1025 0 1092.16 0 1175C0 1257.84 67.1573 1325 150 1325Z" className="mil-move"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M300 1175H0V1174H300V1175Z" className="mil-move"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M150 678C232.29 678 299 611.29 299 529C299 446.71 232.29 380 150 380C67.7096 380 1 446.71 1 529C1 611.29 67.7096 678 150 678ZM150 679C232.843 679 300 611.843 300 529C300 446.157 232.843 379 150 379C67.1573 379 0 446.157 0 529C0 611.843 67.1573 679 150 679Z" className="mil-move"></path>
                 <path fillRule="evenodd" clipRule="evenodd" d="M299 380H1V678H299V380ZM0 379V679H300V379H0Z" className="mil-move"></path>
               </svg>
             </div>
              <div className="mil-up mil-img-frame" style={{paddingBottom: '160%'}}>
                {(aboutData.aboutpic && aboutData.aboutpic.length > 0) ? (
                  <img src={aboutData.aboutpic} alt="About us" className="mil-scale" onError={(e) => {
                    console.error('About image failed to load:', aboutData.aboutpic);
                    e.target.src = '/img/photo/1.jpg';
                  }} />
                ) : (
                  <img src="/img/photo/1.jpg" alt="img" className="mil-scale" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}