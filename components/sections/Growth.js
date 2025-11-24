import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Growth({ apiData }) {
  const [growthData, setGrowthData] = useState({
    heading: "",
    description: "",
    growthBoxes: []
  })
  
  const [resolvedImages, setResolvedImages] = useState({})

  // Helper function for image handling
  const getImageUrl = (imageData, index = 0) => {
    // Check if we have a resolved WordPress image URL for this index
    if (resolvedImages[index]) {
      return resolvedImages[index];
    }
    
    // Award-specific placeholder images
    const awardPlaceholders = [
      '/img/partners/1.svg',  // Use existing partner logos as award placeholders
      '/img/partners/2.svg',
      '/img/blog/1.jpg',
      '/img/blog/2.jpg', 
      '/img/blog/3.jpg'
    ];
    
    const placeholderImage = awardPlaceholders[index] || `/img/blog/${index + 1}.jpg`;

    if (!imageData) return placeholderImage;
    if (typeof imageData === 'string') return imageData;
    if (typeof imageData === 'number') {
      // WordPress attachment ID - will be resolved by useEffect
      return placeholderImage; // Temporary placeholder until resolved
    }
    if (typeof imageData === 'object') {
      if (Object.keys(imageData).length === 0) {
        // Empty object - use placeholder
        return placeholderImage;
      } else {
        // Valid image object - extract URL
        return imageData.url || imageData.src || imageData.link || imageData.guid || placeholderImage;
      }
    }
    return placeholderImage;
  }

  // Function to fetch WordPress attachment URL
  const fetchAttachmentUrl = async (attachmentId) => {
    try {
      const response = await fetch(`https://taptaptechnologies.com/wp-json/wp/v2/media/${attachmentId}`)
      const data = await response.json()
      return data.source_url || data.guid?.rendered || null
    } catch (error) {
  // failed to fetch attachment
      return null
    }
  }

  useEffect(() => {
    if (!apiData?.acf) return
    
    const data = apiData
    
    // Check for ourgrowth_ section
    if (data.acf.ourgrowth_) {
      // Extract growth boxes from ourgrowthbox01 to ourgrowthbox05
      const growthBoxes = []
      const imagePromises = []
      
      for (let i = 1; i <= 5; i++) {
        const boxKey = `ourgrowthbox0${i}`
        if (data.acf.ourgrowth_[boxKey]) {
          growthBoxes.push(data.acf.ourgrowth_[boxKey])
          
          // Check if image is an attachment ID and fetch its URL
          const imgKey = `ourgrowthbox0${i}img`
          const imageData = data.acf.ourgrowth_[boxKey][imgKey]
          
          if (typeof imageData === 'number') {
            imagePromises.push(
              fetchAttachmentUrl(imageData).then(url => ({
                boxIndex: i - 1,
                imageUrl: url
              }))
            )
          }
        }
      }
      
      setGrowthData({
        heading: data.acf.ourgrowth_.ourgrowthheading || "Our Growth Journey",
        description: data.acf.ourgrowth_.ourgrowthpra || "Our Growth Journey as a Mobile App Development Company",
        growthBoxes: growthBoxes
      })
      
      // Resolve WordPress attachment URLs
      if (imagePromises.length > 0) {
        Promise.all(imagePromises).then(results => {
          const newResolvedImages = {}
          results.forEach(result => {
            if (result.imageUrl) {
              newResolvedImages[result.boxIndex] = result.imageUrl
            }
          })
          setResolvedImages(newResolvedImages)
        })
      }
    }
  }, [apiData])

  // Growth data ready for rendering

  return (
    <section className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="container mil-p-120-120">
          <div className="mil-center">
            <h2 
              className="mil-muted mil-up mil-mb-30"
              dangerouslySetInnerHTML={{ 
                __html: growthData.heading || "Our Growth <span class=\"mil-thin\"> Journey </span> <br> Mobile <span class=\"mil-thin\"> App Development</span>" 
              }}
            />
            <p 
              className="mil-light-soft mil-up mil-mb-120"
              dangerouslySetInnerHTML={{ 
                __html: growthData.description || "Our Growth Journey as a Mobile App Development <br>Company Has Bagged a Few Reputed Accolades as Well" 
              }}
            />
          </div>
          <div className="growth_main">
            {growthData.growthBoxes && growthData.growthBoxes.length > 0 ? (
              // Dynamic WordPress Growth Boxes
              growthData.growthBoxes.map((growthBox, index) => (
                <Link   
                  key={index} 
                  href="#" 
                  className={`mil-price-card mil-choose mil-accent-cursor mil-up ${index >= 4 ? 'mil-mb-60' : ''}`}
                >
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <div className="mil-price-number mil-mb-30">
                        <img 
                          src={getImageUrl(growthBox[`ourgrowthbox0${index + 1}img`], index)} 
                          alt={`Award ${index + 1}`}
                          onError={(e) => {
                            // Silent fallback to prevent console spam
                            e.target.src = `/img/blog/${index + 1}.jpg`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <h5 
                        className="mil-muted mil-mb-30"
                        dangerouslySetInnerHTML={{ 
                          __html: growthBox[`ourgrowthbox0${index + 1}heading`] || `202${index}` 
                        }}
                      />
                    </div>
                    <div className="col-lg-4">
                      <p 
                        className="mil-light-soft mil-mb-30"
                        dangerouslySetInnerHTML={{ 
                          __html: growthBox[`ourgrowthbox0${index + 1}pra`] || "Achievement Description" 
                        }}
                      />
                    </div>
                    <div className="col-lg-2">
                      <div className="mil-adaptive-right mil-mb-30">
                        <div className="mil-button mil-icon-button-sm mil-arrow-place">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                        <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                    </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Loading message if no WordPress data
              <div className="col-12">
                <div className="mil-center mil-up">
                  <p className="mil-text-lg mil-light-soft">Loading WordPress growth data...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}