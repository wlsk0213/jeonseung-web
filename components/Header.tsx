import Link from 'next/link';

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
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-horizontal.png`}
              alt="노무법인 전승"
              className="logo-img"
            />
          </Link>
          <nav className="menu">
            <Link href="/#work">업무분야</Link>
            <Link href="/members/">구성원</Link>
            <Link href="/#insights">인사이트</Link>
            <Link href="/#news">법인 소식</Link>
            <Link href="/#news">HR뉴스</Link>
          </nav>
          <Link href="/#contact" className="nav-cta">
            상담 문의
          </Link>
        </div>
      </header>
    </>
  );
}
