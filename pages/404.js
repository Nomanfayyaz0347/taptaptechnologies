import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Tap Tap Technologies</title>
        <meta name="description" content="The page you are looking for was not found" />
      </Head>

      <section className="mil-banner mil-banner-sm mil-deep-bg mil-p-0-120">
        <div className="mil-banner-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="mil-mb-90">
                  <h1 className="mil-upper mil-light mil-mb-30">404</h1>
                  <p className="mil-light-soft mil-mb-30">The page you are looking for was not found.</p>
                  <a href="/" className="mil-button mil-arrow-place">
                    <span>Back to Home</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
