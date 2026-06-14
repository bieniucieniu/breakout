import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    tabWidth: 2,
    useTabs: false,
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [react(), vanillaExtractPlugin()],
});
