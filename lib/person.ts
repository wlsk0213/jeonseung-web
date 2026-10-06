// 전지나 노무사 Person 엔티티 — 네 사이트 공통 (2026-10-06 통일)
// 정본은 개인 허브 jinanomu.com (projects/jinanomu-hub/app/layout.tsx, lib/site.ts의 channels).
// @id·url·sameAs는 허브와 같은 값을 유지한다. 채널이 바뀌면 허브 lib/site.ts → 이 파일 → 산재 lib/person.ts 순으로 함께 고친다.

export const PERSON_ID = 'https://jinanomu.com/#person';
export const PERSON_URL = 'https://jinanomu.com/';

// 허브 channels 13곳(순서 동일) + 맨 앞에 허브 자신 URL
export const PERSON_SAME_AS = [
  PERSON_URL,
  'https://jeonseung.co.kr/',
  'https://blog.jinanomu.com/',
  'https://sanjae.jinanomu.com/',
  'https://blog.naver.com/cplajjn',
  'https://blog.naver.com/jslaborlaw',
  'https://blog.naver.com/jshr1915',
  'https://m.expert.naver.com/expert/profile/home?storeId=100000347',
  'http://pf.kakao.com/_AxmxdJn',
  'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjky&pkid=1&os=18815819&qvt=0&query=%EA%B3%B5%EC%9D%B8%EB%85%B8%EB%AC%B4%EC%82%AC%EC%A0%84%EC%A7%80%EB%82%98%20%ED%94%84%EB%A1%9C%ED%95%84',
  'https://www.linkedin.com/in/%EC%A7%80%EB%82%98-%EC%A0%84-226639440/',
  'https://connect.rememberapp.co.kr/profile/382233',
  'https://www.lawsee.com/expert/cplajjn',
  'https://g.page/r/CXpdPSZ6A4y9EBM',
];

// 공식문장 [C] 개인형 — 원문 그대로
export const PERSON_DESC =
  '전지나 노무사는 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 중심으로 활동하는 공인노무사로, 노무법인 전승의 대표이며 충청남도 갑질·괴롭힘 예방 안심노무사다.';

/** 모든 자리에 공통으로 들어가는 최소 Person. 자리별 속성은 `{ ...personBase, ... }`로 덧붙인다. */
export const personBase = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: '전지나',
  alternateName: 'Jeon Jina',
  jobTitle: '대표 공인노무사',
  url: PERSON_URL,
  sameAs: PERSON_SAME_AS,
} as const;

/** 설명·전문분야·소속까지 담은 Person (layout founder, 구성원 페이지용). */
export const personFull = {
  ...personBase,
  description: PERSON_DESC,
  worksFor: { '@type': 'LegalService', name: '노무법인 전승', url: 'https://jeonseung.co.kr' },
  knowsAbout: ['산업안전', '중대재해처벌법', '산업재해 보상', '직장 내 괴롭힘 조사', '인사노무 자문'],
  memberOf: { '@type': 'Organization', name: '한국공인노무사회' },
};
