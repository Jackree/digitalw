const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const uglify = require("gulp-uglify");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");
const del = require("del");

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss", {allowEmpty: true})
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Images

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true, quality: 80 }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

exports.images = images;

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

exports.webp = createWebp;

const sprite = () => {
  return gulp
    .src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.sprite = sprite;

const clean = () => {
  return del("build");
};

exports.clean = clean;

const copy = () => {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.ico",
      ],
      { base: "source" }
    )
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// js min

const js = () => {
  return gulp
    .src("source/js/**/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(
      rename(function (path) {
        path.basename += ".min";
      })
    )
    .pipe(gulp.dest("build/js"));
};

exports.js = js;

// Server


const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};


exports.server = server;

const refresh = (done) => {
  sync.reload(),
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/js/*.js", gulp.series(js, refresh));
  gulp.watch("source/sass/**/*.scss", gulp.series(styles, refresh));
  gulp.watch("source/img/icon-*.svg", gulp.series(sprite, html, refresh));
  gulp.watch("source/*.html").on("change", gulp.series(html, refresh));
};

const build = gulp.series(
  clean,
  copy,
  styles,
  js,
  images,
  createWebp,
  sprite,
  html
);

exports.build = build;

exports.default = gulp.series(build, server, watcher);
