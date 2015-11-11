var gulp = require('gulp');
var jshint = require('gulp-jshint');  // 语法检查   （gulp-jshint）
var concat = require('gulp-concat');  // 合并文件   （gulp-concat）
var uglify = require('gulp-uglify');  // 压缩代码   （gulp-uglify）
var rename = require('gulp-rename');  // 文件重命名 （gulp-rename）
var react = require('gulp-react');  // react （gulp-react）
// var babel = require('gulp-babel');  // EcmaScript6 (gulp-babel)

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并文件之后压缩代码
gulp.task('minify', function (){
  return gulp.src("src/**/*.js*")
    .pipe(react())
    .pipe(concat('jqlpage.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('jqlpage.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// html 文件复制
gulp.task('copy-html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

// res 文件复制
gulp.task('copy-res', function() {
  return gulp.src('res/**')
    .pipe(gulp.dest('dist'));
});

// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch('src/**', ['copy-res', 'copy-html', 'jshint', 'minify']);
});

// 注册缺省任务
gulp.task('default', ['copy-res', 'copy-html', 'jshint', 'minify', 'watch']);
