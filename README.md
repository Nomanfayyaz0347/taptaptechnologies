# Ashley Next.js Project

This is a Next.js conversion of the Ashley HTML template. The project has been converted from static HTML to a dynamic React/Next.js application without using TypeScript or the src folder structure.

## Features

- ✅ Next.js 14 with JavaScript (no TypeScript)
- ✅ No src folder structure (pages in root)
- ✅ Static assets in public folder
- ✅ Responsive design
- ✅ Custom CSS from original template
- ✅ All JavaScript libraries included
- ✅ Image optimization with Next.js Image component
- ✅ Custom 404 page
- ✅ SEO optimized with Next.js Head

## Project Structure

```
ashley-nextjs/
├── components/
│   └── Layout.js          # Shared layout component
├── pages/
│   ├── _app.js           # Custom App component
│   ├── _document.js      # Custom Document component
│   ├── index.js          # Home page
│   ├── services.js       # Services page
│   ├── portfolio.js      # Portfolio page
│   ├── contact.js        # Contact page
│   └── 404.js           # Custom 404 page
├── public/
│   ├── img/             # All images from original template
│   └── js/              # JavaScript libraries
├── styles/
│   ├── globals.css      # Global styles
│   ├── style.css        # Main stylesheet
│   └── plugins/         # CSS plugins
├── package.json
├── next.config.js
└── README.md
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages Created

- `/` - Home page (converted from home-1.html)
- `/services` - Services listing page
- `/portfolio` - Portfolio grid page
- `/contact` - Contact form page
- `/404` - Custom 404 error page

## Key Conversions Made

1. **HTML to JSX**: Converted all HTML attributes to JSX format (className, htmlFor, etc.)
2. **Images**: Used Next.js Image component for optimization
3. **Links**: Replaced anchor tags with Next.js Link component where appropriate
4. **CSS**: Maintained original CSS structure in styles directory
5. **JavaScript**: Kept original JavaScript files in public directory
6. **SEO**: Added proper meta tags and title tags for each page

## Original Template Features Preserved

- Custom cursor animations
- Preloader animations
- Smooth scrolling
- Menu animations
- All original styling and effects
- Responsive design
- All CSS animations and transitions

## Dependencies

- Next.js 14.0.0
- React 18
- ESLint for code quality

## Browser Support

This project supports all modern browsers that support Next.js and React 18.

## Notes

- All original CSS and JavaScript files have been preserved
- Images are optimized using Next.js Image component
- The project maintains the original design and functionality
- No TypeScript used as requested
- No src folder structure as requested