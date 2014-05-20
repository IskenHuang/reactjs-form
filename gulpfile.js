'use strict';

// Load plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    stripDebug = require('gulp-strip-debug'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    bower = require('gulp-bower'),
    bump = require('gulp-bump'),
    jsdoc = require('gulp-jsdoc'),
    connect = require('gulp-connect'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

var bowerConfig = require('./bower.json'),
    npmConfig = require('./package.json'),
    banner = ['/**',
        ' * <%= npmConfig.name %> - <%= npmConfig.description %>',
        ' * @version NPM: v<%= npmConfig.version %>',
        ' * @version Bower: v<%= bowerConfig.version %>',
        ' * @link <%= npmConfig.homepage %>',
        ' * @license <%= npmConfig.license %>',
        ' */',
        ''].join('\n');

// Scripts
gulp.task('scripts', function () {
    return gulp.src([
            'app/scripts/*.jsx',
            'app/scripts/*.js',
        ])
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        // .pipe(header( banner, {
        //     bowerConfig: bowerConfig,
        //     npmConfig: npmConfig
        // }))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(connect.reload());
});

gulp.task('scripts-prod', function () {
    // return gulp.src([

    //     ])
    //     .pipe(jshint('.jshintrc'))
    //     .pipe(jshint.reporter('default'))
    //     .pipe(concat( npmConfig.name + '.debug.js'))
    //     .pipe(header( banner, {
    //         bowerConfig: bowerConfig,
    //         npmConfig: npmConfig
    //     }))
    //     .pipe(gulp.dest('dist/'))

    //     .pipe(rename( npmConfig.name + '.js'))
    //     .pipe(stripDebug())
    //     .pipe(gulp.dest('dist/'))

    //     .pipe(uglify())
    //     .pipe(header( banner, {
    //         bowerConfig: bowerConfig,
    //         npmConfig: npmConfig
    //     }))
    //     .pipe(rename({
    //         suffix: '.min',
    //     }))
    //     .pipe(gulp.dest('dist/min/'));
});

// Html
gulp.task('html', function () {
    return gulp.src([
            'app/*.html',
        ])
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

// images
gulp.task('trend-images', function () {
    return gulp.src([
            'app/bower_components/trend-branding-styleguide/dist/3.0/img/',
        ])
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
});

gulp.task('jsdoc', function(){
    return gulp.src([
            'app/' + npmConfig.name + '.js',
        ])
        .pipe(jsdoc.parser({
            name: npmConfig.name,
            description: npmConfig.description,
            version: 'v'+ npmConfig.version,
            licenses: npmConfig.license,
            plugins: [],
        }, npmConfig.name))
        .pipe(jsdoc.generator('./dist/doc'));
});

gulp.task('updateVersion', function() {
    return gulp.src([
            'bower.json',
            'package.json',
        ])
        // major|minor|patch|prerelease
        .pipe(bump({ type: 'patch' }))
        .pipe(gulp.dest('./'));
});

// bower
gulp.task('bower', function() {
    return bower('app/bower_components')
        .pipe(gulp.dest('dist/bower_components'));
});

// Watch
gulp.task('watch', function () {
    // Watch .html files
    gulp.watch( 'app/*.html', ['html']);

    // Watch .js files
    gulp.watch( ['app/scripts/*.js', 'app/scripts/*.jsx'], ['scripts']);
});

// Githooks
gulp.task('githooks', function () {
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false}).pipe(clean());
});

// Server
gulp.task('connect', function(){
    connect.server({
        root: [
            // 'dist',
            'app',
        ],
        port: 9000,
        livereload: true,
        // open: {
        //     // browser: 'chrome', // if not working OS X browser: 'Google Chrome'
        //     file: 'welcome.html',
        // },
        // middleware: function(connect, o) {
        //     return [
        //         // ...
        //     ]
        // }
    });
});

// Build
gulp.task('build', [
    'updateVersion',
    'bower',
    'scripts-prod',
    // 'jsdoc',
], function(){
    gulp.start('test');
    console.log('build end');
    return;
});

gulp.task('dev', [
    'bower',
    'trend-images',
    'scripts',
    'html',
    'connect',
    'watch',
], function(){
    console.log('dev server is start at localhost: 9000');
    return;
});

// Default task
gulp.task('default', ['clean'], function () {
    return gulp.start('build');
});

gulp.task('test', function () {
    return gulp
        .src('test/phantomjs.html')
        .pipe(mochaPhantomJS());
});