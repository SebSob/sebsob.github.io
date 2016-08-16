var gulp = require('gulp'),
	gulpUtil = require('gulp-util'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer')
	;


//Source paths
var srcPaths = {
	'bower': './resources/bower_components/',
	'sass': './resources/sass/',
	'js': './resources/js/'
}

//Dest paths
var destPaths = {
	'public': './public/',
	'css': './public/css/',
	'js': './public/js/'
}


gulp.task('styles', function(){
	return gulp.src(srcPaths.sass + '/main.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer('last 3 version'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest(destPaths.css))
	.pipe(livereload())
	.on('end', function(){
		gulpUtil.log(gulpUtil.colors.green('Styles task finished :)'))
	});
});

gulp.task('scripts', function(){
	return gulp.src([
			srcPaths.bower + 'jquery/dist/jquery.min.js',
			srcPaths.bower + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
			srcPaths.bower + 'angular/angular.min.js',
			srcPaths.bower + 'angular-route/angular-route.min.js',
			srcPaths.js + '**/*.js'
		])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(destPaths.js))
	.pipe(livereload())
	.on('end', function(){
		gulpUtil.log(gulpUtil.colors.green('Script task finished :)'))
	});
})

gulp.task('watch',function(){

	cache.clearAll();

	livereload.listen();

	gulp.watch(srcPaths.sass+'/*.scss', ['styles']);
	gulp.watch(srcPaths.js+'**/*.js', ['scripts']);
})