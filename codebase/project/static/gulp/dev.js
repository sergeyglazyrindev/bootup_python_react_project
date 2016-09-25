'use strict';

var gulp = require('gulp');
var common = require('./common.js');
var compass = require('gulp-compass');

gulp.task('scss', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(compass(common.COMPASS_CONFIG));
});
gulp.task('restart_react_server', function () {
    // or more concisely
    var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { sys.puts(stdout); };
    exec("node render_server.js &", puts);
    exec("kill -9 `ps aux | grep render | grep -v grep | awk '{print"
         + " $2}'`; node render_server.js &", puts);
});
gulp.task('start_react_server', function () {
    // or more concisely
    var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { sys.puts(stdout); };
    exec("node render_server.js &", puts);
});
