'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var madvoc = require('madvoc-route');
var path = require('path');
var App = require('./lib/App');
var SoyTemplateEngine = require('./lib/SoyTemplateEngine');
var config = require('./lib/ProductFlavors').generateFlavoredConfig();

gulp.task('serve', ['build'], function() {
  var app = new App();

  app.setTemplateEngine(new SoyTemplateEngine());

  gutil.log('Serving static', gutil.colors.cyan('public/'));
  app.serveStatic('/', path.join(process.cwd(), 'dist/public'));

  gutil.log('Compiling templates in', gutil.colors.cyan('dist/'));
  app.getTemplateEngine().compileTemplates('dist', app.getLocale(), {}, function() {
    app.start();
    gutil.log('Serving', gutil.colors.cyan('http://localhost:' + app.getServerPort()));
  });
});
