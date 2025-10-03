import Link from 'next/link'
import { useState, useEffect } from 'react'
import ModalContact from '../ModalContact'

export default function Banner({ apiData }) {
  const [bannerData, setBannerData] = useState({
    title: "", 
    content: "" 
  })
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (apiData?.acf?.bannersection_) {
      setBannerData({
        title: apiData.acf.bannersection_.bannerheading || "",
        content: apiData.acf.bannersection_.bannerpra || ""
      })
      // Banner data updated
    }
  }, [apiData])

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setShowModal(false), 1200);
  };

  return (
    <section className="mil-banner mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="mil-animation-frame">
          <div className="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6" style={{ transform: "translate3d(0px, 0px, 0px) scale(2.4009, 2.2009)" }}>
            <div className="mil-dodecahedron">
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
          <div className="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1" >
            <div className="mil-dodecahedron">
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
          <div className="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1">
            <div className="mil-dodecahedron">
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        </div>

        <div className="mil-gradient"></div>

        <div className="container">
          <div className="mil-banner-content mil-up">
            {bannerData.title ? (
              <h2 className="mil-muted mil-mb-60" dangerouslySetInnerHTML={{ __html: bannerData.title }}></h2>
            ) : (
              <h2 className="mil-muted mil-mb-60">Loading...</h2>
            )}
            <div className="row">
              <div className="col-md-7 col-lg-5">
                {bannerData.content ? (
                  <p className="mil-light-soft mil-mb-60" dangerouslySetInnerHTML={{ __html: bannerData.content }}></p>
                ) : (
                  <p className="mil-light-soft mil-mb-60">Loading content...</p>
                )}
              </div>
            </div>


           
              <button
                type="button"
                className="mil-button mil-arrow-place mil-btn-space"
                onClick={() => setShowModal(true)}
              >
                <span>Get In Touch</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                  <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                </svg>
              </button>

            <ModalContact open={showModal} onClose={() => setShowModal(false)} />
            
            <Link href="/services" className="mil-link mil-arrow-place mil-muted">
              <span>View works</span>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                        <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                    </svg>
            </Link>

            <div className="mil-circle-text">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 300 300" className="mil-ct-svg mil-rotate" data-value="360" >
                <defs>
                  <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 " />
              </defs>
                <circle cx="150" cy="100" r="75" fill="none" />
                <g>
                  <use href="#circlePath" fill="none" />
                  <text style={{letterSpacing: '6.5px'}}>
                    <textPath href="#circlePath">Scroll down - Scroll down - </textPath>
                  </text>
                </g>
              </svg>
              <a href="#about" className="mil-button mil-arrow-place mil-icon-button mil-arrow-down">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}