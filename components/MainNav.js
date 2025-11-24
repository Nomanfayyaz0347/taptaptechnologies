import Link from 'next/link';


// Sync with Navigation menuItems in SimpleLayout.js
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
];

export default function MainNav({ activePath = '' }) {
  return (
    <nav className="mil-footer-menu mil-mb-60">
      <ul>
        {navLinks.map(link => (
          <li
            key={link.href}
            className={`mil-up${activePath === link.href ? ' mil-active' : ''}`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
