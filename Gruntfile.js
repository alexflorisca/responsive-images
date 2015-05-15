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
          cwd: 'images/originals',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/optimised'
        }]
      }
    },

    rimage: {
      dist: {
        options: {
          imageSizes: '<%= responsive_images.allImages.options.sizes %>'
        },
        files: [{
          expand: true,
          cwd: './',
          src: 'index.html',
          dest: './'
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
        tasks: ['rimage']
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-rimage');

  grunt.registerTask('default', ['responsive_images', 'rimage', 'watch']);

};