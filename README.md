# Silkway Global

Silkway Global is a modern, multilingual landing site built with React and Vite. The application focuses on international education and travel consulting, offering an engaging user experience with responsive design, dynamic program pages, localized content, and integrated mapping support.

## Project Overview

- Built with React 19 and Vite for fast development and optimized builds
- Uses Tailwind CSS for styling and responsive layouts
- Supports English, Russian, and Kazakh via `react-i18next` and browser language detection
- Includes country-specific program routing and modular page sections
- Integrates Yandex Maps for contact/location display
- Uses Swiper for interactive sliders and React Router for navigation

## Key Features

- Multilingual interface with locale resources loaded from `public/locales`
- Routing for homepage and country-specific programs
- Reusable component structure for hero, about, programs, team, testimonials, and contact sections
- Optimized assets with image optimization and Tailwind integration

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Recommended Improvements

- Add TypeScript support for stronger typing
- Extend ESLint configuration for production-grade quality checks
- Add unit tests for key components and routing logic
- Improve accessibility and SEO metadata for the landing pages
