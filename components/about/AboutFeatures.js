
import React from 'react';

export default function AboutFeatures({ whoWeAre, howItWorks, ourHistory, loading, error }) {
    return (
        <div className="mil-soft-bg" >
            <div >
                <div className="container">
                    <div className="row justify-content-between mil-p-120-120">
                        <div className="col-lg-5">
                            <h3 className="mil-up mil-mb-60">{loading ? '...' : whoWeAre.heading}</h3>
                        </div>
                        <div className="col-lg-6">
                            {loading ? (
                                <p className="mil-up mil-mb-30">Loading...</p>
                            ) : error ? (
                                <p className="mil-up mil-mb-30" style={{color: 'red'}}>{error}</p>
                            ) : (
                                <div className="mil-up mil-mb-30">{whoWeAre.pra}</div>
                            )}
                        </div>
                    </div>
                    <div className="row justify-content-between ">
                        <div className="col-lg-5">
                            <h3 className="mil-up mil-mb-60">{loading ? '...' : howItWorks.heading}</h3>
                        </div>
                        <div className="col-lg-6">
                            {loading ? (
                                <p className="mil-up">Loading...</p>
                            ) : error ? (
                                <p className="mil-up" style={{color: 'red'}}>{error}</p>
                            ) : (
                                <div className="mil-up">{howItWorks.pra}</div>
                            )}
                        </div>
                    </div>
                    {/* Our History Section */}
                    {ourHistory && (ourHistory.ourhistorysectionheading || ourHistory.ourhistorysectionpra) && (
                      <div className="row justify-content-between mil-p-120-120">
                        <div className="col-lg-5">
                          <h3 className="mil-up mil-mb-60">{ourHistory.ourhistorysectionheading}</h3>
                        </div>
                        <div className="col-lg-6">
                          <div className="mil-up mil-mb-30">{ourHistory.ourhistorysectionpra}</div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </div>
    );
}
