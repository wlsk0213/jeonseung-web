import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: '구성원',
  description:
    '노무법인 전승의 구성원을 소개합니다. 대표 전지나 공인노무사는 충청남도 갑질·괴롭힘 예방 안심노무사 등 공공 직책을 수행하며 기업 인사노무 자문과 산재보상을 전문으로 합니다.',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '전지나',
  jobTitle: '대표 공인노무사',
  worksFor: { '@type': 'LegalService', name: '노무법인 전승' },
  workLocation: { '@type': 'Place', address: '충남 천안시 동남구 청수9로 1, 7층 703호' },
  knowsAbout: ['인사노무 자문', '산업안전', '중대재해처벌법', '산업재해 보상', '직장 내 괴롭힘 조사'],
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
            노무법인 전승은 20명의 전문 구성원이 기업과 근로자의 문제를 함께 해결합니다.
          </p>
        </div>
      </div>

      <section className="profile">
        <div className="wrap">
          <div className="inner">
            <div className="eyebrow">REPRESENTATIVE</div>
            <h2 className="serif">
              전지나 <small>대표 공인노무사</small>
            </h2>
            <p className="quote">
              &ldquo;기업에게는 사고 없는 일터를,
              <br />
              근로자에게는 정당한 권리를.&rdquo;
            </p>
            <ul className="cred">
              <li><b>(현)</b> 노무법인 전승 대표노무사</li>
              <li><b>(현)</b> 충청남도 갑질 및 괴롭힘 예방 안심노무사</li>
              <li><b>(현)</b> 충청남도의회 갑질 상담 조사관</li>
              <li><b>(현)</b> 충청남도 민관협치 협의회 위원</li>
              <li><b>(현)</b> 코레일테크(주) 고충심의위원</li>
              <li><b>(현)</b> 산림청 기타 공공기관 경영평가위원</li>
              <li><b>(현)</b> 충남문화관광재단 전문상담위원</li>
              <li><b>(현)</b> 중소벤처기업부 비즈니스지원단 상담위원</li>
              <li><b>(현)</b> 충청남도 지속가능발전협의회 위원</li>
              <li><b>(전)</b> 행정안전부 산하기관 경영평가 위원</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
