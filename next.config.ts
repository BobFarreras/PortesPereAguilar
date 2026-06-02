import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add any necessary config for next-intl if needed
  // For now, we leave it as is but note that next-intl may require some settings.
  // According to next-intl docs, we might need to add the i18n config here if we are not using middleware.
  // However, we are going to use middleware, so we don't need to change next.config.ts for i18n.
  // But let's check: next-intl works with Next.js 13+ (App Router) without extra config in next.config when using middleware.
  // We'll create a middleware.ts file instead.
};

export default nextConfig;
