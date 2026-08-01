import { builtinModules } from "module";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

module.exports = {
  logging: {
    fethces: {
      fullUrl : true,
    }
  }
}
