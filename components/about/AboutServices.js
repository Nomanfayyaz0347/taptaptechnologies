import React from 'react';

export default function AboutServices() {
  const services = [
    {
      title: 'Mobile App  Development',
      desc: 'Our creative agency is a team of professionals focused on helping your brand grow.',
      icon: ''
    },
    {
      title: 'Website Design and Development',
      desc: 'Our creative agency is a team of professionals focused on helping your brand grow.',
      icon: ''
    },
    {
      title: 'Data Science  & Analytics',
      desc: 'Our creative agency is a team of professionals focused on helping your brand grow.',
      icon: ''
    },
    {
      title: 'Devops Services',
      desc: 'Our creative agency is a team of professionals focused on helping your brand grow.',
      icon: ''
    }
  ];

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
                  We Create New Solutions and Transform<br />
                  Existing Ones with a Development Process That Beats Industry-Best Timelines
                </span>
              </div>
            </div>
            <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
              <span className="mil-text-image">
                <img src="/img/photo/Business.jpg" alt="team" />
              </span>
              <h2 className="mil-h1 mil-muted mil-center">Unique <span className="mil-thin">Ideas</span></h2>
            </div>
            <div className="mil-complex-text justify-content-center mil-up">
              <h2 className="mil-h1 mil-muted mil-center">For Your <span className="mil-thin">Business.</span></h2>
              <a href="/services" className="mil-services-button mil-button mil-arrow-place">
                <span>What we do</span>
              </a>
            </div>
          </div>
          <div className="row mil-services-grid m-0">
            {services.map((service, idx) => (
              <div className="col-md-6 col-lg-3 mil-services-grid-item p-0" key={service.title}>
                <a href="/services" className="mil-service-card-sm mil-up">
                  <h5 className="mil-muted mil-mb-30">{service.title}</h5>
                  <p className="mil-light-soft mil-mb-30">{service.desc}</p>
                  <div className="mil-button mil-icon-button-sm mil-arrow-place"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
