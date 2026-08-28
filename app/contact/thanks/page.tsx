import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '상담 신청 완료',
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <main>
      <div className="phero">
        <div className="wrap" style={{ textAlign: 'center', padding: '90px 24px' }}>
          <h1>상담 신청이 접수되었습니다</h1>
          <p className="sub" style={{ margin: '14px auto 0' }}>
            내용을 확인한 뒤 남겨주신 연락처로 곧 연락드리겠습니다.
            <br />
            급하신 경우 대표전화 041-417-1915로 전화 주세요.
          </p>
          <div style={{ marginTop: 30 }}>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: 'var(--navy-800)',
                fontWeight: 700,
                padding: '13px 28px',
                borderRadius: 5,
              }}
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
