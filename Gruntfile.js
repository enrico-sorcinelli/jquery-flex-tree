module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Set folder variables.
		dirs: {
			css: 'src/css',
			js: 'src/js',
			build: 'dist'
		},

		// Minify .js files.
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: '<%= dirs.js %>/<%= pkg.name %>.js',
				dest: '<%= dirs.build %>/<%= pkg.name %>.min.js'
			}
		},

		// Minify .css files.
		cssmin: {
			minify: {
				options: {
					banner: '/* <%= pkg.title %> */'
				},
				files: [
					{
						expand: true,
						cwd: '<%= dirs.css %>/',
						src: [
							'*.css',
							'!*.min.css'
						],
						dest: '<%= dirs.build %>/',
						ext: '.min.css'
					}
				]
			}
		},

		// Javascript linting with jshint.
		jshint: {
			options: {
				//jshintrc: '.jshintrc',
				reporterOutput: ''
			},
			all: [
				'Gruntfile.js',
				'<%= dirs.js %>/*.js',
				'!**/*.min.js'
			]
		},

		// Javascript linting with ESlint.
		eslint: {
			options: {
				configFile: '.eslintrc.json'
			},
			target: [
				'Gruntfile.js',
				'<%= dirs.js %>/*.js',
				'!**/*.min.js'
			]
		},
		// CSS linting with stylelint.
		stylelint: {
			options: {
				configFile: '.stylelintrc.json'
			},
			all: [
				'<%= dirs.css %>/*.css',
				'!**/*.min.css'
			]
		}
	} );

	// Load NPM tasks to be used here.
	require( 'load-grunt-tasks' )( grunt );

	// Default task(s).
	grunt.registerTask('default', [
		'uglify',
		'cssmin'
	] );

	grunt.registerTask( 'check', [
		'jshint',
		'eslint',
		'stylelint'
	] );
};