module.exports = function ( grunt ) {
    grunt.initConfig( {
        uglify: {
            "my_target": {
                files: {
                    'dist/telecmi-agent-callfeed.min.js': ['src/socketio.js', 'src/agent-call-feed.js']
                }
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' ); // load the given tasks
    grunt.registerTask( 'default', ['uglify'] );
}
