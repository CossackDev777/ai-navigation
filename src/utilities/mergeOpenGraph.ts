import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

// Cache the server URL to avoid repeated calls
const serverUrl = getServerSideURL()

// Default Open Graph data
const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${serverUrl}/website-template-OG.webp`,
    },
  ],
  siteName: '生成AIでのビジネス活用なら Ai navi',
  title: '生成AIでのビジネス活用なら Ai navi',
}

// Optimized mergeOpenGraph function
export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...(og || {}), // Only override with `og` if provided
    images: og?.images ?? defaultOpenGraph.images, // Simplified conditional for images
  }
}
// sadfasdf