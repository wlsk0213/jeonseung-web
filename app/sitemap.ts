import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hrjs.co.kr';
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/members/`, priority: 0.8 },
    ...services.map((s) => ({ url: `${base}/services/${s.slug}/`, priority: 0.9 })),
  ];
}
