/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    require-trusted-types-for 'script';
`

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
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: cspHeader.replace(/\n/g, ''),
            },
          ],
        },
      ]
    },
  };
  
  module.exports = nextConfig;
  