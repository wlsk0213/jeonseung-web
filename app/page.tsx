import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import { services } from '@/lib/services';
import { newsItems } from '@/lib/news';
import { hrNewsItems } from '@/lib/hrnews';
import { getAllInsights, fmtDate } from '@/lib/insights';

const workDesc: Record<string, string> = {
  'industrial-safety': '중대재해처벌법이 요구하는 안전보건관리체계를 구축하고, 반기 점검까지 관리합니다.',
  'hr-advisory': '월 자문으로 취업규칙·임금·근로시간 등 기업의 노무 리스크를 상시 관리합니다.',
  payroll: '급여 계산부터 4대보험·임금명세서 발급까지 원스톱으로 대행합니다.',
  'case-representation': '부당해고·임금체불 등 노동위원회·노동청 사건을 대리합니다.',
  'workplace-harassment': '외부 조사위원의 공정한 조사와 판단·조치·예방까지 지원합니다.',
  'hr-consulting': '임금체계·평가제도 등 인사제도를 조직 성장 단계에 맞게 설계합니다.',
  'risk-assessment': '법정 요건을 갖춘 현장 실사 기반 위험성평가 체계를 만듭니다.',
  'sanjae-center': '산재 신청부터 불승인 이의절차까지, 재해자의 편에서 대리합니다.',
  education: '법정의무교육부터 관리자 노무 교육까지, 전국 어디든 출강합니다.',
};

