const autoprefixer = require('autoprefixer');
const browserSync = require("browser-sync").create();
const gulp = require('gulp');
const gulpPostCSS = require('gulp-postcss');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');

const styles = () => {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass())
    .pipe(gulpPostCSS([
      autoprefixer(),
    ]))
    .pipe(gulp.dest('./src/css'))
    .pipe(gulpSourcemaps.write('.'))
    .pipe(browserSync.stream());
};

const watch = () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
}

module.exports = {
  default: gulp.series(styles, watch),
  styles,
  watch
};
