// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');
var  gulpUglify = require('gulp-uglify');  // 載入 gulp-uglify
var cleanCSS = require('gulp-clean-css');

gulp.task('watch', function () {
  gulp.watch('javascript/original/*.js', ['scripts']);
  gulp.watch('css/less/*.less',['less']);
});

gulp.task('script', function () {
  gulp.src('javascript/original/*.js')        // 指定要處理的原始 JavaScript 檔案目錄
      .pipe(gulpUglify())                     // 將 JavaScript 做最小化
      .pipe(gulp.dest('javascript/minify'));  // 指定最小化後的 JavaScript 檔案目錄
});

gulp.task('less', function() {
    gulp.src('css/less/**.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/minifycss'));
});

gulp.task('default', ['less','script','minify-css','watch'], function() {
    gulp.watch('*.less', ['less']);
})