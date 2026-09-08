import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import { getAllInsights, insightCategories, categoryId, fmtDate } from '@/lib/insights';

export const metadata: Metadata = {
  title: '인사이트',
  description:
    '노무법인 전승 전지나 노무사가 실제 상담에서 가장 많이 받는 질문에 근거 조문과 함께 답합니다. 산업안전·중대재해, 산재보상, 직장 내 괴롭힘 분야의 실무 가이드.',
};

export default function InsightsPage() {
  const posts = getAllInsights();
  const groups = insightCategories
    .map((c) => ({ ...c, posts: posts.filter((p) => p.category === c.label) }))
    .filter((g) => g.posts.length > 0);
  const etc = posts.filter((p) => categoryId(p.category) === 'etc');

  return (
    <main>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link> &nbsp;›&nbsp; 인사이트
          </div>
          <h1>인사이트</h1>
          <p className="sub">
            실제 상담에서 가장 많이 받는 질문에, 근거 조문과 함께 답합니다. 산업안전·중대재해,
            산재보상, 직장 내 괴롭힘 분야의 실무 가이드입니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="post-list">
            {posts.length === 0 && <p className="board-empty">등록된 글이 없습니다.</p>}
            {groups.map((g) => (
              <div key={g.id} id={g.id}>
                <h2 className="post-cat-head">{g.label}</h2>
                {g.posts.map((p) => (
                  <Link className="post-card" href={`/insights/${p.slug}/`} key={p.slug}>
                    <span className="cat">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <span className="date">
                      {fmtDate(p.date)} · 전지나 노무사 · 약 {p.readingMin}분
                    </span>
                  </Link>
                ))}
              </div>
            ))}
            {etc.length > 0 && (
              <div id="etc">
                <h2 className="post-cat-head">기타</h2>
                {etc.map((p) => (
                  <Link className="post-card" href={`/insights/${p.slug}/`} key={p.slug}>
                    <span className="cat">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <span className="date">{fmtDate(p.date)} · 전지나 노무사</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
