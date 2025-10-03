import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerBanner from '../../components/InnerBanner';

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`https://taptaptechnologies.com/wp-json/wp/v2/casestudies?_embed&slug=${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setPost(data[0] || null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container" style={{padding:'60px 0'}}><p>Loading...</p></div>;
  if (error) return <div className="container" style={{padding:'60px 0'}}><p style={{color:'red'}}>Error: {error}</p></div>;
  if (!post) return <div className="container" style={{padding:'60px 0'}}><p>Case study not found.</p></div>;

  return (
    <>
      <InnerBanner
        heading={post.title?.rendered || 'Case Study'}
        breadcrumbs={[
          { href: '/', label: 'Homepage' },
          { href: '/case-studies', label: 'Case Studies' },
          { label: post.title?.rendered || '' }
        ]}
      />
      <div className="container" style={{padding:'60px 0', maxWidth: '900px'}}>
        {/* Main ACF image if available */}
        {post.acf?.case_studies_home_section?.image?.url && (
          <img src={post.acf.case_studies_home_section.image.url} alt={post.title?.rendered || ''} style={{maxWidth:'100%',marginBottom:32,borderRadius:12}} />
        )}
        {/* Fallback to featured image if no ACF image */}
        {!post.acf?.case_studies_home_section?.image?.url && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url && (
          <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title?.rendered || ''} style={{maxWidth:'100%',marginBottom:32,borderRadius:12}} />
        )}
        <h2 style={{marginBottom:8}} dangerouslySetInnerHTML={{__html: post.title?.rendered || ''}} />
        <p style={{color:'#888',marginBottom:16}}><strong>Date:</strong> {post.date ? new Date(post.date).toLocaleDateString() : ''}</p>
        {post.excerpt?.rendered && (
          <div style={{marginBottom:24}}><span dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} /></div>
        )}
        {/* Home Section: Short Description */}
        {post.acf?.case_studies_home_section?.short_description && (
          <div style={{marginBottom:24, fontWeight:500, fontSize:'1.1em'}}>
            {post.acf.case_studies_home_section.short_description}
          </div>
        )}

        {/* Second Section: Array of sections (Who We Are, How It Works, etc.) */}
        {Array.isArray(post.acf?.case_studies_second_section) && post.acf.case_studies_second_section.length > 0 && (
          <div style={{marginBottom:32}}>
            {post.acf.case_studies_second_section.map((sec, idx) => (
              <div key={idx} style={{marginBottom:24}}>
                {sec.title && <h3 style={{marginBottom:8, color:'#333'}}>{sec.title}</h3>}
                {sec.content && <div style={{color:'#444'}}>{sec.content}</div>}
              </div>
            ))}
          </div>
        )}

        {/* History Section */}
        {post.acf?.case_studies_history_section?.content && (
          <div style={{marginBottom:32}}>
            <h3 style={{marginBottom:8, color:'#333'}}>Our History</h3>
            <div style={{color:'#444', marginBottom:12}}>{post.acf.case_studies_history_section.content}</div>
            {post.acf.case_studies_history_section.image?.url && (
              <img src={post.acf.case_studies_history_section.image.url} alt="History" style={{maxWidth:'100%',borderRadius:8}} />
            )}
          </div>
        )}

        {/* Core Values Section: Array */}
        {Array.isArray(post.acf?.case_studies_core_values_section) && post.acf.case_studies_core_values_section.length > 0 && (
          <div style={{marginBottom:32}}>
            <h3 style={{marginBottom:8, color:'#333'}}>Core Values</h3>
            <ul style={{paddingLeft:20}}>
              {post.acf.case_studies_core_values_section.map((val, idx) => (
                <li key={idx} style={{marginBottom:8}}>
                  <strong>{val.title}:</strong> {val.content}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fallback: Main WP content if any */}
        {post.content?.rendered && (
          <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
        )}
      </div>
    </>
  );
}
