import { useState, useEffect } from 'react'

export default function Vision({ apiData }) {
  const [visionData, setVisionData] = useState({
    heading: "A Unified Vision That Caters to Diverse Industry Demands",
    industries: []
  })
  
  const [resolvedImages, setResolvedImages] = useState({})
  
  // Industry data with existing image paths
  const defaultIndustries = [
    {
      id: 1,
      icon: '/img/works/1.jpg',
      label: 'Healthcare',
      link: '#'
    },
    {
      id: 2,
      icon: '/img/works/2.jpg',
      label: 'Finance',
      link: '#'
    },
    {
      id: 3,
      icon: '/img/works/3.jpg',
      label: 'Restaurant',
      link: '#'
    },
    {
      id: 4,
      icon: '/img/works/4.jpg',
      label: 'eCommerce',
      link: '#'
    },
    {
      id: 5,
      icon: '/img/works/5.jpg',
      label: 'EV',
      link: '#'
    },
    {
      id: 6,
      icon: '/img/works/6.jpg',
      label: 'SaaS',
      link: '#'
  },
    {
      id: 7,
      icon: '/img/blog/1.jpg',
      label: 'Travel',
      link: '#'
    },
    {
      id: 8,
      icon: '/img/blog/2.jpg',
      label: 'Entertainment',
      link: '#'
    },
    {
      id: 9,
      icon: '/img/blog/3.jpg',
      label: 'On-Demand',
      link: '#'
    },
    {
      id: 10,
      icon: '/img/blog/4.jpg',
      label: 'Social Media',
      link: '#'
    },
    {
      id: 11,
      icon: '/img/blog/5.jpg',
      label: 'Logistics',
      link: '#'
    },
    {
      id: 12,
      icon: '/img/blog/6.jpg',
      label: 'Edtech',
      link: '#'
    }
  ]

  // Function to fetch WordPress attachment URL
  const fetchAttachmentUrl = async (attachmentId) => {
    if (!attachmentId || typeof attachmentId !== 'number') {
      return null;
    }
    
    try {
      const response = await fetch(`https://taptaptechnologies.com/wp-json/wp/v2/media/${attachmentId}`);
      
      if (response.ok) {
        const mediaData = await response.json();
        const imageUrl = mediaData.source_url || mediaData.guid?.rendered || null;
        return imageUrl;
      }
    } catch (error) {
      // Silent error handling
    }
    return null;
  };

  // Helper function for image handling - WordPress only
  const getImageUrl = (imageData, index = 0) => {
    // Only return WordPress resolved images
    if (resolvedImages[index]) {
      return resolvedImages[index];
    }
    
    // If it's a WordPress attachment ID but not yet resolved, return null to hide
    if (typeof imageData === 'number') {
      return null; // Don't show until WordPress image is loaded
    }
    
    // If it's a direct URL string, use it
    if (typeof imageData === 'string' && imageData.startsWith('http')) {
      return imageData;
    }
    
    // For empty objects or no data, return null to hide the box
    return null;
  }

  useEffect(() => {
    // Check for visionsection in different possible locations
    const visionSection = apiData?.visionsection || apiData?.acf?.visionsection;
    
    if (visionSection) {
      try {
        // Convert vision boxes to industries array - fixed field mapping
        const visionBoxes = [
          { 
            box: visionSection.visionbox01 || {}, 
            defaultLabel: 'UX Audits', // Using WordPress label instead
            imgKey: 'visionbox01img',
            headingKey: 'visionbox01heading'
          },
          { 
            box: visionSection.visionbox02 || {}, 
            defaultLabel: 'Finance',
            imgKey: 'visionbox02img',
            headingKey: 'visionbox02heading'
          },
          { 
            box: visionSection.visionbox03 || {}, 
            defaultLabel: 'Restaurant',
            imgKey: 'visionbox03img',
            headingKey: 'visionbox03heading'
          },
          { 
            box: visionSection.visionbox04 || {}, 
            defaultLabel: 'eCommerce',
            imgKey: 'visionbox04img',
            headingKey: 'visionbox04heading'
          },
          { 
            box: visionSection.visionbox05 || {}, 
            defaultLabel: 'EV',
            imgKey: 'visionbox05img',
            headingKey: 'visionbox05heading'
          },
          { 
            box: visionSection.visionbox06 || {}, 
            defaultLabel: 'SaaS',
            imgKey: 'visionbox06img',
            headingKey: 'visionbox06heading'
          },
          { 
            box: visionSection.visionbox07 || {}, 
            defaultLabel: 'Travel',
            imgKey: 'visionbox07img',
            headingKey: 'visionbox07heading'
          },
          { 
            box: visionSection.visionbox08 || {}, 
            defaultLabel: 'Entertainment',
            imgKey: 'visionbox08img',
            headingKey: 'visionbox08heading'
          },
          { 
            box: visionSection.visionbox09 || {}, 
            defaultLabel: 'On-Demand',
            imgKey: 'visionbox09img',
            headingKey: 'visionbox09heading'
          },
          { 
            box: visionSection.visionbox010 || {}, 
            defaultLabel: 'Social Media',
            imgKey: 'visionbox010img',
            headingKey: 'visionbox010heading'
          },
          { 
            box: visionSection.visionbox0111 || {}, 
            defaultLabel: 'Logistics',
            imgKey: 'visionbox011img',
            headingKey: 'visionbox011heading'
          },
          { 
            box: visionSection.visionbox01112 || {}, 
            defaultLabel: 'Edtech',
            imgKey: 'visionbox012img',
            headingKey: 'visionbox012heading'
          }
        ];

        const industries = visionBoxes.map((item, index) => {
          const box = item.box;
          let imageValue = null;
          let labelValue = item.defaultLabel;
          
          // Use the specific keys we know exist in the WordPress data
          if (box && typeof box === 'object') {
            // Get image value using the correct key
            if (box[item.imgKey] !== undefined) {
              const rawImageValue = box[item.imgKey];
              
              // Handle different data types from WordPress
              if (typeof rawImageValue === 'number') {
                // Direct attachment ID
                imageValue = rawImageValue;
              } else if (typeof rawImageValue === 'object' && rawImageValue !== null) {
                // Full attachment object - extract ID or URL
                if (rawImageValue.ID) {
                  imageValue = rawImageValue.ID;
                } else if (rawImageValue.url) {
                  imageValue = rawImageValue.url;
                }
              } else if (typeof rawImageValue === 'string' && rawImageValue.startsWith('http')) {
                // Direct URL
                imageValue = rawImageValue;
              }
            }
            
            // Get label value using the correct key
            if (box[item.headingKey]) {
              labelValue = box[item.headingKey];
            }
          }
          
          return {
            id: index + 1,
            icon: imageValue,
            label: labelValue,
            link: '#',
            hasWordPressImage: typeof imageValue === 'number' || (typeof imageValue === 'string' && imageValue.startsWith('http'))
          };
        });

        const cleanHeading = visionSection.visionsectionheading 
          ? visionSection.visionsectionheading.replace(/<br\s*\/?>/gi, ' ')
          : "A Unified Vision That Caters to Diverse Industry Demands";

        setVisionData({
          heading: cleanHeading,
          industries: industries
        });

        // Resolve WordPress attachment IDs to URLs
        const resolveImages = async () => {
          const imagePromises = industries.map(async (industry, index) => {
            if (typeof industry.icon === 'number') {
              const url = await fetchAttachmentUrl(industry.icon);
              return { index, url, attachmentId: industry.icon };
            }
            return null;
          });

          const results = await Promise.all(imagePromises);
          const newResolvedImages = {};
          
          results.forEach(result => {
            if (result && result.url) {
              newResolvedImages[result.index] = result.url;
            }
          });
          
          if (Object.keys(newResolvedImages).length > 0) {
            setResolvedImages(prev => ({ ...prev, ...newResolvedImages }));
          }
        };

        // Only resolve images if we have attachment IDs
        const hasAttachmentIds = industries.some(industry => typeof industry.icon === 'number');
        if (hasAttachmentIds) {
          resolveImages();
        }
      } catch (error) {
        // Silent error handling - use defaults
        setVisionData({
          heading: "A Unified Vision That Caters to Diverse Industry Demands",
          industries: defaultIndustries
        });
      }
    } else {
      // Use default data if no API data
      setVisionData({
        heading: "A Unified Vision That Caters to Diverse Industry Demands",
        industries: defaultIndustries
      });
    }
  }, [apiData])

  return (
    <section>
      <div className="container mil-p-120-90">
        <div className="row align-items-center mil-mb-30">
          <div className="col-lg-6 mil-mb-30">
            <h3 className="mil-up">{visionData.heading}</h3>
          </div>
        </div>
        <div className="row">
          {visionData.industries.map((industry, index) => {
            // Get image URL (don't hide boxes while images are loading)
            const imageUrl = getImageUrl(industry.icon, index);
            
            // Only hide boxes that have no image data at all (empty objects or undefined)
            if (!industry.icon || (typeof industry.icon === 'object' && Object.keys(industry.icon).length === 0)) {
              return null;
            }

            // Different column classes for different items to match original design
            let colClass = "col-md-6 col-lg-2";
            if (index === 0) colClass = "col-md-6 col-md-6 col-lg-2";
            if (index === 1) colClass = "col-sm-6 col-md-6 col-lg-2";
            if (index === 2) colClass = "col-md-6 col-lg-2";

            return (
              <div key={industry.id || index} className={colClass}>
                <a href={industry.link || '#'} className="mil-service-card-lg mil-other-card custom mil-more mil-mb-30">
                  <img 
                    src={imageUrl || '/img/blog/1.jpg'} 
                    alt={`${industry.label} industry`}
                    onError={(e) => {
                      e.target.src = '/img/blog/1.jpg';
                    }}
                  />
                  <ul className="mil-service-list mil-dark">
                    <li className="mil-up">{industry.label}</li>
                  </ul>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}