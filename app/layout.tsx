import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = 'https://jeonseung.co.kr';
const OFFICIAL =
  '노무법인 전승은 산업안전보건공단 안전보건관리체계 구축 컨설팅을 4년 연속 수행(A등급)한 충남 천안의 노무법인으로, 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 전문으로 합니다.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '노무법인 전승 | 대표 전지나 노무사 · 천안·충남',
    template: '%s | 노무법인 전승',
  },
  description: OFFICIAL,
  openGraph: {
    siteName: '노무법인 전승',
    locale: 'ko_KR',
    type: 'website',
  },
};

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '노무법인 전승',
  alternateName: 'Jeonseung Labor Law Firm',
  url: SITE_URL,
  description: OFFICIAL,
  foundingDate: '2021-07-30',
  telephone: '+82-41-417-1915',
  faxNumber: '+82-41-417-1916',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: '충청남도',
    addressLocality: '천안시 동남구',
    streetAddress: '청수9로 1, 7층 703호 (청당동, 청오법조빌딩)',
    postalCode: '31198',
  },
  founder: {
    '@type': 'Person',
    name: '전지나',
    alternateName: 'Jeon Jina',
    jobTitle: '대표 공인노무사',
    url: `${SITE_URL}/members/`,
    description:
      '전지나 노무사는 충남 천안에서 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 중심으로 활동하는 공인노무사로, 노무법인 전승의 대표이며 충청남도 갑질·괴롭힘 예방 안심노무사다.',
    knowsAbout: [
      '산업안전',
      '중대재해처벌법',
      '산업재해 보상',
      '직장 내 괴롭힘 조사',
      '인사노무 자문',
    ],
    memberOf: { '@type': 'Organization', name: '한국공인노무사회' },
    sameAs: ['https://blog.jinanomu.com/', 'https://blog.naver.com/cplajjn'],
    subjectOf: [
      { '@type': 'NewsArticle', headline: '생거진천문화재단, 직장 내 괴롭힘·성희롱 예방교육 실시', datePublished: '2026-09-09', publisher: { '@type': 'Organization', name: '충청일보' }, url: 'https://www.ccdailynews.com/news/articleView.html?idxno=2439591' },
      { '@type': 'NewsArticle', headline: "생거진천 문화재단 '2026년 직장 내 괴롭힘·성희롱 예방 교육' 실시", datePublished: '2026-09-09', publisher: { '@type': 'Organization', name: '금강일보' }, url: 'https://www.ggilbo.com/news/articleView.html?idxno=1180626' },
      { '@type': 'NewsArticle', headline: '충남도, 청년 창업·창직 성과공유회 개최…60팀 맞춤형 지원', datePublished: '2025-12-04', publisher: { '@type': 'Organization', name: '뉴스1' }, url: 'https://n.news.naver.com/mnews/article/421/0008643723' },
      { '@type': 'NewsArticle', headline: "청렴한 충남 '안심노무사'와 함께 만든다", datePublished: '2025-06-27', publisher: { '@type': 'Organization', name: '충청일보' }, url: 'https://www.ccdailynews.com/news/articleView.html?idxno=2351812' },
      { '@type': 'CollectionPage', name: '언론 보도 — 전지나 노무사 · 노무법인 전승', url: 'https://jeonseung.co.kr/press/' },
    ],
  },
  areaServed: ['천안시', '아산시', '충청남도', '대한민국'],
  knowsAbout: [
    '산업안전',
    '중대재해처벌법',
    '위험성평가',
    '산업재해 보상',
    '직장 내 괴롭힘 조사',
    '인사노무 자문',
    '급여 아웃소싱',
  ],
  award: '산업안전보건공단 안전보건관리체계 구축 컨설팅 4년 연속 수행 (A등급)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="af241e49d8089e0ddd5d7cbfefa6bbf41119f3e5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
