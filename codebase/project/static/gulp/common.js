'use strict';

process.env.NODE_ENV = "production";

var lintWhileCompilation = true;
var compressJs = true;
try {
    var local = require('./local.js');
    lintWhileCompilation = local.lintWhileCompilation;
    compressJs = local.lintWhileCompilation;
} catch (exc){
    local = false;
}
var argv = require('minimist')(process.argv);
if (argv.force_lint) {
    lintWhileCompilation = true;
}

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var eslint = require('gulp-eslint');
var extend = require('extend');
var compass = require('gulp-compass');

var DIRS = {
    img: ['./src/img/**/*.png', './src/img/**/*.jpg',
          './src/img/**/*.svg'],
    gif: ['./src/img/**/*.gif'],
    fav: ['./src/img/favicon.ico'],
    scss: './src/sass/**/*.scss',
    js_client: ['./src/js/client/**/*.js*',
                '!./src/js/client/vendor/**/*.js'],
    js_server: ['./src/js/server/**/*.js*']
};

var COMPASS_CONFIG = {
    config_file: './config.rb',
    css: './build/css',
    sass: './src/sass',
    sourcemap: false
};

gulp.task('fav', function () {
    return gulp.src(DIRS.fav)
        .pipe(gulp.dest('./build/'));
});

gulp.task('gif', function () {
    return gulp.src(DIRS.gif)
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('imagemin', ['fav', 'gif'], function () {
    return gulp.src(DIRS.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/img'));
});

gulp.task('lint', function () {
    return gulp.src(DIRS.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('compass', ['imagemin'], function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(compass(COMPASS_CONFIG));
});

gulp.task('scss', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(compass(COMPASS_CONFIG));
});

var webpack = require('webpack');
var glob = require("glob");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var gutil = require("gulp-util");
var fs = require('fs');
var JS_PATH = 'src/js/client/apps/';
var JS_BUILD_PATH = path.resolve('build');
var buildPath = path.resolve(JS_BUILD_PATH,  'apps');
try {
    fs.statSync(buildPath);
} catch (err) {
    fs.mkdir(buildPath);
}

gulp.task('compile', lintWhileCompilation ? ['lint'] : [], function (done) {
    glob(JS_PATH + "**/*.js*", {}, function (er, files) {
        var chunkNameToFile = {};
        files.forEach(function (file) {
            var chunkName = file.split('/').pop().split('.')[0];
            chunkNameToFile[chunkName] = file;
        });
        var plugins = [];
        if (compressJs) {
            plugins.push(
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    },
                    mangle: {
                        except: ['$super', '$', 'exports', 'require']
                    }
                })
            );
        }
        webpack(extend({}, require('./webpack.config.js'), {
            entry: chunkNameToFile,
            resolve: {
                root: path.resolve('./')
            },
            output: {
                filename: '[name].js',
                chunkFilename: '[name].[id].js',
                path: path.resolve('build/apps'),
                publicPath: '/static/build/apps/'
            },
            plugins: plugins
        }), function (err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({}));
            done();
        });
    });
});

module.exports = {
    DIRS: DIRS,
    COMPASS_CONFIG: COMPASS_CONFIG
};
