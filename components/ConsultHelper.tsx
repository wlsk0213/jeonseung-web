'use client';

import { useEffect, useState } from 'react';

// 기업 상담 도우미 — 단가 기준: 견적 업무 지침(2026.11.1. 시행) 4-2·4-4, 대표 확정 11-20
// 금액은 모두 부가세 별도·상담 후 확정. HR컨설팅·위험성평가는 금액 비공개(대표 결정 11-20).

type Q = {
  key: string;
  label: string;
  options?: string[];
  type?: 'number' | 'multi';
  help?: string;
  min?: number;
  unknown?: boolean;
};
type Answers = Record<string, string | string[]>;
type Result = { label: string; headline: string; rows?: [string, string][]; paragraphs: string[]; quote: string };

export const HANDOFF_KEY = 'jeonseung.consultation.v1';

const INDUSTRY = ['제조업', '건설업', '도소매·유통업', 'IT·전문서비스업', '음식·숙박업', '운수·물류업', '보건·사회복지업', '교육업', '공공기관·비영리', '기타'];
const SCALE = ['5명 미만', '5~9명', '10~19명', '20~29명', '30~49명', '50~99명', '100명 이상'];

const TOPICS = {
  payroll: { title: '급여대행·노무자문', desc: '직원 수와 급여 조건에 따른 예상 월 비용', inquiry: '기업 자문 (인사노무·급여·HR)', link: '/services/payroll/' },
  harassment: { title: '직장 내 괴롭힘 외부조사', desc: '조사 대상 인원에 따른 예상 견적', inquiry: '직장 내 괴롭힘 조사·대응', link: '/services/workplace-harassment/' },
  inspection: { title: '근로감독 대응', desc: '사전 점검 비용과 대응 범위', inquiry: '기업 자문 (인사노무·급여·HR)', link: '/services/labor-inspection/' },
  safety: { title: '안전보건체계 구축 컨설팅', desc: '중대재해처벌법·원청 평가 대비 범위와 시작 금액', inquiry: '산업안전·중대재해 컨설팅', link: '/services/industrial-safety/' },
  risk: { title: '위험성평가 컨설팅', desc: '사업장 현황에 맞는 지원 범위', inquiry: '산업안전·중대재해 컨설팅', link: '/services/risk-assessment/' },
  hr: { title: 'HR컨설팅', desc: '임금·평가·직무 등 개선 과제 정리', inquiry: '기업 자문 (인사노무·급여·HR)', link: '/services/hr-consulting/' },
  lecture: { title: '강의·교육 의뢰', desc: '기관 교육·법정의무교육 출강 요청', inquiry: '교육 출강 의뢰', link: '/services/education/' },
} as const;
type Topic = keyof typeof TOPICS;

const q = (key: string, label: string, options?: string[] | null, extra: Partial<Q> = {}): Q => ({ key, label, ...(options ? { options } : {}), ...extra });

