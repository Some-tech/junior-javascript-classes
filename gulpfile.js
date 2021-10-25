const { src, dest, watch, series } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
var sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();

function scssTask(){
  return src('src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('src/css', { sourcemaps: '.' }));
}

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: './src'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watchTask(){
  watch('src/*.html', browsersyncReload);
  watch(['src/scss/*.scss', 'src/js/**/*.js'], series(
    scssTask,
    browsersyncReload
    ));
}

exports.default = series(
  scssTask,
  browsersyncServe,
  watchTask
);
