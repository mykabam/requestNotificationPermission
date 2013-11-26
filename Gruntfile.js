module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: ['Gruntfile.js', 'requestNotificationPermission.js', 'test/**/*.js']
      },
      ci: {
        options: {
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'results/jshint-result.xml'
        },
        src: '<%= jshint.all.src %>'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    mochacli: {
      options: {
        require: ['should'],
        reporter: 'list',
        bail: true
      },
      all: ['test/server/**/*.js']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  // Tasks
  grunt.registerTask('test', ['karma:unit']);
  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};