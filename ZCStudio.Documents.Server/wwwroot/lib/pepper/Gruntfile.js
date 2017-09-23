module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Define our source and build folders
        public_path: 'dist',

        js_src_path: 'src/js',
        sass_path:   'src/sass',

        js_path:     '<%= public_path %>/js',
        css_path:    '<%= public_path %>/css',
        img_path:    '<%= public_path %>/img/vendor',
        fonts_path:  '<%= public_path %>/fonts',
        sprite_path: '<%= public_path %>/img/sprites',


        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version + "\\n" %>' +
            '* <%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
            '* <%= pkg.homepage + "\\n" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> - Michael Wohlfahrter <%= "\\n" %>' +
            '*/ <%= "\\n" %><%= "\\n" %>',

        concat: {
            options:{
                separator: ';\n\n'
            },
            pepper: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    '<%= js_src_path %>/main.js',
                    '<%= js_src_path %>/elements/**/*.js'
                ],
                dest: '<%= js_path %>/pepper.js'
            },
            jquery: {
                src: [
                    '<%= js_src_path %>/vendor/jquery/jquery.min.js'
                ],
                dest: '<%= js_path %>/jquery.min.js'
            },
            vendor: {
                src: [
                    '<%= js_src_path %>/vendor/jquery/jquery.chosen.min.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.validate.min.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.spin.min.js',
                    '<%= js_src_path %>/vendor/slick.min.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.magnific-popup.min.js'
                ],
                dest: '<%= js_path %>/vendor.min.js'
            }
        },

        uglify: {
            pepper: {
                options:{
                    mangle: true,
                    report: 'min',
                    banner: '<%= banner %>'
                },
                src: ['<%= concat.pepper.dest %>'],
                dest: '<%= js_path %>/pepper.min.js'
            },
            spin: {
                options:{
                    banner: '//fgnass.github.com/spin.js#v2.0.1\n'
                },
                src: [
                    '<%= js_src_path %>/vendor/spin.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.spin.js'
                ],
                dest: '<%= js_src_path %>/vendor/jquery/jquery.spin.min.js'
            }
        },

        compass: {
            options: {
                cssDir: '<%= css_path %>',
                sassDir: '<%= sass_path %>',
                imagesDir: '<%= img_path %>',
                fontsDir: '<%= fonts_path %>',

                generatedImagesDir: '<%= sprite_path %>',
                spriteLoadPath: '<%= sprite_path %>',

                relativeAssets: true,
                noLineComments: true,
                outputStyle: 'expanded' //nested, expanded, compact, compressed
            },
            pepper: {
                options: {
                    banner: '<%= banner %>',
                    specify: ['<%= sass_path %>/pepper.scss']
                }
            },
            vendor: {
                options: {
                    specify: ['<%= sass_path %>/vendor.scss']
                }
            },
            animate: {
                options: {
                    specify: ['<%= sass_path %>/vendor/animate.scss']
                }
            }
        },

        cssmin: {
            options:{
                mangle: true,
                report: 'min'
            },
            pepper: {
                options:{
                },

                src: ['<%= css_path %>/pepper.css'],
                dest: '<%= css_path %>/pepper.min.css'
            },
            vendor: {
                src: ['<%= css_path %>/vendor.css'],
                dest: '<%= css_path %>/vendor.min.css'
            },
            animate: {
                src: ['<%= css_path %>/vendor/animate.css'],
                dest: '<%= css_path %>/vendor/animate.min.css'
            }
        },

        bowercopy: {
            options: {
                clean: true
            },
            js_dev: {
                options: {
                    destPrefix: '<%= js_src_path %>/vendor'
                },
                files: {
                    'jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
                    'jquery/jquery.validate.min.js': 'jquery-validation/dist/jquery.validate.min.js',
                    'jquery/jquery.chosen.min.js': 'chosen/chosen.jquery.min.js',
                    'jquery/jquery.spin.js': 'spin.js/jquery.spin.js',
                    'spin.js': 'spin.js/spin.js',
                    'slick.min.js': 'slick-carousel/slick/slick.min.js'
                }
            },
            css_dev: {
                options: {
                    destPrefix: '<%= sass_path %>/vendor'
                },
                files: {
                    '_normalize.scss': 'normalize-css/normalize.css',
                    '_font-awesome.scss': 'Font-Awesome/css/font-awesome.css',
                    'animate.scss': 'animate.css/animate.css',
                    '_magnific-popup.scss': 'magnific-popup/dist/magnific-popup.css',
                    '_chosen.scss': 'chosen/chosen.css',
                    '_slick.scss': 'slick-carousel/slick/slick.scss'
                }
            },
            public: {
                options: {
                    destPrefix: '<%= public_path %>'
                },
                files: {
                    'js/respond.min.js': 'respond/dest/respond.min.js',

                    'fonts/fontawesome-webfont.eot':  'Font-Awesome/fonts/fontawesome-webfont.eot',
                    'fonts/fontawesome-webfont.svg':  'Font-Awesome/fonts/fontawesome-webfont.svg',
                    'fonts/fontawesome-webfont.ttf':  'Font-Awesome/fonts/fontawesome-webfont.ttf',
                    'fonts/fontawesome-webfont.woff': 'Font-Awesome/fonts/fontawesome-webfont.woff',

                    'fonts/slick.eot':  'slick-carousel/slick/fonts/slick.eot',
                    'fonts/slick.svg':  'slick-carousel/slick/fonts/slick.svg',
                    'fonts/slick.ttf':  'slick-carousel/slick/fonts/slick.ttf',
                    'fonts/slick.woff': 'slick-carousel/slick/fonts/slick.woff',
                    'img/vendor/ajax-loader.gif': 'slick-carousel/slick/ajax-loader.gif',

                    'img/vendor/chosen-sprite.png': 'chosen/chosen-sprite.png',
                    'img/vendor/chosen-sprite@2x.png': 'chosen/chosen-sprite@2x.png'
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= concat.pepper.src %>'],
                tasks: ['concat:pepper', 'uglify:pepper']
            },
            scripts_vendor: {
                files: ['<%= concat.vendor.src %>'],
                tasks: ['uglify:spin', 'concat:vendor']
            },
            sass: {
                files: ['<%= sass_path %>/*.scss', '<%= sass_path %>/config/*.scss', '<%= sass_path %>/custom/*.scss'],
                tasks: ['compass:pepper', 'cssmin:pepper']
            },
            sass_vendor: {
                files: ['<%= sass_path %>/vendor/*.scss', '<%= sass_path %>/config/*.scss'],
                tasks: ['compass:vendor', 'cssmin:vendor', 'compass:animate', 'cssmin:animate']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-bowercopy');

    // Default task.
    grunt.registerTask('default', ['uglify:spin', 'concat', 'uglify:pepper', 'compass', 'cssmin']);
    grunt.registerTask('css',     ['compass', 'cssmin']);
    grunt.registerTask('js',      ['uglify:spin', 'concat', 'uglify:pepper']);
    grunt.registerTask('bower',   ['bowercopy']);
};