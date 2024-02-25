/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.CMS_DOMAIN,
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: process.env.SITE_DOMAIN,
          pathname: '**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  