'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//clean
gulp.task('clean', function() {
    return gulp.src('./dist/*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});



//Css
gulp.task('css', function() {
    gulp.src("bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/assets/css/'));

    gulp.src("app/assets/css/**/*.css")
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(reload({
            stream: true
        }));
});

//JSHint
gulp.task('lint', function() {
    var src = [
        'app/**/*.js'
    ];
    gulp.src(src)
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
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js/'))
        .pipe(reload({
            stream: true
        }));
});

// vendor js files
gulp.task('vendor-js', function() {
    gulp.src([
            './bower_components/angular/angular.min.js',
            './bower_components/angular-route/angular-route.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap.min.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/assets/js/'));

});

//Copy html
gulp.task('views', function() {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({
            stream: true
        }));
});

//watch all of this
gulp.task('watch', ['lint', 'views', 'css', 'vendor-js', 'js', 'browserSync'], function() {
    gulp.watch('./app/**/*.html', ['views']);
    gulp.watch('./app/assets/css/**/*.css', ['css']);
    gulp.watch('./app/**/*.js', ['lint', 'js']);
});

gulp.task('default', ['watch']);