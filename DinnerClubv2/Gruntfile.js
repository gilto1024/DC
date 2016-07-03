module.exports = function(grunt) {
    var appConfig;

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    appConfig = {
        src: 'src',
        dist: 'dist',
        temp: '.tmp'
    };

    grunt.initConfig({
        app: appConfig,
        pkg: grunt.file.readJSON('package.json'),

        // Compile scss to css
        sass: {
            development: {
                options: {
                    'sourcemap': 'none',
                    'style': 'compressed',
                    'trace': true
                },
                files: {
                    "src/styles/style.css": "src/scss/style.scss"
                }
            }
        },

        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass', 'copy:styles'],
                options: {
                    nospawn: true
                }
            }
        },

        // Executed during build task - after js files concatenated during usemin
        babel: {
            options: {
                sourceMap: false,
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            dist: {
                files: {
                    "<%= app.dist %>/scripts/script.js": "<%= app.dist %>/scripts/script.js"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= app.temp %>/scripts/app.js',
                dest: '<%= app.dist %>/scripts/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= app.src %>',
                        dest: '<%= app.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '*.html',
                            'images/**/*.*',
                            'data/**/*.*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= app.src %>/styles',
                dest: '<%= app.temp %>/styles/',
                src: '{,*/}*.css'
            }
        },
        useminPrepare: {
            html: 'src/index.html',
            options: {
                flow: {
                    steps: {
                        js: ['concat'],
                        css: ['concat']
                    },
                    post: {}
                }
            }
        },
        usemin: {
            html: 'dist/index.html',
            blockReplacements: {
                remove: function (block) {
                    return '';
                }
            }
        }
    });

    // Build task - makes dist folder happen to copied as is to server
    grunt.registerTask('build', [
        'sass',
        'useminPrepare',
        'concat',
        'babel',
        'copy:dist',
        'usemin'
    ]);

    // Default task
    grunt.registerTask('default', [
        'live'
    ]);

    // Run live version of app
    grunt.registerTask('live', [
        'copy:styles',
        'watch'
    ]);
};