import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';

const SITE = 'https://jeonseung.co.kr';
const PAGE_URL = `${SITE}/careers/`;

// 채용 공고(2026-11-06 대표 요청, 고용24 등록 공고와 같은 내용). 채용이 끝나면 open을 false로 바꾸고 배포한다.
const job = {
  open: true,
  datePosted: '2026-11-06',
  title: '인사·노무 사무직 채용 (천안 본사)',
  summary:
    '노무법인 전승 천안 본사에서 거래처 급여계산·4대보험 업무와 사무, 온라인 홍보를 함께할 인사·노무 사무직 1명을 채용합니다. 정규직이며 경력·학력·자격은 묻지 않습니다.',
  poster: { src: '/careers/hiring-poster-2026-11.webp', full: '/careers/hiring-poster-2026-11.jpg' },
  applyEmail: 'jjn@hrjs.co.kr',
  applySubject: '인사·노무 사무직 지원_성명',
  overview: [
    ['모집 직종', '인사 사무원 (인사관리 사무원)'],
    ['관련 직종', '인사 및 노무 사무원, 총무 및 일반 사무원'],
    ['채용 형태', '정규직'],
    ['모집 인원', '1명'],
    ['근무지', '천안 본사'],
    ['상시 근로자 수', '19명 (법인 전체 기준, 천안 사무소 7명)'],
    ['경력', '관계없음'],
    ['학력', '학력 무관'],
    ['자격·면허', '관계없음'],
  ],
  duties: [
    {
      head: '거래처 급여계산 및 4대보험 신고 업무(고객응대)',
      items: [
        '근로계약서, 임금테이블 작성, 급여계산 및 4대보험 업무',
        '문서작성, 서류작성 및 송부 업무',
        '거래처 관리, 거래처 인사·노무 요청 업무 진행',
        '관공서 서류 작성 및 제출',
      ],
    },
    {
      head: '마케팅·AI 홍보',
      items: ['AI 마케팅, 블로그, 홈페이지 관리', '온라인 홍보(네이버, 구글 등)', '홍보물 제작 의뢰, 정리 등'],
    },
    {
      head: '공인노무사 직무 보조',
      items: [
        '공인노무사 업무 보조(데이터 입력, 자료 작성, 서류 정리)',
        '노동사건 서류 수발신 및 행정업무(정보공개청구, 신청서 작성 및 송부)',
      ],
    },
    {
      head: '총무 업무 등 기타',
      items: [
        '전화응대, 상담일정 조율, 고객대응',
        '문서 수발신, 자료 관리·정리·보존 등',
        '문서 및 기록 관리(시스템 관리, 공문서 및 사문서 관리)',
        '사무실 환경 관리, 우편 송부 등',
      ],
    },
    { head: '기타', items: ['공인노무사업 관련 일체의 사무 업무 조력'] },
  ],
  conditions: [
    ['임금', '월 2,300,000원 이상 ~ 2,500,000원 이하'],
    ['근무형태', '주 5일 근무'],
    ['주 소정 근로시간', '주 40시간'],
    ['근무시간', '09:00 ~ 18:00 (근무시간 협의 가능)'],
    ['휴게시간', '12:00 ~ 13:00'],
    ['근무 예정지', '(31198) 충청남도 천안시 동남구 청수9로 1, 7층 703호 (청당동, 청오법조빌딩)'],
    ['퇴직급여', '퇴직연금'],
    ['사회보험', '고용보험 · 산재보험 · 건강보험 · 국민연금'],
    ['고용 형태', '기간의 정함이 없는 근로계약'],
  ],
  preferred: [
    '문서·스프레드시트·프레젠테이션·회계프로그램 활용 가능자',
    'PC·AI 활용 능력 보유자',
    '경영·법학 전공자',
    '적극적인 태도와 배움의 의지로 동료와 협력하는 분',
  ],
  apply: [
    ['제출 자료', '이력서 · 자기소개서'],
    ['전형 절차', '서류심사 → 면접'],
    ['접수 마감', '채용 시까지'],
  ],
};

export const metadata: Metadata = {
  title: job.title,
  description: job.summary,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    title: `${job.title} | 노무법인 전승`,
    description: job.summary,
    url: PAGE_URL,
    images: [{ url: `${SITE}${job.poster.full}`, width: 1024, height: 1536, alt: '노무법인 전승 인사·노무 사무직 채용 포스터' }],
  },
};

const mailtoHref = `mailto:${job.applyEmail}?subject=${encodeURIComponent(job.applySubject)}`;

