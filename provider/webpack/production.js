process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const distDir = path.resolve(process.cwd(), '.' + '/dist');
const srcDir = path.resolve(process.cwd(), './src/render');

const client = {
        name: 'client',
        mode: 'production',
        target: 'web',
        performance: {hints: false},
        entry: [`${srcDir}/client.js`],
        output: {
            path: distDir,
            filename: 'client.js',
            publicPath: distDir
        },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules[\\\/])/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/public',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                            }
                        }
                    },

                ]
            },
            {
                test: /\.(png|jpg|svg|ico)$/,
                loader: 'url-loader'
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new Dotenv({systemvars: true}),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    }
                },
                extractComments: {
                    banner: false
                },
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {discardComments: {removeAll: true}}
            })
        ]
    }
    };
const server = {
    name: 'server',
    mode: 'production',
    target: 'node',
    performance: {hints: false},
    entry: [`${srcDir}/server.js`],
    output: {
        path: distDir,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: distDir,
    },
    externals: {
        bufferutil: 'commonjs bufferutil',
        'utf-8-validate': 'commonjs utf-8-validate',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules[\\\/])/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: 'ignore-loader'
            }
        ],
    },
    plugins: [

        new StatsPlugin('stats.json', {
            chunkModules: true,
            modules: true,
            chunks: true,
            exclude: [/node_modules[\\\/]react/],
        }),
    ],
};
module.exports = [client,server];
