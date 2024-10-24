import { PluginOption } from "vite";

// For React Support
import react from "@vitejs/plugin-react";

const plugins = (mode) => {
  return [react({ include: "pathToAllReactFiles.{jsx,tsx}" })];
};

export default plugins;
