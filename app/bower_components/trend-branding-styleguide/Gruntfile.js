// Generated on 2013-04-08 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
            source: 'source',
            scripts: 'javascripts',
            images: 'images',
            template: 'html',
            fonts: 'fonts',
            dist: 'dist'
        };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            // compass: {
            //     files: ['<%= yeoman.source %>/{,*/}*.{scss,sass}'],
            //     tasks: ['compass']
            // },
            less: {
                files: ['<%= yeoman.source %>/2.0/{,*/}*.{less,css}', '<%= yeoman.source %>/3.0/{,*/}*.{less,css}'],
                tasks: ['less', 'createstyle']
            },
            livereload: {
                files: [
                    '<%= yeoman.template %>/**/*.html',
                    '{.tmp,<%= yeoman.dist %>}/**/{,*/}*.css',
                    '{.tmp,<%= yeoman.scripts %>}/{,*/}*.js',
                    '<%= yeoman.images %>/{,*/}*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'html'),
                            mountFolder(connect, 'dist'),
                            mountFolder(connect, 'styleguide'),
                            mountFolder(connect, 'test') //run test tasks folder
                        ];
                    }
                }
            }
        },
        // compass: {
        //     options: {
        //         sassDir: '<%= yeoman.source %>',
        //         cssDir: '.tmp/styles',
        //         imagesDir: '<%= yeoman.images %>',
        //         javascriptsDir: '<%= yeoman.scripts %>',
        //         fontsDir: '<%= yeoman.fonts %>',
        //         importPath: 'app/components',
        //         relativeAssets: true
        //     },
        //     dist: {},
        //     server: {
        //         options: {
        //             debugInfo: true
        //         }
        //     }
        // },
        sass: {
          dist: {
            options: {
              style: 'expanded',
              require: 'susy'
            },
            files: {
                'css/style.css': 'source/sass-3.0/sass/_config.scss'
            }
          }
        },
        less: {
            compile: {
                files: {
                    '<%= yeoman.dist %>/2.0/css/trend.css': ['<%= yeoman.source %>/2.0/less/config.less'],
                    '<%= yeoman.dist %>/3.0/css/trend.css': ['<%= yeoman.source %>/3.0/less/config.less']
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.source %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/**/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3,
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.source %>/2.0/<%= yeoman.images %>',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/2.0/img'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.source %>/3.0/<%= yeoman.images %>',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/3.0/img'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/css/home.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.source %>/{,*/}*.css'
                    ]
                }
            }
        },
        copy: {
            styleguideResource: {
                files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/2.0/<%= yeoman.images %>',
                    dest: 'styleguide/docs/2.0/img/trend',
                    src: [
                        '**/*.png'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/3.0/<%= yeoman.images %>',
                    dest: 'styleguide/docs/3.0/img/trend',
                    src: [
                        '**/*.png'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/<%= yeoman.fonts %>',
                    dest: 'styleguide/docs/2.0/fonts',
                    src: [
                        '*.{eot,svg,ttf,woff}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/<%= yeoman.fonts %>',
                    dest: 'styleguide/docs/3.0/fonts',
                    src: [
                        '*.{eot,svg,ttf,woff}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/2.0/<%= yeoman.scripts %>',
                    dest: 'styleguide/docs/2.0/js/trend',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/3.0/<%= yeoman.scripts %>',
                    dest: 'styleguide/docs/3.0/js/trend',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap-2/js',
                    dest: 'styleguide/docs/2.0/js',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap-3/js',
                    dest: 'styleguide/docs/3.0/js',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'templates/',
                    dest: 'styleguide/docs/2.0',
                    src: [
                        '*.html'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'templates/',
                    dest: 'styleguide/docs/3.0',
                    src: [
                        '*.html'
                    ]
                }]
            },
            dist: {
                files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/2.0/<%= yeoman.images %>',
                    dest: '<%= yeoman.dist %>/2.0/img/trend',
                    src: [
                        '**/*.png'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/3.0/<%= yeoman.images %>',
                    dest: '<%= yeoman.dist %>/3.0/img/trend',
                    src: [
                        '**/*.png'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/<%= yeoman.fonts %>',
                    dest: '<%= yeoman.dist %>/2.0/fonts',
                    src: [
                        '*.{eot,svg,ttf,woff}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/<%= yeoman.fonts %>',
                    dest: '<%= yeoman.dist %>/3.0/fonts',
                    src: [
                        '*.{eot,svg,ttf,woff}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap-2/js',
                    dest: '<%= yeoman.dist %>/2.0/js',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap-3/js',
                    dest: '<%= yeoman.dist %>/3.0/js',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/2.0/<%= yeoman.scripts %>',
                    dest: '<%= yeoman.dist %>/2.0/js/trend',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>/3.0/<%= yeoman.scripts %>',
                    dest: '<%= yeoman.dist %>/3.0/js/trend',
                    src: [
                        '*.js'
                    ]
                }]
            }
        },
        styleguide: {

            kss: {

                options: {
                    framework: {
                        name: 'kss'
                    },
                    name: 'Trend Micro Branding Style Guide',
                    template: {
                        src: 'styleguide/kss-template/'
                    }
                },

                files: {
                    'styleguide/docs/2.0': '<%= yeoman.source %>/2.0/less/config.less',
                    'styleguide/docs/3.0': '<%= yeoman.source %>/3.0/less/config.less'
                }

            }

        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        // 'styleguide',
        // 'less',
        'livereload-start',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('lessc', ['less']);

    grunt.registerTask('compile', [
        'less',
        'styleguide'
    ]);

    grunt.registerTask('build', [
        'compile',
        'copy'
    ]);

};
