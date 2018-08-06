const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const opn = require('opn');
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

const { dev } = require('../config');
const port = process.env.PORT || dev.port;
const url = `http://localhost:${ port }`;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const devMiddleware = webpackDevMiddleware(compiler, {
  	publicPath: config.output.publicPath
});
app.use(devMiddleware);

const hotMiddleware = webpackHotMiddleware(compiler, {
    heartbeat: 5e3
});

compiler.plugin('compilation', compilation => {
	compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
		hotMiddleware.publish({
			action: 'reload'
		})
		cb()
	})
});
let resolve;
const ready = new Promise(r => resolve = r);

app.use(hotMiddleware);
app.use(require('connect-history-api-fallback')());

devMiddleware.waitUntilValid(_ => {
	console.log(`> Listening at ${ url }\n`)
	if (process.env.NODE_ENV !== 'production') {
		opn(url)
	}
	resolve()
})
// Serve the files on port.
app.listen(port)

module.exports = {
	ready
}