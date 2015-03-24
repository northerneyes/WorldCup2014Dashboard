var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin');

//clean
gulp.task('clean', function() {
    return gulp.src('./dist/*', {
            read: false
        })
        .pipe(clean());
});

//Css
gulp.task('css', function() {
    gulp.src("bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/assets/css/'))

    gulp.src("app/assets/css/**/*.css")
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/assets/css/'))
});

//JSHint
gulp.task('lint', function() {
      var  src = [
            'app/**/*module*.js',
            'app/components/**/*.js'
        ];
    gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

//Js task
gulp.task('js', function() {
    var  src = [
        'app/**/*module*.js',
        'app/components/**/*.js'
    ];

    gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js/'))
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
    return gulp.src('./app/**/*.html', {
            base: './app'
        })
        .pipe(gulp.dest('./dist/'));
});

//watch all of this
gulp.task('watch', ['lint', 'views', 'css', 'vendor-js', 'js'], function() {
    gulp.watch('./app/**/*.html', ['views']);
    gulp.watch('./app/assets/css/**/*.css', ['css']);
    gulp.watch('./app/**/*.js', ['lint', 'js']);
});

gulp.task('default', ['watch']);