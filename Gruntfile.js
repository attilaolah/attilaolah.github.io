/*global module:false*/
module.exports = function(grunt) {
  mainTasks = ['less', 'csso', 'coffee', 'uglify']

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      },
      options: {
        banner : '/*! <%= pkg.title || pkg.name %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright © <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */',
        report: 'gzip'
      }
    },
    coffee : {
      plugin : {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '*.coffee',
          dest: 'dist/',
          ext: '.js'
        }]
      }
    },
    less: {
      compile: {
        files: {
          'dst/main.css': 'src/css/main.less'
        }
      }
    },
    csso: {
      compress: {
        options: {
          report: 'gzip',
        },
        files: {
          'dst/main.min.css': 'dst/main.css'
        }
      }
    },
    watch : {
      files: [
        'src/*',
      ],
      tasks: mainTasks
    }
  });

  // Lib tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-csso');

  grunt.registerTask('default', mainTasks);
};
