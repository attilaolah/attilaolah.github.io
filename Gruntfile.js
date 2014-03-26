/*global module:false*/
module.exports = function(grunt) {
  mainTasks = ['less', 'csso', 'coffee', 'uglify']

  // Project configuration.
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'dst/main.min.js': 'dst/main.js'
        }
      },
      options: {
        report: 'gzip'
      }
    },
    coffee: {
      all: {
        options: {
          join: true
        },
        files: {
          'dst/main.js': 'src/coffee/*.coffee'
        }
      }
    },
    less: {
      all: {
        files: {
          'dst/main.css': 'src/less/main.less'
        }
      }
    },
    csso: {
      all: {
        options: {
          report: 'gzip',
        },
        files: {
          'dst/main.min.css': 'dst/main.css'
        }
      }
    },
    watch: {
      files: [
        'src/**',
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
