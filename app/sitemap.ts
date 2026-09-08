import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { getAllInsights } from '@/lib/insights';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jeonseung.co.kr';
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/members/`, priority: 0.8 },
    { url: `${base}/news/`, priority: 0.6 },
    { url: `${base}/hrnews/`, priority: 0.6 },
    { url: `${base}/contact/`, priority: 0.7 },
    ...services.map((s) => ({ url: `${base}/services/${s.slug}/`, priority: 0.9 })),
    { url: `${base}/insights/`, priority: 0.8 },
    ...getAllInsights().map((p) => ({
      url: `${base}/insights/${p.slug}/`,
      lastModified: p.updated ?? p.date,
      priority: 0.8,
    })),
  ];
}
