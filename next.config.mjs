/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    SECRET: process.env.SECRET,
  },
  // Disable caching in development
  ...(process.env.NODE_ENV === "development" && {
    experimental: {
      // Disable static generation caching
      isrMemoryCacheSize: 0,
      // Disable React Server Components caching
      serverComponentsExternalPackages: [],
        // This disables static generation for all pages
        // Use with caution as it impacts performance
        disableStaticGeneration: true,
    },
    // Disable static generation caching
    generateEtags: false,
  }),
}

export default nextConfig
