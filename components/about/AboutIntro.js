

import InnerBanner from '../InnerBanner';

export default function AboutIntro({ heading, loading, error }) {
  let bannerHeading = '';
  if (loading) bannerHeading = 'Loading...';
  else if (error) bannerHeading = 'Failed to load';
  else bannerHeading = heading;

  const breadcrumbs = [
    { label: 'Homepage', href: '/' },
    { label: 'About' }
  ];

  return <InnerBanner heading={bannerHeading} breadcrumbs={breadcrumbs} />;
}
