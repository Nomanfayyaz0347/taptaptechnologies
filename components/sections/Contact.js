import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Contact({ apiData }) {
  const [contactData, setContactData] = useState({
    paragraph: "",
    heading: "",
    buttonText: "",
    buttonUrl: ""
  })

  useEffect(() => {
    // Check for contact data in WordPress ACF
    const contactSection = apiData?.contactsection || apiData?.acf?.contactsection;
    
    if (contactSection) {
      setContactData({
        paragraph: contactSection.contactsectionpra || "",
        heading: contactSection.contactsectionheading || "",
        buttonText: contactSection.contactsectionbuttontext || "Contact us",
        buttonUrl: contactSection.contactsectionbuttonurl || "/contact"
      });
    }
  }, [apiData])

  // Only render if we have WordPress data
  if (!contactData.heading && !contactData.paragraph) {
    return null;
  }

  // Determine if button URL is external
  const isExternalUrl = contactData.buttonUrl && contactData.buttonUrl.startsWith('http')

  return (
    <section className="mil-soft-bg">
      <div className="container mil-p-120-120">
        <div className="row">
          <div className="col-lg-10">
            <span 
              className="mil-suptitle mil-suptitle-right mil-suptitle-dark mil-up"
              dangerouslySetInnerHTML={{ __html: contactData.paragraph }}
            />
          </div>
        </div>
        <div className="mil-center">
          <h2 
            className="mil-up mil-mb-60"
            dangerouslySetInnerHTML={{ __html: contactData.heading }}
          />
          <div className="mil-up">
            {isExternalUrl ? (
              <a 
                href={contactData.buttonUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mil-button mil-arrow-place"
              >
                <span>{contactData.buttonText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                  <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                </svg>
              </a>
            ) : (
              <Link href={contactData.buttonUrl || "/contact"} className="mil-button mil-arrow-place">
                <span>{contactData.buttonText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                  <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}