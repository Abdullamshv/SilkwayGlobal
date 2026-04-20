const fs = require('fs');
const path = require('path');

const src = 'src';
const dirs = ['data', 'styles', 'sections', 'pages'];

dirs.forEach(d => fs.mkdirSync(path.join(src, d), {recursive: true}));

const moves = [
  ['tailwind.css', 'styles/tailwind.css'],
  ['fonts.css', 'styles/fonts.css'],
  ['components/Styles.css', 'styles/global.css'],
  ['components/whyUs/WhyUsData.jsx', 'data/whyUsData.js'],
  ['components/testimonials/TestimonialsData.jsx', 'data/testimonialsData.js'],
  ['components/menu/MenuData.jsx', 'data/menuData.js'],
  ['components/heroSection/Home.jsx', 'pages/Home.jsx'],
  ['components/heroSection', 'sections/heroSection'],
  ['components/about', 'sections/about'],
  ['components/articles', 'sections/articles'],
  ['components/contacts', 'sections/contacts'],
  ['components/programs', 'sections/programs'],
  ['components/programsSections', 'sections/programsSections'],
  ['components/team', 'sections/team'],
  ['components/testimonials', 'sections/testimonials'],
  ['components/whyUs', 'sections/whyUs']
];

moves.forEach(([from, to]) => {
  const f = path.join(src, from);
  const t = path.join(src, to);
  if (fs.existsSync(f)) {
    fs.renameSync(f, t);
    console.log(`Moved ${from} to ${to}`);
  } else {
    console.log(`Not found: ${from}`);
  }
});
