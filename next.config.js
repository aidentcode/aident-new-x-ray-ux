const { withNextVideo } = require("next-video/process");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["three", "@mui/material", "@mui/x-tree-view"],
    webpack: (config, { isServer }) => {
        // Suppress fetchPriority warning
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            {
                module: /node_modules\/next\/dist\/client\/image-component\.js$/,
                message: /React does not recognize the `fetchPriority` prop/,
            },
        ];
        return config;
    },
};

module.exports = withNextVideo(nextConfig);
