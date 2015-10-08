'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var eslint= require('gulp-eslint');
var open = require('gulp-open');
var del = require('del');
var url = require('url');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = {
    example: require('./example/webpack.config.js')
};

var WPACK_DEV_HOST = 'localhost';
var WPACK_DEV_PORT = 8080;

var urlBuilder = function(host, port, path){
    return url.format({
        protocol: 'http',
        hostname: host,
        port: port,
        pathname: path
    });
};

gulp.task('open', function(){
    var path = 'webpack-dev-server/index.html';
    var uri = urlBuilder(WPACK_DEV_HOST, WPACK_DEV_PORT, path);
    gulp.src('').pipe(open({ uri: uri }));
});

gulp.task('clean', function(cb){
    del(['lib']).then(function(){
        cb();
    });
});

gulp.task('babel', ['clean'], function(){
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('webpack-dev-server', function(){
    new WebpackDevServer(webpack(webpackConfig.example), {
        publicPath: '/assets/',
        contentBase: 'example',
        hot: true,
        stats: { colors: true }
    }).listen(WPACK_DEV_PORT, WPACK_DEV_HOST, function(err){
        if(err){ throw new gutil.PluginError('webpack-dev-server', err); }
    });
});

gulp.task('lint', function(){
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['lint']);
    gulp.watch('test/**/*.js', ['lint']);
});

gulp.task('build', ['clean', 'babel']);
gulp.task('default', ['webpack-dev-server', 'open']);
