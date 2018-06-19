// 引入模块
var gulp = require('gulp');

var sass = require('gulp-sass');

var minjs = require('gulp-uglify');

var minhtml = require('gulp-htmlmin');

var server = require('gulp-webserver');

var sequence = require('gulp-sequence');

var clean = require('gulp-clean');

// 读取文件

var path = require('path');

var fs = require('fs');

var url = require('url');

var data = require('./data/data.json');

// 起服务器
gulp.task('server', ['sass'], function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return false;
                }

                if (pathname === '/api/big') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})


gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});


gulp.task('default', function(cb) {
    sequence('server', cb);
})