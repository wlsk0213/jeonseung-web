import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import { hrNewsItems } from '@/lib/hrnews';

export const metadata: Metadata = {
  title: 'HR뉴스',
  description:
    '노무법인 전승이 정리하는 노동법·고용정책 소식. 법 개정, 고용노동부 발표, 판례와 산업안전 동향을 인사담당자의 눈높이로 전합니다.',
};

export default function HrNewsPage() {
  return (
    <main>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">홈 › HR뉴스</div>
          <h1>HR뉴스</h1>
          <p className="sub">
            인사담당자가 놓치면 안 되는 노동법·고용정책 소식을 노무법인 전승이 정리해 전합니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="board">
            {hrNewsItems.length === 0 ? (
              <p className="board-empty">등록된 뉴스가 없습니다.</p>
            ) : (
              hrNewsItems.map((n, i) => (
                <details className="board-item" key={`${n.date}-${n.title}`} open={i === 0}>
                  <summary>
                    <span className="badge">{n.badge}</span>
                    <span className="bt">{n.title}</span>
                    <span className="bd">{n.date}</span>
                  </summary>
                  <div className="board-body">
                    <p>{n.body}</p>
                    {n.source && (
                      <p style={{ paddingTop: 8, fontSize: 13, color: 'var(--silver-500)' }}>
                        출처:{' '}
                        <a
                          href={n.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--navy-600)', fontWeight: 600 }}
                        >
                          {n.source.label}
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
