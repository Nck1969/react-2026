import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	base: "/react-2026/",
	plugins: [react()],
	css: {
		modules: {
			localsConvention: "camelCase",
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		css: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json-summary"],
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.test.{ts,tsx}",
				"src/main.tsx",
				"src/setupTests.ts",
				"src/**/*.d.ts",
				"src/types/**",
				"src/constants/**",
			],
			thresholds: {
				statements: 80,
				branches: 50,
				functions: 50,
				lines: 50,
			},
		},
	},
});
