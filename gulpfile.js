'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

// Style
gulp.task('styles', ['styles:app', 'styles:vendor']);

gulp.task('styles:app', function () {
    return gulp.src('scss/style.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});

gulp.task('styles:vendor', function () {
    return gulp.src([
        'node_modules/purecss/build/pure-min.css',
        'node_modules/purecss/build/grids-responsive-min.css'
    ])
    .pipe($.concat('pure-custom.css'))
    .pipe(gulp.dest('css/'));
});

// Server
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['styles']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
