import { useState, useEffect } from 'react'

export default function Partners({ apiData }) {
  const [partnersData, setPartnersData] = useState({
    heading: "Our Efforts Have Transformed :",
    subheading: "How You Experience These Global Leaders",
    partners: []
  })

  const [resolvedPartners, setResolvedPartners] = useState([])

  // Function to fetch WordPress attachment URL
  const fetchPartnerAttachmentUrl = async (attachmentId) => {
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

  // Default partners data
  const defaultPartners = [
    {
      id: 1,
      name: 'BCC',
      logo: '/img/partners/bcc-logo-color.svg',
      link: '#'
    },
    {
      id: 2,
      name: 'Domin',
      logo: '/img/partners/domin-logo-color.svg',
      link: '#'
    },
    {
      id: 3,
      name: 'Empire Hotels',
      logo: '/img/partners/empirehotels-logo-color.svg',
      link: '#'
    },
    {
      id: 4,
      name: 'Friday',
      logo: '/img/partners/friday-logo-color.svg',
      link: '#'
    },
    {
      id: 5,
      name: 'Google',
      logo: '/img/partners/google-logo-color.svg',
      link: '#'
    },
    {
      id: 6,
      name: 'Hardees',
      logo: '/img/partners/hardees-logo-color.svg',
      link: '#'
    },
    {
      id: 7,
      name: 'IKEA',
      logo: '/img/partners/ikea-logo-color.svg',
      link: '#'
    },
    {
      id: 8,
      name: 'JobGet',
      logo: '/img/partners/jobget-lgo-color.svg',
      link: '#'
    },
    {
      id: 9,
      name: 'KFC',
      logo: '/img/partners/kfc-logo-color.svg',
      link: '#'
    },
    {
      id: 10,
      name: 'KK',
      logo: '/img/partners/kk-logo-color.svg',
      link: '#'
    },
    {
      id: 11,
      name: 'Moo',
      logo: '/img/partners/moo-logo-color.svg',
      link: '#'
    },
    {
      id: 12,
      name: 'SuperShe',
      logo: '/img/partners/supershe-logo-color.svg',
      link: '#'
    },
    {
      id: 13,
      name: 'Wimpy',
      logo: '/img/partners/wimpy-logo-color.svg',
      link: '#'
    }
  ]

  useEffect(() => {
    // Check for partners data in WordPress ACF
    const partnersSection = apiData?.partnerssection || apiData?.acf?.partnerssection;
    
    if (partnersSection) {
      // Process WordPress partners heading - keep HTML tags intact
      const cleanHeading = partnersSection.partnerssectionheading 
        ? partnersSection.partnerssectionheading
        : "Our Efforts Have <span class=\"mil-thin\">Transformed :</span><br />How You Experience <span class=\"mil-thin\">These Global Leaders</span>";

      // Process partner images from WordPress
      const wordpressPartners = [];
      for (let i = 1; i <= 13; i++) {
        const imgField = partnersSection[`img${i}`];
        if (imgField && typeof imgField === 'object' && Object.keys(imgField).length > 0) {
          // If img field has data (attachment object)
          wordpressPartners.push({
            id: i,
            name: `Partner ${i}`,
            logo: imgField.url || imgField.source_url || defaultPartners[i-1]?.logo || '/img/partners/1.svg',
            link: '#'
          });
        } else if (imgField && typeof imgField === 'string' && imgField.startsWith('http')) {
          // If direct URL
          wordpressPartners.push({
            id: i,
            name: `Partner ${i}`,
            logo: imgField,
            link: '#'
          });
        } else if (imgField && typeof imgField === 'number') {
          // If attachment ID - will be resolved later
          wordpressPartners.push({
            id: i,
            name: `Partner ${i}`,
            logo: imgField, // Attachment ID
            link: '#',
            isAttachmentId: true
          });
        }
      }

      // Use WordPress partners if available, otherwise use defaults
      const finalPartners = wordpressPartners.length > 0 ? wordpressPartners : defaultPartners;

      setPartnersData({
        heading: cleanHeading,
        subheading: "",
        partners: finalPartners
      });



      // Resolve WordPress attachment IDs to URLs
      const resolvePartnerImages = async () => {
        const imagePromises = finalPartners.map(async (partner) => {
          if (partner.isAttachmentId && typeof partner.logo === 'number') {
            const url = await fetchPartnerAttachmentUrl(partner.logo);
            return {
              ...partner,
              logo: url || defaultPartners[partner.id-1]?.logo || '/img/partners/1.svg',
              originalAttachmentId: partner.logo
            };
          }
          return partner;
        });

        const resolvedResults = await Promise.all(imagePromises);
        setResolvedPartners(resolvedResults);

      };

      // Only resolve images if we have attachment IDs
      const hasAttachmentIds = finalPartners.some(partner => partner.isAttachmentId);
      if (hasAttachmentIds) {
        resolvePartnerImages();
      } else {
        setResolvedPartners(finalPartners);
      }
    } else {
      // Use default data
      setPartnersData({
        heading: "Our Efforts Have Transformed :",
        subheading: "How You Experience These Global Leaders",
        partners: defaultPartners
      });
    }
  }, [apiData])

  // Initialize swiper after component mounts - client-side only
  useEffect(() => {
    // Only run on client-side to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    const initSwiper = () => {
      const swiperEl = document.querySelector('.mil-infinite-show');
      if (swiperEl && !swiperEl.swiper && window.Swiper) {
        try {
          new window.Swiper(swiperEl, {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: {
              delay: 0,
              disableOnInteraction: false
            },
            loop: true,
            freeMode: true,
            breakpoints: {
              992: {
                slidesPerView: 4,
              },
            },
          });

        } catch (error) {
          console.warn('Partners Swiper failed:', error);
        }
      }
    };

    // Initialize after a delay to ensure hydration is complete
    const timer = setTimeout(initSwiper, 1500);
    
    return () => clearTimeout(timer);
  }, [resolvedPartners, partnersData.partners])

  // Re-initialize swiper when resolved partners change
  useEffect(() => {
    if (resolvedPartners.length > 0 && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const swiperEl = document.querySelector('.mil-infinite-show');
        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.update();

        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [resolvedPartners])

  return (
    <div className="mil-dark-bg">
      <div className="container mil-p-120-120">
        <h3 
          className="mil-center mil-up mil-mb-60"
          dangerouslySetInnerHTML={{
            __html: partnersData.heading
          }}
        />
        <br /><br /><br />
        
        <div className="mil-infinite-show mil-up">
          <div className="swiper-wrapper">
            {/* Use resolved partners if available, otherwise use original partners data */}
            {(resolvedPartners.length > 0 ? resolvedPartners : partnersData.partners).map((partner) => (
              <div key={partner.id} className="swiper-slide">
                <a href={partner.link} className="mil-partner-frame" style={{width: '100px'}}>
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    onError={(e) => {
                      e.target.src = '/img/partners/1.svg';
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}