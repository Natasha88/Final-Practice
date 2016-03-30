module.exports = function(grunt) {
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        main: 
        {
          files: {
              "resources/css/style.css": "dev/less/style.less"
          }
        }        
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'resources/css',
          src: ['*.css', '!*.min.css'],
          dest: 'resources/css',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['dev/js/xhr_utils.js', 'dev/js/comments.js', "dev/js/creative.js"],
        dest: 'dev/js/built.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'resources/js/built.min.js': ['dev/js/built.js']
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['less', "cssmin", "concat", "uglify"]);
};
