import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
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
                <details className="board-item" key={`${n.date}-${n.title}`} open={i === 0}>
                  <summary>
                    <span className="badge">{n.badge}</span>
                    <span className="bt">{n.title}</span>
                    <span className="bd">{n.date}</span>
                  </summary>
                  <div className="board-body">
                    <p>{n.body}</p>
                    {n.url && (
                      <p style={{ paddingTop: 8 }}>
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--navy-600)', fontWeight: 700, fontSize: 14 }}
                        >
                          원문 보기 →
                        </a>
                      </p>
                    )}
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
