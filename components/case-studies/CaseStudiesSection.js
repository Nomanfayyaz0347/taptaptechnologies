import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CaseStudiesSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://taptaptechnologies.com/wp-json/wp/v2/casestudies?_embed')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog">
      <div className="container mil-p-120-120">
        <div className="row">
          {loading && (
            <div className="col-lg-12"><p>Loading...</p></div>
          )}
          {error && (
            <div className="col-lg-12"><p style={{color:'red'}}>Error: {error}</p></div>
          )}
          {!loading && !error && posts.length === 0 && (
            <div className="col-lg-12"><p>No case studies found.</p></div>
          )}
          {!loading && !error && posts.map(post => (
            <div className="col-lg-12" key={post.id}>
              <Link href={`/case-studies/${post.slug}`} passHref legacyBehavior>
                <a className="mil-blog-card mil-blog-card-hori mil-more mil-mb-60">
                  <div className="mil-cover-frame mil-up">
                    {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url ? (
                      <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title?.rendered || ''} />
                    ) : (
                      <img src="/img/blog/1.jpg" alt="cover" />
                    )}
                  </div>
                  <div className="mil-post-descr">
                    <div className="mil-labels mil-up mil-mb-30">
                      <div className="mil-label mil-upper mil-accent">CASE STUDY</div>
                      <div className="mil-label mil-upper">{post.date ? new Date(post.date).toLocaleDateString() : ''}</div>
                    </div>
                    <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{__html: post.title?.rendered || ''}} />
                    <p className="mil-post-text mil-up mil-mb-30">
                      {post.acf?.case_studies_home_section?.short_description
                        ? post.acf.case_studies_home_section.short_description
                        : post.excerpt?.rendered
                          ? <span dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
                          : 'No short description available.'}
                    </p>
                    <div className="mil-link mil-dark mil-arrow-place mil-up">
                      <span>Read more</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

