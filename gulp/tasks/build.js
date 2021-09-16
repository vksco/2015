'use strict';

var gulp = require('gulp');
require('./html');
require('./vendor');
require('./scripts');
require('./styles');
require('./bundle');

gulp.task(
  'build',
  gulp.series('html', 'vendor', 'scripts', 'styles', 'bundle')
);

gulp.task(
  'build:3D',
  gulp.series('html', 'bundle:3D', 'vendor:3D', 'scripts:3D', 'styles:3D')
);

gulp.task(
  'build:2D',
  gulp.series('html', 'bundle:2D', 'vendor:2D', 'scripts:2D', 'styles:2D')
);