import { useEffect } from 'react';
import { useState } from 'react';
import styles from './ModalContact.module.css';


export default function ModalContact({ open, onClose }) {
  const [form, setForm] = useState({});
  const [fields, setFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  // Fetch and parse fields from API
  useEffect(() => {
    async function fetchFields() {
      const res = await fetch('https://taptaptechnologies.com/wp-json/wp/v2/pages/996');
      const data = await res.json();
      const html = data.content.rendered;
      // Parse fields from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const labels = Array.from(doc.querySelectorAll('label'));
      const parsedFields = labels.map(label => {
        const input = label.querySelector('input, textarea');
        if (!input) return null;
        // Some fields use aria-required instead of required property
        const isRequired = input.required || input.getAttribute('aria-required') === 'true';
        return {
          label: label.childNodes[0]?.textContent?.replace(/\n|\r/g, '').trim() || '',
          name: input.name,
          type: input.tagName.toLowerCase() === 'textarea' ? 'textarea' : input.type,
          required: isRequired,
          autoComplete: input.autocomplete || undefined,
          maxLength: input.maxLength > 0 ? input.maxLength : undefined,
          rows: input.rows || undefined,
        };
      }).filter(Boolean);
      setFields(parsedFields);
      // Set initial form state
      const initialForm = {};
      parsedFields.forEach(f => { initialForm[f.name] = ''; });
      setForm(initialForm);
    }
    fetchFields();
  }, []);

  if (!open && !closing) return null;

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Prevent submit if any required field is empty
    for (const f of fields) {
      if (f.required && !form[f.name]?.trim()) {
        return; // Do not submit
      }
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Reset all fields
      const resetForm = {};
      fields.forEach(f => { resetForm[f.name] = ''; });
      setForm(resetForm);
      handleClose();
    }, 1200);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 400);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClose}
    >
      <div
        className={styles.modalBox + (closing ? ' ' + styles.closing : '')}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={handleClose} className={styles.closeBtn}>&times;</button>
        <h3 className={styles.modalHeading}>Giving your vision a smooth transition to reality</h3>
        <p className={styles.modalPara}>By enabling an innovative digital experience<br/>that fulfills new-age demands.</p>
        {submitted ? (
          <div className={styles.modalThankYou}>Thank you! We received your message.</div>
        ) : (
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {fields.map(f => (
            f.type === 'textarea' ? (
              <textarea
                key={f.name}
                name={f.name}
                required={f.required}
                placeholder={f.label}
                value={form[f.name] || ''}
                onChange={handleInput}
                className={styles.modalTextarea}
                maxLength={f.maxLength}
                rows={f.rows || 5}
                style={{display: 'block', marginBottom: 12}}
              />
            ) : (
              <input
                key={f.name}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.label}
                value={form[f.name] || ''}
                onChange={handleInput}
                className={styles.modalInput}
                maxLength={f.maxLength}
                autoComplete={f.autoComplete}
                style={{display: 'block', marginBottom: 0}}
              />
            )
          ))}
          <button type="submit" className={styles.modalSubmit}>Submit</button>
        </form>
        )}
      </div>
    </div>
  );
}
