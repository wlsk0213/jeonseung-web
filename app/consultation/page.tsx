import type { Metadata } from 'next';
import ConsultHelper from '@/components/ConsultHelper';

export const metadata: Metadata = {
  title: '기업 상담 도우미',
  description:
    '급여대행·노무자문, 직장 내 괴롭힘 외부조사, 근로감독 대응, 안전보건체계 구축, 위험성평가, HR컨설팅, 강의·교육 의뢰 — 몇 가지 항목을 고르면 노무법인 전승의 예상 비용 또는 상담 범위를 정리해 드립니다.',
  alternates: { canonical: '/consultation/' },
};

export default function ConsultationPage() {
  return (
    <main>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">홈 › 기업 상담 도우미</div>
          <h1>어떤 도움이 필요하신가요?</h1>
          <p className="sub">
            몇 가지 항목을 고르시면 예상 비용 또는 상담 범위를 정리해 드립니다. 연락처는 마지막 상담 신청서에서만 입력합니다.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap ch-wrap">
          <ConsultHelper />
          <aside className="ch-aside">
            <h3>안내</h3>
            <ul>
              <li>선택형 안내 도구입니다. 노무사가 업무 범위를 확인한 뒤 최종 견적을 확정합니다.</li>
              <li>금액은 부가세 별도입니다.</li>
              <li>선택만으로 문의가 접수되거나 계약이 체결되지 않습니다.</li>
              <li>관계인의 실명, 주민등록번호, 진술서 같은 민감한 정보는 입력하지 마세요.</li>
            </ul>
            <h3>바로 문의</h3>
            <ul>
              <li>대표전화 041-417-1915 (평일 09:00–18:00)</li>
              <li>
                <a href="/contact/">상담 신청서 바로 쓰기 →</a>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
