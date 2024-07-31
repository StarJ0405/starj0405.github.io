/** @type {import('next').NextConfig} */
const prefix =
  process.env.NODE_ENV === 'production' ? 'https://starj0405.github.io/' : ''
const nextConfig = {
    output: 'export',
};

export default nextConfig;
