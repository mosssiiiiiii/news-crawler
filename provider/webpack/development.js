process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const client = {
    name: 'client',
    mode:'development',
    target: 'web',
    entry: ['webpack-hot-middleware/client?name=client&reload=true', `./src/render/client.js`],
    output: {
        filename: 'client.js',
        publicPath: '/dist/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules[\\\/])/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            },
            {
              test: /\.(css|scss)$/,
              use: [
                  {
                      loader: 'css-hot-loader?cssModule=true',
                  },
                  {
                      loader: MiniCssExtractPlugin.loader
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          sourceMap: true,
                          importLoaders: 1
                      }
                  },
              ]
          },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new Dotenv({systemvars: true}),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

const server =     {
    name: 'server',
    mode:'development',
    target: 'node',
    entry: ['webpack-hot-middleware/client?name=server&reload=true', `./src/render/server.js`],
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/dist/',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules[\\\/])/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: 'ignore-loader'
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


module.exports = [client,server];
