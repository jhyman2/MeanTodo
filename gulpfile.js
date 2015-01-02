var gulp  = require('gulp'),
uglify    = require('gulp-uglify'),
rename    = require('gulp-rename'),
concat    = require('gulp-concat'),
concatCSS = require('gulp-concat-css'),
uglifyCSS = require('gulp-minify-css');

// Copy JS
gulp.task('copyJS', function() {
  return gulp.src([
      __dirname + '/bower_components/jquery/dist/jquery.js',
      __dirname + '/bower_components/bootstrap/dist/js/bootstrap.js',
      __dirname + '/bower_components/bootstrap-growl/jquery.bootstrap-growl.js',
    ])
    .pipe(gulp.dest(__dirname + '/public/js/libs/'));
});

// Copy CSS
gulp.task('copyCSS', function() {
  return gulp.src([
      __dirname + '/bower_components/bootstrap/dist/css/bootstrap.css',
      __dirname + '/bower_components/bootstrap/dist/css/bootstrap.css.map',
      __dirname + '/bower_components/font-awesome/css/font-awesome.css'
    ])
    .pipe(gulp.dest(__dirname + '/public/css/'));
});

// Copy Fonts
gulp.task('copyFonts', function() {
  return gulp.src([
      __dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.eot',
      __dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.svg',
      __dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
      __dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.woff',
      __dirname + '/bower_components/font-awesome/fonts/FontAwesome.otf'
    ])
    .pipe(gulp.dest(__dirname + '/public/fonts/'));
});

// Libraries
gulp.task('libs', function() {
  return gulp.src([
      __dirname + '/public/js/libs/jquery.js',
      __dirname + '/public/js/libs/bootstrap.js',
      __dirname + '/public/js/libs/jquery.bootstrap-growl.js'
    ])
    .pipe(concat('libs.all.js'))
    .pipe(uglify())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest(__dirname + '/build/js/libs/'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src(__dirname + '/public/css/*.css')
    .pipe(concatCSS('main.all.css'))
    .pipe(uglifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(__dirname + '/build/css/'));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src(__dirname + '/public/fonts/*')
    .pipe(gulp.dest(__dirname + '/build/fonts/'));
});

// Uglify JS
gulp.task('scripts', function() {
  return gulp.src(__dirname + '/public/js/*.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(__dirname + '/build/js/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('/public/js/**/*.js', ['copyJS', 'copyCSS', 'copyFonts']);
});

// Build
gulp.task('build', ['libs', 'styles', 'fonts', 'scripts']);

// Default Task
gulp.task('default', ['watch']);