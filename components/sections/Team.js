import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Team({ apiData }) {
  const [teamData, setTeamData] = useState({
    heading: "",
    paragraph: "",
    shortParagraph: "",
    members: []
  })

  const [resolvedImages, setResolvedImages] = useState({})

  // Function to fetch WordPress attachment URL
  const fetchTeamAttachmentUrl = async (attachmentId) => {
    if (!attachmentId || typeof attachmentId !== 'number') {
      return null;
    }
    
    try {
      const response = await fetch(`https://taptaptechnologies.com/wp-json/wp/v2/media/${attachmentId}`);
      
      if (response.ok) {
        const mediaData = await response.json();
        const imageUrl = mediaData.source_url || mediaData.guid?.rendered || null;
        return imageUrl;
      }
    } catch (error) {
      // Silent error handling
    }
    return null;
  };



  useEffect(() => {
    // Check for team data in WordPress ACF
    const teamSection = apiData?.teamsection || apiData?.acf?.teamsection;
    
    if (teamSection) {
      // Process team members from WordPress
      const wordpressMembers = [];
      for (let i = 1; i <= 4; i++) {
        const memberKey = `teammemberbox0${i}`;
        const memberData = teamSection[memberKey];

        if (memberData && Object.keys(memberData).length > 0) {
          const imgField = memberData[`teammemberbox0${i}img`];
          const name = memberData[`teammemberbox0${i}name`] || `Team Member ${i}`;
          const designation = memberData[`teammemberbox0${i}designation_`] || 'Team Member';
          
          // Get social links
          const socialLinks = [
            memberData[`teammemberbox0${i}link01`],
            memberData[`teammemberbox0${i}link02`], 
            memberData[`teammemberbox0${i}link03`],
            memberData[`teammemberbox0${i}link04`]
          ].filter(link => link && link.trim() !== '');

          // Process image
          let imageUrl = `/img/faces/${i}.jpg`; // Default fallback
          
          if (imgField && typeof imgField === 'object' && imgField.url) {
            // Full attachment object
            imageUrl = imgField.url;
          } else if (imgField && typeof imgField === 'number') {
            // Attachment ID - will be resolved async
            imageUrl = `/img/faces/${i}.jpg`; // Temporary fallback
            
            // Resolve attachment ID async
            fetchTeamAttachmentUrl(imgField).then(resolvedUrl => {
              if (resolvedUrl) {
                setResolvedImages(prev => ({
                  ...prev,
                  [i]: resolvedUrl
                }));

              }
            });
          } else if (imgField && typeof imgField === 'string' && imgField.startsWith('http')) {
            // Direct URL
            imageUrl = imgField;
          }

          wordpressMembers.push({
            id: i,
            name,
            designation,
            image: imageUrl,
            socialLinks: socialLinks.length > 0 ? socialLinks : ['#', '#', '#', '#']
          });

        }
      }

      // Only use WordPress members
      setTeamData({
        heading: teamSection.teamsectionheading || "",
        paragraph: teamSection.teamsectionpra || "",
        shortParagraph: teamSection.teamsectionshortpra || "",
        members: wordpressMembers
      });
    }
  }, [apiData])

  const displayMembers = teamData.members;
  
  // Only render if we have WordPress data
  if (!teamData.heading && teamData.members.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="container mil-p-120-30">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5 col-xl-4">
            <div className="mil-mb-90">
              <h2 className="mil-up mil-mb-60" dangerouslySetInnerHTML={{ __html: teamData.heading }}></h2>
              <p className="mil-up mil-mb-30">{teamData.paragraph}</p>


             

              <h4 className="mil-up" dangerouslySetInnerHTML={{ __html: teamData.shortParagraph }}></h4>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mil-team-list">
              <div className="mil-lines-place"></div>

              <div className="row mil-mb-60">
                <div className="col-sm-6">
                  {displayMembers.slice(0, 2).map((member, index) => (
                    <div key={member.id} className="mil-team-card mil-up mil-mb-30">
                      <img 
                        src={resolvedImages[member.id] || member.image} 
                        alt={member.name} 
                        onError={(e) => { e.target.src = member.image }}
                      />
                      <div className="mil-description">
                        <div className="mil-secrc-text">
                          <h5 className="mil-muted mil-mb-5">
                            <a href="/home-2">{member.name}</a>
                          </h5>
                          <p className="mil-link mil-light-soft mil-mb-10">{member.designation}</p>
                          <ul className="mil-social-icons mil-center">
                            {member.socialLinks.slice(0, 4).map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <a href={link || '#'} target="_blank" className="social-icon" rel="noopener noreferrer">
                                  <i className={`fab fa-${linkIndex === 0 ? 'behance' : linkIndex === 1 ? 'dribbble' : linkIndex === 2 ? 'twitter' : 'github'}`}></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-sm-6">
                  <p className="mil-mobile-hidden mil-text-sm mil-mb-30" style={{height: '30px'}}>
                    <span className="mil-accent">*</span> The founders of our agency
                  </p>

                  {displayMembers.slice(2, 4).map((member, index) => (
                    <div key={member.id} className="mil-team-card mil-up mil-mb-30">
                      <img 
                        src={resolvedImages[member.id] || member.image} 
                        alt={member.name}
                        onError={(e) => { e.target.src = member.image }}
                      />
                      <div className="mil-description">
                        <div className="mil-secrc-text">
                          <h5 className="mil-muted mil-mb-5">
                            <a href="/home-2">{member.name}</a>
                          </h5>
                          <p className="mil-link mil-light-soft mil-mb-10">{member.designation}</p>
                          <ul className="mil-social-icons mil-center">
                            {member.socialLinks.slice(0, 4).map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <a href={link || '#'} target="_blank" className="social-icon" rel="noopener noreferrer">
                                  <i className={`fab fa-${linkIndex === 0 ? 'behance' : linkIndex === 1 ? 'dribbble' : linkIndex === 2 ? 'twitter' : 'github'}`}></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}