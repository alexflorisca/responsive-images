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
          dest: 'public/img'
        }]
      }
    },

    // awesome_responsive_images: {
    //   options: {
    //     mediaQueries: [480, 768, 1024]
    //   }
    // },

    responsive_images_extender: {
      target: {
        options: {},
        files: [{
          expand: true,
          src: ['**/*.html'],
          cwd: 'public/',
          dest: 'public/'
        }]
      }
    },

    watch: {
      otimiseImages: {
        files: ['Gruntfile.js', 'img/originals'],
        tasks: ['responsive_images',]
      },

      responsifyImages: {
        files: ['**/*.html'],
        tasks: ['responsive_images_extender']
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-responsive-images-extender');

  grunt.registerTask('default', ['responsive_images', 'responsive_images_extender', 'watch']);

};