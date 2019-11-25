const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    'e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    maxInstances: 1,
    chromeOptions: {
      binary: '/usr/bin/chromium-browser',
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--allow-insecure-localhost',
        '--ignore-certificate-errors'
      ]
    }
  },
  chromeDriver: 'e2e/drivers/chromedriver',
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};

