import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface InsightFaq {
  q: string;
  a: string;
}

export interface Insight {
  slug: string;
  title: string;
  date: string; // 작성기준일 YYYY-MM-DD
  updated?: string;
  category: string;
  description: string;
  keywords: string[];
  faq: InsightFaq[];
  html: string;
  readingMin: number;
}

// 전문분야 3축 + 서브. 글의 category는 label과 정확히 일치해야 합니다.
export const insightCategories = [
  { id: 'safety', label: '산업안전·중대재해' },
  { id: 'sanjae', label: '산재보상' },
  { id: 'harassment', label: '직장 내 괴롭힘' },
  { id: 'hr', label: '인사·노무 자문' },
];

export function categoryId(label: string): string {
  return insightCategories.find((c) => c.label === label)?.id ?? 'etc';
}

export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return d ? `${y}. ${m}. ${d}.` : iso;
}

const dir = path.join(process.cwd(), 'content', 'insights');

marked.setOptions({ gfm: true });

function toIso(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v ? String(v) : '';
}

function load(file: string): Insight {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  const plain = content.replace(/[#>*|`_\-\n]/g, '');
  return {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title ?? ''),
    date: toIso(data.date),
    updated: data.updated ? toIso(data.updated) : undefined,
    category: String(data.category ?? '기타'),
    description: String(data.description ?? ''),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    faq: Array.isArray(data.faq) ? (data.faq as InsightFaq[]) : [],
    html,
    readingMin: Math.max(1, Math.round(plain.length / 500)),
  };
}

export function getAllInsights(): Insight[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(load)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getInsight(slug: string): Insight | undefined {
  return getAllInsights().find((i) => i.slug === slug);
}
