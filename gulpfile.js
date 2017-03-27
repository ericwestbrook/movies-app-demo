var gulp = require('gulp');
var gp_rename = require('gulp-rename');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

// Compiles JS
gulp.task('scripts', function() {
  gulp.src('./source/js/**/*.js')
    .pipe(babel())
    .pipe(browserify({
      insertGlobals : true
    }))
    // .pipe(uglify())
    .pipe(gp_rename('main.min.js'))
    .pipe(gulp.dest('./public/js'))
});

// Compiles Sass
gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


// Default task = watcher
gulp.task('default', ['scripts', 'sass'], function(){
	gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/js/**/*.js', ['scripts']);
});
