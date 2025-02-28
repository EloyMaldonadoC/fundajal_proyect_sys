/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inicio",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  }
};

export default nextConfig;
