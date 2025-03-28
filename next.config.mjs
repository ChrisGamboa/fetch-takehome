/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'frontend-take-home.fetch.com',
            port: '',
            search: '',
          },
        ],
      }
}
export default nextConfig;
