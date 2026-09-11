import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import { pressItems, pressYears, fmtPressDate } from '@/lib/press';

const SITE = 'https://jeonseung.co.kr';

export const metadata: Metadata = {
  title: '언론 보도 — 전지나 대표노무사',
  description:
    '노무법인 전승과 전지나 대표 공인노무사가 언론에 보도된 기사 목록입니다. 충청남도 감사위원회 안심노무사 위촉, 공공기관 직장 내 괴롭힘·성희롱 예방 교육 강의, 전문직 봉사 활동 등 외부 매체가 확인한 활동 기록을 매체·날짜·원문 링크와 함께 정리했습니다.',
  keywords: ['전지나 노무사 언론', '노무법인 전승 기사', '천안 노무사 보도', '충남 안심노무사 전지나'],
};

export default function PressPage() {
  const years = pressYears();
  const articles = pressItems.map((p) => ({
    '@type': 'NewsArticle',
    headline: p.headline,
    datePublished: p.date,
    url: p.url,
    publisher: { '@type': 'Organization', name: p.outlet },
    about: p.mentions.map((m) =>
      m === '전지나'
        ? { '@type': 'Person', name: '전지나', url: `${SITE}/members/` }
        : { '@type': 'LegalService', name: '노무법인 전승', url: SITE },
    ),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '언론 보도 — 전지나 노무사 · 노무법인 전승',
    url: `${SITE}/press/`,
    inLanguage: 'ko-KR',
    about: [
      {
        '@type': 'Person',
        name: '전지나',
        jobTitle: '대표 공인노무사',
        url: `${SITE}/members/`,
        worksFor: { '@type': 'LegalService', name: '노무법인 전승', url: SITE },
        subjectOf: articles.map((a) => ({ '@type': 'NewsArticle', headline: a.headline, url: a.url, datePublished: a.datePublished, publisher: a.publisher })),
      },
    ],
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, item: a })),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link> &nbsp;›&nbsp; <Link href="/news/">법인 소식</Link> &nbsp;›&nbsp; 언론 보도
          </div>
          <h1>언론 보도</h1>
          <p className="sub">
            전지나 대표 공인노무사와 노무법인 전승이 언론에 보도된 기록입니다. 매체·날짜·원문 링크를 그대로 적었습니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap press-wrap">
          <p className="press-intro">
            전지나 노무사는 충남 천안에서 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 중심으로 활동하는 공인노무사로, 노무법인 전승의
            대표이며 충청남도 갑질·괴롭힘 예방 안심노무사다. 아래 기사는 위촉·강의·봉사 활동이 외부 매체에 실린 것으로, 기사 속 표현은 원문을
            그대로 인용했다. 같은 행사를 여러 매체가 보도한 경우 매체별로 모두 적었다.
          </p>

          {pressItems.length === 0 ? (
            <p className="board-empty">등록된 기사가 없습니다.</p>
          ) : (
            years.map((y) => (
              <div className="press-year" key={y}>
                <h2>{y}</h2>
                <ul className="press-list">
                  {pressItems
                    .filter((p) => p.date.startsWith(y))
                    .map((p) => (
                      <li className="press-item" key={p.url}>
                        <div className="press-meta">
                          <span className="press-outlet">{p.outlet}</span>
                          <span className="press-date">{fmtPressDate(p.date)}</span>
                        </div>
                        <h3>
                          <a href={p.url} target="_blank" rel="noopener noreferrer">
                            {p.headline} ↗
                          </a>
                        </h3>
                        <p className="press-topic">{p.topic}</p>
                        {p.quote && <blockquote className="press-quote">“{p.quote}”</blockquote>}
                        {p.role && <p className="press-role">기사 속 표기: {p.role}</p>}
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}

          <p className="post-note">
            기사 저작권은 각 매체에 있습니다. 이 페이지는 제목·게재일·원문 링크와 함께 전지나 노무사 또는 노무법인 전승이 언급된 문장만 인용합니다.
            추가 보도 자료는 <Link href="/news/">법인 소식</Link>과 <Link href="/members/">구성원</Link> 페이지에서 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
