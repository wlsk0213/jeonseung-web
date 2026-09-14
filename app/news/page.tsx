import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Link from 'next/link';
import { newsItems } from '@/lib/news';

export const metadata: Metadata = {
  title: '법인 소식',
  description: '노무법인 전승의 협약, 세미나·교육, 활동 소식을 전합니다.',
};

export default function NewsPage() {
  return (
    <main>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">홈 › 법인 소식</div>
          <h1>법인 소식</h1>
          <p className="sub">노무법인 전승의 협약, 세미나·교육, 활동 소식을 전합니다.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="board">
            {newsItems.length === 0 ? (
              <p className="board-empty">등록된 소식이 없습니다.</p>
            ) : (
              newsItems.map((n, i) => (
                <details className="board-item" key={n.slug} open={i === 0}>
                  <summary>
                    <span className="badge">{n.badge}</span>
                    <span className="bt">{n.title}</span>
                    <span className="bd">{n.date}</span>
                  </summary>
                  <div className={`board-body${n.imageSq || n.image ? ' has-thumb' : ''}`}>
                    {(n.imageSq || n.image) && (
                      <Link href={`/news/${n.slug}/`} className="news-thumb">
                        <img src={n.imageSq ?? n.image} alt={n.title} loading="lazy" />
                      </Link>
                    )}
                    <div className="board-text">
                    <p>{n.body}</p>
                    <p style={{ paddingTop: 8, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                      <Link
                        href={`/news/${n.slug}/`}
                        style={{ color: 'var(--navy-600)', fontWeight: 700, fontSize: 14 }}
                      >
                        자세히 보기 →
                      </Link>
                      {n.url && (
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--silver-500)', fontWeight: 600, fontSize: 13.5 }}
                        >
                          원문 ↗
                        </a>
                      )}
                    </p>
                    </div>
                  </div>
                </details>
              ))
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
