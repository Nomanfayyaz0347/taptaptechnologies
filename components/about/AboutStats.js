import React, { useEffect, useRef } from 'react';
import { FaProjectDiagram, FaUsers, FaDollarSign } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';


const iconMap = [
  <FaProjectDiagram size={38} color="rgb(216, 0, 255)" style={{marginBottom: 10}} />,
  <FaUsers size={38} color="rgb(216, 0, 255)" style={{marginBottom: 10}} />,
  <FaDollarSign size={38} color="rgb(216, 0, 255)" style={{marginBottom: 10}} />
];

function useCountUp(target, end, duration = 1500, prefix = '', suffix = '', trigger = true) {
  const ref = useRef();
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    let startTime = null;
    function animateCount(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      if (ref.current) {
        ref.current.textContent = `${prefix || ''}${value}${suffix || ''}`;
      }
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        if (ref.current) ref.current.textContent = `${prefix || ''}${end}${suffix || ''}`;
      }
    }
    ref.current.textContent = `${prefix || ''}0${suffix || ''}`;
    requestAnimationFrame(animateCount);
  }, [end, prefix, suffix, trigger]);
  return ref;
}

export default function AboutStats({ achievements, loading, error }) {
  // Prepare stats from API
  const boxes = [
    achievements.ourachievementsbox || null,
    achievements.ourachievementsbox02 || null,
    achievements.ourachievementsbox03 || null
  ].map((box, i) => {
    if (!box) return null;
    if (i === 0) {
      return {
        number: box.ourachievementsbox01number || '',
        content: box.ourachievementsbox02content || '',
      };
    }
    return {
      number: box[`ourachievementsbox0${i+1}number`] || '',
      content: box[`ourachievementsbox0${i+1}content`] || '',
    };
  }).filter(Boolean);

  return (
    <section className="mil-p-60-0 AboutStats" style={{background: '#fff', paddingTop: 80, paddingBottom: 80}}>
      <div className="container">
        <div className="row justify-content-center align-items-center text-center mb-5">
            <div className="col-lg-10">
                <span className="mil-suptitle mil-light-soft mil-suptitle-right mil-up" style={{color: '#000000ff'}}>
                  <span dangerouslySetInnerHTML={{__html: achievements.ourachievementssectionpra || ''}} />
                </span>
              </div>
               <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
              <h2 className="mil-h1 mil-center" style={{color: '#0a0a0aff'}} dangerouslySetInnerHTML={{__html: achievements.ourachievementssectionheading || 'Our <span class="mil-thin">Achievements </span>'}} />
            </div>
          
        </div>
        <div className="row justify-content-center align-items-center text-center">
          {boxes.map((stat, idx) => {
            const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
            const countRef = useCountUp(idx, parseInt(stat.number.replace(/[^\d]/g, '')) || 0, 1500, stat.number.replace(/\d/g, '') || '', '', inView);
            // Combine refs
            function setRefs(el) {
              countRef.current = el;
              inViewRef(el);
            }
            return (
              <div className="col-12 col-md-4 mil-mb-30" key={stat.content}>
                <div className="mil-stats-box mil-up mil-radius mil-p-40-30" style={{background: '#fff', boxShadow: '0 8px 32px 0 rgba(60,60,90,0.08)', border: '1px solid #f0f0f0', minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{marginBottom: 10}}>{iconMap[idx]}</div>
                  <div ref={setRefs} className="mil-stats-value" style={{fontSize: '3.2rem', fontWeight: 800, color: '#d800ff', letterSpacing: '1px', marginBottom: '30px'}}></div>
                  <div className="mil-stats-label mil-dark-soft" style={{fontSize: '1.15rem', color: '#222', opacity: 0.85, fontWeight: 500}}>{stat.content}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-12 text-center">
            <span style={{display: 'inline-block', width: 60, height: 4, background: '#d800ff', borderRadius: 2, opacity: 0.15}}></span>
          </div>
        </div>
      </div>
    </section>
  );
}
