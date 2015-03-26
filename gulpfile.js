'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    reload = browserSync.reload;

var config = {
    vendor_styles: [
        "./bower_components/bootstrap/dist/css/bootstrap.min.css",
        "./bower_components/angular-chart.js/dist/angular-chart.css",
        "./bower_components/ngActivityIndicator/css/ngActivityIndicator.min.css"
    ],
    vendor_scripts: [
        'node_modules/underscore/underscore-min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap.min.js',
        './bower_components/Chart.js/Chart.min.js',
        './bower_components/angular-chart.js/dist/angular-chart.min.js',
        './bower_components/ngActivityIndicator/ngActivityIndicator.min.js'
    ],
    src_css:"app/assets/css/**/*.scss",
    src_views: './app/**/*.html',
    src_img: './app/assets/img/*',
    src_fonts: './app/assets/fonts/*',
    src_scripts: './app/**/*.js',
    dest_css:'./dist/assets/css/',
    dest_scripts: './dist/assets/js/'

};


//clean
gulp.task('clean', function() {
    return gulp.src('./dist/*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('browserSync', function() {
    browserSync.init({
        open: false,
        server: {
            baseDir: "./dist/"
        }
    });
});



//Css
gulp.task('css', function() {
    gulp.src(config.vendor_styles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(config.dest_css));

    gulp.src(config.src_css)
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.dest_css))
        .pipe(reload({
            stream: true
        }));
});

//JSHint
gulp.task('lint', function() {

    gulp.src(config.src_scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Js task
gulp.task('js', function() {
    var src = [
        'app/**/*module*.js',
        'app/**/*.js'
    ];

    gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify()) //production only!
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest_scripts))
        .pipe(reload({
            stream: true
        }));
});

// vendor js files
gulp.task('vendor-js', function() {
    gulp.src(config.vendor_scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest_scripts));

});

//Copy html
gulp.task('views', function() {
    gulp.src(config.src_views)
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({
            stream: true
        }));
});

//Copy images
gulp.task('img', function() {
    gulp.src(config.src_img)
        .pipe(gulp.dest('./dist/assets/img/'))
        .pipe(reload({
            stream: true
        }));
});

//Copy images
gulp.task('fonts', function() {
    gulp.src(config.src_fonts)
        .pipe(gulp.dest('./dist/assets/fonts/'))
        .pipe(reload({
            stream: true
        }));
});

//watch all of this
gulp.task('watch', ['lint', 'views', 'css', 'img', 'fonts', 'vendor-js', 'js', 'browserSync'], function() {
    gulp.watch(config.src_fonts, ['fonts']);
    gulp.watch(config.src_views, ['views']);
    gulp.watch(config.src_img, ['img']);
    gulp.watch(config.src_css, ['css']);
    gulp.watch(config.src_scripts, ['lint', 'js']);
});

gulp.task('default', ['watch']);