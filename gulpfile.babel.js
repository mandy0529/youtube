import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import minify from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import del from 'del';

const sass = require('gulp-sass')(require('node-sass'));
sass.compiler = require('node-sass');

const routes = {
  styles: {
    watch: 'assets/scss/**/*.scss',
    src: 'assets/scss/styles.scss',
    dest: 'src/static/css',
  },
  js: {
    watch: 'assets/js/**/*.js',
    src: 'assets/js/**/*.js',
    dest: 'src/static/js',
  },
};
const styles = () => {
  return gulp
    .src(routes.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.styles.dest));
};
const js = () => {
  return gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({presets: ['@babel/preset-env']}),
          ['uglifyify', {global: true}],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));
};
const watch = () => {
  gulp.watch(routes.styles.watch, styles);
  gulp.watch(routes.js.watch, js);
};
const clean = () => {
  return del(['src/static']);
};
export const dev = gulp.series([clean, styles, js, watch]);
