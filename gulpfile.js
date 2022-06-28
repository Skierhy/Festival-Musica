// // para finalizar tarea callback
// // con done
// function tarea( done) {
//     console.log('Desde la primera tarea');
//     done();
// }

// function tarea2(done) {
//     console.log('desde la segunda tarea');
//     done();
// }

// // para hacer la tarea disponible para ejecutar

// exports.tarea = tarea;
// exports.tarea2 = tarea2;

// compilar css

// api
// retorna mas de una función
const { src, dest, watch, parallel } = require("gulp");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CSS
// para una sola función
// pasa solucionar
// const sass = require('gulp-sass')(require('sass'));

// [21:32:15] The following tasks did not complete: css
// [21:32:15] Did you forget to signal async completion?
const sass = require("gulp-sass")(require("sass"));

// evitar que se detenga el proceso si aparece un error
const plumber = require("gulp-plumber");

// mejorar código css
// no usa gulp usa postcss
// este lo que hace hace que funcione en el navegador que tu digas
// usa las ultimas tecnologías y tal vez no funcione en otros navegadores viejos
const autoprefixer = require("autoprefixer");
// comprime el código
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
// uso de npm i --save-dev gulp-sourcemaps

const sourcemaps = require("gulp-sourcemaps");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mejoras de javascript
const terser = require("gulp-terser-js");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMÁGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function css(done) {
	// identificar el archivo .scss a compilar
	// pipe lo que hace manda a llamar la siguiente acción

	// para que escuche todos los cambios que se haga en cualquier cualquier archivo
	// se hara de manera recursiva
	src("src/scss/**/*.scss")
		// sourcemaps
		.pipe(sourcemaps.init())
		//////////////
		.pipe(plumber())
		.pipe(sass()) // compilarlo
		///////////////////////////////////////////
		// mejorar de css
		.pipe(postcss([autoprefixer(), cssnano()]))
		// sourcemaps
		// para  se usara el . para que sea la misma ubicación
		.pipe(sourcemaps.write("."))
		//////////////
		.pipe(dest("build/css")); // almacenar
	done();
}
function imagenes(done) {
	const opciones = {
		optimizationLevel: 3,
	};

	src("src/img/**/*.{png,jpg}")
		.pipe(cache(imagemin(opciones)))
		.pipe(dest("build/img"));
	done();
}

function versionWebp(done) {
	// parámetros que usa webp gulp
	const opciones = {
		// calidad 0 - 100
		quality: 50,
	};
	// lo que hace los ** buscar todas las carpetas
	// * el archivo
	// {}mas de un formato
	src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
	done();
}

function versionAvif(done) {
	// parámetros que usa webp gulp
	const opciones = {
		// calidad 0 - 100
		quality: 50,
	};
	// lo que hace los ** buscar todas las carpetas
	// * el archivo
	// {}mas de un formato
	src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
	done();
}

function javascript(done) {
	src("src/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write("."))
		.pipe(dest("build/js"));
	done();
}

// para usar el watch en pocas palabras cuando modifiques el archivo
// scss se compila automáticamente
function dev1(done) {
	// ubicacion , función a ejecutar
	watch("src/scss/**/*.scss", css);
	watch("src/js/**/*.js", javascript);
	done();
}
// se puede hacer tareas en serie
// primero empieza una tarea y después otra
// parallel que es al mismo tiempo
exports.css = css;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev1 = parallel(imagenes, versionWebp, versionAvif, javascript, dev1);
