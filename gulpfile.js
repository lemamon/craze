const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const usemin = require("gulp-usemin");
const cssmin = require("gulp-cssmin");
const browserSync = require("browser-sync").create();
const jshint = require("gulp-jshint");
const jshintStylish = require("jshint-stylish");
const csslint = require("gulp-csslint");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;

gulp.task("build", ["clean"], function() {
  gulp.start("build-img", "usemin");
});

gulp.task("copy", ["clean"], function() {
  return gulp.src("src/**/*").pipe(gulp.dest("public"));
});

gulp.task("clean", function() {
  return gulp.src("public").pipe(clean());
});

gulp.task("build-img", function() {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/images"));
});

gulp.task("usemin", function() {
  return gulp
    .src("src/index.html")
    .pipe(
      usemin({
        html: [htmlmin({ collapseWhitespace: true })],
        css: [cssmin, autoprefixer],
        js: [uglify]
      })
    )
    .on("error", function(err) {
      console.log(err);
    })
    .pipe(gulp.dest("public"));
});

// prduction server

gulp.task("production", () => {
  browserSync.init({
    server: {
      watch: false,
      baseDir: "public"
    }
  });
});

// dev server

gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });

  gulp.watch("src/**/*").on("change", browserSync.reload);

  gulp.watch("src/js/**/*.js").on("change", function(event) {
    console.log("Linting " + event.path);
    gulp
      .src(event.path)
      .pipe(jshint({ esnext: true }))
      .pipe(jshint.reporter(jshintStylish));
  });

  gulp.watch("src/css/**/*.css").on("change", function(event) {
    console.log("Linting " + event.path);
    gulp
      .src(event.path)
      .pipe(csslint())
      .pipe(csslint.reporter());
  });
});
