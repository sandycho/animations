//gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//style paths
var sassFiles = 'examples/**/*.scss',
    cssDest = 'examples/dist/css/';

gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

// create a task that ensures the `styles` task is complete before
// reloading browsers
gulp.task('livereload', ['styles'], function (done) {
  browserSync.reload();
  done();
});

// default task: compiles styles from scss to css & reloads browser
gulp.task('default', ['styles'], function() {

  // serves static files 
  // - localhost:3000
  // - http://localhost:3000/smooth-dropdown/smooth-dropdown.html
  browserSync.init({
      server: "./examples"
  });

  gulp.watch("examples/**/*.scss", ['livereload']);
});