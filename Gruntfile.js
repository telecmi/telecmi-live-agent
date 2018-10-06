module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            "my_target": {
                files: {
                    'dist/agent-call-feed.min.js': ['src/socketio.js','src/agent-call-feed.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.registerTask('default', ['uglify']);
}
