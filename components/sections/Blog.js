import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Blog({ apiData }) {
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    casestudies: []
  })

  // Helper function for image handling
  const getImageUrl = (imageData, index) => {
    // Process image data
    
    if (!imageData) return "";
    if (typeof imageData === 'string') return imageData;
    if (typeof imageData === 'number') {
      // WordPress attachment ID - you may need to make an API call to get the actual URL
      // WordPress attachment ID detected
      return ""; // Return empty to trigger fallback for now
    }
    if (typeof imageData === 'object') {
      if (Object.keys(imageData).length === 0) {
        // Empty image object detected
        return ""; // Will trigger fallback image
      } else {
        const imageUrl = imageData.url || imageData.src || imageData.link || imageData.guid || imageData.sizes?.full?.url || "";
        // Image URL extracted
        return imageUrl;
      }
    }
    
    // Using fallback image
    return "";
  }

  useEffect(() => {
    if (!apiData?.acf) return
    
    const data = apiData
    
    // Debug: Log all available ACF groups to find casestudies
    // Check for casestudies or blog section
    
    // Check for casestudies or blogsection
    if (data.acf.casestudies) {
      // Casestudies section found
      
      // Show actual field names and their values
      Object.keys(data.acf.casestudies).forEach(key => {
        // Process casestudy field
      })
      
      // Extract case studies from nested casestudiesbox objects
      const casestudiesArray = []
      
      // Extract casestudiesbox01 as nested object
      if (data.acf.casestudies.casestudiesbox01) {
        // Process casestudiesbox01
        casestudiesArray.push(data.acf.casestudies.casestudiesbox01)
      }
      
      // Extract casestudiesbox02 as nested object
      if (data.acf.casestudies.casestudiesbox02) {
        // Process casestudiesbox02
        casestudiesArray.push(data.acf.casestudies.casestudiesbox02)
      }
      
      setBlogData({
        title: data.acf.casestudies.casestudiesheading || "Popular Publications:",
        subtitle: "News",
        casestudies: casestudiesArray
      })
      // Blog data updated from casestudies group
    } else if (data.acf.blogsection) {
      // Fallback to blogsection if exists
      setBlogData({
        blogtitle: data.acf.blogsection.blogtitle || "Popular Publications:",
        blogsubtitle: data.acf.blogsection.blogsubtitle || "",
        casestudies: data.acf.blogsection.bloglist || []
      })
      // Blog data updated from blogsection group
    } else {
      // No casestudies or blogsection found
    }
  }, [apiData])

  // Debug: Log current blog data state
  // Blog component render
  // Blog component render

  return (
    <section>
      <div className="container mil-p-120-60">
        <div className="row align-items-center mil-mb-30">
          <div className="col-lg-6 mil-mb-30">
            <h3 
              className="mil-up"
              dangerouslySetInnerHTML={{ 
                __html: blogData.title || "Popular Publications:" 
              }}
            />
            {blogData.subtitle && (
              <p className="mil-up mil-light-soft">{blogData.subtitle}</p>
            )}
          </div>
          <div className="col-lg-6 mil-mb-30">
            <div className="mil-adaptive-right mil-up">
              <Link href="/blog" className="mil-link mil-dark mil-arrow-place">
                <span>View all</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {blogData.casestudies && blogData.casestudies.length > 0 ? (
            // Dynamic WordPress Casestudies Only
            blogData.casestudies.slice(0, 2).map((casestudy, index) => (
              <div key={index} className="col-lg-6">
                <Link href={casestudy[`casestudiesbox0${index + 1}buttonlink`] || "/XXX"} className="mil-blog-card mil-mb-60">
                  <div className="mil-cover-frame mil-up">
                    <img 
                      src={getImageUrl(casestudy[`casestudiesbox0${index + 1}img`], index) || `/img/blog/${index + 1}.jpg`} 
                      alt={casestudy[`casestudiesbox0${index + 1}heading`] || "Case Study"} 
                      onError={(e) => {
                        e.target.src = `/img/blog/${index + 1}.jpg`;
                      }}
                    />
                  </div>
                  <div className="mil-post-descr">
                    <div className="mil-labels mil-up mil-mb-30">
                      <div className="mil-label mil-upper mil-accent">
                        {casestudy[`casestudiesbox0${index + 1}technology_`] || "CASE STUDY"}
                      </div>
                      <div className="mil-label mil-upper">
                        {casestudy[`casestudiesbox0${index + 1}date`] || "2023"}
                      </div>
                    </div>
                    <h4 
                      className="mil-up mil-mb-30"
                      dangerouslySetInnerHTML={{ 
                        __html: casestudy[`casestudiesbox0${index + 1}heading`] || `Case Study ${index + 1}` 
                      }}
                    />
                    <p 
                      className="mil-post-text mil-up mil-mb-30"
                      dangerouslySetInnerHTML={{ 
                        __html: casestudy[`casestudiesbox0${index + 1}pra`] || "WordPress content loading..." 
                      }}
                    />
                    <div className="mil-link mil-dark mil-arrow-place mil-up">
                      <span>{casestudy[`casestudiesbox0${index + 1}buttontext`] || "Read more"}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // Show loading message instead of demo data
            <div className="col-12">
              <div className="mil-center mil-up">
                <p className="mil-text-lg">Loading WordPress case studies...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}