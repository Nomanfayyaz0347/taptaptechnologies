import React from 'react';


export default function AboutServicesSection({ coreValues, loading, error }) {
  // Prepare boxes from API
  const boxes = [1,2,3].map(i => {
    const box = coreValues[`corevaluesbox0${i}`];
    if (!box) return null;
    return {
      number: box[`corevaluesbox0${i}number`] || '',
      heading: box[`corevaluesbox0${i}heading`] || '',
      content: box[`corevaluesbox0${i}content`] || '',
    };
  }).filter(Boolean);

  return (
    <section className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="mil-animation-frame">
          <div className="mil-animation mil-position-1 mil-scale" data-value-1="2.4" data-value-2="1.4" style={{top: '300px', right: '-100px'}}></div>
          <div className="mil-animation mil-position-2 mil-scale" data-value-1="2" data-value-2="1" style={{left: '150px'}}></div>
        </div>
        <div className="container mil-p-120-0">
          <div className="mil-mb-120">
            <div className="row">
              <div className="col-lg-10">
                <span className="mil-suptitle mil-light-soft mil-suptitle-right mil-up">
                  <span dangerouslySetInnerHTML={{__html: coreValues.corevaluessectionpra || ''}} />
                </span>
              </div>
            </div>
            <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
              <h2 className="mil-h1 mil-center" style={{color: '#fff'}} dangerouslySetInnerHTML={{__html: coreValues.corevaluessectionheading || 'Our <span class="mil-thin">Core </span>Values'}} />
            </div>
          </div>
          <div className="row justify-content-center">
            {boxes.map((service, idx) => (
              <div className="col-md-4 mil-mb-30" key={service.number}>
                <div className="mil-service-card-sm mil-up mil-value-box mil-shadow mil-radius mil-p-40-30 text-center" style={{color: '#fff'}}>
                  <div className="mil-value-number mil-theme-text mil-mb-20" style={{fontSize: '2.5rem', fontWeight: 700}}>{service.number}</div>
                  <h5 className="mil-mb-15" style={{color: '#fff'}}>{service.heading}</h5>
                  <p className="mil-light-soft" style={{color: '#fff', opacity: 0.8}}>{service.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
