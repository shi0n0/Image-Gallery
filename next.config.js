/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  serverActions: true,
},
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'kotonohaworks.com',
      'cdn-common.skima.jp',
      'manobwjepjqodaznaott.supabase.co'
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};