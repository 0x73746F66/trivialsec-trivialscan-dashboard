import { resolve } from 'path'
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['stripe-pricing-table'].includes(tag),
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@bootstrap": resolve(__dirname, "./node_modules/bootstrap/scss"),
      "@swiper": resolve(__dirname, "./node_modules/swiper/modules/"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/global.scss";`,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: '/src/main.js'
    }
  }
});
