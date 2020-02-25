var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel')


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/assets/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe( sass() )
        .pipe( cleancss() )
        .pipe(sourcemaps.write(''))
        .pipe( gulp.dest( 'assets/css'))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('frontend-js', function() {
    return gulp.src([ 'src/assets/scripts/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe( concat( 'main.js'))
        .pipe( uglify())
        .pipe(sourcemaps.write(''))
        .pipe( gulp.dest( 'assets/js'))
       .pipe(browserSync.stream());
});

// Static Server + watching scss/js/html files
gulp.task('serve', gulp.series('sass','frontend-js', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(['src/assets/scss/*.scss'], gulp.series('sass'));
    gulp.watch(['src/assets/scripts/*.js'], gulp.series('frontend-js'));
    gulp.watch("*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('frontend-js','serve'));


