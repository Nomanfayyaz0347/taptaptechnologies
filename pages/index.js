import Head from 'next/head'
import Banner from '../components/sections/Banner'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Growth from '../components/sections/Growth'
import Team from '../components/sections/Team'
import Reviews from '../components/sections/Reviews'
import Partners from '../components/sections/Partners'
import Vision from '../components/sections/Vision'
import HomeCaseStudies from '../components/case-studies/HomeCaseStudies'
import Faq from '../components/sections/Faq'
import Footer from '../components/sections/Footer'
import { useApiData } from '../hooks/useApiData'
import Contact from '../components/sections/Contact'
import Loader from '../components/Loader';

export default function Home() {
  const { apiData, loading, error } = useApiData()

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: 'red' 
      }}>
        Error: {error}
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>TapTap Technologies – Smart IT Solutions for Modern Businesses</title>
        <meta name="description" content="TapTap Technologies offers professional web development, custom software, mobile apps, and digital marketing solutions. We help businesses grow with innovative technology and smart IT services."/>
      </Head>

      <Banner apiData={apiData} />
      <About apiData={apiData} />
      <Services apiData={apiData} />
      
      <HomeCaseStudies />
      <Growth apiData={apiData} />
      <Vision apiData={apiData} />
       <Partners apiData={apiData} />
      <Team apiData={apiData} />
      <Reviews apiData={apiData} />
      <Faq apiData={apiData} />
      <Contact apiData={apiData} />
  {/* Footer removed: now rendered globally by SimpleLayout */}
    </>
  )
}
