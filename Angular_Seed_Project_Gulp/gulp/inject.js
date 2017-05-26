'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var babel = require('gulp-babel');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join('!' + conf.paths.src, '/app/modules/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js')
  ])
      .pipe(babel({ presets: ['es2015'], plugins: ['syntax-async-functions','transform-object-assign'] }))
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectScriptsModules = gulp.src([    
    path.join(conf.paths.src, '/app/modules/**/*.js')
  ])
      .pipe(babel({ presets: ['es2015'], plugins: ['syntax-async-functions','transform-object-assign'] }))
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var injectModulesOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false,
    starttag: '<!-- inject:modules:{{ext}} -->'
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(injectScriptsModules, injectModulesOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
