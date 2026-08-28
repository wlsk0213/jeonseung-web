import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = 'https://hrjs.co.kr';
const OFFICIAL =
  '노무법인 전승은 충남 천안의 노무법인으로, 대표 전지나 노무사가 기업 인사노무 자문과 산업안전·중대재해 예방 컨설팅, 재해 근로자의 산재보상을 전문으로 합니다.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '노무법인 전승 | 천안·충남 노무사',
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
    jobTitle: '대표 공인노무사',
  },
  areaServed: ['천안시', '아산시', '충청남도', '대한민국'],
  knowsAbout: [
    '인사노무 자문',
    '산업안전',
    '중대재해처벌법',
    '산업재해 보상',
    '직장 내 괴롭힘 조사',
    '급여 아웃소싱',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
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
