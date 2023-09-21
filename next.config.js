/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CMS_URL: "https://pha.mintleafmarketing.com",
    SITE_URL: process.env.SITE_URL,
    // CMS_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['pha.mintleafmarketing.com'],
  },
}

module.exports = nextConfig
