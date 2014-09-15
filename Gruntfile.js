/*global module:false*/
/*global require:false*/
module.exports = function(grunt) {

  // These plugins provide necessary tasks.
  var matchdep = require('matchdep');
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed Creative Commons (CA-BY-SA) */\n',
    
    // Task configuration.
    
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '_assets/images/',
          src: ['**/*.svg'],
          dest: '_svg-min/',
        }]
      }
    },
    grunticon: {
      dist: {
        options: {
          previewhtml:"index.html",
          pngfolder:"png/",
          pngpath:"./png"
        },
        files: [{
          expand:true,
          flatten:true,
          cwd:'_svg-min/',
          src: ['**/*.svg'],
          dest: 'dist/svg/'
        }]
      }
    },
    
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['_assets/scripts/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true,
        globals: {
          jQuery: true,
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dist_preconcat: {
        src: '_assets/scripts/**/*.js'
      },
      dist_postconcat: {
        //src: '<%= uglify.dist.dest %>'
      }
    },
    sass: {
      dist: {
        options: {
          unixNewlines:true,
          style:'compact'
        },
        files: {
          "dist/<%= pkg.name %>.css":"_assets/style/app.scss"
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '_assets/scripts/**/*.js',
        tasks: [ 'jshint:dist_preconcat', 'concat:dist', 'uglify:dist', 'jshint:dist_postconcat']
      },
      style: {
        files: '_assets/style/**/*.scss',
        tasks: ['sass:dist']
      },
      svg: {
        files: '_assets/images/**/*.svg',
        tasks: [ 'svgmin' , 'grunticon' ]
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [ 'svgmin', 'grunticon', 'jshint', 'concat', 'uglify', 'sass' ]);

};
