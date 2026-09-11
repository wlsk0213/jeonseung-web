import Link from 'next/link';
import { services } from '@/lib/services';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Header() {
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>평일 09:00–18:00</span>
          <span>
            대표전화 <b>041-417-1915</b>
          </span>
          <span>
            팩스 <b>041-417-1916</b>
          </span>
        </div>
      </div>
      <header className="nav">
        <div className="wrap">
          <Link href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/logo-horizontal.png`} alt="노무법인 전승" className="logo-img" />
          </Link>
          <nav className="menu" aria-label="주 메뉴">
            <div className="dd">
              <Link href="/#work">업무분야</Link>
              <div className="sub wide">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}/`}>
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dd">
              <Link href="/members/">구성원</Link>
              <div className="sub">
                <Link href="/members/#cheonan">천안본사</Link>
                <Link href="/members/#seoul">서울지사</Link>
                <Link href="/members/#gyeonggi">경기지사</Link>
              </div>
            </div>
            <div className="dd">
              <Link href="/insights/">인사이트</Link>
              <div className="sub">
                <Link href="/insights/">전체 보기</Link>
                <Link href="/insights/#safety">산업안전·중대재해</Link>
                <Link href="/insights/#sanjae">산재보상</Link>
                <Link href="/insights/#harassment">직장 내 괴롭힘</Link>
                <Link href="/insights/#hr">인사·노무 자문</Link>
                <a href="https://blog.jinanomu.com/" target="_blank" rel="noopener" className="ext">전지나 노무사 블로그 ↗</a>
              </div>
            </div>
            <div className="dd">
              <Link href="/news/">법인 소식</Link>
              <div className="sub">
                <Link href="/news/">소식 전체 보기</Link>
                <Link href="/press/">언론 보도</Link>
                <Link href="/news/">세미나·교육 안내</Link>
              </div>
            </div>
            <div className="dd">
              <Link href="/hrnews/">HR뉴스</Link>
              <div className="sub">
                <Link href="/hrnews/">법령·행정</Link>
                <Link href="/hrnews/">판례·안전</Link>
              </div>
            </div>
            <Link href="/#faq">자주 묻는 질문</Link>
          </nav>
          <Link href="/contact/" className="nav-cta">
            상담 문의
          </Link>
        </div>
      </header>
    </>
  );
}
