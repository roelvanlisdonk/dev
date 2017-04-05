
"use strict";

// Dependencies.
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var plumber = require("gulp-plumber");
var livereload = require("gulp-livereload");
var rollup = require('gulp-rollup');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

/**
 * The default task.
 */
gulp.task("default", function () {
});

/**
 *  Hint all of our custom developed Javascript files.
 */
gulp.task("jshint", function () {

    return gulp.src([
        "wwwroot/**/*.js",
        "!wwwroot/Libraries/**/*.js"
    ])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

/**
 *  Reload the browser, when source files have changed.
 */
gulp.task('reload', function () {
    livereload.reload("/");
});

/**
 *  Rollup ES6 modules into one bundel.
 */
gulp.task('rollup', function () {
    gulp.src('wwwroot/zvdz/app.js', { read: false })
    .pipe(rollup({
        // any option supported by Rollup can be set here, including sourceMap 
        format: 'iife',
        moduleName: 'zvdz',
        sourceMap: true
    }))
    .pipe(sourcemaps.write("."))    // this only works if the sourceMap option is true.
    .pipe(rename(function (path) {
        path.basename = "bundle";   // Set the name of the output bundle by using gulp-rename, because rollup option "dest", doesn't seem to work in gulp-rollup.
    }))
    .pipe(gulp.dest("dist"));
});

/**
 *  Watch *.html, *.css and *.js files for changes, when a change is detected, reload the page.
 */
gulp.task("watch", function () {
    livereload.listen();

    gulp.watch([
        "wwwroot/**/*.html",
        "wwwroot/**/*.js",
        "wwwroot/**/*.css"
    ], ["reload"]);
});

/*
 * Gulp plumber error handler.
 */
function onError(err) {
    console.log(err);
}