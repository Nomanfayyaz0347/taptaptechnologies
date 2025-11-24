import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Bootstrap grid CSS */}
        <link rel="stylesheet" href="/css/plugins/bootstrap-grid.css" />
        {/* Font Awesome CSS */}
        <link rel="stylesheet" href="/css/plugins/font-awesome.min.css" />
        {/* Swiper CSS */}
        <link rel="stylesheet" href="/css/plugins/swiper.min.css" />
        {/* Fancybox CSS */}
        <link rel="stylesheet" href="/css/plugins/fancybox.min.css" />
        {/* Main CSS */}
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}