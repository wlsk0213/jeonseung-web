// 인사이트 글 아래 「전지나 노무사의 다른 채널 글」 — 산재보상 전문센터 사이트·개인 블로그로 가는 링크.
// 새 산재 사이트 글·블로그 글을 발행하면 여기에 한 줄 추가한다(cats는 인사이트 category label과 정확히 일치).
import type { Insight } from './insights';

export type ExternalPost = {
  title: string;
  href: string;
  site: '산재보상 전문센터' | '전지나 노무사 블로그';
  cats: string[];
  date: string;
};

const SJ = 'https://sanjae.jinanomu.com/posts/';
const BL = 'https://blog.jinanomu.com/';
const SANJAE = ['산재보상'];
const HR = ['인사·노무 자문'];
const HARASS = ['직장 내 괴롭힘'];
const SAFETY = ['산업안전·중대재해'];

const sj = (slug: string, title: string, date: string, cats = SANJAE): ExternalPost => ({
  title, href: `${SJ}${slug}/`, site: '산재보상 전문센터', cats, date,
});
const bl = (slug: string, title: string, date: string, cats: string[]): ExternalPost => ({
  title, href: `${BL}${slug}/`, site: '전지나 노무사 블로그', cats, date,
});

export const EXTERNAL_POSTS: ExternalPost[] = [
  // 산재보상 전문센터 사이트
  sj('retired-coal-miner-noise-hearing-loss-decades-later', '퇴직한 지 오래된 광부도 소음성 난청 산재가 되나요?｜채탄·굴진·선탄, 판결에서 다툼이 된 네 가지 사정', '2026-11-06'),
  sj('stone-foundry-lung-cancer-crystalline-silica', '석재 가공이나 주물 일을 오래 했는데 폐암, 산재가 되나요?｜결정형 유리규산 인정 기준과 법원 사례', '2026-11-04'),
  sj('school-cafeteria-cook-rotator-cuff-tear-sanjae', '급식실 조리원 어깨 회전근개 파열도 산재가 되나요?｜고시의 10년 기준과 퇴행성 소견의 판단', '2026-11-02'),
  sj('sanjae-reclaim-after-withdrawal-or-rejection', '산재 신청을 취소했거나 불승인됐다면 다시 청구할 수 있나요?｜재청구 기간과 준비', '2026-10-30'),
  sj('noise-hearing-loss-approved-cases-by-occupation', '광부·조선·항만·건설, 직종별 소음성 난청은 어떻게 인정받았나요?｜법원이 공단 결정을 뒤집은 사례 10', '2026-10-28'),
  sj('workplace-harassment-adjustment-disorder-sanjae', '직장 내 괴롭힘으로 적응장애가 생겼다면 산재가 되나요?｜인정 기준과 인정 사례', '2026-10-26', [...SANJAE, ...HARASS]),
  sj('auto-plant-lumbar-disc-stenosis-retired-retreatment', '자동차 공장 허리디스크·척추관협착증, 퇴행성이라는데 산재가 되나요?｜퇴직 후 신청과 재요양', '2026-10-23'),
  sj('knee-meniscus-arthritis-joint-replacement-sanjae', '무릎 질환(반월상연골파열, 무릎 관절염 인공관절수술)도 산재보상이 되나요?｜작업 부담 입증과 인공관절 장해급여', '2026-10-21'),
  sj('welder-lung-cancer-welding-fume-exposure-proof', '용접공 폐암 산재 신청｜용접흄 노출 경력 입증과 요양·휴업·장해급여', '2026-10-19'),
  sj('production-shift-worker-stroke-death-survivor-benefit', '교대근무 생산직이 뇌출혈로 사망했다면 산재 유족급여가 나오나요?｜인정 기준과 인정 사례', '2026-10-19'),
  sj('construction-site-noise-hearing-loss-work-history-proof', '착암공·할석공 소음성 난청 산재 장해급여｜여러 현장의 근무 경력은 어떻게 증명하나요?', '2026-10-16'),
  sj('company-settlement-and-survivor-benefit-offset', '회사 합의금을 받으면 산재 유족급여가 줄어드나요? — 공제되는 돈과 합의서에서 볼 것', '2026-10-15', [...SANJAE, ...SAFETY]),
  sj('fatal-accident-first-steps-for-family', '산재 사망 사고 직후, 유족이 먼저 할 일은 무엇인가요?｜서명 전 확인과 첫 2주의 기록', '2026-10-14', [...SANJAE, ...SAFETY]),
  sj('funeral-expenses-who-claims-amount-advance-payment', '산재 장례비는 누가 얼마를 받나요?｜2026년 최고·최저 금액, 선지급, 회사가 낸 장례비', '2026-10-13'),
  sj('survivor-pension-amount-calculation-half-lump-sum', '산재 유족연금은 한 달에 얼마인가요?｜평균임금 계산과 반액 일시금 선택', '2026-10-08'),
  sj('press-forging-impulse-noise-hearing-loss-records', '프레스·단조 작업 후 난청, 소음 기록은 어디서 찾나요?｜충격소음과 산재 입증자료', '2026-10-07'),
  sj('formwork-carpenter-rotator-cuff-tear', '형틀목공 회전근개 파열, 퇴행성이라는데 산재가 되나요?｜여러 현장의 작업 경력 입증', '2026-10-06'),
  sj('survivor-benefit-de-facto-spouse-separated-parents', '혼인신고를 안 했거나 따로 살았다면 — 산재 유족급여는 누가 받나요?', '2026-10-02'),
  sj('overwork-stroke-work-hours-no-records', '출퇴근 기록이 없는데 과로 산재가 되나요? — 뇌출혈·심근경색 업무시간을 다시 세우는 방법', '2026-10-02'),
  sj('noise-hearing-loss-disability-benefit', '소음성 난청 산재 인정기준과 장해등급｜85데시벨·3년 기준, 공장·건설 현장별 증명 자료', '2026-09-30'),

  // 개인 블로그
  bl('employee-quits-without-handover-employer-response', '직원이 인수인계 없이 갑자기 그만뒀어요, 회사는 무엇부터 해야 하나요?｜결근 처리·손해배상·퇴사 정산', '2026-11-06', HR),
  bl('harassment-one-time-verbal-abuse-criteria', '한 번의 폭언이나 욕설도 직장 내 괴롭힘이 되나요?｜일회성 발언 판단 기준', '2026-11-04', HARASS),
  bl('labor-inspection-wage-ledger-payslip-check', '근로감독에서 임금명세서·임금대장은 무엇을 보나요｜필수 항목과 대조 순서', '2026-11-02', HR),
  bl('harassment-settlement-employer-liability', '직장 내 괴롭힘 신고를 조사 없이 화해로 끝내거나 약식종결하면 회사도 손해배상하나요?', '2026-10-30', HARASS),
  bl('former-employee-overtime-pay-complaint-employer', '퇴사자가 연장수당 체불 진정을 넣었을 때 사업주 대응', '2026-10-28', HR),
  bl('labor-inspection-correction-order-deadline', '근로감독 결과 시정지시를 받았을 때 기한 안에 해야 할 일', '2026-10-26', HR),
  bl('freelancer-3-3-contract-severance-unfair-dismissal-employer', '3.3% 프리랜서 직원이 퇴직금·부당해고를 주장할 때, 사업주가 할 일', '2026-10-23', HR),
  bl('kakao-text-verbal-dismissal-notice-worker', '카톡·문자·구두로 받은 해고 통보, 효력이 있나요｜근로자 대응 순서', '2026-10-21', HR),
  bl('wage-arrears-repeat-report-inspection-5-years', '임금체불 신고 두 번이면 근로감독(노동감독) 대상, 체불 형량 5년으로 상향', '2026-10-19', HR),
  bl('labor-inspection-annual-leave-records', '연차 관리 대장이 없으면? 근로감독에서 확인하는 기록과 정산 기준', '2026-10-16', HR),
  bl('probation-resignation-recommendation-dismissal-or-voluntary', '수습 중 퇴사를 권했는데 직원이 먼저 나갔다면｜해고와 합의퇴직의 판단 기준', '2026-10-14', HR),
  bl('harassment-external-investigation-provider-selection-criteria', '직장 내 괴롭힘 외부 조사, 맡기기 전 확인할 6가지', '2026-10-13', HARASS),
  bl('labor-inspection-employment-contract-check', '근로감독에서 근로계약서는 어디까지 보나요｜필수 기재 항목·교부 확인·흔한 지적 사례', '2026-10-08', HR),
  bl('kosha-safety-health-management-system-consulting-provider-selection', '안전보건공단 무료 컨설팅, 무엇을 지원받나요?｜신청 절차와 수행기관 확인할 5가지', '2026-10-07', SAFETY),
  bl('work-rules-disadvantageous-change-consent-method', '취업규칙 불이익 변경, 개별 동의서만 받으면 충분할까요?｜동의 주체·과반수 기준·회의 방식', '2026-10-06', HR),
  bl('harassment-manual-2026-work-rules-7-checks', '2026년 직장 내 괴롭힘 대응 매뉴얼 개정｜사업주가 점검할 취업규칙·조사절차 7가지', '2026-10-02', HARASS),
  bl('anonymous-report-labor-inspection', '직원 한 명의 익명 신고로 근로감독이 나오나요｜신고 종류별 처리 절차와 회사가 할 일', '2026-10-01', HR),
  bl('labor-inspection-small-business-under-30', '소규모 사업장(30인 미만)도 근로감독 대상인가요?', '2026-09-30', HR),
  bl('payroll-outsourcing-checklist', '급여 아웃소싱 맡길 때 확인할 것｜4대보험·급여계산·임금명세서', '2026-09-29', HR),
  bl('sanjae-death-survivor-benefit', '산재 사망 유족급여·장의비 청구 방법｜신청 절차와 청구기한(과로사, 폐암 등 직업성 암 산재)', '2026-09-28', SANJAE),
  bl('dismissal-procedure-employer', '직원 해고 전 확인할 절차 — 서면통지와 30일 예고는 다릅니다', '2026-09-23', HR),
  bl('low-performer-evaluation-system', '성과가 낮은 직원, 평가제도부터 살펴야 하는 이유', '2026-09-21', HR),
  bl('noise-induced-hearing-loss-disability-benefit', '소음성 난청 산재, 퇴직하고 몇 년이 지나도 장해급여를 받을 수 있나요?', '2026-09-17', SANJAE),
  bl('work-rules-drafting-amendment-procedure', '취업규칙 작성·변경, 직원 동의는 언제 필요할까요? — 10인 이상 사업장 점검사항', '2026-09-15', [...HR, ...HARASS]),
  bl('harassment-formal-investigation-procedure-external-investigator', '직장 내 괴롭힘 조사 절차와 외부 조사를 검토할 5가지 상황', '2026-09-14', HARASS),
  bl('risk-assessment-fine-company-response', '위험성평가 과태료 사전통지서를 받았다면 — 회사가 먼저 확인할 것과 90일 안에 할 일', '2026-09-11', SAFETY),
  bl('harassment-anonymous-report-company-response', '직장 내 괴롭힘 익명 신고, 회사의 조사 의무와 초기 대응', '2026-09-09', HARASS),
];

