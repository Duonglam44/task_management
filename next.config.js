/** @type {import('next').NextConfig} */
const path = require('path');


module.exports = () => {

  const sassOptions = {
    includePaths: [path.join(__dirname, 'assets/sass')],
  };

  const pageExtensions = ['page.tsx', 'page.jsx'];
  
  return {
    swcMinify: true,
    reactStrictMode: true,
    pageExtensions,
    sassOptions,
  }
}
