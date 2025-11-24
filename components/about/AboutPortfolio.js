
import React, { useEffect, useState } from 'react';

export default function AboutPortfolio({ worklife, loading, error }) {
  const [imgUrls, setImgUrls] = useState({});

  const boxes = [1,2,3,4,5,6].map(i => {
    const box = worklife[`worklifebox0${i}`];
    if (!box) return null;
    let img = box[`worklifebox0${i}img`];
    if (img && typeof img === 'object' && img.url) {
      img = img.url;
    }
    return {
      heading: box[`worklifebox0${i}heading`] || '',
      img,
      link: box[`worklifebox0${i}link`] || '#',
      idx: i
    };
  }).filter(Boolean);

  useEffect(() => {
    const fetchImages = async () => {
      const updates = {};
      await Promise.all(
        boxes.map(async (box) => {
          if (typeof box.img === 'number' || (typeof box.img === 'string' && /^\d+$/.test(box.img))) {
            try {
              const res = await fetch(`https://taptaptechnologies.com/wp-json/wp/v2/media/${box.img}`);
              if (res.ok) {
                const data = await res.json();
                updates[box.idx] = data.source_url;
              }
            } catch {}
          }
        })
      );
      if (Object.keys(updates).length > 0) {
        setImgUrls(prev => ({ ...prev, ...updates }));
      }
    };
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(boxes)]);

  if (loading) {
    return <section id="portfolio"><div className="container"><h3>Loading...</h3></div></section>;
  }
  if (error) {
    return <section id="portfolio"><div className="container"><h3 style={{color:'red'}}>Failed to load</h3></div></section>;
  }

  return (
    <section id="portfolio" style={{position: 'relative', width: '100%'}}>
      <div style={{position: 'relative', zIndex: 1}}>
        <div className="container mil-portfolio mil-p-120-60">
          <h1 className="mil-up " style={{ textAlign: 'center', marginBottom: '80px' }} dangerouslySetInnerHTML={{ __html: worklife.worklifesectionheading || 'Work Life At Its Best' }} />
          <div className="row justify-content-between align-items-center">
            {boxes.map((box, idx) => {
              const imgSrc = imgUrls[box.idx] || box.img || '';
              return (
                <div className={idx % 2 === 0 ? 'col-lg-5' : 'col-lg-6'} key={idx}>
                  <a href={box.link} className="mil-portfolio-item mil-more mil-mb-60">
                    <div className={idx % 2 === 0 ? 'mil-cover-frame mil-vert mil-up' : 'mil-cover-frame mil-hori mil-up'}>
                      <div className="mil-cover">
                        <img src={imgSrc} alt="cover"/>
                      </div>
                    </div>
                    <div className="mil-descr">
                      <h4 className="mil-up">{box.heading}</h4>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
