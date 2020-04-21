const path = require('path'),
    fs = require('fs'),
    pjson = require('./package.json'),

    props = fs.readFileSync('./version.properties', 'utf-8').split(/[\r\n]/).filter(v => v.length > 1),

    env = new function () {
        this.VER = pjson.version;

        this.DATE = new Date().toUTCString();
        this.YEAR = new Date().getFullYear().toString();

        this.buildDir = getPath('build');
        this.distDir = getPath(this.buildDir, 'dist');
        this.isDev = process.argv.indexOf('--dev') !== -1;

        this.BUILD_NUMBER = process.env.BUILD_NUMBER || 'dev';
        this.VERSION = props.reduce((version, v) => {
            v = v.split('=');
            version[v[0]] = v[1];
            return version;
        }, {});

        this.versionStringShort = this.VERSION['major'] + '.' + this.VERSION['minor'];
        this.versionString = this.versionStringShort + '.' + this.VERSION['patch'];
        this.versionStringLong = this.versionString + '_' + (process.env.BUILD_NUMBER || 'DEV');
        this.LIBS = JSON.stringify(pjson.dependencies);

        /**
         * Resolves a sequence of paths or path segments into an absolute path.
         * @param {string} paths - A sequence of paths or path segments
         * @return {string}
         */
        function getPath(...paths) {
            return path.resolve(__dirname, ...paths);
        }
    };

module.exports = env;
