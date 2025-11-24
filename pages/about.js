import Head from 'next/head'
import { useAboutApiData } from '../hooks/useAboutApiData'
import AboutIntro from '../components/about/AboutIntro';
import AboutFeatures from '../components/about/AboutFeatures';
import Team from '../components/sections/Team'
import AboutStats from '../components/about/AboutStats';
import AboutServicesSection from '../components/about/AboutServicesSection';
import AboutPortfolio from '../components/about/AboutPortfolio';
import Loader from '../components/Loader';

export default function AboutUsPage() {
  const { apiData, loading, error } = useAboutApiData();
  if (loading) return <Loader />;
  // Extract Achievements section
  const achievements = apiData?.acf?.ourachievementssection || {};
  // Extract Core Values section
  const coreValues = apiData?.acf?.corevaluessection || {};

  // Extract AboutIntro heading
  const heading = apiData?.acf?.bannerheading || '';

  // Extract AboutFeatures sections
  const who = apiData?.acf?.whowearesection || {};
  const how = apiData?.acf?.howitworkssection || {};
  const whoWeAre = {
    heading: who.whowearesectionheading || '',
    pra: who.whowearesectionpra || ''
  };
  const howItWorks = {
    heading: how.howitworkssectionheading || '',
    pra: how.howitworkssectionpra || ''
  };

  // Extract AboutPortfolio (worklifesection) data
  const worklife = apiData?.acf?.worklifesection || {};

  // Extract Our History section
  const ourHistory = apiData?.acf?.ourhistorysection || {};

  return (
    <>
      <Head>
        <title>About Us | TapTap Technologies</title>
        <meta name="description" content="About TapTap Technologies" />
      </Head>
      <main>
        {/* About Page Sections */}
        <AboutIntro heading={heading} loading={loading} error={error} />
        <AboutFeatures whoWeAre={whoWeAre} howItWorks={howItWorks} ourHistory={ourHistory} loading={loading} error={error} />
         <AboutPortfolio worklife={worklife} loading={loading} error={error} />
         <Team apiData={apiData} />
        <AboutServicesSection coreValues={coreValues} loading={loading} error={error} />
        <AboutStats achievements={achievements} loading={loading} error={error} />
      </main>
    </>
  );
}
