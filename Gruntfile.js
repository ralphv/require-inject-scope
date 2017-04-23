/**
 * Created by Ralph Varjabedian on 11/14/14.
 * require-inject-scope is licensed under the [MIT]
 * do not remove this notice.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    test: {
      testFilesPattern: "test/**/*.test.js",
      reporter: "spec"
    },
    cover: {
      root: "lib",
      buildFolder: "./cov-reports",
      testFilesPattern: "test/**/*.test.js"
    },
    // don't modify below this line
    mochaTest: {
      test: {
        options: {
          reporter: '<%= test.reporter %>',
          bail: true,
          timeout: 0
        },
        src: ['<%= test.testFilesPattern %>']
      }
    },
    clean: {
      coverage: ['<%= cover.buildFolder %>', '.sonar']
    },
    shell: {
      create_coverageFolders: {
        command: [
          'test -d <%= cover.buildFolder %>', 'mkdir -p <%= cover.buildFolder %>'
        ].join('||')
      },
      istanbul_cover: {
        options: { stdout: true },
        command: "istanbul cover --root <%= cover.root %> --preserve-comments --report lcov --dir <%= cover.buildFolder %> _mocha -- -R spec <%= cover.testFilesPattern %>"
      },
      sonar: {
        options: { stdout: true },
        command: 'sonar-runner'
      }
    },
    coveralls: {
      // Options relevant to all targets
      options: {
        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false
      },

      your_target: {
        // LCOV coverage file (can be string, glob or array)
        src: './cov-reports/lcov.info',
        options: {
          // Any options for just this target
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.registerTask("test", "Task to do units tests", ['mochaTest:test']);
  grunt.registerTask("cover", "Alias to coverage", ['coverage']);
  grunt.registerTask("coverage", "Task to perform coverage on this project", ['shell:create_coverageFolders', 'shell:istanbul_cover']);
  grunt.registerTask("sonar_coverage", "Task to perform coverage on this project and submit to sonar", ['clean:coverage', 'shell:create_coverageFolders', 'shell:istanbul_cover', 'shell:sonar', 'clean:coverage']);
};