const GROUPS: Record<Topic, Q[][]> = {
  payroll: [
    [
      q('count', '직원은 몇 명인가요?', null, { type: 'number', help: '급여를 계산할 인원 기준입니다. 법 적용을 판단하는 상시근로자 수와는 다를 수 있습니다.' }),
      q('industry', '업종을 선택해 주세요', INDUSTRY),
      q('service', '어떤 서비스가 필요하신가요?', ['인사노무 자문만', '인사노무 자문 + 급여·4대보험 대행']),
    ],
    [
      q('pay', '급여 형태는 어떤가요?', ['월급제 중심·급여 변동이 적음', '시급제·일급제 포함', '수당·성과급 등 매월 변동이 많음', '아직 잘 모르겠음']),
      q('daily', '일용직 신고·관리도 필요한가요?', ['필요 없음', '필요함', '확인 필요']),
      q('turnover', '입퇴사는 어느 정도인가요?', ['드문 편', '매월 발생', '빈번한 편', '아직 잘 모르겠음']),
      q('union', '노동조합이 있나요?', ['없음', '있음', '확인 필요']),
    ],
  ],
  harassment: [
    [
      q('role', '어떤 입장에서 문의하시나요?', ['회사 대표·인사담당자', '회사로부터 의뢰받은 담당자', '개인 상담을 희망함']),
      q('complainants', '신고인은 몇 명인가요?', null, { type: 'number', min: 1, unknown: true, help: '같은 사람은 한 번만 세어 주세요.' }),
      q('respondents', '피신고인은 몇 명인가요?', null, { type: 'number', min: 1, unknown: true, help: '같은 사람은 한 번만 세어 주세요.' }),
    ],
    [
      q('witnesses', '예상 참고인은 몇 명인가요?', null, { type: 'number', min: 0, unknown: true, help: '참고인이 없으면 0을 입력하세요.' }),
      q('departed', '면담 대상에 퇴사자가 있나요?', ['아니요', '예', '확인 필요']),
      q('timing', '언제 상담을 희망하시나요?', ['가능한 빠르게', '이번 주', '2주 이내', '일정 협의']),
    ],
  ],
  inspection: [
    [
      q('scale', '직원은 몇 명인가요?', SCALE),
      q('industry', '업종을 선택해 주세요', INDUSTRY),
      q('status', '지금 어떤 상황인가요?', ['감독 예정은 없고 미리 점검하고 싶음', '감독 통지를 받음', '감독이 진행 중임', '시정지시를 받음']),
    ],
    [
      q('client', '노무법인 전승과 자문 계약 중인가요?', ['아니요', '예']),
      q('areas', '점검하고 싶은 부분을 골라 주세요', ['근로계약서·임금명세서', '근로시간·연장근로', '임금·수당·퇴직금', '연차휴가 관리', '취업규칙·서류 비치', '직장 내 괴롭힘·성희롱 예방', '전반적인 점검'], { type: 'multi' }),
    ],
  ],
  safety: [
    [
      q('scale', '상시 근로자는 몇 명인가요?', SCALE),
      q('industry', '업종을 선택해 주세요', INDUSTRY),
      q('purpose', '컨설팅이 필요한 이유는 무엇인가요?', ['중대재해처벌법 대비', '원청의 안전보건 평가 대응', '공공기관 평가·입찰 대응', '사고 이후 재발 방지', '기타·상담 후 정리']),
    ],
    [
      q('current', '안전보건관리체계는 어느 정도 갖추어져 있나요?', ['처음 만들어야 함', '일부 서류만 있음', '있지만 실제 운영이 부족함', '점검만 받고 싶음']),
      q('sites', '사업장은 몇 곳인가요?', ['1곳', '2~3곳', '4곳 이상', '건설 현장 단위로 바뀜']),
      q('timing', '희망 완료 시점은 언제인가요?', ['1개월 이내', '3개월 이내', '6개월 이내', '일정 협의']),
    ],
  ],
  risk: [
    [
      q('scale', '상시 근로자는 몇 명인가요?', SCALE),
      q('industry', '업종을 선택해 주세요', INDUSTRY),
      q('sites', '평가할 사업장(공정)은 몇 곳인가요?', ['1곳', '2~3곳', '4곳 이상', '확인 필요']),
    ],
    [
      q('current', '위험성평가를 해 본 적이 있나요?', ['한 번도 하지 않음', '했지만 오래됨', '매년 하고 있음', '확인 필요']),
      q('need', '어떤 도움이 필요하신가요?', ['최초 실시', '정기·수시 평가 대행', '근로자 참여·교육 지원', '감독·평가 대비 서류 정비'], { type: 'multi' }),
    ],
  ],
  lecture: [
    [
      q('org', '어떤 기관인가요?', ['공공기관', '민간기업', '학교·연구기관', '협회·단체', '기타']),
      q('topics', '원하시는 교육 주제를 골라 주세요', ['직장 내 괴롭힘·성희롱 예방 교육', '직장 내 괴롭힘 조사 실무', '관리자를 위한 노동법', '중대재해처벌법과 안전보건관리체계', '노동관계법령 기초', '기타·상담 후 정리'], { type: 'multi' }),
      q('audience', '교육 대상은 누구인가요?', ['전 직원(법정의무교육)', '관리자·임원', '인사·노무 담당자', '조사위원·고충처리 담당자', '기타']),
    ],
    [
      q('people', '교육 인원은 몇 명인가요?', null, { type: 'number', unknown: true }),
      q('hours', '희망 교육 시간은 어느 정도인가요?', ['1시간', '2시간', '3시간 이상', '협의']),
      q('mode', '교육 방식은 어떻게 하시나요?', ['방문(대면)', '온라인', '협의']),
      q('timing', '희망 시기는 언제인가요?', ['이번 달', '다음 달', '2~3개월 뒤', '협의']),
    ],
  ],
  hr: [
    [
      q('scale', '직원은 몇 명인가요?', SCALE),
      q('industry', '업종을 선택해 주세요', INDUSTRY),
      q('areas', '어떤 부분을 개선하고 싶으세요?', ['임금체계', '평가체계', '근로시간·유연근무', '직무분석', '취업규칙·인사규정', '전반적인 HR 진단'], { type: 'multi' }),
    ],
    [
      q('existing', '현재 제도는 어느 정도 있나요?', ['있지만 개선이 필요함', '일부만 있음', '처음 만들려고 함', '현황 진단부터 필요함']),
      q('support', '어느 단계까지 도움이 필요한가요?', ['현황 진단·개선 방향', '제도·규정 설계', '설계와 운영·교육 지원', '상담 후 정하고 싶음']),
      q('timing', '희망 완료 시점은 언제인가요?', ['1개월 이내', '3개월 이내', '6개월 이내', '일정 협의']),
    ],
  ],
};

