import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set client-side flag to avoid hydration issues
    setIsClient(true)
    
    // Only run client-side initialization after hydration
    const initializeClientSide = () => {
      // Add data attributes after component mounts to avoid hydration issues
      const scaleElements = document.querySelectorAll('.mil-scale');
      scaleElements.forEach(el => {
        if (el.classList.contains('mil-animation')) {
          // Add data attributes based on classes
          if (el.classList.contains('mil-position-1')) {
            el.setAttribute('data-value-1', '7');
            el.setAttribute('data-value-2', '1.6');
          } else if (el.classList.contains('mil-position-2')) {
            el.setAttribute('data-value-1', '4');
            el.setAttribute('data-value-2', '1');
          } else if (el.classList.contains('mil-position-3')) {
            el.setAttribute('data-value-1', '1.2');
            el.setAttribute('data-value-2', '.1');
          } else {
            el.setAttribute('data-value-1', '2');
            el.setAttribute('data-value-2', '2');
          }
        } else {
          el.setAttribute('data-value-1', '1');
          el.setAttribute('data-value-2', '1.2');
        }
      });

      const rotateElements = document.querySelectorAll('.mil-rotate');
      rotateElements.forEach(el => {
        el.setAttribute('data-value', '360');
      });

      // Initialize plugins safely
      const initializePlugins = () => {
        try {
          // Re-initialize GSAP animations if needed
          if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
          }
        } catch (error) {
          // Silent error handling for GSAP
        }
      };

      // Wait a bit for all scripts to load
      setTimeout(initializePlugins, 200);
    };

    // Run initialization after a small delay to ensure hydration is complete
    const timer = setTimeout(initializeClientSide, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
   <></>
  )
}

function Navigation() {
  return (
   <>
     
   </>
  )
}