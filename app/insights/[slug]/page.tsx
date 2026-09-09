import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import { getAllInsights, getInsight, categoryId, fmtDate } from '@/lib/insights';

const SITE = 'https://jeonseung.co.kr';
const AUTHOR_C =
  '전지나 노무사는 충남 천안에서 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 중심으로 활동하는 공인노무사로, 노무법인 전승의 대표이며 충청남도 갑질·괴롭힘 예방 안심노무사다.';

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [`${SITE}/members/`],
    },
  };
}

export default async function InsightPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const url = `${SITE}/insights/${post.slug}/`;
  const related = getAllInsights()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'ko-KR',
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    mainEntityOfPage: url,
    author: {
      '@type': 'Person',
      name: '전지나',
      jobTitle: '대표 공인노무사',
      url: `${SITE}/members/`,
      worksFor: { '@type': 'LegalService', name: '노무법인 전승', url: SITE },
    },
    publisher: {
      '@type': 'Organization',
      name: '노무법인 전승',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo-horizontal.png` },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '인사이트', item: `${SITE}/insights/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const faqJsonLd =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="phero">
        <div className="wrap post-wrap">
          <div className="crumb">
            <Link href="/">홈</Link> &nbsp;›&nbsp; <Link href="/insights/">인사이트</Link>{' '}
            &nbsp;›&nbsp;{' '}
            <Link href={`/insights/#${categoryId(post.category)}`}>{post.category}</Link>
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>글 · 전지나 대표 공인노무사</span>
            <span>작성기준일 {fmtDate(post.date)}</span>
            {post.updated && <span>수정 {fmtDate(post.updated)}</span>}
            <span>약 {post.readingMin}분</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap post-wrap">
          <article className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <div className="post-faq">
              <h2>자주 묻는 질문</h2>
              <div className="faq-list left">
                {post.faq.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="author-box">
            <div className="who">글쓴이 — 전지나 대표 공인노무사</div>
            <p>{AUTHOR_C}</p>
            <p style={{ marginTop: 8 }}>
              <Link href="/members/">프로필·이력 보기 →</Link>
              {' · '}
              <a href="https://blog.jinanomu.com/" target="_blank" rel="noopener">전지나 노무사 블로그 ↗</a>
            </p>
          </div>
          <p className="post-note">
            이 글은 일반적인 정보 제공을 목적으로 작성되었으며, 개별 사안에 대한 법률 자문이
            아닙니다. 구체적인 상황은 상담을 통해 확인하시기 바랍니다. 작성기준일{' '}
            {fmtDate(post.date)}
          </p>

          {related.length > 0 && (
            <div className="related">
              <h2>같은 분야의 다른 글</h2>
              <div className="post-list">
                {related.map((p) => (
                  <Link className="post-card" href={`/insights/${p.slug}/`} key={p.slug}>
                    <h3>{p.title}</h3>
                    <span className="date">{fmtDate(p.date)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={
          <>
            비슷한 상황이신가요?
            <br />첫 상담에서 방향을 잡아드립니다.
          </>
        }
        sub="통지서와 자료를 준비해 연락 주시면, 기한과 절차를 먼저 확인해 드립니다."
      />
    </main>
  );
}
