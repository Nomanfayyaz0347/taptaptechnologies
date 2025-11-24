import Head from 'next/head';
import InnerBanner from '../../components/InnerBanner';
import HomeImageSection from '../../components/services/sections/HomeImageSection';
import ServicesTopSection from '../../components/services/sections/ServicesTopSection';
import GenericSection from '../../components/services/sections/GenericSection';
import ServicesStatsSection from '../../components/services/sections/ServicesStatsSection';
import ServicesSixSection from '../../components/services/sections/ServicesSixSection';
import ServicesElevenSection from '../../components/services/sections/ServicesElevenSection';
import TwelveElevenSection from '../../components/services/sections/TwelveElevenSection';
import ServicesLatestTechStack from '../../components/services/sections/ServicesLatestTechStack';

export async function getStaticPaths() {
  // Fetch all services to get their slugs
  const res = await fetch('https://taptaptechnologies.com/wp-json/wp/v2/services?per_page=100');
  const services = await res.json();
  const paths = services.map(service => ({ params: { slug: service.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // Fetch the service by slug
  const res = await fetch(`https://taptaptechnologies.com/wp-json/wp/v2/services?slug=${slug}`);
  const data = await res.json();
  const service = data && data.length > 0 ? data[0] : null;
  return {
    props: {
      service: service ? {
        title: service.title?.rendered || '',
        excerpt: service.excerpt?.rendered || '',
        content: service.content?.rendered || '',
        slug: service.slug,
        acf: service.acf || {},
      } : null,
    },
  };
}

export default function ServiceSlug({ service }) {
  if (!service) {
    return <div style={{ padding: '2rem' }}>Service not found.</div>;
  }
  return (
    <>
      <Head>
        <title>{service.title} - Tap Tap Technologies</title>
        <meta name="description" content={service.excerpt.replace(/<[^>]+>/g, '').slice(0, 150)} />
      </Head>
      <InnerBanner
        heading={service.title}
        breadcrumbs={[
          { href: '/', label: 'Homepage' },
          { href: '/services', label: 'Services' },
          { href: `/services/${service.slug}`, label: service.title }
        ]}
      />
      <section class="mil-soft-bg">
        <HomeImageSection image={service.acf.home_image} />
       
          <div className="container">
            {service.excerpt && (
              <div className="mil-descr mil-light-soft mil-up mil-mb-10" dangerouslySetInnerHTML={{ __html: service.excerpt }} />
            )}
            {service.content && (
              <div className="mil-descr mil-light-soft mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: service.content }} />
            )}
            {service.acf && [
              'services_top_section',
              'services_second_section',
              'services_third_section',
              'services_fourth_section',
              'services_fifth_section',
              'services_six_section',
              'services_client_success_stories_section',
              'services_software_development_service',
              'services_nine_section',
              'services_ten_section',
              'services_eleven_section',
              'twelve_eleven_section',
              'services_latest_tech_stack',
            ].map(sectionKey => {
              const section = service.acf[sectionKey];
              if (!section) return null;
              if (sectionKey === 'services_top_section') {
                let trustedByLogos = null;
                if (Array.isArray(service.acf.services_top_section_trusted_by) && Array.isArray(service.acf.services_top_section_logos)) {
                  trustedByLogos = service.acf.services_top_section_trusted_by.map(id => {
                    return service.acf.services_top_section_logos.find(logo => String(logo.id) === String(id));
                  }).filter(Boolean);
                }
                return <ServicesTopSection key={sectionKey} section={section} trustedByLogos={trustedByLogos} />;
              }
              if (sectionKey === 'services_third_section') {
                return <ServicesStatsSection key={sectionKey} section={section} />;
              }
              if (sectionKey === 'services_six_section') {
                return <ServicesSixSection key={sectionKey} section={section} />;
              }
              if (sectionKey === 'services_eleven_section') {
                return <ServicesElevenSection key={sectionKey} section={section} />;
              }
              if (sectionKey === 'twelve_eleven_section') {
                return <TwelveElevenSection key={sectionKey} section={section} />;
              }
              if (sectionKey === 'services_latest_tech_stack') {
                return <ServicesLatestTechStack key={sectionKey} section={section} />;
              }
              return <GenericSection key={sectionKey} section={section} />;
            })}
          </div>
      
      </section>
    </>
  );
}

