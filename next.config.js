/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["upcdn.io", "replicate.delivery", "lh3.googleusercontent.com","jinnispaces.netlify.app"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Nutlope/roomGPT",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/room-GPT",
        permanent: false,
      },
    ];
  },
};
