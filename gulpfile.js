var gulp = require('gulp')
var uglify = require('gulp-uglify')
var miniCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var del = require('del')
// var imagein = require('gulp-imagein')
var less = require('gulp-less')
// var sass = require('gulp-ruby-sass')


/**
 * delete files
 */
gulp.task('del', function () {
    del(['dist/js/*.js', 'dist/css/*.css'], function (err, paths) {
        if (err) {
            console.error('Deleted error!')
        }
        console.log('Deleted files/folders:\n', paths.join('\n'))
    })
})

/**
 * JavaScript uglify
 */
gulp.task('scripts', ['del'], function () {
    gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            basename: 'app',
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(gulp.dest('dist/js'))
})

/**
 * CSS minify
 */
gulp.task('styles', ['del'], function () {
    gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(miniCss())
        .pipe(rename({
            basename: 'main',
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulp.dest('dist/css'))
})

/**
 * less
 */
gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
})

/**
 * images
 */

/**
 * watch file change
 */
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts'])
    gulp.watch('src/css/*.css', ['styles'])
    gulp.watch('src/less/*.less', ['less'])
})

/**
 * default
 */
gulp.task('default', ['less', 'scripts', 'watch'], function () {
    console.log('default task run')
})
