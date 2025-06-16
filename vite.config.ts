import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
  plugins: [solid(), tailwindcss(), cloudflare()],
  build: {
    target: "esnext",
  },
})
