import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import { members, offices } from '@/lib/members';

export const metadata: Metadata = {
  title: '구성원',
  description:
    '노무법인 전승의 구성원을 소개합니다. 천안본사·서울지사·경기지사의 공인노무사와 전문 인력이 기업 인사노무 자문, 산업안전·중대재해 대응, 산재보상을 수행합니다.',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '전지나',
  alternateName: 'Jeon Jina',
  jobTitle: '대표 공인노무사',
  description:
    '전지나 노무사는 충남 천안에서 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야를 중심으로 활동하는 공인노무사로, 노무법인 전승의 대표이며 충청남도 갑질·괴롭힘 예방 안심노무사다.',
  worksFor: { '@type': 'LegalService', name: '노무법인 전승', url: 'https://jeonseung.co.kr' },
  workLocation: { '@type': 'Place', address: '충남 천안시 동남구 청수9로 1, 7층 703호' },
  knowsAbout: ['산업안전', '중대재해처벌법', '산업재해 보상', '직장 내 괴롭힘 조사', '인사노무 자문'],
  memberOf: { '@type': 'Organization', name: '한국공인노무사회' },
};

export default function MembersPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="phero">
        <div className="wrap">
          <div className="crumb">홈 › 구성원</div>
          <h1>구성원</h1>
          <p className="sub">
            천안본사·서울지사·경기지사의 전문 구성원이 기업과 근로자의 문제를 함께 해결합니다.
          </p>
        </div>
      </div>

      {offices.map((office) => {
        const list = members.filter((m) => m.office === office.id);
        if (list.length === 0) return null;
        return (
          <section key={office.id} id={office.id} className="office-sec">
            <div className="wrap">
              <div className="sec-head left">
                <div className="eyebrow">MEMBERS</div>
                <h2 className="serif">{office.label}</h2>
              </div>
              <div className="member-grid">
                {list.map((m) => (
                  <article className="member-card" key={m.name} id={`m-${m.name}`}>
                    <header className="member-head">
                      <h3 className="serif">
                        {m.name} <small>{m.position}</small>
                      </h3>
                      <p className="member-title">{m.title}</p>
                    </header>
                    {m.pending ? (
                      <p className="member-pending">프로필 준비 중입니다.</p>
                    ) : (
                      <div className="member-body">
                        {m.quals && m.quals.length > 0 && (
                          <div className="member-block">
                            <h4>자격</h4>
                            <ul>
                              {m.quals.map((q) => (
                                <li key={q}>{q}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {m.edu && m.edu.length > 0 && (
                          <div className="member-block">
                            <h4>학력</h4>
                            <ul>
                              {m.edu.map((e) => (
                                <li key={e}>{e}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {m.careerNow && m.careerNow.length > 0 && (
                          <div className="member-block">
                            <h4>경력 (현)</h4>
                            <ul>
                              {m.careerNow.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {m.careerPast && m.careerPast.length > 0 && (
                          <div className="member-block">
                            <h4>경력 (전)</h4>
                            <ul>
                              {m.careerPast.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </main>
  );
}
