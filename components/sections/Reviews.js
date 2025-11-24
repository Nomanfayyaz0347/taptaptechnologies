import { useEffect, useState } from 'react'

export default function Reviews({ apiData }) {
  const [reviewsData, setReviewsData] = useState({
    paragraph: "",
    heading: "",
    reviews: []
  })

  const [resolvedImages, setResolvedImages] = useState({})

  // Function to fetch WordPress attachment URL
  const fetchReviewAttachmentUrl = async (attachmentId) => {
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



  useEffect(() => {
    // Check for reviews data in WordPress ACF
    const reviewsSection = apiData?.reviewssection || apiData?.acf?.reviewssection;
    
    if (reviewsSection) {
      // Process reviews from WordPress
      const wordpressReviews = [];
      for (let i = 1; i <= 3; i++) {
        const reviewKey = `reviewsbox0${i}`;
        const reviewData = reviewsSection[reviewKey];

        if (reviewData && Object.keys(reviewData).length > 0) {
          const imgField = reviewData[`reviewsbox0${i}img`];
          const name = reviewData[`reviewsbox0${i}name`] || `Customer ${i}`;
          const designation = reviewData[`reviewsbox0${i}designation_`] || 'Customer';
          const content = reviewData[`reviewsbox0${i}content`] || '';

          // Process image
          let imageUrl = null;
          
          if (imgField && typeof imgField === 'object' && imgField.url) {
            // Full attachment object
            imageUrl = imgField.url;
          } else if (imgField && typeof imgField === 'number') {
            // Attachment ID - will be resolved async
            
            // Resolve attachment ID async
            fetchReviewAttachmentUrl(imgField).then(resolvedUrl => {
              if (resolvedUrl) {
                setResolvedImages(prev => ({
                  ...prev,
                  [i]: resolvedUrl
                }));

              }
            });
          } else if (imgField && typeof imgField === 'string' && imgField.startsWith('http')) {
            // Direct URL
            imageUrl = imgField;
          }

          wordpressReviews.push({
            id: i,
            name,
            designation,
            content,
            image: imageUrl
          });

        }
      }

      // Only use WordPress reviews
      setReviewsData({
        paragraph: reviewsSection.reviewssectionpra || "",
        heading: reviewsSection.reviewssectionheading || "",
        reviews: wordpressReviews
      });
    }
  }, [apiData]);

  const displayReviews = reviewsData.reviews;

  useEffect(() => {
    // Initialize reviews slider after component mounts and data is available
    const initReviewsSlider = () => {
      if (typeof window !== 'undefined' && window.Swiper && displayReviews && displayReviews.length > 0) {
        // Destroy existing swiper instance if exists
        const existingSwiper = document.querySelector('.mil-reviews-slider')?.swiper;
        if (existingSwiper) {
          existingSwiper.destroy(true, true);
        }

        const reviewsSlider = new window.Swiper('.mil-reviews-slider', {
          slidesPerView: 1,
          spaceBetween: 30,
          speed: 900,
          parallax: true,
          navigation: {
            nextEl: '.mil-revi-next',
            prevEl: '.mil-revi-prev',
          },
          pagination: {
            el: '.mil-revi-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
              const review = displayReviews[index];
              const imageUrl = resolvedImages[review?.id] || review?.image;
              
              if (imageUrl) {
                return `<span class="${className}">
                  <img src="${imageUrl}" alt="${review?.name || 'Reviewer'}" 
                       style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid transparent; transition: all 0.3s ease;"
                       onerror="this.style.display='none'">
                </span>`;
              } else {
                return `<span class="${className}"></span>`;
              }
            }
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          loop: displayReviews.length > 1,
          watchSlidesProgress: true,
          observer: true,
          observeParents: true,
          on: {
            init: function() {
              // Add custom styles for pagination bullets and navigation
              const style = document.createElement('style');
              style.textContent = `
                .mil-revi-pagination .swiper-pagination-bullet {
                  width: 100px !important;
                  height: 100px !important;
                  border-radius: 50% !important;
                  background: transparent !important;
                  opacity: 0.7 !important;
                  margin: 0 5px !important;
                  cursor: pointer !important;
                }
                .mil-revi-pagination .swiper-pagination-bullet-active {
                  opacity: 1 !important;
                }
                .mil-revi-pagination .swiper-pagination-bullet-active img {
                  border-color: #007bff !important;
                  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3) !important;
                }
                .mil-revi-pagination .swiper-pagination-bullet img:hover {
                  transform: scale(1.1) !important;
                }
                .mil-revi-prev, .mil-revi-next {
                  cursor: pointer !important;
                  pointer-events: auto !important;
                  opacity: 1 !important;
                }
                .mil-revi-prev:hover, .mil-revi-next:hover {
                  opacity: 0.7 !important;
                }
              `;
              document.head.appendChild(style);
              
            }
          }
        });
      }
    };

    // Only initialize if we have data
    if (displayReviews && displayReviews.length > 0) {
      const timer = setTimeout(initReviewsSlider, 300);
      return () => clearTimeout(timer);
    }
  }, [displayReviews, resolvedImages]);

  // Only render if we have WordPress data
  if (!reviewsData.heading && reviewsData.reviews.length === 0) {
    return null;
  }

  return (
    <section className="mil-soft-bg">
      <div className="container mil-p-120-120">
        <div className="row">
          <div className="col-lg-10">
            <span className="mil-suptitle mil-suptitle-right mil-suptitle-dark mil-up" 
                  dangerouslySetInnerHTML={{ __html: reviewsData.paragraph }}>
            </span>
          </div>
        </div>

        <h2 className="mil-center mil-up mil-mb-60" 
            dangerouslySetInnerHTML={{ __html: reviewsData.heading }}>
        </h2>

        <div className="mil-revi-pagination mil-up mil-mb-60"></div>

        <div className="row mil-relative justify-content-center">
          <div className="col-lg-10">
            <div className="mil-slider-nav mil-soft mil-reviews-nav mil-up">
              <div className="mil-slider-arrow mil-prev mil-revi-prev mil-arrow-place"></div>
              <div className="mil-slider-arrow mil-revi-next mil-arrow-place"></div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="mil-quote-icon mil-up">
              <path d="M 13.5 10 A 8.5 8.5 0 0 0 13.5 27 A 8.5 8.5 0 0 0 18.291016 25.519531 C 17.422273 29.222843 15.877848 31.803343 14.357422 33.589844 C 12.068414 36.279429 9.9433594 37.107422 9.9433594 37.107422 A 1.50015 1.50015 0 1 0 11.056641 39.892578 C 11.056641 39.892578 13.931586 38.720571 16.642578 35.535156 C 19.35357 32.349741 22 27.072581 22 19 A 1.50015 1.50015 0 0 0 21.984375 18.78125 A 8.5 8.5 0 0 0 13.5 10 z M 34.5 10 A 8.5 8.5 0 0 0 34.5 27 A 8.5 8.5 0 0 0 39.291016 25.519531 C 38.422273 29.222843 36.877848 31.803343 35.357422 33.589844 C 33.068414 36.279429 30.943359 37.107422 30.943359 37.107422 A 1.50015 1.50015 0 1 0 32.056641 39.892578 C 32.056641 39.892578 34.931586 38.720571 37.642578 35.535156 C 40.35357 32.349741 43 27.072581 43 19 A 1.50015 1.50015 0 0 0 42.984375 18.78125 A 8.5 8.5 0 0 0 34.5 10 z" fill="#000000" />
            </svg>

            <div className="swiper-container mil-reviews-slider">
              <div className="swiper-wrapper">
                {displayReviews.map((review) => (
                  <div key={review.id} className="swiper-slide">
                    <div className="mil-review-frame mil-center" data-swiper-parallax="-200" data-swiper-parallax-opacity="0">
                      <h5 className="mil-up mil-mb-10">{review.name}</h5>
                      <p className="mil-mb-5 mil-upper mil-up mil-mb-30">{review.designation}</p>
                      <p className="mil-text-xl mil-up">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}