'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const babelify = require('babelify');

function styles() {
    return gulp.src('./assets/src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./assets/dist/css'))
    .pipe(browserSync.stream());
}

// Scripts
function scripts() {
    return gulp.src('./assets/src/js/**/*.js')
    .pipe(source('script.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/dist/js'))
    .pipe(browserSync.stream());
}

// Basic configuration example
const config = {
    mode: {
        symbol: {
            dest: '.',
            sprite: 'svg-sprite.svg',
            example: true
        }
    }
};

function svg() {
    return gulp.src('./assets/src/svg/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./assets/dist/svg'));
}

function images() {
    return gulp.src('./assets/src/images/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('./assets/dist/images'));
}

function watch(){
    browserSync.init({
        proxy: "sjoerd.test"
    });
    gulp.watch('./assets/src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./assets/src/js/**/*.js', gulp.series('scripts'));
}

exports.styles = styles;
exports.scripts = scripts;
exports.svg = svg;
exports.images = images;
exports.watch = watch;
