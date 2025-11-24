
import Head from 'next/head'

import ContactSection from '../components/contact/ContactSection';


export default function Contact({ apiData }) {
  return (
    <>
      <Head>
        <title>Contact - Tap Tap Technologies</title>
        <meta name="description" content="Get in touch with us" />
      </Head>
      <ContactSection contactData={apiData} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://taptaptechnologies.com/wp-json/wp/v2/pages/972');
  const apiData = await res.json();
  return { props: { apiData } };
}
