<<<<<<< HEAD
// Include gulp
var gulp = require('gulp'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
concatCSS = require('gulp-concat-css'),
minifyCSS = require('gulp-minify-css');

// Copy libs
gulp.task('copyJS', function() {
	return gulp.src([
		__dirname + '/bower_components/jquery/dist/jquery.js',
		__dirname + '/bower_components/bootstrap/dist/js/bootstrap.js',
		__dirname + '/bower_components/bootstrap-growl/jquery.bootstrap-growl.js'
		])
	.pipe(gulp.dest(__dirname + '/public/js/libs/'));
=======
var gulp  = require('gulp'),
uglify    = require('gulp-uglify'),
rename    = require('gulp-rename'),
concat    = require('gulp-concat'),
sass      = require('gulp-sass'),
concatCSS = require('gulp-concat-css'),
uglifyCSS = require('gulp-minify-css'),
del       = require('del');

// Copy JS
gulp.task('copyJS', function() {
  return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/bootstrap-growl/jquery.bootstrap-growl.js',
      './bower_components/underscore/underscore.js',
      './bower_components/backbone/backbone.js',
      './bower_components/backbone.babysitter/lib/backbone.babysitter.js',
      './bower_components/backbone.wreqr/lib/backbone.wreqr.js',
      './bower_components/marionette/lib/core/backbone.marionette.js'
    ])
    .pipe(gulp.dest('./public/js/libs/'));
>>>>>>> feature/edwin
});

// Copy CSS
gulp.task('copyCSS', function() {
<<<<<<< HEAD
	return gulp.src([
		__dirname + '/bower_components/bootstrap/dist/css/bootstrap.css',
		__dirname + '/bower_components/bootstrap/dist/css/bootstrap.css.map',
		__dirname + '/bower_components/font-awesome/css/font-awesome.css'
	])
	.pipe(gulp.dest(__dirname + '/public/css/'));
=======
  return gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap.css',
      './bower_components/bootstrap/dist/css/bootstrap.css.map',
      './bower_components/font-awesome/css/font-awesome.css'
    ])
    .pipe(gulp.dest('./public/vendor/'));
>>>>>>> feature/edwin
});

// Copy Fonts
gulp.task('copyFonts', function() {
<<<<<<< HEAD
	return gulp.src([
		__dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.eot',
		__dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.svg',
		__dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
		__dirname + '/bower_components/font-awesome/fonts/fontawesome-webfont.woff',
		__dirname + '/bower_components/font-awesome/fonts/FontAwesome.otf'
	])
	.pipe(gulp.dest(__dirname + '/public/fonts/'));
});

//Libraries
gulp.task('libs', function(){
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

//Styles
gulp.task('styles', function(){
	return gulp.src(__dirname + '/public/css/*.css')
	 .pipe(concatCSS('main.all.css'))
 	 .pipe(minifyCSS())
	 .pipe(rename('main.min.css'))
	 .pipe(gulp.dest(__dirname + '/build/css/'));
});

gulp.task('fonts', function() {
	return gulp.src(__dirname + '/public/fonts/*')
		.pipe(gulp.dest(__dirname + '/build/fonts/'));
})

// Uglify JS
gulp.task('scripts', function() {
    return gulp.src(__dirname + '/public/js/*.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(__dirname +'/build/js/'));
=======
  return gulp.src([
      './bower_components/font-awesome/fonts/fontawesome-webfont.eot',
      './bower_components/font-awesome/fonts/fontawesome-webfont.svg',
      './bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
      './bower_components/font-awesome/fonts/fontawesome-webfont.woff',
      './bower_components/font-awesome/fonts/FontAwesome.otf'
    ])
    .pipe(gulp.dest('./public/fonts/'));
});

// Sass
gulp.task('sass', function () {
  gulp.src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

// Clean
gulp.task('clean', function (cb) {
  del(['./build/**'], cb);
});

// Libraries
gulp.task('libs', function() {
  return gulp.src([
      './public/js/libs/jquery.js',
      './public/js/libs/bootstrap.js',
      './public/js/libs/jquery.bootstrap-growl.js',
      './public/js/libs/underscore.js',
      './public/js/libs/backbone.js',
      './public/js/libs/backbone.babysitter.js',
      './public/js/libs/backbone.wreqr.js',
      './public/js/libs/backbone.marionette.js'
    ])
    .pipe(concat('libs.all.js'))
    .pipe(uglify())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest('./build/js/libs/'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src([
      './public/vendor/*.css',
      './public/css/*.css'
    ])
    .pipe(concatCSS('main.all.css'))
    .pipe(uglifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./build/css/'));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('./public/fonts/*')
    .pipe(gulp.dest('./build/fonts/'));
});

// Uglify JS
gulp.task('scripts', function() {
  return gulp.src('./public/js/*.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./build/js/'));
>>>>>>> feature/edwin
});

// Watch Files For Changes
gulp.task('watch', function() {
<<<<<<< HEAD
    gulp.watch('/public/js/**/*.js', ['copyJS', 'copyCSS', 'copyFonts']);
});

// Default Task
gulp.task('build', ['libs', 'styles', 'fonts', 'scripts']);

=======
  gulp.watch([
    './public/js/**/*.js',
    './public/scss/**.scss'
  ],
  ['libs', 'sass', 'styles', 'fonts', 'scripts']);
});

// Bowercopy
gulp.task('bowercopy', ['copyJS', 'copyCSS', 'copyFonts']);

// Build
gulp.task('build', ['libs', 'sass', 'styles', 'fonts', 'scripts']);

// Default Task
>>>>>>> feature/edwin
gulp.task('default', ['watch']);