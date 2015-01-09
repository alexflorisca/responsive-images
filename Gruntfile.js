module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      allImages: {
        options: {
          engine: 'im',
          sizes: [
            { 
              width: 480,
              name: 'small',
              quality: 60
            },
            { 
              width: 960,
              name: 'medium',
              quality: 60
            },
            { 
              width: 1440,
              name: 'large',
              quality: 60
            },
            { 
              width: 2000,
              name: 'xlarge',
              quality: 60
            }
          ]
        },
        files: [{
          expand: true,
          cwd: 'img/originals',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/optimised'
        }]
      }
    },

    watch: {
      files: ['Gruntfile.js', 'img/originals'],
      tasks: ['responsive_images']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');

  grunt.registerTask('default', ['responsive_images', 'watch']);

};