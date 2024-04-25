/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    icnludePaths: [path.join(__dirname, 'styles')],
  }
};

module.exports = nextConfig;
