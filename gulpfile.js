const {src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefix = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//IMAGENES
// const cache = requiere('cache');
// const imagemin = requiere('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const autoprefixer = require("autoprefixer");

//JAVASCRIPT
const terser = require('gulp-terser-js');

function css(done){
    src('src/scss/**/*.scss')//identificar archivo SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())//compila
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))//almacenarla en disco duro


    done(); //Callback que avisa a gul cuando llegamos al final
}

// function imagenes(done){
//     const opciones = {
//         optimizationLevel: 3
//     }

//     src('src/img/**/*.{png,jpg}')
//         .pipe(cache(imagemin(opciones)))
//         .pipe(dest('build/img'))

//     done();
// }

function versionWebp(done){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}

exports.css = css;
exports.js = javascript;
// exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(versionWebp, versionAvif, javascript, dev);
