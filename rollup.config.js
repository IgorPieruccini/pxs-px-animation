import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

const input = "src/index.ts";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [typescript(), json()];

export default {
  input,
  output: {
    dir: "lib",
    format: "cjs",
    sourcemap: true,
  },
  plugins,
  external,
};
