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
            value:
              "http://localhost:3000, https://purchasing-control-git-testing-deploy-daivymorales-s-team.vercel.app",
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
