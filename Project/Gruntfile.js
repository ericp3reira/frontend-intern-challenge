module.exports = grunt => {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    // Minifica o html, css e js
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "dist/index.html": "src/index.html"
        }
      }
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "src/assets/css",
            src: ["*.css"],
            dest: "dist/assets/css",
            ext: ".css"
          }
        ]
      }
    },
    uglify: {
      build: {
        src: "src/assets/js/app-compiled.js",
        dest: "dist/assets/js/app.js"
      }
    },
    // Transpila ES6 para ES5
    babel: {
      options: {
        sourceMap: true,
        presets: ["env"]
      },
      dist: {
        files: {
          "src/assets/js/app-compiled.js": "src/assets/js/app.js"
        }
      }
    },
    // Copia as pastas img e data
    // para a versão final
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ["./src/assets/img/*"],
            dest: "./dist/assets/img",
            filter: "isFile"
          },
          {
            expand: true,
            flatten: true,
            src: ["./src/assets/data/*"],
            dest: "./dist/assets/data",
            filter: "isFile"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks(
    "grunt-contrib-uglify",
    "grunt-contrib-cssmin",
    "grunt-contrib-htmlmin",
    "grunt-contrib-copy"
  );

  grunt.registerTask("default", [
    "babel",
    "copy",
    "uglify",
    "cssmin",
    "htmlmin"
  ]);
};
