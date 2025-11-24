
import React from 'react';
import Link from 'next/link';

export default function InnerBanner({ heading, breadcrumbs = [] }) {
  return (
    <div className="mil-inner-banner">
      <div className="mil-banner-content mil-up">
        <div className="mil-animation-frame">
          <div
            className="mil-animation mil-position-4 mil-dark mil-scale"
            data-value-1="6"
            data-value-2="1.4"
          >
            <div className="mil-dodecahedron">
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
              <div className="mil-pentagon"><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        </div>
        <div className="container">
          <ul className="mil-breadcrumbs mil-mb-60">
            {breadcrumbs.map((item, idx) => (
              <li key={idx}>
                {item.href ? (
                  <Link href={item.href} legacyBehavior>
                    <a>{item.label}</a>
                  </Link>
                ) : item.label}
              </li>
            ))}
          </ul>
          <h1 className="mil-mb-60" dangerouslySetInnerHTML={{ __html: heading }} />
        </div>
      </div>
    </div>
  );
}
