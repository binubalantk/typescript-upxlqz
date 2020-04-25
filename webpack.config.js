const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const env = require('./env');

const distPath = './dist/';
module.exports = [
    {
        mode: 'development',
        entry: {
            applicaiton: './src/index.ts'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.html', '.js', '.json']
        },
        output: {
            path: path.resolve(distPath),
            filename: "bundle_" + env.versionStringLong + ".js"
        },
        target: 'web',
        plugins: [
            new webpack.DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./html/index.html"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|js)?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                }, {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: 'html-loader'
                }, {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: 'file-loader'
                }, {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'file-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }, {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                },

            ]
        },
        //Enable sourcemaps for debugging webpack's output
        devtool: "source-map"
    }
];

