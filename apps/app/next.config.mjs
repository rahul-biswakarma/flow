import "./src/env.mjs";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@v1/supabase", "@v1/ui"],
  experimental: {
    optimizePackageImports: ["@v1/supabase", "@v1/ui"],
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
};

const withBundleAnalyzerWrapper = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withSentryConfig(withBundleAnalyzerWrapper(nextConfig), {
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",
});
