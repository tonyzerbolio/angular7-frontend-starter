// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

"use strict";
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-coverage'),
          require('karma-typescript'),
          require('karma-mocha-reporter'),
          require('@angular/cli/plugins/karma')
        ],
        files: [
            { pattern: "src/**/*.ts" }
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"]
        },
        reporters: ["dots", "karma-typescript"],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },
        browsers: ['Chrome_without_security'],
        customLaunchers: {
          Chrome_without_security: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
          }
        },
        singleRun: false
    });
};