// 견적 업무 지침 4-4 인사노무 보수정책표 (2026.11.1.부)
const BRACKETS: [number, string, string, string][] = [
  // [상한(미만), 자문(월), 자문+급여(월), 진단·규정정비(건당)]
  [5, '월 10만 원', '월 15만 원', '70만 원'],
  [10, '월 15만 원부터', '월 20만~25만 원', '150만 원'],
  [20, '월 20만 원부터', '월 25만~30만 원', '200만 원'],
  [30, '월 25만 원부터', '월 30만~40만 원', '250만 원'],
  [50, '월 30만 원부터', '월 40만~60만 원', '300만 원'],
  [100, '월 50만 원부터', '월 70만~100만 원', '500만 원부터(상담 후 확정)'],
  [Infinity, '월 70만 원부터', '월 100만 원부터', '500만 원부터(상담 후 확정)'],
];
const bracketByCount = (n: number) => BRACKETS.find(([max]) => n < max)!;
const bracketByScale = (s: string) => BRACKETS[Math.max(0, SCALE.indexOf(s))];

const VAT = '금액은 부가세 별도이며, 노무사가 실제 업무 범위를 확인한 뒤 최종 금액을 확정합니다.';

function getResult(topic: Topic, a: Answers): Result {
  if (topic === 'payroll') {
    const n = Number(a.count);
    const [, adv, pay] = bracketByCount(n);
    const withPay = a.service !== '인사노무 자문만';
    const price = withPay ? pay : adv;
    const extra =
      (withPay && (a.pay !== '월급제 중심·급여 변동이 적음' || a.daily !== '필요 없음' || a.turnover === '빈번한 편' || a.turnover === '아직 잘 모르겠음')) ||
      a.union !== '없음';
    return {
      label: withPay ? '인사노무 자문 + 급여·4대보험 대행 · 예상 월 비용' : '인사노무 자문 · 예상 월 비용',
      headline: price,
      rows: [
        ['인사노무 자문(월)', adv],
        ['자문 + 급여·4대보험 대행(월)', pay],
      ],
      paragraphs: [
        `직원 ${n}명 기준 금액입니다.`,
        ...(extra ? ['선택하신 조건(급여 형태, 일용직, 입퇴사 빈도, 노동조합 등)에 따라 비용이 더해질 수 있습니다.'] : []),
        VAT,
      ],
      quote: `${price} (직원 ${n}명 기준${extra ? ', 조건에 따라 추가 비용 가능' : ''} / 부가세 별도, 상담 후 확정)`,
    };
  }
  if (topic === 'harassment') {
    if (a.role === '개인 상담을 희망함')
      return {
        label: '개인 상담 안내',
        headline: '상담 후 범위·비용 안내',
        paragraphs: ['이 계산은 회사가 외부 조사를 맡기는 경우의 기준입니다. 신고인·피신고인 개인 상담과 대리는 상황을 들은 뒤 범위와 비용을 안내해 드립니다.'],
        quote: '개인 상담 — 범위·비용 상담 후 안내',
      };
    const nums = ['complainants', 'respondents', 'witnesses'].map((k) => a[k]);
    const known = nums.every((v) => v !== '미정' && v !== '' && v !== undefined);
    const rows: [string, string][] = [
      ['기본 조사비', '300만 원 (신고인·피신고인 조사와 조사보고서)'],
      ['참고인 추가', '1명당 50만 원'],
    ];
    const notes = [
      '같은 사람의 추가 면담, 많은 녹취·자료 검토, 여러 사업장 출장 등은 따로 협의합니다.',
      a.departed === '예' ? '퇴사자 면담은 일정 조율에 따라 전체 기간이 늘어날 수 있습니다.' : '면담 일정과 보고서 작성 기간은 상담에서 함께 정합니다.',
      VAT,
    ];
    if (!known)
      return { label: '조사 범위 확인 필요', headline: '상담 후 개별 견적', rows, paragraphs: ['조사 인원이 정해지지 않아 예상 금액을 계산하지 않았습니다.', ...notes], quote: '인원 확인 후 개별 견적 (부가세 별도)' };
    const c = Number(a.complainants), r = Number(a.respondents), w = Number(a.witnesses);
    if (c > 1 || r > 1)
      return {
        label: '조사 범위 확인 필요',
        headline: '상담 후 개별 견적',
        rows,
        paragraphs: [`신고인 ${c}명 · 피신고인 ${r}명 · 참고인 ${w}명`, '신고인이나 피신고인이 2명 이상이면 사건을 나누어 볼지 상담에서 확인한 뒤 견적을 드립니다.', ...notes],
        quote: `신고인 ${c}명·피신고인 ${r}명·참고인 ${w}명 — 상담 후 개별 견적 (부가세 별도)`,
      };
    const total = 300 + w * 50;
    return {
      label: '외부 조사 예상 견적 · 부가세 별도',
      headline: `${total.toLocaleString('ko-KR')}만 원`,
      rows: [...rows, ['계산', `기본 300만 원 + 참고인 ${w}명 × 50만 원`]],
      paragraphs: [`신고인 1명 · 피신고인 1명 · 참고인 ${w}명 기준`, ...notes],
      quote: `예상 ${total}만 원 (기본 300만 원 + 참고인 ${w}명 × 50만 원 / 부가세 별도, 상담 후 확정)`,
    };
  }
  if (topic === 'inspection') {
    const [, , , diag] = bracketByScale(String(a.scale));
    const pre = a.status === '감독 예정은 없고 미리 점검하고 싶음';
    const client = a.client === '예';
    return {
      label: pre ? '근로감독 사전 점검 · 예상 비용' : '근로감독 대응 범위 확인',
      headline: pre ? diag : '상담 후 대응 범위·견적 안내',
      rows: [['사전 점검(인사노무 진단·규정 정비, 건당)', diag]],
      paragraphs: [
        `점검 분야: ${(a.areas as string[]).join(' · ')}`,
        pre
          ? '사전 점검은 인사노무 진단 기준 금액을 적용합니다. 점검 결과 고칠 서류와 운영 방식을 정리해 드립니다.'
          : '통지를 받았거나 감독이 진행 중이면 제출 서류와 일정부터 확인합니다. 현장 대응과 시정 조치 지원은 범위를 확인한 뒤 견적을 드립니다.',
        ...(client ? ['자문 계약 중이시면 계약 범위 안에서 지원할 수 있는 부분을 먼저 확인합니다.'] : []),
        VAT,
      ],
      quote: pre ? `사전 점검 ${diag} (${a.scale} 기준 / 부가세 별도, 상담 후 확정)` : `${a.status} — 대응 범위 확인 후 견적`,
    };
  }
  if (topic === 'safety')
    return {
      label: '안전보건체계 구축 컨설팅',
      headline: '300만 원부터',
      paragraphs: [
        `목적: ${a.purpose} · 현재 수준: ${a.current} · 사업장 ${a.sites}`,
        '사업장 규모와 과업 내용(현장 방문 횟수, 서류 체계, 교육·점검 범위)에 따라 금액이 정해집니다.',
        VAT,
      ],
      quote: `300만 원부터 (규모·과업 확인 후 확정 / 부가세 별도)`,
    };
  if (topic === 'lecture')
    return {
      label: '강의·교육 의뢰',
      headline: '요청에 따른 강의 견적안을 보내 드립니다',
      paragraphs: [
        `주제: ${(a.topics as string[]).join(' · ')} · 대상: ${a.audience}`,
        '대상과 시간에 맞춘 목차, 소요 시간, 강의료 견적을 회신해 드립니다. 기관 내부 사례를 반영해야 하면 사전 인터뷰 일정을 잡습니다.',
        '일정이 확정되면 교육 자료(PDF)와 수료 확인에 필요한 서류를 준비합니다.',
      ],
      quote: `강의 의뢰 — ${a.hours} · ${a.mode} · ${a.timing} (강의 견적안 회신)`,
    };
  if (topic === 'risk')
    return {
      label: '위험성평가 컨설팅',
      headline: '현장 확인 후 견적 안내',
      paragraphs: [
        `필요한 도움: ${(a.need as string[]).join(' · ')}`,
        '사업장 규모, 평가할 공정 수, 대행 범위에 따라 비용과 일정을 개별로 안내합니다.',
        '상담 때 기존 위험성평가 기록과 공정 목록이 있으면 함께 알려 주세요. 첫 문의에 원본을 보낼 필요는 없습니다.',
      ],
      quote: '규모·공정 수·대행 범위 확인 후 개별 견적',
    };
  return {
    label: '우리 회사의 HR 과제',
    headline: '필요한 범위부터 함께 정합니다',
    paragraphs: [
      `선택 영역: ${(a.areas as string[]).join(' · ')}`,
      '현재 제도와 자료를 확인하고 우선순위, 결과물, 운영·교육 지원 범위를 정합니다. 비용과 일정은 그 범위에 따라 개별로 안내합니다.',
      '첫 문의에 직원 개인정보나 원본 자료를 보낼 필요는 없습니다.',
    ],
    quote: '과제·결과물·지원 범위 확인 후 개별 견적',
  };
}

