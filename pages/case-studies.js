
import InnerBanner from '../components/InnerBanner';
import CaseStudiesSection from '../components/case-studies/CaseStudiesSection';

export default function CaseStudiesPage() {
  return (
    <>
      <InnerBanner
        heading="Case Studies"
        breadcrumbs={[
          { href: '/', label: 'Homepage' },
          { label: 'Case Studies' }
        ]}
      />
      <CaseStudiesSection />
    </>
  );
}
