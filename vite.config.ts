/*
 * @Author: luoxi
 * @Date: 2022-01-25 09:51:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-21 22:57:42
 * @FilePath: \vue-admin-box\vite.config.ts
 * @Description: 
 */
import {ConfigEnv, UserConfigExport} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteMockServe} from 'vite-plugin-mock'
import {vitePluginSvg} from "@webxrd/vite-plugin-svg"
import {resolve} from 'path'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
    '@': pathResolve("src")
}

/**
 * @description-en vite document address
 * @description-cn vite官网
 * https://vitejs.cn/config/ */
export default ({command}: ConfigEnv): UserConfigExport => {
    const prodMock = true;
    return {
        base: './',
        resolve: {
            alias
        },
        // devServer: {
        //     host: '0.0.0.0',
        //     disableHostCheck: true,
        //     proxy: {
        //         '/api': {
        //             target: '0.0.0.0:5000',//后端接口地址，按自己的改
        //             changeOrigin: true,//是否允许跨越
        //             pathRewrite: {
        //                 '^/api': ''
        //             }
        //         }
        //     }
        // },
        server: {
            port: 3001,
            host: '0.0.0.0',
            // port: 5000,
            // host: '101.132.152.202',
            open: true,
            // proxy: { // 代理配置
            //   '/dev': 'https://www.fastmock.site/mock/48cab8545e64d93ff9ba66a87ad04f6b/'
            // },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'echarts': ['echarts']
                    }
                }
            }
        },
        plugins: [
            vue(),
            // viteMockServe({
            //   mockPath: 'mock',
            //   localEnabled: command === 'serve',
            //   prodEnabled: command !== 'serve' && prodMock,
            //   watchFiles: true,
            //   injectCode: `
            //     import { setupProdMockServer } from '../mockProdServer';
            //     setupProdMockServer();
            //   `,
            //   logger: true,
            // }),
            vitePluginSvg({
                // 必要的。必须是绝对路径组成的数组。
                iconDirs: [
                    resolve(__dirname, 'src/assets/svg'),
                ],
                // 必要的。入口script
                main: resolve(__dirname, 'src/main.js'),
                symbolIdFormat: 'icon-[name]'
            }),
        ],
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            }
                        }
                    }
                ],
            },
        }
    };
}
