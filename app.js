var http = require('http');
var express = require('express');
var statisticsApi = require('./src/server/statistics.js')

var app = new express();
var port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack')
    var webpackDevMiddleware = require('webpack-dev-middleware')
    var webpackConfig = require('./webpack.config')
    var compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath, lazy:false }))
}

app.use('/app', express.static('app'));
app.use('/node_modules', express.static('node_modules'));
app.use('/dist', express.static('dist'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});


app.all('/api/v0/language', function(req, res) {
    res.set('Content-Type', 'application/json');

    statisticsApi.call(req, function(err, obj) {
        console.log('api should be called')
        if (err) {
            return res.status(err.code > 0 ? err.code : 500).send(JSON.stringify(err.text || err));
        }
        res.send(obj)
    })
})

http.createServer(app).listen(port).on('listening', function() {

})