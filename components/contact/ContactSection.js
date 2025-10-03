

import Link from 'next/link';
import parse from 'html-react-parser';

export default function ContactSection({ contactData }) {
    // Safe fallback for missing data
    const heading = contactData?.acf?.contactheading || 'Get in touch!';
    const pra = contactData?.acf?.contactpra || '';
    const us = contactData?.acf?.addressboxuk || {};
    const uk = contactData?.acf?.addressboxus || {};
    const phone = contactData?.acf?.phonebox || {};

    return (
        <div className="mil-content">
            <div id="swupMain" className="mil-main-transition">
                <div className="mil-inner-banner mil-p-0-120">
                    <div className="mil-banner-content mil-center mil-up">
                        <div className="mil-animation-frame">
                            <div className="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"></div>
                        </div>
                        <div className="container">
                                                        <ul className="mil-breadcrumbs mil-mb-60">
                                                                <li>
                                                                    <Link href="/" legacyBehavior>
                                                                        <a>Homepage</a>
                                                                    </Link>
                                                                </li>
                                                                <li>Contact</li>
                                                        </ul>
                            <h1 className="mil-mb-60">{heading}</h1>
                            <p className="mil-mb-60">{parse(pra)}</p>
                            <a href="#contact" className="mil-link mil-dark mil-arrow-place mil-down-arrow">
                                <span>Send message</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                                    <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mil-map-frame mil-up">
                    <div className="mil-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3091.8679336806517!2d-84.36091822457928!3d39.20044952876686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8840535eb7461de1%3A0xd50d3caed8dd50dc!2sTances%20Dr%2C%20Madeira%2C%20OH%2045243%2C%20USA!5e0!3m2!1sen!2s!4v1759328952451!5m2!1sen!2s" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <section id="contact">
                    <div className="container mil-p-120-90">
                        <h3 className="mil-center mil-up mil-mb-120">Let's <span className="mil-thin">Talk</span></h3>
                        <form className="row align-items-center">
                            <div className="col-lg-6 mil-up">
                                <input type="text" placeholder="What's your name" />
                            </div>
                            <div className="col-lg-6 mil-up">
                                <input type="email" placeholder="Your Email" />
                            </div>
                            <div className="col-lg-12 mil-up">
                                <textarea placeholder="Tell us about our project"></textarea>
                            </div>
                            <div className="col-lg-8">
                                <p className="mil-up mil-mb-30"><span className="mil-accent">*</span> We promise not to disclose your personal information to third parties.</p>
                            </div>
                            <div className="col-lg-4">
                                <div className="mil-adaptive-right mil-up mil-mb-30">
                                    <button type="submit" className="mil-button mil-arrow-place">
                                        <span>Send message</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mil-arrow">
                                            <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <section className="mil-contact-info-section ">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 mil-mb-40">
                                <div className="mil-contact-card mil-up">
                                    <div className="mil-contact-icon mil-mb-20">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <h6 className="mil-mb-20">{us.addressboxuk || 'US Office'}</h6>
                                    <p className="mil-up">{us.addressboxuklocation ? parse(us.addressboxuklocation) : ''}</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mil-mb-40">
                                <div className="mil-contact-card mil-up">
                                    <div className="mil-contact-icon mil-mb-20">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <h6 className="mil-mb-20">{uk.addressboxusname || 'UK Office'}</h6>
                                    <p>{uk.addressboxuslocation ? parse(uk.addressboxuslocation) : ''}</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mil-mb-40">
                                <div className="mil-contact-card mil-up">
                                    <div className="mil-contact-icon mil-mb-20">
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <h6 className="mil-mb-20">{phone.phoneboxname || 'Phone'}</h6>
                                    <p>{phone.phoneboxnumber || ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
                </div>
        );
}
