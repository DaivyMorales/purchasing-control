module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Allow requests from any origin
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_API_URL,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With,Accept,Content-Type",
          },
        ],
      },
    ];
  },
};