// 낱말 점수로 잘 안 잡히는 글은 여기서 먼저 고정한다(인사이트 slug → 외부 글 주소 끝부분).
const PINS: Record<string, string[]> = {
  'harassment-perpetrator-discipline-level-criteria': ['harassment-one-time-verbal-abuse-criteria'],
  'jeongsin-jilhwan-sanjae-toejik-apbak': ['workplace-harassment-adjustment-disorder-sanjae'],
  'noise-hearing-loss-disability-claim-process': ['noise-hearing-loss-approved-cases-by-occupation', 'noise-induced-hearing-loss-disability-benefit'],
  'gwongosajik-budanghaego': ['probation-resignation-recommendation-dismissal-or-voluntary', 'dismissal-procedure-employer', 'kakao-text-verbal-dismissal-notice-worker'],
  'budanghaego-guje-sincheong-3gaewol': ['kakao-text-verbal-dismissal-notice-worker', 'dismissal-procedure-employer', 'probation-resignation-recommendation-dismissal-or-voluntary'],
  'geunro-gamdok-tongji-10il-junbi': ['labor-inspection-small-business-under-30', 'anonymous-report-labor-inspection', 'labor-inspection-correction-order-deadline'],
};

// 제목·키워드에서 두 글자 이상 낱말을 뽑아 겹치는 수로 점수를 매긴다. 같으면 최신 글 먼저.
function words(s: string): Set<string> {
  return new Set(s.split(/[^0-9A-Za-z가-힣]+/).filter((w) => w.length >= 2));
}

export function relatedExternal(post: Insight, n = 3): ExternalPost[] {
  const mine = words([post.title, ...post.keywords].join(' '));
  const pins = (PINS[post.slug] ?? [])
    .map((s) => EXTERNAL_POSTS.find((e) => e.href.endsWith(`/${s}/`)))
    .filter((e): e is ExternalPost => !!e);
  const rest = EXTERNAL_POSTS.filter((e) => e.cats.includes(post.category) && !pins.includes(e))
    .map((e) => {
      let score = 0;
      for (const w of words(e.title)) if (mine.has(w)) score++;
      return { e, score };
    })
    .sort((a, b) => b.score - a.score || b.e.date.localeCompare(a.e.date))
    .map((x) => x.e);
  return [...pins, ...rest].slice(0, n);
}
