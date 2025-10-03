
import Head from 'next/head'
import InnerBanner from '../components/InnerBanner';
import ApproachSection from '../components/services/ApproachSection';

export default function Services() {
  return (
    <>
      <Head>
        <title>Services - Tap Tap Technologies</title>
        <meta name="description" content="Our design and creative services" />
      </Head>

      <InnerBanner
        heading="Creative Design Solutions"
        breadcrumbs={[
          { href: '/', label: 'Homepage' },
          { href: '/services', label: 'Services' }
        ]}
      />
      <ApproachSection />
    </>
  )
}
