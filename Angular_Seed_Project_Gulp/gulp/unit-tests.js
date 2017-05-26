'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

//var karma = require('karma');

var pathSrcHtml = [
  path.join(conf.paths.src, '/**/*.html')
];

var pathSrcJs = [
  path.join(conf.paths.src, '/**/!(*.spec).js')
];


