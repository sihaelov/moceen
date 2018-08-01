// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.steps')
      .assert.containsText('.steps > div:first-child', 'Select a device')
      .assert.elementCount('footer', 1)
      .end();
  },
};
