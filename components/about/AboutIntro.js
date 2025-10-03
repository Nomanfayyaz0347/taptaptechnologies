
import React from 'react';
import Link from 'next/link';

export default function AboutIntro({ heading, loading, error }) {
  return (
    <div className="mil-inner-banner">
      <div className="mil-banner-content mil-up">
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
            <li>About</li>
          </ul>
          {loading ? (
            <h1 className="mil-mb-60">Loading...</h1>
          ) : error ? (
            <h1 className="mil-mb-60" style={{ color: 'red' }}>Failed to load</h1>
          ) : (
            <h1 className="mil-mb-60" dangerouslySetInnerHTML={{ __html: heading }} />
          )}
        </div>
      </div>
    </div>
  );
}