export default function ConsultHelper() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState('');

  const set = (k: string, v: string | string[]) => setAnswers((p) => ({ ...p, [k]: v }));

  // ?topic=lecture 처럼 들어오면 해당 메뉴로 바로 시작(개인 홈페이지 강의 페이지 버튼)
  useEffect(() => {
    const t0 = new URLSearchParams(location.search).get('topic');
    if (t0 && t0 in TOPICS) {
      setTopic(t0 as Topic);
      setStep(1);
    }
  }, []);
  const steps = ['서비스 선택', '기본 정보', '상담 조건', '안내·문의'];

  function next() {
    if (!topic) return;
    const missing = GROUPS[topic][step - 1].find((qq) => {
      const v = answers[qq.key];
      if (qq.type === 'multi') return !Array.isArray(v) || v.length === 0;
      if (v === '미정') return false;
      if (qq.type === 'number') {
        const n = Number(v);
        return v === undefined || v === '' || !Number.isInteger(n) || n < (qq.min ?? 1) || n > 100000;
      }
      return !v;
    });
    if (missing) {
      setError(`「${missing.label}」 항목을 확인해 주세요.`);
      return;
    }
    setError('');
    setStep(step + 1);
  }

  function rows(): [string, string][] {
    if (!topic) return [];
    return GROUPS[topic].flat().map((qq) => {
      const v = answers[qq.key];
      return [qq.label, Array.isArray(v) ? v.join(' · ') : String(v ?? '')];
    });
  }

  function toInquiry() {
    if (!topic) return;
    const r = getResult(topic, answers);
    const text = [`[기업 상담 도우미 · ${TOPICS[topic].title}]`, ...rows().map(([k, v]) => `${k} ${v}`), `안내: ${r.quote}`, '', '[추가 문의]', ''].join('\n');
    try {
      sessionStorage.setItem(
        HANDOFF_KEY,
        JSON.stringify({
          v: 1,
          inquiry: TOPICS[topic].inquiry,
          message: text,
          service: TOPICS[topic].title,
          quote: r.quote,
          answers: rows().map(([k, v]) => `${k} ${v}`).join(' / '),
        }),
      );
      location.assign('/contact/?from=consultation#form');
    } catch {
      setError('브라우저에서 내용을 옮기지 못했습니다. 아래 요약을 복사해 상담 신청 양식에 붙여 넣어 주세요.');
      alert(text);
    }
  }

  const reset = () => {
    setTopic(null);
    setStep(0);
    setAnswers({});
    setError('');
  };

  return (
    <div className="ch">
      <ol className="ch-steps" aria-label="진행 단계">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined} className={i < step ? 'done' : undefined}>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="ch-panel">
          <h2>상담할 서비스를 선택해 주세요</h2>
          <p className="ch-desc">지금 고민에 가까운 메뉴를 고르시면 몇 가지 질문 뒤 예상 비용 또는 상담 범위를 정리해 드립니다.</p>
          <div className="ch-services">
            {(Object.keys(TOPICS) as Topic[]).map((k) => (
              <button
                key={k}
                type="button"
                className="ch-service"
                onClick={() => {
                  setTopic(k);
                  setAnswers({});
                  setStep(1);
                }}
              >
                <b>{TOPICS[k].title}</b>
                <span>{TOPICS[k].desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {topic && step > 0 && step < 3 && (
        <div className="ch-panel">
          <h2>{TOPICS[topic].title}</h2>
          <p className="ch-desc">{step === 1 ? '기본 정보를 알려 주세요.' : '상담 범위를 조금 더 구체화해 주세요.'}</p>
          {GROUPS[topic][step - 1].map((qq) => (
            <div className="ch-field" key={qq.key}>
              {qq.type === 'multi' ? (
                <fieldset>
                  <legend>{qq.label}</legend>
                  <div className="ch-choices">
                    {qq.options!.map((o) => {
                      const cur = (answers[qq.key] as string[]) || [];
                      return (
                        <label key={o} className="ch-choice">
                          <input
                            type="checkbox"
                            checked={cur.includes(o)}
                            onChange={(e) => set(qq.key, e.target.checked ? [...cur, o] : cur.filter((x) => x !== o))}
                          />
                          <span>{o}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ) : (
                <>
                  <label htmlFor={`ch-${qq.key}`}>{qq.label}</label>
                  {qq.help && <small>{qq.help}</small>}
                  {qq.type === 'number' ? (
                    <input
                      id={`ch-${qq.key}`}
                      type="number"
                      inputMode="numeric"
                      min={qq.min ?? 1}
                      max={100000}
                      placeholder="예: 8"
                      disabled={answers[qq.key] === '미정'}
                      value={answers[qq.key] === '미정' ? '' : ((answers[qq.key] as string) ?? '')}
                      onChange={(e) => set(qq.key, e.target.value)}
                    />
                  ) : (
                    <select id={`ch-${qq.key}`} value={(answers[qq.key] as string) ?? ''} onChange={(e) => set(qq.key, e.target.value)}>
                      <option value="">선택해 주세요</option>
                      {qq.options!.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {qq.unknown && (
                    <label className="ch-choice ch-unknown">
                      <input type="checkbox" checked={answers[qq.key] === '미정'} onChange={(e) => set(qq.key, e.target.checked ? '미정' : '')} />
                      <span>아직 모름 · 상담에서 확인</span>
                    </label>
                  )}
                </>
              )}
            </div>
          ))}
          {error && <p className="ch-error" role="alert">{error}</p>}
          <div className="ch-actions">
            <button type="button" className="ch-btn" onClick={() => (step === 1 ? reset() : setStep(step - 1))}>
              이전
            </button>
            <button type="button" className="ch-btn primary" onClick={next}>
              다음
            </button>
          </div>
        </div>
      )}

      {topic && step === 3 && (() => {
        const r = getResult(topic, answers);
        return (
          <div className="ch-panel">
            <h2>선택하신 조건을 정리했습니다</h2>
            <p className="ch-desc">아직 문의가 접수되지 않았습니다. 「상담 신청서에 옮기기」를 누른 뒤 성함·연락처를 적어 보내 주세요.</p>
            <div className="ch-result">
              <p className="ch-label">{r.label}</p>
              <p className="ch-price">{r.headline}</p>
              {r.rows && (
                <dl className="ch-rates">
                  {r.rows.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {r.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="ch-summary">
              {rows().map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="ch-related">
              <a href={TOPICS[topic].link}>{TOPICS[topic].title} 업무 자세히 보기 →</a>
            </p>
            {error && <p className="ch-error" role="alert">{error}</p>}
            <div className="ch-actions">
              <button type="button" className="ch-btn" onClick={() => setStep(2)}>
                답변 수정
              </button>
              <button type="button" className="ch-btn" onClick={reset}>
                처음부터
              </button>
              <button type="button" className="ch-btn primary" onClick={toInquiry}>
                상담 신청서에 옮기기
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
