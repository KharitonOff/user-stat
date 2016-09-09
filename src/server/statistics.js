'use strict'
var detect = require('language-detect');

module.exports = {
    call: function (req, done) {

        var language = detect.contents(req.body.filename, req.body.content)
        console.log('api called with ', arg.body)
        console.log('detected ', langauge)
        done(null, 'ok')
    }
}