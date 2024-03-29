import { NextRequest, NextResponse } from 'next/server'
 

// style-src 'self' 'nonce-${nonce}' ${process.env.CMS_DOMAIN};

// currently bypassing nonce support on inline style objects because
// it's not supported by the current version of the ui framework.

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${process.env.CMS_DOMAIN} 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${process.env.CMS_DOMAIN};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
// require-trusted-types-for 'script';

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  return response
}