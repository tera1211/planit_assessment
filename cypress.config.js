const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'https://jupiter.cloud.planittesting.com',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
