module.exports = function(grunt) {
	
	// Configuraciones generales Grunt

	grunt.initConfig({
		distDir: "dist",
		pkg: grunt.file.readJSON('package.json'),
		sources: grunt.file.readJSON('sources.json'),

		// Limpia la carpeta Dist

		clean: ['<%= distDir %>'],

		// Convierte HTML a JS

		html2js: {
			modules: {
				options: {
					base: 'src/modules'
				},
				src: ['<%= sources.templates.modules %>'],
				dest: '<%= distDir %>/templates/modules.js',
				module: 'templates.modules'
			},
			commons: {
				options: {
					base: 'src/commons'
				},
				src: ['<%= sources.templates.commons %>'],
				dest: '<%= distDir %>/templates/commons.js',
				module: 'templates.commons'
			},
			general: {
				options: {
					base: 'src'
				},
				src: ['<%= sources.templates.general %>'],
				dest: '<%= distDir %>/templates/general.js',
				module: 'templates.general'	
			}
		},

		// Concatena archivos

		concat: {
			angular: {
				src: ['<%= sources.angularFiles %>'],
				dest: '<%= distDir %>/vendor/angular.js'
			},
			styles: {
				src: ['<%= sources.cssFiles %>'],
				dest: '<%= distDir %>/vendor/styles.css'
			},
			scripts: {
				src: ['<%= sources.jsFiles %>'],
				dest: '<%= distDir %>/vendor/scripts.js'
			},
			modules: {
				src: ['<%= sources.modulesFiles %>'],
				dest: '<%= distDir %>/<%= pkg.name %>.js'
			},
			index: {
				options: {
					process: true
				},
				src: ['src/index.html'],
				dest: '<%= distDir %>/index.html'
			}
		},

		// Copiar archivos entre carpetas

		copy: {
			assets: {
				files: [
					{
						dest: '<%= distDir %>/assets',
						src: ['**'],
						expand: true,
						cwd: 'src/assets/'
					}
				]
			},
			fonts: {
				files: [
					{
						dest: '<%= distDir %>/fonts',
						src: ['**'],
						expand: true,
						cwd: 'bower_components/font-awesome/fonts/'
					}
				]
			}
		},

		// Procesar Less

		recess: {
			build: {
				options: {
					compile: true
				},
				files: {
					'<%= distDir %>/<%= pkg.name %>.css': ['<%= sources.lessFiles %>']
				}
			},
			min: {
				options: {
					compress: true
				},
				files: {
					'<%= distDir %>/<%= pkg.name %>.css': ['<%= sources.lessFiles %>']	
				}
			}
		},

		// Minificar archivos CSS

		cssmin: {
			options: {
				compile: true,
				compress: true
			},
			combine: {
				files: {
					'<%= distDir %>/vendor/styles.css': ['<%= sources.cssFiles %>']
				}
			}
		},

		// Ofuscasión de código JS

		uglify: {
			options: {
				mangle: {
					except: ['jQuery', '$', 'angular']
				}
			},
			angular: {
				src: ['<%= concat.angular.src %>'],
				dest: '<%= distDir %>/vendor/angular.js'
			},
			scripts: {
				src: ['<%= concat.scripts.src %>'],
				dest: '<%= distDir %>/vendor/scripts.js'
			},
			modules: {
				src: ['<%= sources.modulesFiles %>'],
				dest: '<%= distDir %>/<%= pkg.name %>.js'
			}
		},

		// Watch

		watch: {
			build: {
				files: [
					'<%= sources.modulesFiles %>',
					'<%= sources.lessFiles %>',
					'<%= sources.templates.modules %>',
					'<%= sources.templates.commons %>',
					'<%= sources.templates.general %>',
					'src/index.html'
				],
				tasks: ['build', 'timestamp']
			}
		}
	});
	
	// Tareas

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('timestamp', function() {
		grunt.log.subhead(Date());
	});

	// Desarrollo
	grunt.registerTask('build', ['clean', 'html2js', 'concat', 'copy', 'recess:build', 'watch']);
	
	// Producción
	grunt.registerTask('release', ['clean', 'html2js', 'uglify', 'concat:index', 'recess:min', 'cssmin', 'copy']);
}
