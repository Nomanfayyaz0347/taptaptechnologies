import React from 'react';

export default function AboutSection() {
  return (
    <section className="mil-about-section mil-p-120-60">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mil-mb-60">
            <h2 className="mil-up mil-mb-30">About Us</h2>
            <p className="mil-light-soft mil-up mil-mb-30">
              TapTap Technologies is your creative tech partner, delivering smart IT solutions for modern businesses. We specialize in web development, custom software, mobile apps, and digital marketing. Our mission is to help you grow with innovative technology and reliable service.
            </p>
            <ul className="mil-list mil-up">
              <li>Professional Web Development</li>
              <li>Custom Software Solutions</li>
              <li>Mobile App Development</li>
              <li>Digital Marketing & Branding</li>
              <li>Dedicated Support</li>
            </ul>
          </div>
          <div className="col-lg-6 mil-mb-60">
            <img src="/img/about/about-main.jpg" alt="About TapTap Technologies" className="img-fluid mil-up" />
          </div>
        </div>
      </div>
    </section>
  );
}
