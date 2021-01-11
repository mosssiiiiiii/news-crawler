const express = require('express');
const webpack = require('webpack');
const config = require('../webpack/development');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
require('../setup/env');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: "/dist/",
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
    if (error) {

        return console.error(error);

    } else {

        console.log(`Development Express server running at http://localhost:${PORT}`);
    }
});
