var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	nodemon = require('nodemon');

gulp.task('default', function () {
	bundleJS();
	nodeServer();

	function bundleJS() {
		var b = browserify({
			cache: {},
			packageCache: {},
			fullPaths: true,
			debug: true
		});

		b = watchify(b);

		b.on('update', function(){
			bundle(b);
		});
		b.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		});

		b.add('./public/main.js');
		b.transform({
			global: true
		}, 'uglifyify')
		bundle(b);

		function bundle(b) {
			b.bundle()
			.pipe(source('main.js'))
			.pipe(gulp.dest('./public/dist'));
		}
	}

	function nodeServer() {
		nodemon({
			script: 'server.js',
			ext: 'js json'
		});

		nodemon.on('restart', function (files) {
			console.log('');
			console.log('Server restarted due to:');
			files.forEach(function (file) {
				var dir = process.cwd();
				output = file.replace(dir + '/', '--');
				console.log(output);
			});
		});
	}
});
