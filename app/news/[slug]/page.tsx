import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import { newsItems, getNews, newsIso } from '@/lib/news';

const SITE = 'https://jeonseung.co.kr';

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.body,
    openGraph: {
      type: 'article',
      title: n.title,
      description: n.body,
      publishedTime: newsIso(n.date),
      ...(n.image ? { images: [{ url: `${SITE}${n.image}`, width: 1200, height: 630, alt: n.title }] } : {}),
    },
  };
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();

  const url = `${SITE}/news/${n.slug}/`;
  const paragraphs = n.content && n.content.length > 0 ? n.content : [n.body];
  const others = newsItems.filter((x) => x.slug !== n.slug).slice(0, 4);
  const images = [
    ...(n.image ? [`${SITE}${n.image}`] : []),
    ...(n.attachments ?? []).map((a) => `${SITE}${a.src}`),
  ];

  const newsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: n.title,
    description: n.body,
    articleBody: paragraphs.join('\n\n'),
    datePublished: newsIso(n.date),
    inLanguage: 'ko-KR',
    articleSection: `법인 소식 · ${n.badge}`,
    mainEntityOfPage: url,
    about: { '@type': 'Person', name: '전지나', url: `${SITE}/members/` },
    author: { '@type': 'Organization', name: '노무법인 전승', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: '노무법인 전승',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo-horizontal.png` },
    },
    ...(n.url ? { isBasedOn: n.url } : {}),
    ...(images.length > 0 ? { image: images } : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '법인 소식', item: `${SITE}/news/` },
      { '@type': 'ListItem', position: 3, name: n.title, item: url },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="phero">
        <div className="wrap post-wrap">
          <div className="crumb">
            <Link href="/">홈</Link> &nbsp;›&nbsp; <Link href="/news/">법인 소식</Link>{' '}
            &nbsp;›&nbsp; {n.badge}
          </div>
          <h1>{n.title}</h1>
          <div className="post-meta">
            <span>노무법인 전승 · {n.badge}</span>
            <span>{n.date}</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap post-wrap">
          <article className="post-body">
            {paragraphs.map((p, i) => (
              <div key={i}>
                <p>{p}</p>
                {i === 0 &&
                  (n.attachments ?? []).map((a) => (
                    <figure className="news-fig" key={a.src}>
                      <img src={a.src} alt={a.alt} loading="lazy" />
                      {a.caption && <figcaption>{a.caption}</figcaption>}
                    </figure>
                  ))}
              </div>
            ))}
          </article>

          {(n.url || (n.related && n.related.length > 0)) && (
            <div className="author-box">
              {n.url && (
                <p>
                  <span className="who" style={{ display: 'inline', marginRight: 8 }}>원문</span>
                  <a href={n.url} target="_blank" rel="noopener noreferrer">
                    {n.source ?? '원문 보기'} ↗
                  </a>
                </p>
              )}
              {n.related && n.related.length > 0 && (
                <p style={{ marginTop: n.url ? 8 : 0 }}>
                  <span className="who" style={{ display: 'inline', marginRight: 8 }}>관련</span>
                  {n.related.map((r, i) => (
                    <span key={r.href}>
                      {i > 0 && ' · '}
                      <Link href={r.href}>{r.label}</Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}

          {others.length > 0 && (
            <div className="related">
              <h2>다른 소식</h2>
              <div className="post-list">
                {others.map((o) => (
                  <Link className="post-card" href={`/news/${o.slug}/`} key={o.slug}>
                    <h3>{o.title}</h3>
                    <span className="date">{o.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <p style={{ marginTop: 28 }}>
            <Link href="/news/" style={{ color: 'var(--navy-600)', fontWeight: 700 }}>
              ← 법인 소식 전체 보기
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
