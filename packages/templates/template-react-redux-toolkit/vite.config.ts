import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react'
import path from 'path'
import styleImport, {
  AntdResolve
} from 'vite-plugin-style-import';

const DEV = 'development';
const productionBase = '/';
// https://vitejs.dev/config/
export default function ({ mode }) {
  return {
    base: mode === DEV ? '/' : productionBase,
    plugins: [
      react(),
      styleImport({
        resolves:[ AntdResolve()],
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: [
        // fix less import by: @import ~
        // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: 'src', replacement: path.resolve(__dirname, 'src') },
        { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
        { find: 'components', replacement: path.resolve(__dirname, './src/components') },
        { find: 'config', replacement: path.resolve(__dirname, './src/config') },
        { find: 'store', replacement: path.resolve(__dirname, './src/store') },
        { find: 'service', replacement: path.resolve(__dirname, './src/service') },
        { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
        { find: 'utils', replacement: path.resolve(__dirname, './src/utils') },
      ],
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#244ba8',
            'link-color': '#244ba8',
            'font-size-base': '12px',
            'text-color': 'rgba(0,0,0,.65)',
          },
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
      port: 3001,
      host: 'localhost',
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8088',
          rewrite: path => path.replace(/^\/api\//, ''),
          changeOrigin: true,
        },
      },
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
  } as UserConfig;
}
