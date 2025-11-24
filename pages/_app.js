import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import SimpleLayout from '../components/SimpleLayout'
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
         <title>TapTap Technologies – Smart IT Solutions for Modern Businesses</title>
      </Head>
      {/* jQuery must be available before other vendor scripts */}
      <Script src="/js/plugins/jquery.min.js" strategy="beforeInteractive" />
      <Script id="jquery-alias" strategy="beforeInteractive">
        {`window.jQuery = window.jQuery || window.$;`}
      </Script>
      {/* Swup intentionally not loaded to avoid conflicts */}
      {/* Load all scripts except main.js which seems to cause syntax errors */}
      <Script src="/js/plugins/gsap.min.js" strategy="afterInteractive" />
      <Script src="/js/plugins/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="/js/plugins/ScrollTo.min.js" strategy="afterInteractive" />
      <Script src="/js/plugins/swiper.min.js" strategy="afterInteractive" />
      <Script src="/js/plugins/fancybox.min.js" strategy="afterInteractive" />
      <Script src="/js/plugins/tilt.js" strategy="afterInteractive" />
      <Script src="/js/plugins/smooth-scroll.js" strategy="afterInteractive" />

      {/* Load main.js for GSAP preloader and all template JS logic */}
      <Script src="/js/main.js" strategy="afterInteractive" />

      {loading && <Loader />}
      <SimpleLayout>
        <Component {...pageProps} />
      </SimpleLayout>
    </>
  )
}