const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/game-compress.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public" },
            ],
        }),
    ],
    devServer: {
        static: './dist',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: "defaults",
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    }
};
