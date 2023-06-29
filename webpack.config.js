const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        Popup: './src/Popup.tsx',
        Options: './src/Options.tsx',
        Content: './src/Content.tsx',
        Background: './src/Background.ts',
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    }
                },
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
            },
            {
                use: ["style-loader", 'css-loader'],
                test: /\.css$/i,
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve("./src/manifest.json"),
                    to: path.resolve("dist")
                },
                {
                    from: path.resolve("./src/assets"),
                    to: path.resolve("dist/assets")
                }
            ],
        }),
        new HtmlWebpackPlugin({
            // template: path.resolve('./src/Base.html'),
            filename: 'Popup.html',
            chunks: ['Popup']
        }),
        new HtmlWebpackPlugin({
            // template: path.resolve('./src/Base.html'),
            filename: 'Options.html',
            chunks: ['Options']
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
};