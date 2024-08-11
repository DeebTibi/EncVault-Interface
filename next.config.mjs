/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["abualdeeb.com", "localhost:3000", "abualdeeb.com:8000"],
    },
  },
};

export default nextConfig;
