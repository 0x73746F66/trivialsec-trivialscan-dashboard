import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import manifestSRI from "vite-plugin-manifest-sri";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      manifestSRI(),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ["stripe-pricing-table"].includes(tag),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@bootstrap": resolve(__dirname, "./node_modules/bootstrap/scss"),
        "@swiper-base": resolve(__dirname, "./node_modules/swiper"),
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
      devtool: "source-map",
    },
    build: {
      minify: command === "build",
      manifest: true,
      sourcemap: true,
    },
    optimizeDeps: {
      exclude: ["@popperjs/core"],
    },
  };
});
