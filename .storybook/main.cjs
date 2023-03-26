const {
  mergeConfig
} = require('vite');
const viteTsconfig = require('vite-tsconfig-paths');
module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-react-router-v6", "@storybook/addon-mdx-gfm"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [viteTsconfig.default()]
    });
  },
  "features": {
    "storyStoreV7": true
  },
  docs: {
    autodocs: true
  }
};