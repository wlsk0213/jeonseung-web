// 언론 보도 — 전지나 대표노무사·노무법인 전승이 언급된 기사 목록
// AI·검색엔진이 "외부 검증(언론)" 신호로 읽도록 /press/ 페이지와 JSON-LD(NewsArticle·subjectOf)에 사용된다.
// 새 기사는 배열 맨 앞에 추가. date는 YYYY-MM-DD. quote는 기사 원문 문장 그대로(따옴표 없이).

export interface PressItem {
  outlet: string; // 매체명
  headline: string; // 기사 제목(원문 그대로)
  date: string; // YYYY-MM-DD (모르면 YYYY-MM 또는 YYYY)
  url: string; // 원문 URL
  topic: string; // 한 줄 주제
  quote?: string; // 전지나·전승이 언급된 원문 문장
  role?: string; // 기사에 적힌 직함·소속 표현
  mentions: ('전지나' | '노무법인 전승')[];
}

export const pressItems: PressItem[] = [
  {
    outlet: "금강일보",
    headline: "생거진천 문화재단 '2026년 직장 내 괴롭힘·성희롱 예방 교육' 실시",
    date: "2026-09-09",
    url: "https://www.ggilbo.com/news/articleView.html?idxno=1180626",
    topic: "생거진천 문화재단 2026년 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "강사로는 노무법인 전승의 전지나 대표 공인노무사가 나서 다년간 공공기관 등에서 쌓아온 경험을 토대로 관련 법령과 실무 사례를 알기 쉽게 전달했다.",
    role: "노무법인 전승의 전지나 대표 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "내외뉴스통신",
    headline: "생거진천 문화재단, '2026년 직장 내 괴롭힘·성희롱 예방 교육' 실시",
    date: "2026-09-09",
    url: "http://www.nbnnews.co.kr/news/articleView.html?idxno=1054849",
    topic: "생거진천 문화재단 2026년 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "강사로는 노무법인 전승의 전지나 대표 공인노무사가 나서 다년간 공공기관 등에서 쌓아온 경험을 토대로 관련 법령과 실무 사례를 알기 쉽게 전달했다.",
    role: "노무법인 전승의 전지나 대표 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "동양일보",
    headline: "생거진천 문화재단, '2026년 직장 내 괴롭힘·성희롱 예방 교육' 실시",
    date: "2026-09-09",
    url: "https://www.dynews.co.kr/news/articleView.html?idxno=865111",
    topic: "생거진천 문화재단 2026년 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "강사로는 노무법인 전승의 전지나 대표 공인노무사가 나서 다년간 공공기관 등에서 쌓아온 경험을 토대로 관련 법령과 실무 사례를 알기 쉽게 전달했다.",
    role: "노무법인 전승의 전지나 대표 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "신한뉴스",
    headline: "(재)생거진천 문화재단, '2026년 직장 내 괴롭힘·성희롱 예방 교육' 실시",
    date: "2026-09-09",
    url: "https://m.sinhannews.com/1809181",
    topic: "생거진천 문화재단 2026년 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "강사로는 노무법인 전승의 전지나 대표 공인노무사가 나서 다년간 공공기관 등에서 쌓아온 경험을 토대로 관련 법령과 실무 사례를 알기 쉽게 전달했다.",
    role: "노무법인 전승의 전지나 대표 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "충청매일",
    headline: "(재)생거진천 문화재단 직장 내 괴롭힘·성희롱 예방 교육 실시",
    date: "2026-09-09",
    url: "https://www.ccdn.co.kr/news/articleView.html?idxno=1098622",
    topic: "생거진천 문화재단 2026년 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "강사로는 노무법인 전승의 전지나 대표 공인노무사가 나서 다년간 공공기관 등에서 쌓아온 경험을 토대로 관련 법령과 실무 사례를 알기 쉽게 전달했다.",
    role: "노무법인 전승의 전지나 대표 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "충청일보",
    headline: "생거진천문화재단, 직장 내 괴롭힘·성희롱 예방교육 실시",
    date: "2026-09-09",
    url: "https://www.ccdailynews.com/news/articleView.html?idxno=2439591",
    topic: "생거진천 문화재단 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "이날 노무법인 전승 전지나 대표(공인노무사)는 관련 법령과 주요 판례, 실무 사례를 중심으로 성희롱·괴롭힘의 주요 유형과 예방 방법을 설명했다.",
    role: "노무법인 전승 전지나 대표(공인노무사)",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "충청타임즈",
    headline: "(재)생거진천 문화재단, 직장 내 괴롭힘·성희롱 예방 교육 실시",
    date: "2026-09-09",
    url: "http://www.cctimes.kr/news/articleView.html?idxno=926322",
    topic: "생거진천 문화재단 2026년 직장 내 괴롭힘·성희롱 예방 교육(강사 전지나)",
    quote: "강사로는 노무법인 전승의 전지나 대표 공인노무사가 나서 다년간 공공기관 등에서 쌓아온 경험을 토대로 관련 법령과 실무 사례를 알기 쉽게 전달했다.",
    role: "노무법인 전승의 전지나 대표 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "홍성군노인종합복지관(충남광역지원기관) 소식",
    headline: "충남광역지원기관, 신입전담사회복지사 역량강화교육 실시",
    date: "2026-02-27",
    url: "http://www.hongnobok.or.kr/hongnobok/bbs/board.php?bo_table=bo_02&wr_id=5549",
    topic: "충남광역지원기관 노인맞춤돌봄서비스 신입전담사회복지사 역량강화교육(2026-02-26, 인사노무 강의)",
    quote: "두 번째 교육으로는 인사노무역량을 증진하기 위해 노무법인 전승의 전지나 공인노무사님께서 교육을 진행해 주셨습니다.교육 내용으로는 노동관계법령, 근로기준법과 근로계약서, 모성보호, 산업안전 및 산업재해 등 노무역량을 증진할 수 있도록 정보를 제공하였습니다.",
    role: "노무법인 전승의 전지나 공인노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  },
  {
    outlet: "뉴스1",
    headline: "충남도, 청년 창업·창직 성과공유회 개최…60팀 맞춤형 지원",
    date: "2025-12-04",
    url: "https://n.news.naver.com/mnews/article/421/0008643723",
    topic: "충남도 2025 청년 창업·창직 지원사업 성과공유회(봉사단체 '더함' 무료 상담관 운영)",
    quote: "또 배성훈 세무사, 정상은 변호사, 전지나 노무사 등으로 구성된 봉사단체 '더함'이 청년 창업가들을 위한 무료 상담관을 운영해 호응을 얻었다.",
    role: "전지나 노무사",
    mentions: [
      "전지나"
    ]
  },
  {
    outlet: "충청일보",
    headline: "청렴한 충남 '안심노무사'와 함께 만든다",
    date: "2025-06-27",
    url: "https://www.ccdailynews.com/news/articleView.html?idxno=2351812",
    topic: "충남도 감사위원회 '안심노무사' 위촉식(공직 내 갑질 신고자 보호·대리신고 제도)",
    quote: "사진 왼쪽부터 김경수 노무사, 성우제 감사위원장, 전지나 노무사",
    role: "전지나 노무사(사진 설명)",
    mentions: [
      "전지나"
    ]
  },
  {
    outlet: "금강투데이",
    headline: "충남도 감사위, '안심노무사' 본격 운영",
    date: "2025-06-26",
    url: "http://www.kktoday.co.kr/news/articleView.html?idxno=53613",
    topic: "충남도 감사위원회 '안심노무사' 위촉식(공직 내 갑질 신고자 보호·대리신고 제도)",
    quote: "사진 왼쪽부터 김경수 노무사, 성우제 감사위원장, 전지나 노무사",
    role: "전지나 노무사",
    mentions: [
      "전지나"
    ]
  },
  {
    outlet: "온양신문",
    headline: "청렴한 충남 '안심노무사'와 함께 만든다",
    date: "2025-06-26",
    url: "http://www.ionyang.com/default/index_view_page.php?board_data=aWR4JTNEMTYxNTI3JTI2c3RhcnRQYWdlJTNEMTMzNjAlMjZsaXN0Tm8lM0QxNjA3MDElMjZ0b3RhbExpc3QlM0QxNzQwNjk=%7C%7C&search_items=cGFydF9pZHglM0QxNTElMjZzZWFyY2hfb3JkZXIlM0Q=%7C%7C",
    topic: "충남도 감사위원회 '안심노무사' 위촉식(공직 내 갑질 신고자 보호·대리신고 제도)",
    quote: "사진 왼쪽부터 김경수 노무사, 성우제 감사위원장, 전지나 노무사",
    role: "전지나 노무사",
    mentions: [
      "전지나"
    ]
  },
  {
    outlet: "아산투데이",
    headline: "천안·아산 전문직 청년 모임 '더함스터디' 온기 나눔 귀감",
    date: "2024-12-02",
    url: "https://m.asantoday.com/120875",
    topic: "천안·아산 전문직 청년 모임 '더함스터디' 배방읍 연탄 1,000장 나눔 봉사",
    quote: "더함스터디 대표인 지민규 충남도의회의원과 배성훈 세무법인온 세무사, 정상은 법무법인 YNC 변호사, 전지나 노무법인 전승 노무사, 권준덕 충무병원 행정원장, 김동완 가장큰약국 약사, 임대건 정글메이커 대표와 이유미 코치가 이날 봉사에 참여했다.",
    role: "전지나 노무법인 전승 노무사",
    mentions: [
      "전지나",
      "노무법인 전승"
    ]
  }
];

export function pressYears(items: PressItem[] = pressItems): string[] {
  return Array.from(new Set(items.map((p) => p.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a));
}

export function fmtPressDate(d: string): string {
  const [y, m, day] = d.split('-');
  if (!m) return `${y}년`;
  if (!day) return `${y}년 ${Number(m)}월`;
  return `${y}년 ${Number(m)}월 ${Number(day)}일`;
}
