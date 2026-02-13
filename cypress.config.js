import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/", // React URL
    setupNodeEvents(on, config) {
      
    },
  },
});
