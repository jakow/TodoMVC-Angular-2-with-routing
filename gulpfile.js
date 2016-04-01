var gulp = require('gulp');
var typescript = require('gulp-typescript');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var flatten = require ('gulp-flatten');
var rimraf = require('rimraf');


var tsConfig = {
  "target": "es5",
  "module": "system",
  "moduleResolution": "node",
  "sourceMap": true,
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "removeComments": false,
  "noImplicitAny": false,
  "sortOutput": true
}

var tsSources = [
  "ts/**/*.ts"
]
/*var tsProject = typescript.createProject('tsconfig.json',
{ files: [
  //manuall add new sources you want to use
  'ts/todo-app/todo-app.ts'
],
sortOutput: true,
//outFile: "js/app.js",
outDir: "js"
});*/

var tsProject = typescript.createProject(tsConfig)

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
  });

  gulp.task('clean:html', function(cb) {
    rimraf('./html', cb);
  });

  gulp.task('clean:js', function(cb) {
    rimraf('./js', cb);
  });


  gulp.task('compile', ['clean:js'], function() {
    var tsResult = gulp.src(tsSources) // instead of gulp.src(...)
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject));
    return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'));
  });

  gulp.task('copy', ['clean:html'], function() {
    gulp.src('ts/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('./html'));
  });

  gulp.task('watch', function() {
    gulp.watch(tsSources,['compile']);
    gulp.watch('ts/**/*.html', ['copy']);
  });

  gulp.task('serve' , ['compile', 'copy', 'connect', 'watch']);
