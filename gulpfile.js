"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server"], function () {
    return gulp.src(["src/**/*", "!**/*.ts", "!src/server", "!src/server/**", "index.html", "systemjs.config.js"])
        .pipe(gulp.dest("build"));
});

/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["styles.css"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        'systemjs/dist/system-polyfills.js', 
        'core-js/client/shim.min.js',
        'systemjs/dist/system.src.js',
        'zone.js/dist/**/*.+(js|js.map)',
        'es6-shim/es6-shim.js',
        'reflect-metadata/**/*.+(ts|js|js.map)',
        '@angular/**/*.+(js|js.map)', 
        'rxjs/**/*.+(js|js.map)', 
        'moment/**/*.+(js|js.map)'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources','server','assets', 'libs'], function () {
    console.log("Building the project ...");
});
