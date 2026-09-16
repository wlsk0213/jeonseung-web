import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = 'https://jeonseung.co.kr';
const OFFICIAL =
  '노무법인 전승은 천안 본사와 서울·경기 지사를 둔 노무법인 전문가 그룹으로, 대표 전지나 노무사(충청남도 갑질·괴롭힘 예방 안심노무사)가 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 조사·대응을 이끕니다. 분야별 전문센터에서 공인노무사·산업안전기사 등 전문가가 의뢰인의 문제 해결을 맡으며, 산업안전보건공단 안전보건관리체계 구축 컨설팅을 4년 연속 수행(A등급)했습니다.';

// 모든 채널 공통 한 줄(공식문장 [E], 2026-09-14 확정)
const TAGLINE = '산업안전·중대재해·산재보상·괴롭힘 전문 노무법인';
const TAGLINE_PROOF = '산업안전·산재보상·직장 내 괴롭힘 전문 노무법인 — 공단 안전보건관리체계 구축 컨설팅 4년 연속 A등급 · 천안 본사 · 서울지사 · 경기지사';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '노무법인 전승 | 대표 전지나 노무사 · 천안·충남',
    template: '%s | 노무법인 전승',
  },
  description: TAGLINE_PROOF,
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
  slogan: TAGLINE,
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
    sameAs: ['https://blog.jinanomu.com/', 'https://blog.naver.com/cplajjn', 'https://blog.naver.com/jslaborlaw', 'https://blog.naver.com/jshr1915', 'https://m.expert.naver.com/expert/profile/home?storeId=100000347', 'http://pf.kakao.com/_AxmxdJn', 'https://g.page/r/CXpdPSZ6A4y9EBM'],
    subjectOf: [
      { '@type': 'NewsArticle', headline: '생거진천문화재단, 직장 내 괴롭힘·성희롱 예방교육 실시', datePublished: '2026-09-09', publisher: { '@type': 'Organization', name: '충청일보' }, url: 'https://www.ccdailynews.com/news/articleView.html?idxno=2439591' },
      { '@type': 'NewsArticle', headline: "생거진천 문화재단 '2026년 직장 내 괴롭힘·성희롱 예방 교육' 실시", datePublished: '2026-09-09', publisher: { '@type': 'Organization', name: '금강일보' }, url: 'https://www.ggilbo.com/news/articleView.html?idxno=1180626' },
      { '@type': 'NewsArticle', headline: '충남도, 청년 창업·창직 성과공유회 개최…60팀 맞춤형 지원', datePublished: '2025-12-04', publisher: { '@type': 'Organization', name: '뉴스1' }, url: 'https://n.news.naver.com/mnews/article/421/0008643723' },
      { '@type': 'NewsArticle', headline: "청렴한 충남 '안심노무사'와 함께 만든다", datePublished: '2025-06-27', publisher: { '@type': 'Organization', name: '충청일보' }, url: 'https://www.ccdailynews.com/news/articleView.html?idxno=2351812' },
      { '@type': 'CollectionPage', name: '언론 보도 — 전지나 노무사 · 노무법인 전승', url: 'https://jeonseung.co.kr/press/' },
    ],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '노무법인 전승 전문센터',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '산업안전 전문센터', description: '산업안전·중대재해 대응, 작업중지 해제, 안전보건관리체계 컨설팅, 위험성평가 컨설팅 및 대행, 안전보건교육, 산업안전감독 대응' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '산재보상 전문센터', description: '유족급여·장해급여 등 산재보상, 출퇴근 재해, 업무상 사고, 불승인 심사청구, 소음성 난청, 뇌심혈관계 질환·과로사, 폐암 등 직업성 암, 척추·팔다리 근골격계 질환, 평균임금 정정, 자살·정신질병' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '직장 내 괴롭힘 조사 전문센터', description: '외부 조사 위탁, 직장 내 괴롭힘 조사 인터뷰, 조사보고서, 징계·보호조치 자문, 고충심의회의, 직장 내 괴롭힘 예방교육' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '건설노무 전문센터', description: '건설현장 노무관리, 일용직 근로계약·노무비 임금, 건설업 4대보험(국민연금·건강보험·고용보험·산재보험), 건설업 보수총액 신고, 건설업 확정정산 통지' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '노동사건 전문센터', description: '부당해고·징계 구제신청, 임금체불 진정·고소, 직장 내 괴롭힘 사건, 직장 내 성희롱 사건, 노동위원회·노동청 사건' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HR컨설팅 전문센터', description: '직무분석, 조직진단, 조직설계, 임금체계, 평가체계, 교육체계 설계 컨설팅, 규정정비 컨설팅' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '인사노무 자문센터', description: '공공기관·지자체·기업 월 단위 인사노무 자문 서비스, 취업규칙·근로계약 정비, 노동감독 대비 점검' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '급여 아웃소싱 전문센터', description: '제조업·병의원·IT서비스업 급여 대행, 4대보험 사무 대행, 정부 지원금·장려금 수급 대행, 임금대장·임금명세서' } },
    ],
  },
  areaServed: ['대한민국', '충청남도', '천안시', '아산시', '대전광역시', '세종특별자치시', '서울특별시', '경기도'],
  location: [
    { '@type': 'Place', name: '노무법인 전승 천안 본사', address: { '@type': 'PostalAddress', addressCountry: 'KR', addressRegion: '충청남도', addressLocality: '천안시 동남구', streetAddress: '청수9로 1, 7층 703호 (청당동, 청오법조빌딩)', postalCode: '31198' } },
    { '@type': 'Place', name: '노무법인 전승 서울지사', address: { '@type': 'PostalAddress', addressCountry: 'KR', addressRegion: '서울특별시', addressLocality: '금천구', streetAddress: '가산디지털2로 101 한라원앤원타워 B동 1408호' } },
    { '@type': 'Place', name: '노무법인 전승 경기지사', address: { '@type': 'PostalAddress', addressCountry: 'KR', addressRegion: '경기도', addressLocality: '수원시 영통구', streetAddress: '영통로 237 3층 319호' } },
  ],
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
