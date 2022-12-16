import path from 'path'
import { defineConfig, UserConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import WindiCSS from 'vite-plugin-windicss'

import { viteStaticCopy, ViteStaticCopyOptions } from 'vite-plugin-static-copy'
//import shopifyModules from 'vite-plugin-shopify-modules'
import vue from '@vitejs/plugin-vue'

import { zod } from '@snailicide/g-library'

//make a schema for arguments:
const vite_schema = zod.object({
    watch: zod.optionalDefault(zod.boolean(), false),

    //   watch: zod.optionalDefault( zod.boolean(), false)
})

const argObj = {}

const ARGS = vite_schema.parse(argObj)

declare const process: {
    env: {
        // NODE_ENV: string
        VITE_WATCH: string
    }
}
type ViteConfigBuildOptions = {
    copy?: boolean
    shopify?: boolean
    emptyOutDir?: boolean
    outThemeDirectory?: string
}
/*const watcherOptions: BuildOptions = {
    watch: {
        exclude: [
            'assets/!*',
            'snippets/vite-*.liquid',
            'config/settings_schema.json',
        ],
    },
}*/

console.log('process.env.VITE_WATCH ', process.env.VITE_WATCH)
const getViteConfig = (config: ViteConfigBuildOptions): UserConfig => {
    return {
        server: {
            port: 8080,
        },
        base: './',
        build: {
            minify: false,
        },
        /*  build: {
            ...(ARGS.watch === true
                ? {
                    rollupOutputOptions: {
                      //  entryFileNames: '[name].js',
                    },
                      emptyOutDir: false,
                     // sourcemap: false,
                      watch: {
                          include: './src/!**!/!*',
                           exclude: ['assets/!*', 'snippets/vite-*.liquid', 'config/settings_schema.json']
                      },
                  }
                : { emptyOutDir: true }),
            // emptyOutDir: config.emptyOutDir === true,
        },*/
        plugins: [
            WindiCSS(),
            vue(),
            ...(config.copy === true
                ? viteStaticCopy({
                      targets: [
                          {
                              src: 'src/static/{fonts,images,styles}/*',
                              dest: path.resolve(__dirname, './assets'),
                          },
                      ],
                  })
                : []),
            ...(config.shopify === true
                ? shopify({
                      themeRoot: path.resolve(__dirname, '.'),
                      sourceCodeDir: path.resolve(__dirname, './src'),
                      entrypointsDir: path.resolve(__dirname, './src/entry'),
                      additionalEntrypoints: [
                          'src/styles/*',
                          'src/scripts/*',
                          // 'modules/!**!/!*.{ts,js}'
                      ],
                  })
                : []),
        ],
    }
}
export default defineConfig(
    getViteConfig({
        copy: true,
        shopify: true,
        emptyOutDir: true,
        outThemeDirectory: './theme',
    })
)
