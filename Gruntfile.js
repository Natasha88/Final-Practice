module.exports = function(grunt) {
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        main: 
        {
          files: {
              "css/style.css": "less/style.less"
          }
        }        
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/xhr_utils.js', 'js/comments.js', 'js/form.js', "js/creative.js"],
        dest: 'js/built.js',
      },
    }

  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['less', "cssmin", "concat"]);
};
