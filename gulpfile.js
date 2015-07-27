var gulp = require('gulp')
var uglify = require('gulp-uglify')
var miniCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var del = require('del')
var imagemin = require('gulp-imagemin')
var pngquant = require('imagemin-pngquant')
var sprite = require('gulp-sprite')
var less = require('gulp-less')
var sass = require('gulp-ruby-sass')
var base64 = require('gulp-base64')
var copy = require('copy')


/**
 * delete files
 */
gulp.task('del', function () {
    del(['dist/**/*.*'], function (err, paths) {
        if (err) {
            console.error('Deleted error!')
        }
        console.log('Deleted files/folders:\n', paths.join('\n'))
    })
})

/**
 * copy files
 */
gulp.task('copy', function (cb) {
    copy('src/image/sprites.png', 'dist/image', cb)
})

/**
 * JavaScript uglify
 */
gulp.task('scripts', function () {
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
gulp.task('styles', function () {
    gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(base64())
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
 * sass
 */
gulp.task('sass', function () {
    return sass('src/sass/')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('src/css'));
})

/**
 * images
 */
gulp.task('imagemin', function () {
    gulp.src('src/image/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/image'))
})

/**
 * sprite
 */
gulp.task('sprite:src', function () {
    gulp.src('src/image/icon/*.png')
        .pipe(sprite('sprites.png', {
            imagePath: 'src/image',
            cssPath: 'src/css/',
            preprocessor: 'css'
        }))
        .pipe(gulp.dest('src/image'));
})

gulp.task('sprite:dist', function () {
    gulp.src('src/image/icon/*.png')
        .pipe(sprite('sprites.png', {
            imagePath: 'dist/image',
            cssPath: 'src/css/',
            preprocessor: 'css'
        }))
        .pipe(gulp.dest('src/image'));
})

/**
 * watch file change
 */
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts'])
    gulp.watch('src/css/*.css', ['styles'])
    gulp.watch('src/less/*.less', ['less'])
    gulp.watch('src/image/*.png', ['imagemin'])
    gulp.watch('src/image/icon/*.png', ['sprite'])
})

/**
 * default
 */
gulp.task('default', ['less', 'sass', 'styles', 'scripts', 'imagemin', 'sprite', 'watch'], function () {
    console.log('default task run')
})
