import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Faq({ apiData }) {
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [faqData, setFaqData] = useState({
    heading: "",
    paragraph: "",
    faqs: []
  })

  const toggleAccordion = (index) => {
    const newActive = activeAccordion === index ? null : index
    setActiveAccordion(newActive)
  }

  // Process content to split by line breaks
  const processContent = (content) => {
    if (!content) return ['No content available']
    
    // Try different line break patterns
    let lines = content.split('\r\n')
    if (lines.length === 1) {
      lines = content.split('\n')
    }
    if (lines.length === 1) {
      lines = content.split('\r')
    }
    
    // Filter out empty lines and return
    const processedLines = lines.filter(line => line.trim() !== '')
    
    return processedLines.length > 0 ? processedLines : [content]
  }

  useEffect(() => {
    // Check for FAQ data in WordPress ACF
    const faqSection = apiData?.faq || apiData?.acf?.faq;
    
    if (faqSection) {
      // Process FAQs from WordPress
      const wordpressFaqs = [];
      for (let i = 1; i <= 4; i++) {
        const faqKey = `faqbox0${i}`;
        const faqBoxData = faqSection[faqKey];

        if (faqBoxData && Object.keys(faqBoxData).length > 0) {
          const heading = faqBoxData[`faqbox0${i}heading`] || `FAQ ${i}`;
          const content = faqBoxData[`faqbox0${i}content`] || '';

          wordpressFaqs.push({
            id: i,
            question: heading,
            answer: processContent(content)
          });
        }
      }

      // Only use WordPress FAQs
      setFaqData({
        heading: faqSection.faqheading || "",
        paragraph: faqSection.faqpra || "",
        faqs: wordpressFaqs
      });
    }
  }, [apiData])

  useEffect(() => {
    // Add global CSS for smooth accordion animations
    const style = document.createElement('style');
    style.textContent = `
      .faq-accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
        padding: 0;
        opacity: 0;
        visibility: hidden;
      }
      
      .faq-accordion-content.active {
        max-height: 1000px;
        padding: 20px 0;
        opacity: 1;
        visibility: visible;
        border-top: 1px solid #eee;
      }
      
      .faq-accordion-content p {
        margin-bottom: 15px !important;
        line-height: 1.6 !important;
        color: #666 !important;
        font-size: 15px !important;
      }
      
      .faq-accordion-content p:last-child {
        margin-bottom: 0 !important;
      }
      
      .faq-accordion-menu {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 20px;
        padding: 20px 0;
        border-bottom: 1px solid #f0f0f0;
        transition: all 0.3s ease;
      }
      
      .faq-accordion-menu:hover {
        opacity: 0.8;
      }
      
      .faq-accordion-head {
        margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    flex: 1;
    letter-spacing: 1px;
      }
      
      .faq-symbol {
        width: 35px;
        height: 35px;
        border: 2px solid #be10df;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        transition: all 0.3s ease;
        background: white;
        color: #be10df;
      }
      
      .faq-symbol.active {
       ransform: rotate(0deg);
    background-color: #6a25b6;
    color: white;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [])

  // Only render if we have WordPress data
  if (!faqData.heading && faqData.faqs.length === 0) {
    return null;
  }

  return (
    <section id="service">
      <div className="container mil-p-120-90">
        <div className="row justify-content-between">
          <div className="col-lg-4 mil-relative mil-mb-90">
            <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: faqData.heading }}>
            </h4>
            <p className="mil-up mil-mb-30">
              {faqData.paragraph}
            </p>
            <div className="mil-up">
              <Link href="/portfolio" className="mil-link mil-dark mil-arrow-place">
                <span>View works</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                        <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                    </svg>
              </Link>
            </div>
          </div>
          
          <div className="col-lg-6">
            {faqData.faqs.map((faq, index) => {
              const isActive = activeAccordion === index;
              return (
                <div key={faq.id} className="mil-accordion-group mil-up">
                  <div 
                    className="faq-accordion-menu"
                    onClick={() => toggleAccordion(index)}
                  >
                    <p className="faq-accordion-head">{faq.question}</p>
                    <div className={`faq-symbol ${isActive ? 'active' : ''}`}>
                      {isActive ? '−' : '+'}
                    </div>
                  </div>
                  
                  <div className={`faq-accordion-content ${isActive ? 'active' : ''}`}>
                    {faq.answer && faq.answer.length > 0 ? (
                      faq.answer.map((paragraph, pIndex) => (
                        <p key={pIndex}>
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p>No content available for this FAQ.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}