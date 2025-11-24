
import MainNav from '../MainNav';

export default function Footer() {
  return (
    <footer className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="container mil-p-120-60">
          <div className="row justify-content-between">
            <div className="col-md-4 col-lg-4 mil-mb-60">
              <div className="mil-muted mil-logo mil-up mil-mb-30">Tap Tap Technologies</div>

              <p className="mil-light-soft mil-up mil-mb-30">Subscribe our newsletter:</p>

              <form className="mil-subscribe-form mil-up">
                <input type="text" placeholder="Enter our email" />
                <button type="submit" className="mil-button mil-icon-button-sm mil-arrow-place" aria-label="Subscribe">
                  <svg className="mil-arrow" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M64 20c-1.1 0-2 0.9-2 2v80.2L42.9 83.1c-0.8-0.8-2-0.8-2.8 0s-0.8 2 0 2.8l24 24c0.4 0.4 0.9 0.6 1.4 0.6s1-0.2 1.4-0.6l24-24c0.8-0.8 0.8-2 0-2.8s-2-0.8-2.8 0L66 102.2V22C66 20.9 65.1 20 64 20z" transform="rotate(270 64 64)" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="row justify-content-end">
                <div className="col-md-6 col-lg-7">
                  <MainNav />
                </div>
                <div className="col-md-6 col-lg-5">
                  <ul className="mil-menu-list mil-up mil-mb-60">
                    <li><a href="#." className="mil-light-soft">Privacy Policy</a></li>
                    <li><a href="#." className="mil-light-soft">Terms and conditions</a></li>
                    <li><a href="#." className="mil-light-soft">Cookie Policy</a></li>
                    <li><a href="#." className="mil-light-soft">Careers</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-between flex-sm-row-reverse">
            <div className="col-md-7 col-lg-4">
              <div className="row justify-content-between">
                <div className="col-md-6 col-lg-12 mil-mb-60">
                  <h6 className="mil-muted mil-up mil-mb-30">US</h6>
                  <p className="mil-light-soft mil-up">Tances Drive Cincinnati, Ohio, USA, 45243 <span className="mil-no-wrap">+51 174 705 812</span></p>
                </div>
               
              </div>
            </div>
            <div className="col-md-4 col-lg-8 mil-mb-60">
              <div className="mil-vert-between">
                <div className="mil-mb-30">
                  <ul className="mil-social-icons mil-up">
                    <li>
                      <a href="https://facebook.com" target="_blank" rel="noopener" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com" target="_blank" rel="noopener" className="social-icon">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com" target="_blank" rel="noopener" className="social-icon">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://linkedin.com" target="_blank" rel="noopener" className="social-icon">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="mil-light-soft mil-up"> Copyright 2023 – 2025 TapTap Technologies part of the TapTap Medic Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}