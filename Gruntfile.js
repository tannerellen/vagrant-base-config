module.exports = function(grunt) {
  'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ngtemplates:  {
 			 app: {
        cwd:      '',
        src:      'app/**/**.html',
        dest:     'dist/app.templates.js'
  			}
		},
		copy: {
  			main: {
    			files: [
          //{expand: true, flatten: true, src: ['package.json'], dest: 'dist/', filter: 'isFile'},
    			{expand: true, flatten: true, src: ['support-assets/index.html'], dest: 'dist/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['app/app-translations.js'], dest: 'dist/', rename: function(dest, src) {return 'new-name';}, filter: 'isFile'},
f
      		// includes files within path and its sub-directories
          //{expand: true, flatten: true, src: ['.htaccess'], dest: 'dist/', filter: 'isFile'},
  	  		{expand: true, flatten: true, src: ['fonts/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, flatten: false, src: ['images/**'], dest: 'dist/'},
          {expand: true, flatten: false, src: ['messages/**'], dest: 'dist/'},
          {expand: true, flatten: false, src: ['php/**'], dest: 'dist/'},
          {expand: true, flatten: false, src: ['updates/**'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['vagrant/deployment/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, flatten: false, cwd: 'vagrant/deployment/config', src: ['**'], dest: 'dist/.bp-config/'},
          {expand: true, flatten: false, src: ['salesforce/**'], dest: 'dist/'},
          {expand: true, flatten: false, src: ['DayBack.php'], dest: 'dist/'},
    			]
  			},
        addVersionNumbers: {
          src: 'dist/index.html',
          dest: 'dist/index.html',
          options: {
            process: function (content, srcpath) {
              var version = new Date().getTime() + "-" + grunt.config.get('pkg.version');
              return content.replace(/{version}/g, version);
            }
          }
        },
        fixCSSPaths: {
          src: 'dist/<%= pkg.name %>.css',
          dest: 'dist/<%= pkg.name %>.css',
          options: {
            process: function (content, srcpath) {
              return content.replace(/\.\.\/fonts\//g,"");
            }
          }
        },
        removeDebug: {
          src: 'dist/<%= pkg.name %>.js',
          dest: 'dist/<%= pkg.name %>.js',
          options: {
            process: function (content, srcpath) {
              return content
                .replace(/seedcoder\..*\(.*\)\s*;?/g,"")
                .replace(/\/\* DEBUG \*\/[\S\s]*?\/\* END DEBUG \*\//g,"")
                .replace(/\<!-- DEBUG --\>[\S\s]*?\<!-- END DEBUG --\>/g,"");
            }
          }
        },
        replaceWithTestURLs: {
          src: 'dist/<%= pkg.name %>.js',
          dest: 'dist/<%= pkg.name %>.js',
          options: {
            process: function (content, srcpath) {
              return content
                .replace(/http:\/\/dayback\.io/g,"http://localhost:8888/dev/web-calendar/updates");
            }
          }
        },
        testflight: {
          files: [
          {expand: true, flatten: true, src: ['libraries/crypt.js'], dest: 'dist/', filter: 'isFile'}
          ]
        },
        production: {
          files: [
          {expand: true, flatten: true, src: ['dist/**'], dest: '<%= af.path %>', filter: 'isFile'}
          ]
        },
        updateLatest: {
          src: 'updates/web-calendar/get-update/latest-directory.txt',
          dest: 'updates/web-calendar/get-update/latest-directory.txt',
          options: {
            process: function (content, srcpath) {
              return grunt.config.get('af.upgradeDirectory');
            }
          }
        },
        updateLatestVersion: {
          src: 'updates/version-history.json',
          dest: 'updates/version-history.json',
          options: {
            process: function (content, srcpath) {
              var jsonString = "{\"history\": [{\"version\": \"" +  grunt.config.get('pkg.version') + "\", \"changes\": \"Update\"}]}";
             
              return jsonString;
            }
          }
        },
        crypt: {
          files: [
          {expand: true, flatten: true, src: ['libraries/crypt.js'], dest: 'dist/', filter: 'isFile'}
          ]
        },
		},
		concat: {
		  options: {
    		// define a string to put between each file in the concatenated output
    		separator: '',
    		stripBanners: true
  		},
      fullcalendar: {
        options: {
          separator: "\n",
          banner: "\n(function() {\n",
          footer: "\n}());\n",
        },
        // the files to concatenate
        src: [
          'libraries/fullcalendar/js/defaults.js',
          'libraries/fullcalendar/js/main.js',
          'libraries/fullcalendar/js/calendar.js',
          'libraries/fullcalendar/js/header.js',
          'libraries/fullcalendar/js/event-manager.js',
          'libraries/fullcalendar/js/resource-manager.js',
          'libraries/fullcalendar/js/utilities.js',
          'libraries/fullcalendar/js/date-formatting.js',
          'libraries/fullcalendar/js/views/view-definitions.js',
          'libraries/fullcalendar/js/views/view.js',

          'libraries/fullcalendar/js/views/basic/view.js',
          'libraries/fullcalendar/js/views/basic/event-renderer.js',
          'libraries/fullcalendar/js/views/basic/day-event-renderer.js',

          'libraries/fullcalendar/js/views/agenda/view.js',
          'libraries/fullcalendar/js/views/agenda/event-renderer.js',

          'libraries/fullcalendar/js/views/resource/basic-resource.js',
          'libraries/fullcalendar/js/views/resource/agenda-resource.js',
          'libraries/fullcalendar/js/views/resource/basic-event-renderer.js',
          'libraries/fullcalendar/js/views/resource/agenda-resource-event-renderer.js',
          'libraries/fullcalendar/js/views/resource/resource-day-event-renderer.js',

          'libraries/fullcalendar/js/views/grid/view.js',
          'libraries/fullcalendar/js/views/grid/event-renderer.js',
          'libraries/fullcalendar/js/views/grid/day-event-renderer.js',

          'libraries/fullcalendar/js/views/horizon/view.js',
          'libraries/fullcalendar/js/views/horizon/event-renderer.js',
          'libraries/fullcalendar/js/views/horizon/day-event-renderer.js',

          'libraries/fullcalendar/js/agenda-segment-utilities.js',
          'libraries/fullcalendar/js/general-segment-utilities.js',
          'libraries/fullcalendar/js/coordinate-grid.js',
          'libraries/fullcalendar/js/hover-listener.js',
          'libraries/fullcalendar/js/overlay-manager.js',
          'libraries/fullcalendar/js/selection-manager.js',
          'libraries/fullcalendar/js/horizontal-position-cache.js',
        ],
        // the location of the resulting JS file
        dest: 'dist/fullcalendar.js'
      },
  		js: {
    		// the files to concatenate
    		src: [
        //Libraries
        'libraries/jquery.js',
        'libraries/jquery-ui/jquery-ui.js',
        'libraries/jquery-ui-touch.js',
        'libraries/jquery.csv.js',
        'libraries/jquery-custom-scrollbar/jquery-custom-scrollbar.js',

        'libraries/angular.js',
        'libraries/ng-route.js',
        'libraries/ng-animate.js',

        'libraries/firebase.js',
        'libraries/angularfire.js',

        'libraries/bootstrap/bootstrap.min.js',

        'libraries/moment-with-langs.js',
        'libraries/moment-readable-range.js',
        'libraries/moment-timezone.js',

        //'libraries/fullcalendar/fullcalendar.js',
        'dist/fullcalendar.js',

        'libraries/fullcalendar/lang-all.js',
        'libraries/ui-calendar/src/calendar.js',

        //Angular app files
        'libraries/bootstrap/ui-bootstrap-datepicker.js',
        'libraries/bootstrap/seedcode-ui-bootstrap-timepicker.js',
        'libraries/angular-color-picker/bootstrap-colorpicker-module.js',
        'libraries/angular-translate.js',

        'dist/crypt.js',

        'libraries/fmxj/fmxj.js',

        'libraries/gBk.js',

        'libraries/salesforce/canvas-all.js',
        'libraries/salesforce/fBack.js',

        'libraries/angular-slider/angular-slider.js',

        'app/app.js',
        'app/app-services.js',
        'app/app-directives.js',
        'app/app-filters.js',
        'app/app-controller.js',
        'app/app-translations.js',

        'app/core/core-module.js',
        
        'app/common/common-module.js',
        'app/common/common-services.js',
        'app/common/common-directives.js',

        'app/common/dayback-io-services.js',

        'app/common/datastore-services.js',

        'app/common/translation-services.js',
        'app/common/theme-services.js',

        'app/crypt-module.js',

        'app/messages/messages-controller.js',

        'app/activation/activation-module.js',

        'app/user/user-services.js',
        'app/user/user-controller.js',
        'app/user/password-controller.js',

        'app/calendar/calendar-app.js',
        'app/calendar/calendar-controller.js',

        'app/header/header-app.js',
        'app/header/header-controller.js',
        'app/header/header-directives.js',

        'app/sidebar/sidebar-app.js',
        'app/sidebar/sidebar-controller.js',
        'app/sidebar/sidebar-directives.js',

        'app/sidebar/minicals/minicals-app.js',
        'app/sidebar/minicals/minicals-controller.js',

        'app/sidebar/sources/sources-app.js',
        'app/sidebar/sources/sources-services.js',
        'app/sidebar/sources/sources-controller.js',

        'app/sidebar/filters/filters-app.js',
        'app/sidebar/filters/filters-services.js',
        'app/sidebar/filters/filters-controller.js',

        'app/sidebar/settings/settings-app.js',
        'app/sidebar/settings/settings-controller.js',

        'app/event/event-app.js',
        'app/event/event-controller.js',
        'app/event/event-directives.js',

        'app/settings/settings-services.js',
        'app/settings/settings-controller.js',

        'app/sources/sources-services.js',
        'app/sources/source-definitions/filemaker-client.js',
        'app/sources/source-definitions/filemaker-server.js',
        'app/sources/source-definitions/google-calendar.js',
        'app/sources/source-definitions/salesforce.js',

        'dist/app.templates.js'
    		
    		],
    		// the location of the resulting JS file
    		dest: 'dist/<%= pkg.name %>.js'
  		},

      debug: {
        // the files to concatenate
        src: [
        //Libraries
        'dev.js',
        'dist/<%= pkg.name %>.js'
        ],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      },

  		css: {
  		    // the files to concatenate
    		src: ['libraries/font-awesome/css/font-awesome.css',
    		'libraries/bootstrap/bootstrap.css',
    		'libraries/fullcalendar/fullcalendar.css',
        'libraries/jquery-custom-scrollbar/jquery-custom-scrollbar.css',
        'libraries/angular-color-picker/colorpicker.css',
        'libraries/angular-slider/angular-slider.css',
    		'css/style.css',
    		'css/sidebar.css',
    		'css/calendars.css',
    		'css/edit.css',
        'css/activation.css',
        'css/settings.css',
 			  
        // 'css/**/*.css'
    		],
    		// the location of the resulting JS file
    		dest: 'dist/<%= pkg.name %>.css'
  			}
		},
    ngmin: {
        angular: {
            src : ['dist/<%= pkg.name %>.js'],
            dest : 'dist/<%= pkg.name %>.js'
        }

    },
		clean : {
			build : {
				src : ["dist/"
				]
			},
      templates : {
          src : [ "dist/app.templates.js",
                  "dist/crypt.js",
                  "dist/fullcalendar.js",
          ]
      }
		},
    cssmin: {
      css:{
        src: 'dist/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    uglify: {
          options: {
            banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
              mangle: false,
              compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
              }
          },
          dist: {
            files: {
              'dist/<%= pkg.name %>.js': ['<%= concat.js.dest %>']
            }
          }
      },
      jsObfuscate: {
        crypt: {
          options: {
            concurrency: 2,
            keepLinefeeds: false,
            keepIndentations: false,
            encodeStrings: true,
            encodeNumbers: true,
            moveStrings: true,
            replaceNames: true,
            variableExclusions: [ '^_get_', '^_set_', '^_mtd_' ]
          },
          files: {
            'dist/crypt.js': [
              'libraries/crypt.js'
            ]
          }
        }
      },
      shell: {
        afDeploy: {
          // Your command may vary in terms of what directory 
          // you run this in. For example,
          // my build script builds everything into /dist
          command: 'cd updates; af login --email <%= af.username %> --passwd <%= af.password %>; af update dayback-downloads;',
          options: {
            stdout: true // Outputs grunt-shell commands to the terminal
          }
        }
      },
	});
	

	//Load our tasks
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('js-obfuscator');
  grunt.loadNpmTasks('grunt-shell');
	
	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['clean:build', 'ngtemplates', 'jsObfuscate', 'copy:main', 'concat:fullcalendar', 'concat:js', 'concat:css', 'copy:removeDebug', 'cssmin', 'ngmin', 'clean:templates', 'uglify', 'copy:addVersionNumbers', 'copy:fixCSSPaths']);

  grunt.registerTask('testflight', function() {
    // Set args as config items, 'af' here is arbitrary, it can be anything
    // as long as you reference it by this name in your Grunt config.
    // As this is how we're able to have <%= af.appName %> mean something
    grunt.config.set('af.upgradeDirectory', '<%= pkg.version %>-' + stringToHash(grunt.config.get('pkg.version')));

    grunt.config.set('af.path', 'updates/<%= pkg.name %>/<%= pkg.version %>-' + stringToHash(grunt.config.get('pkg.version')));

    var tasks = ['clean:build', 'ngtemplates', 'copy:testflight', 'copy:main', 'concat:fullcalendar', 'concat:js', 'concat:css', 'copy:removeDebug', 'clean:templates', 'copy:addVersionNumbers', 'copy:fixCSSPaths', 'copy:replaceWithTestURLs', 'copy:production', 'copy:updateLatest'];
    
    // Run tasks
    grunt.task.run(tasks);
  
  });
  
  grunt.registerTask('testURLs', ['copy:replaceWithTestURLs']);

  grunt.registerTask('debug', ['clean:build', 'ngtemplates', 'jsObfuscate', 'copy:main', 'concat:fullcalendar', 'concat:js', 'concat:css', 'copy:removeDebug', 'clean:templates', 'copy:addVersionNumbers', 'copy:fixCSSPaths']);

  grunt.registerTask('noObfuscate', ['clean:build', 'ngtemplates', 'copy:crypt', 'copy:main', 'concat:fullcalendar', 'concat:js', 'concat:css', 'copy:removeDebug', 'cssmin', 'ngmin', 'clean:templates', 'uglify', 'copy:addVersionNumbers', 'copy:fixCSSPaths']);

  grunt.registerTask('obfuscate', ['clean:build', 'jsObfuscate']);

  grunt.registerTask('production', function(username, password) {
    // You can go as elaborate as you want on 
    // the argument fallbacks,
    // for the sake of this ProTip, I'm just using 'arguments'

    if(arguments.length === 0) {
      // Log an error
      grunt.log.error("afDeploy: No arguments provided. Please provide the App Name, Username and Password.");
      // Return false to short circuit the task.
      return false;
    }

    // Set args as config items, 'af' here is arbitrary, it can be anything
    // as long as you reference it by this name in your Grunt config.
    // As this is how we're able to have <%= af.appName %> mean something
    grunt.config.set('af.upgradeDirectory', '<%= pkg.version %>-' + stringToHash(grunt.config.get('pkg.version')));

    grunt.config.set('af.path', 'updates/<%= pkg.name %>/<%= pkg.version %>-' + stringToHash(grunt.config.get('pkg.version')));
    grunt.config.set('af.username', username);
    grunt.config.set('af.password', password);

    var tasks = [
      // Whatever your build tasks are, i.e compass:dist, etc.
      'copy:production', 'copy:updateLatest', 'shell:afDeploy' // It depends on your build but most likely you'll want to do this as the very last step.
    ];

    // Run tasks
    grunt.task.run(tasks);

  });
  //Utility function to encode base62
  function base62encode(a,b,c){for(a=a!==+a||a%1?-1:a,b="";a>=0;a=Math.floor(a/62)||-1)b=String.fromCharCode(((c=a%62)>9?c>35?29:87:48)+c)+b;return b};
  //Create hash from string
  function stringToHash(text) {
      var bytes = [];
      for (var i = 0; i < text.length; i++) {
          bytes.push(base62encode(text.charCodeAt(i)));
      }
      return bytes.join('');
  }
};