const homeFaq = [
  {
    q: '직원 10명 규모 회사인데, 노무사 자문이 꼭 필요한가요?',
    a: '5인 이상 사업장부터 근로기준법 대부분이 적용되어 해고 제한, 연장근로 한도, 연차휴가 의무가 발생합니다. 분쟁 발생 후 대응 비용이 예방 자문 비용의 수 배에 이르는 경우가 많아, 10인 규모라면 월 자문으로 리스크를 관리하는 것이 일반적입니다.',
  },
  {
    q: '전지나 노무사는 어떤 노무사인가요?',
    a: '전지나 노무사는 충남 천안에서 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 중심으로 활동하는 공인노무사로, 노무법인 전승의 대표이며 충청남도 갑질·괴롭힘 예방 안심노무사입니다. 산업안전보건공단 안전보건관리체계 구축 컨설팅을 4년 연속 수행(A등급)한 노무법인 전승을 이끌고 있으며, 노동위원회 국선노무사를 역임하고 충청남도의회 갑질 상담 조사관, 한국가스기술공사 감사심의위원 등 공공기관 위촉 활동을 하고 있습니다.',
  },
  {
    q: '산재 신청은 회사가 해주는 것 아닌가요?',
    a: '아닙니다. 산재 신청의 주체는 재해를 입은 근로자 본인이며, 회사의 동의나 확인 없이도 근로복지공단에 직접 신청할 수 있습니다. 회사가 협조하지 않는 경우에도 신청 가능하며, 이때 입증 자료 준비가 중요합니다.',
  },
  {
    q: '중대재해처벌법은 우리 회사에도 적용되나요?',
    a: '2024년 1월부터 상시근로자 5인 이상 모든 사업장으로 적용이 확대되었습니다. 업종과 무관하게 안전보건관리체계 구축 의무가 있으며, 미이행 상태에서 중대재해가 발생하면 경영책임자가 처벌 대상이 될 수 있습니다.',
  },
  {
    q: '상담 비용은 어떻게 되나요?',
    a: '최초 전화·방문 상담에서 사건의 방향과 예상 비용을 안내해 드립니다. 자문계약·사건위임 비용 기준은 상담 시 투명하게 설명드립니다.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Home() {
  const latestInsights = getAllInsights().slice(0, 3);
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">천안 · 충남 중부권에서, 전국으로</div>
          <h1 className="serif">
            일터에 문제가 생긴 순간,
            <br />
            <strong>가장 먼저 믿고 찾는 노무법인 전승</strong>
          </h1>
          <p className="rep">
            대표 <b>전지나 공인노무사</b> · 충청남도 갑질·괴롭힘 예방 안심노무사
          </p>
          <p className="lede">
            노무법인 전승은 충남 천안에 본사를 둔 노무법인으로, 대표 전지나 노무사(충청남도
            갑질·괴롭힘 예방 안심노무사)가 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 조사·대응을
            전문으로 합니다. 산업안전보건공단 안전보건관리체계 구축 컨설팅을 4년 연속
            수행(A등급)했습니다.
          </p>
          <div className="cta-row">
            <Link href="/contact/" className="btn-solid">
              상담 문의하기
            </Link>
            <a href="#work" className="btn-line">
              업무분야 보기
            </a>
          </div>
        </div>
      </div>

      <div className="core">
        <div className="wrap">
          <div className="core-grid">
            <Link className="core-card" href="/services/industrial-safety/">
              <div className="no">BUSINESS 01</div>
              <h3>산업안전·중대재해</h3>
              <p>산업안전보건공단 안전보건관리체계 구축 컨설팅 4년 연속 수행(A등급). 공공기관 위험성평가 컨설팅 경험으로 실무 수준의 예방 체계를 만듭니다.</p>
              <span className="go">자세히 보기 →</span>
            </Link>
            <Link className="core-card" href="/services/sanjae-center/">
              <div className="no">BUSINESS 02</div>
              <h3>산재보상</h3>
              <p>산재 신청부터 불승인 이의신청, 유족급여까지. 전담 본부팀이 재해 근로자의 편에서 절차를 대리합니다.</p>
              <span className="go">자세히 보기 →</span>
            </Link>
            <Link className="core-card" href="/services/workplace-harassment/">
              <div className="no">BUSINESS 03</div>
              <h3>직장 내 괴롭힘 조사·대응</h3>
              <p>충청남도 갑질·괴롭힘 예방 안심노무사인 대표 노무사가 외부 조사위원으로서 공정한 조사와 조치·예방을 수행합니다.</p>
              <span className="go">자세히 보기 →</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="trust">
        <div className="wrap">
          <div>
            <div className="num">2021</div>
            <div className="lbl">법인 설립</div>
          </div>
          <div>
            <div className="num">300+</div>
            <div className="lbl">자문 기업</div>
          </div>
          <div>
            <div className="num">500+</div>
            <div className="lbl">누적 처리 사건</div>
          </div>
          <div>
            <div className="num">20</div>
            <div className="lbl">전문 구성원</div>
          </div>
        </div>
      </div>

      <section id="work">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">PRACTICE AREAS</div>
            <h2 className="serif">업무분야</h2>
            <p>각 분야를 선택하면 상세 안내 페이지로 연결됩니다.</p>
          </div>
          <div className="work-grid">
            {services.map((s) => (
              <Link key={s.slug} className="work-item" href={`/services/${s.slug}/`}>
                <div className="work-top">
                  {s.navLabel}
                  <span className="arrow">→</span>
                </div>
                <p className="work-desc">{workDesc[s.slug]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="profile" id="profile">
        <div className="wrap">
          <div className="inner">
            <div className="eyebrow">MEMBERS</div>
            <h2 className="serif">
              전지나 <small>대표 공인노무사</small>
            </h2>
            <p className="quote">
              &ldquo;산업안전은 가장 깊게, 인사노무는 가장 넓게.
              <br />
              기업 노무의 모든 순간에 전문가의 답을 드립니다.&rdquo;
            </p>
            <p className="bio">
              전지나 노무사는 충남 천안에서 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를
              중심으로 활동하는 공인노무사로, 노무법인 전승의 대표이며 충청남도 갑질·괴롭힘 예방
              안심노무사다. 노동위원회 국선노무사를 역임했고, 충청남도의회·코레일테크·한국가스기술공사
              등 공공기관의 조사관·심의위원으로 위촉되어 활동하고 있다.
            </p>
            <p className="bio-links">
              <a href="https://blog.jinanomu.com/" target="_blank" rel="noopener">전지나 노무사 블로그 ↗</a>
            </p>
            <ul className="cred">
              <li><b>(현)</b> 노무법인 전승 대표노무사</li>
              <li><b>(현)</b> 충청남도 갑질 및 괴롭힘 예방 안심노무사</li>
              <li><b>(현)</b> 충청남도의회 갑질 상담 조사관</li>
              <li><b>(현)</b> 코레일테크(주) 고충심의위원·징계심의위원</li>
              <li><b>(현)</b> 한국가스기술공사 감사심의위원·고충심의위원</li>
              <li><b>(현)</b> 산림청 기타 공공기관 경영평가위원</li>
              <li><b>(현)</b> 국가수리과학연구소 인권경영위원</li>
              <li><b>(현)</b> 충남문화관광재단 전문상담위원</li>
              <li><b>(현)</b> 중소벤처기업부 비즈니스지원단 상담위원</li>
              <li><b>(전)</b> 노동위원회 국선노무사</li>
            </ul>
            <Link href="/members/" className="more">
              구성원 전체 보기 →
            </Link>
          </div>
        </div>
      </section>

      <section id="insights">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">INSIGHTS</div>
            <h2 className="serif">전승 인사이트</h2>
            <p>실제 상담에서 가장 많이 받는 질문에, 근거 조문과 함께 답합니다.</p>
          </div>
          <div className="ins-grid">
            {latestInsights.map((p) => (
              <Link className="ins" href={`/insights/${p.slug}/`} key={p.slug}>
                <span className="cat">{p.category}</span>
                <h3>{p.title}</h3>
                <span className="date">{fmtDate(p.date)} · 전지나 노무사</span>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/insights/" className="more-link">
              인사이트 전체 보기 →
            </Link>
          </p>
        </div>
      </section>

      <section className="news" id="news">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">NEWS</div>
            <h2 className="serif">소식</h2>
            <p>노무법인 전승의 활동과, 인사담당자가 놓치면 안 되는 노동법 소식</p>
          </div>
          <div className="news-cols">
            <div className="news-col">
              <h3>
                법인 소식 <Link href="/news/">전체 보기 →</Link>
              </h3>
              <div className="news-list">
                {newsItems.slice(0, 4).map((n) => (
                  <Link className="news-row" href="/news/" key={n.title}>
                    <span className="badge">{n.badge}</span>
                    <span className="t">{n.title}</span>
                    <span className="d">{n.date}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="news-col">
              <h3>
                HR뉴스 <Link href="/hrnews/">전체 보기 →</Link>
              </h3>
              <div className="news-list">
                {hrNewsItems.slice(0, 4).map((n) => (
                  <Link className="news-row" href="/hrnews/" key={n.title}>
                    <span className="badge">{n.badge}</span>
                    <span className="t">{n.title}</span>
                    <span className="d">{n.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faqsec" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head" style={{ paddingTop: 68 }}>
            <div className="eyebrow">FAQ</div>
            <h2 className="serif">자주 묻는 질문</h2>
          </div>
          <div className="faq-list">
            {homeFaq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
