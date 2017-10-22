var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var supertest = require('supertest');
var gulpMocha = require('gulp-mocha');

var jsFiles = ['*.js', 'src/**/*.js'];

/* Check Style of my code */
gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

/**Inject Dependencies */
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src([
        './public/css/*.css',
        './public/js/*.js'
    ], {
        read: false
    });

    var injectOpt = {
        ignorePath: '/public'
    };
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.html')    
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOpt))
        .pipe(gulp.dest('./src/views'));
});

/** Monitor file changes to restart the server*/
gulp.task('default', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});

gulp.task('test', function () {
       
    gulp.src('src/tests/*.js', {
            read: false
        })
        .pipe(gulpMocha({
            reporter: 'nyan'
        }));
});