'use strict';

var gulp = require('gulp');
var common = require('./gulp/common.js');

gulp.task('dev', function () {
    common.COMPASS_CONFIG.sourcemap = true;
    require('./gulp/dev.js');
    gulp.start('compass');
    // gulp.start('browserSync');
    gulp.start('start_react_server');
    gulp.watch(common.DIRS.js_client, ['compile']);
    gulp.watch(common.DIRS.js_server, ['restart_react_server']);
    gulp.watch(common.DIRS.img, ['imagemin']);
    gulp.watch(common.DIRS.scss, ['scss']);
});
