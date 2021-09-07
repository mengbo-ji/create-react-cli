import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
const path = require('path');

const DEV = 'development';
const productionBase = '/https://github.com/mengbo-ji/vite-dva-react.git/';
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: mode === DEV ? '/' : productionBase,
    plugins: [
      reactRefresh(),
    ],
    resolve: {
      alias: [
        // fix less import by: @import ~
        // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
        { find: /^~/, replacement: '' },
        { find: 'src', replacement: path.resolve(__dirname, 'src') },
        { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
        { find: 'components', replacement: path.resolve(__dirname, './src/components') },
        { find: 'config', replacement: path.resolve(__dirname, './src/config') },
        { find: 'models', replacement: path.resolve(__dirname, './src/models') },
        { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
        { find: 'utils', replacement: path.resolve(__dirname, './src/utils') },
      ],
      // alias: {
      //   src: path.resolve(__dirname, './src'),
      //   assets: path.resolve(__dirname, './src/assets'),
      //   components: path.resolve(__dirname, './src/components'),
      //   config: path.resolve(__dirname, './src/config'),
      //   models: path.resolve(__dirname, './src/models'),
      //   pages: path.resolve(__dirname, './src/pages'),
      //   utils: path.resolve(__dirname, './src/utils'),
      // },
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          require('postcss-nested'),
          require('postcss-preset-env'),
        ],
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
          chunkFileNames: '[name].js',
        },
      },
      sourcemap: true,
    },
  });
};

