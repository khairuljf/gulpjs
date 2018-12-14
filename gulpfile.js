const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );
const sourcemaps = require( 'gulp-sourcemaps' );


var styleSRC = 'src/scss/style.scss';
var  targetStyle= 'assets/css';
var jsSRC = 'src/js/custom.js';
var  targetjs= 'assets/js';

gulp.task('style', sytleCB);

function sytleCB(){
    gulp.src( styleSRC )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
        }) )
        .on( 'error', console.error.bind( console ) )
        .pipe( autoprefixer( {
            browsers: ['last 2 versions'],
            cascade: false
        } ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( targetStyle ) );
}

gulp.task('js', js_cb);


function js_cb(){
    gulp.src( jsSRC )
        .pipe( gulp.dest( targetjs ) );
}


gulp.task('default', ['style','js']);
