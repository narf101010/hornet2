const packageJson = require('./package.json');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('_build_webpack', () => {
  return gulp.src('src/main.ts')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/'));

});

gulp.task('_clean', () => {
  return del([
    './build'
  ]);
});

gulp.task('_build_electron', () => {
  const filesToCopy = [
    './src/electron/main.js',
    './package.json',
  ];

  return gulp.src(filesToCopy)
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', gulp.series([
  '_clean',
  '_build_electron',
  '_build_webpack',
]));

gulp.task('default', gulp.series('build'));
