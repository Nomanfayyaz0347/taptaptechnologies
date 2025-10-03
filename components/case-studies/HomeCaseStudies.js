import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Home page style case studies section, but fetches from custom post type API
export default function HomeCaseStudies() {
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
    <section>
      <div className="container mil-p-120-60">
        <div className="row align-items-center mil-mb-30">
          <div className="col-lg-6 mil-mb-30">
            <h3 className="mil-up">Case Studies</h3>
            <p className="mil-up mil-light-soft">Our latest success stories</p>
          </div>
          <div className="col-lg-6 mil-mb-30">
            <div className="mil-adaptive-right mil-up">
              <Link href="/case-studies" legacyBehavior>
                <a className="mil-link mil-dark mil-arrow-place">
                  <span>View all</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {loading && (
            <div className="col-12"><p>Loading...</p></div>
          )}
          {error && (
            <div className="col-12"><p style={{color:'red'}}>Error: {error}</p></div>
          )}
          {!loading && !error && posts.length === 0 && (
            <div className="col-12"><p>No case studies found.</p></div>
          )}
          {!loading && !error && posts.slice(0,2).map((post, idx) => {
            const slug = post.slug;
            const image = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url;
            return (
              <div key={post.id} className="col-lg-6">
                <Link href={`/case-studies/${slug}`} legacyBehavior>
                  <a className="mil-blog-card mil-mb-60">
                    <div className="mil-cover-frame mil-up">
                      <img 
                        src={image || `/img/blog/${idx+1}.jpg`} 
                        alt={post.title?.rendered || 'Case Study'} 
                        onError={e => { e.target.src = `/img/blog/${idx+1}.jpg`; }}
                      />
                    </div>
                    <div className="mil-post-descr">
                      <div className="mil-labels mil-up mil-mb-30">
                        <div className="mil-label mil-upper mil-accent">CASE STUDY</div>
                        <div className="mil-label mil-upper">{post.date ? new Date(post.date).toLocaleDateString() : ''}</div>
                      </div>
                      <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{__html: post.title?.rendered || ''}} />
                      <p className="mil-post-text mil-up mil-mb-30">
                        {post.acf?.case_studies_home_section?.short_description || post.excerpt?.rendered || 'No short description available.'}
                      </p>
                      <div className="mil-link mil-dark mil-arrow-place mil-up">
                        <span>Read more</span>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
