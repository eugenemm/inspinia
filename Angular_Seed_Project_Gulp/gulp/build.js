'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var babel = require('gulp-babel');
var gulpsync = require('gulp-sync')(gulp);

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'ocenkaApp',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('scripts/app.js', { restore: true });
  var jsBowerFilter = $.filter('scripts/vendor.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref())

    .pipe(jsFilter)
    //.pipe($.sourcemaps.init())
    //.pipe(babel({ presets: ['es2015'], plugins: ['syntax-async-functions','transform-object-assign'] }))
    //.pipe($.ngAnnotate())
    //.pipe($.uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    //.pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)

    .pipe(jsBowerFilter)
    //.pipe($.uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    .pipe(jsBowerFilter.restore)

    .pipe(cssFilter)
    // .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.cssnano())
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('fontsDX', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*dxicons.{ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/styles/icons/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build',
    gulpsync.sync(['clean', ['html', 'fonts', 'fontsDX', 'other']])
);

// gulp.task('build', ['clean',['html', 'fonts', 'fontsDX', 'other']]);
