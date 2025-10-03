import Head from 'next/head'

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio - Ashley</title>
        <meta name="description" content="Our portfolio of creative works" />
      </Head>

      <section className="mil-banner mil-banner-sm mil-deep-bg mil-p-0-120">
        <div className="mil-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="mil-mb-90">
                  <span className="mil-suptitle mil-light mil-upper mil-mb-30">Our Work</span>
                  <h1 className="mil-upper mil-light mil-mb-30">Creative Portfolio</h1>
                  <p className="mil-light-soft">Explore our collection of creative projects and design solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
