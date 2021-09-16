'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var pkg = require('../utils/pkg');
var splitPath = require('../utils/splitPath');

function styles (input, output, message) {
  message = message || 'Styles';

  var outputDetails = splitPath(output);

  function process () {
    return gulp.src(input)
      .pipe(less().on('error', function (error) {
        gutil.log('Less error', error);
        gutil.beep();
        notify({ title: message, message: 'Error', sound: 'Basso' });
        this.end();
      }))
      .pipe(pkg.debug || false ? gutil.noop() : minify())
      .pipe(rename(outputDetails.file))
      .pipe(gulp.dest(outputDetails.path))
      .pipe(notify({ title: message, message: 'Success', sound: 'Morse' }));
  }

  const processId = process();
  
  if(pkg.watch) {
    gulp.watch('./app/src/less/**/*.less', processId);
  }

  return processId;
}

gulp.task('styles:3D', function () {
  return styles(
    './app/src/less/main3D.less',
    './app/dist/css/3D/main.css',
    'Styles 3D'
  );
});

gulp.task('styles:2D', function () {
  return styles(
    './app/src/less/main2D.less',
    './app/dist/css/2D/main.css',
    'Styles 2D'
  );
});

gulp.task('styles', gulp.series('styles:2D', 'styles:3D'));
