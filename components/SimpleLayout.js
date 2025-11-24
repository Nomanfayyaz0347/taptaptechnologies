
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Footer from './sections/Footer';

export default function SimpleLayout({ children }) {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    setMounted(true)
    
    // Add data attributes only after hydration is complete
    setTimeout(() => {
      const scaleElements = document.querySelectorAll('.mil-scale')
      scaleElements.forEach(el => {
        if (el.classList.contains('mil-animation')) {
          // Add data attributes based on classes
          if (el.classList.contains('mil-position-1')) {
            if (el.closest('.mil-banner')) {
              el.setAttribute('data-value-1', '7')
              el.setAttribute('data-value-2', '1.6')
            } else if (el.closest('.mil-menu-frame')) {
              el.setAttribute('data-value-1', '2')
              el.setAttribute('data-value-2', '2')
            } else {
              el.setAttribute('data-value-1', '2.4')
              el.setAttribute('data-value-2', '1.4')
            }
          } else if (el.classList.contains('mil-position-2')) {
            if (el.closest('.mil-banner')) {
              el.setAttribute('data-value-1', '4')
              el.setAttribute('data-value-2', '1')
            } else {
              el.setAttribute('data-value-1', '2')
              el.setAttribute('data-value-2', '1')
            }
          } else if (el.classList.contains('mil-position-3')) {
            el.setAttribute('data-value-1', '1.2')
            el.setAttribute('data-value-2', '.1')
          } else {
            el.setAttribute('data-value-1', '2')
            el.setAttribute('data-value-2', '2')
          }
        } else {
          el.setAttribute('data-value-1', '1')
          el.setAttribute('data-value-2', '1.2')
        }
      })

      const rotateElements = document.querySelectorAll('.mil-rotate')
      rotateElements.forEach(el => {
        el.setAttribute('data-value', '360')
      })
    }, 500) // Longer delay to ensure hydration is complete
  }, [])

  return (
    <div className="mil-wrapper" id="top">
      {/* Single canonical header frame */}
      <div className="mil-frame">
        <div className="mil-frame-top">
          <Link href="/" className="mil-logo">
          <img src="img/logo.png" width="28" alt="logo" />
          </Link>
          {/* menu button - placed in header where styling expects it */}
         <div
            className={`mil-menu-btn${menuOpen ? ' mil-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
          </div>
        </div>
       {/* <div className="mil-frame-bottom">
          <div className="mil-current-page"></div>
          <div className="mil-back-to-top">
            <a href="#top" className="mil-link mil-dark mil-arrow-place">
              <span>Back to top</span>
            </a>
          </div>
        </div>*/}
  </div>
  

      {/* cursor */}
      <div className="mil-ball">
        <span className="mil-icon-1">
          <svg viewBox="0 0 128 128">
            <path d="M106.1,41.9c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2L116.8,61H11.2l14.9-14.9c1.2-1.2,1.2-3.1,0-4.2\tc-1.2-1.2-3.1-1.2-4.2,0l-20,20c-1.2,1.2-1.2,3.1,0,4.2l20,20c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2\tL11.2,67h105.5l-14.9,14.9c1.2,1.2,1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l20-20c1.2-1.2,1.2-3.1,0-4.2L106.1,41.9\tz" />
          </svg>
        </span>
        <div className="mil-more-text">More</div>
        <div className="mil-choose-text">Сhoose</div>
      </div>

      {/* preloader */}
      <div className="mil-preloader" id="mil-preloader">
        <div className="mil-preloader-animation">
          <div className="mil-pos-abs mil-animation-1">
            <p className="mil-h3 mil-muted mil-thin">Tap  </p>
            <p className="mil-h3 mil-muted">Tap </p>
            <p className="mil-h3 mil-muted mil-thin">Technologies </p>
          </div>
          <div className="mil-pos-abs mil-animation-2">
            <div className="mil-reveal-frame">
              <p className="mil-reveal-box"></p>
              <p className="mil-h3 mil-muted mil-thin">Your <b>Creative</b> Tech Partner</p>
              
            </div>
          </div>
        </div>
      </div>

      {/* scrollbar progress */}
      <div className="mil-progress-track">
        <div className="mil-progress"></div>
      </div>

  {/* Navigation Menu */}
  {menuOpen && <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}

      {/* content */}
      

      {/* content */}
      <div className="mil-content">
        <div id="swupMain" className="mil-main-transition">
          {children}
        </div>
      </div>

  {/* hidden base elements for cloning (icons, etc.) */}
      <div className="mil-hidden-elements" aria-hidden="true">
        {/* Arrow icon template cloned into .mil-arrow-place by public/js/main.js */}
        <svg className="mil-arrow" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 20c-1.1 0-2 0.9-2 2v80.2L42.9 83.1c-0.8-0.8-2-0.8-2.8 0s-0.8 2 0 2.8l24 24c0.4 0.4 0.9 0.6 1.4 0.6s1-0.2 1.4-0.6l24-24c0.8-0.8 0.8-2 0-2.8s-2-0.8-2.8 0L66 102.2V22C66 20.9 65.1 20 64 20z" transform="rotate(270 64 64)" />
        </svg>

        {/* Dodecahedron template cloned into .mil-animation by public/js/main.js */}
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

        {/* Lines template cloned into .mil-lines-place by public/js/main.js */}
        <svg className="mil-lines" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <g className="mil-move" fill="none" strokeWidth="1">
            <line x1="0" y1="50" x2="800" y2="50" />
            <line x1="0" y1="150" x2="800" y2="150" />
            <line x1="0" y1="250" x2="800" y2="250" />
            <line x1="0" y1="350" x2="800" y2="350" />
            <line x1="0" y1="450" x2="800" y2="450" />
          </g>
          <g className="mil-move" fill="none" strokeWidth="1">
            <line x1="100" y1="0" x2="100" y2="600" />
            <line x1="300" y1="0" x2="300" y2="600" />
            <line x1="500" y1="0" x2="500" y2="600" />
            <line x1="700" y1="0" x2="700" y2="600" />
          </g>
          <rect className="mil-move" x="200" y="200" width="80" height="80" fill="none" />
        </svg>
  </div>

  {/* Footer */}
  <Footer />
    </div>
  )
}




function Navigation({ menuOpen, setMenuOpen }) {

  const menuItems = [
    { id: 1, title: 'Home', url: '/', target: '_self' },
    { id: 2, title: 'About', url: '/about', target: '_self' },
    { id: 4, title: 'Services', url: '/services', target: '_self' },
    { id: 6, title: 'Case Studies', url: '/case-studies', target: '_self' },
    { id: 5, title: 'Contact', url: '/contact', target: '_self' },
  ];
  return (
    <div className={`mil-menu-frame${menuOpen ? ' mil-active' : ''}`}>
      <div className="mil-frame-top">
        <Link href="/" className="mil-logo">
          <img src="img/logo.png" width="28" alt="logo" />
        </Link>
        <div
            className={`mil-menu-btn${menuOpen ? ' mil-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span></span>
          </div>
      </div>
      <div className="container">
        <div className="mil-menu-content">
          <div className="row">
            <div className="col-xl-5">
              <nav className="mil-main-menu" id="swupMenu">
                <ul>
                  {menuItems.map(item => (
                    <li key={item.id}>
                      <Link href={item.url} legacyBehavior>
                        <a target={item.target || '_self'} onClick={() => setMenuOpen(false)}>{item.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* ...existing right side code (if any) ... */}
          </div>
        </div>
      </div>
    </div>
  );
}