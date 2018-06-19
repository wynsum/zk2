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

// 起服务器
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return false;
                }

                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})