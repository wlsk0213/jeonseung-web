// 첨부: 법령 원문·지침·매뉴얼·보도자료·판결문 등 근거 자료. 정부·공공기관 원문만 사용합니다.
export interface HrAttachment {
  kind: '법령' | '시행령' | '시행규칙' | '지침' | '매뉴얼' | '보도자료' | '판결문' | '서식';
  label: string; // 자료 제목(발표일 포함 권장)
  url: string; // 원문 게시글·법령 화면 주소
  fileUrl?: string; // 파일 직접 내려받기 주소가 있을 때만
  fileType?: 'PDF' | 'HWP' | 'HWPX' | 'ZIP';
}

export interface HrNewsItem {
  badge: '법령' | '행정' | '판례' | '안전';
  title: string;
  date: string; // YYYY.MM
  body: string;
  source?: { label: string; url: string }; // 정부·공공기관 출처만 사용
  attachments?: HrAttachment[]; // 근거 자료(법령·지침·판결문 등)
}

// 새 뉴스는 이 배열 맨 앞에 추가하면 됩니다.
export const hrNewsItems: HrNewsItem[] = [
  {
    badge: '법령',
    title: '12월 8일부터 30인 미만 사업장은 시·도 지방노동감독관이 감독합니다 — 노동감독관 직무집행법 시행',
    date: '2026.09',
    body: '고용노동부는 9월 10일 제1회 전국노동감독협의회를 열고 「지방정부 노동감독체계 구축 및 실행방안」을 발표했습니다. 2026년 4월 제정된 노동감독관 직무집행법이 12월 8일 시행되면 상시근로자 30명 미만 사업장에 대한 감독 권한의 일부가 시·도지사에게 위임되고(같은 법 제28조), 시·도에 지방노동감독관이 배치됩니다. 사업장 감독은 불시 방문이 원칙이며(제16조), 임금체불 등 권리구제와 직결되는 항목을 체크리스트로 집중 점검할 계획입니다. 정부는 적발·처벌보다 법 위반 예방과 노무관리 체계 지원에 중점을 두겠다고 밝혔습니다. 30인 미만 사업장은 근로계약서, 임금명세서, 최저임금, 연장·야간·휴일수당, 연차휴가 관리부터 미리 점검해 두시기 바랍니다. 시행일부터 기존 근로감독관의 명칭은 노동감독관으로 바뀝니다.',
    source: {
      label: '고용노동부 보도자료(2026. 9. 10.)',
      url: 'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=19914',
    },
  },
  {
    badge: '법령',
    title: '2026년 8월부터 달라지는 모성보호 제도 — 육아휴직 주 단위 분할, 난임치료휴가 유급 4일(11월 27일)',
    date: '2026.08',
    body: '근로기준법·남녀고용평등법 개정으로 2026년 8월부터 2027년 6월까지 모성보호·일가정 양립 제도가 순차 시행됩니다. 2026년 8월부터는 초등학교 2학년 이하 자녀의 휴원·휴교·방학·질병 등의 사유가 있는 경우 육아휴직을 1주 또는 2주 단위로 분할 사용할 수 있습니다(연 1회). 난임치료휴가는 연 6일 가운데 유급 기간이 2일에서 4일로 늘고 급여 상한이 16만 8천원에서 33만 6천원으로 오르는데, 이 부분의 시행일은 2026년 11월 27일입니다. 사업장 규모와 무관하게 적용되므로 취업규칙의 휴가 규정과 급여 실무를 시행일에 맞춰 정비해 두시기 바랍니다.',
    attachments: [
      {
        kind: '보도자료',
        label: '난임치료휴가, 11월부터 유급기간 4일로 확대(2026. 8. 23.)',
        url: 'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=19813',
      },
      {
        kind: '매뉴얼',
        label: '사업주와 인사담당자를 위한 난임치료휴가 및 급여제도 활용가이드',
        url: 'https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20260800716',
        fileUrl:
          'https://www.moel.go.kr/common/downloadFile.do?file_seq=20260801571&bbs_seq=20260800716&bbs_id=29&file_ext=pdf',
        fileType: 'PDF',
      },
    ],
  },
  {
    badge: '안전',
    title: '고용노동부, 중대재해처벌법 질의회시집(2026.6.) 배포 — 수사기관의 판단 기준 공개',
    date: '2026.07',
    body: '고용노동부가 2021년부터 2025년까지 중대산업재해수사과의 질의회시를 모은 「중대재해처벌법 중대산업재해 질의회시집」을 배포했습니다. 경영책임자의 범위, 안전보건 확보의무의 이행 수준 등 실무에서 가장 다투어지는 쟁점에 대한 행정해석이 담겨 있어, 사업장의 안전보건관리체계가 이 기준을 충족하는지 점검하는 자료로 활용할 수 있습니다.',
    source: {
      label: '고용노동부 정책자료',
      url: 'https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20260700329',
    },
    attachments: [
      {
        kind: '지침',
        label: '중대재해처벌법 중대산업재해 질의회시집(2026. 6.)',
        url: 'https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20260700329',
        fileUrl:
          'https://www.moel.go.kr/common/downloadFile.do?file_seq=20260700505&bbs_seq=20260700329&bbs_id=29&file_ext=pdf',
        fileType: 'PDF',
      },
    ],
  },
  {
    badge: '행정',
    title: '2026년 고용노동부 중점과제 — 산업안전보건법 적용 확대, 산재 처리기간 대폭 단축',
    date: '2026.01',
    body: '고용노동부가 2026년 중점과제를 발표했습니다. 화물차주·방과후 강사 등으로 산업안전보건법 적용을 확대하고, 평균 228일이 걸리던 산재 처리 기간을 160일 수준으로 단축해 재해노동자의 빠른 일상 복귀를 지원한다는 내용입니다. 산재 신청 실무와 사업주의 안전 의무 범위에 모두 영향을 주는 변화입니다.',
    source: {
      label: '대한민국 정책브리핑',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=156734720',
    },
  },
  {
    badge: '법령',
    title: '2026년부터 달라지는 노동 제도 총정리 — 최저임금·중대재해 사업장 정보 공개 등',
    date: '2026.01',
    body: '2026년부터 최저임금 인상과 함께 중대재해 발생 사업장의 명칭·업종·규모·사고 원인이 국민에게 공개되는 등 노동 관련 제도가 달라집니다. 고용노동부가 정리한 변경사항을 바탕으로, 사업장은 연초에 임금체계·안전보건 체계·취업규칙을 일괄 점검해 두는 것이 안전합니다.',
    source: {
      label: '고용노동부 보도자료',
      url: 'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18808',
    },
  },
];
