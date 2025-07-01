import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    images: {
        remotePatterns: [{
            hostname: "localhost",
        }, {
            hostname: 'lh3.googleusercontent.com',
        }, {
            hostname: 'avatars.githubusercontent.com'
        }, {
            hostname: 'static-mk.prod.bcomo.com'
        }, {
            hostname: 'img.clerk.com'
        }, {
            hostname: 'd3pr3omapn87tj.cloudfront.net'
        }],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
        mdxRs: true,
    },
    reactStrictMode: false,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                ],
            },
        ];
    },
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)