export default function CareersPage() {
  const descHtml = [
    `<p>${job.summary}</p>`,
    '<p>[직무 내용]</p>',
    ...job.duties.map((d, i) => `<p>${i + 1}. ${d.head}</p><ul>${d.items.map((x) => `<li>${x}</li>`).join('')}</ul>`),
    '<p>[근무조건]</p>',
    `<ul>${job.conditions.map(([k, v]) => `<li>${k}: ${v}</li>`).join('')}</ul>`,
    '<p>[우대사항]</p>',
    `<ul>${job.preferred.map((x) => `<li>${x}</li>`).join('')}</ul>`,
    '<p>[지원 방법]</p>',
    `<ul><li>이메일 접수: ${job.applyEmail} (제목: ${job.applySubject})</li>${job.apply.map(([k, v]) => `<li>${k}: ${v}</li>`).join('')}</ul>`,
  ].join('');

  const jobJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: '인사·노무 사무직 (인사 사무원)',
    image: `${SITE}${job.poster.full}`,
    qualifications: job.preferred.join(', '),
    description: descHtml,
    datePosted: job.datePosted,
    employmentType: 'FULL_TIME',
    totalJobOpenings: 1,
    directApply: false,
    url: PAGE_URL,
    hiringOrganization: {
      '@type': 'Organization',
      name: '노무법인 전승',
      sameAs: SITE,
      logo: `${SITE}/logo-horizontal.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KR',
        addressRegion: '충청남도',
        addressLocality: '천안시 동남구',
        streetAddress: '청수9로 1, 7층 703호 (청당동, 청오법조빌딩)',
        postalCode: '31198',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: { '@type': 'QuantitativeValue', minValue: 2300000, maxValue: 2500000, unitText: 'MONTH' },
    },
    workHours: '주 5일, 주 40시간, 09:00~18:00',
    experienceRequirements: 'no requirements',
    educationRequirements: 'no requirements',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '채용 안내', item: PAGE_URL },
    ],
  };

  return (
    <main>
      {job.open && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="phero">
        <div className="wrap post-wrap">
          <div className="crumb">
            <Link href="/">홈</Link> &nbsp;›&nbsp; 채용 안내
          </div>
          <h1>{job.open ? job.title : '채용 안내'}</h1>
          <div className="post-meta">
            <span>노무법인 전승 · 채용</span>
            <span>{job.datePosted.replace(/-/g, '.')} 게시</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap post-wrap">
          {job.open ? (
            <article className="post-body">
              <p>{job.summary}</p>

              <figure className="news-fig">
                <a href={job.poster.full} target="_blank" rel="noopener noreferrer">
                  <img
                    src={job.poster.src}
                    width={1024}
                    height={1536}
                    alt="노무법인 전승 인사·노무 사무직 채용 포스터: 정규직 1명, 경력·학력 무관, 급여·4대보험, 마케팅·AI 홍보, 노무사 업무보조·총무, 월 230만~250만 원, 주 5일 09:00~18:00, 이메일 jjn@hrjs.co.kr로 이력서·자기소개서 접수"
                    style={{ height: 'auto' }}
                  />
                </a>
                <figcaption>포스터를 누르면 크게 볼 수 있습니다.</figcaption>
              </figure>

              <p style={{ textAlign: 'center' }}>
                <a href={mailtoHref} className="apply-btn">
                  이메일로 지원하기 ({job.applyEmail})
                </a>
              </p>

              <h2>모집요강</h2>
              <table>
                <tbody>
                  {job.overview.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>직무 내용</h2>
              <ol>
                {job.duties.map((d) => (
                  <li key={d.head}>
                    <b>{d.head}</b>
                    <ul>
                      {d.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              <h2>근무조건</h2>
              <table>
                <tbody>
                  {job.conditions.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>우대사항</h2>
              <ul>
                {job.preferred.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>

              <h2>지원 방법</h2>
              <p>
                이력서와 자기소개서를 이메일 <a href={mailtoHref}>{job.applyEmail}</a>로 보내 주세요. 이메일 제목은 [
                {job.applySubject}] 형식으로 적어 주시면 됩니다.
              </p>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">이메일 접수</th>
                    <td>
                      <a href={mailtoHref}>{job.applyEmail}</a>
                    </td>
                  </tr>
                  {job.apply.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">채용 문의</th>
                    <td>
                      <a href="tel:0414171915">041-417-1915</a> (평일 09:00~18:00)
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          ) : (
            <article className="post-body">
              <p>지금은 진행 중인 채용이 없습니다. 채용 소식은 <Link href="/news/">법인 소식</Link>에서 안내합니다.</p>
            </article>
          )}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
