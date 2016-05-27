
"use strict";

// Dependencies.
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var plumber = require("gulp-plumber");
var livereload = require("gulp-livereload");

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