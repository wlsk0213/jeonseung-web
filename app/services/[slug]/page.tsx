import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import { services, getService } from '@/lib/services';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  return {
    title: `${svc.title}${svc.titleNote ? ` (${svc.titleNote})` : ''}`,
    description: svc.heroSub,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: svc.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link> &nbsp;›&nbsp; <Link href="/#work">업무분야</Link> &nbsp;›&nbsp;{' '}
            {svc.title}
          </div>
          <h1>
            {svc.title}
            {svc.titleNote && <span className="note"> {svc.titleNote}</span>}
          </h1>
          <p className="sub">{svc.heroSub}</p>
        </div>
      </div>

      <section className="why">
        <div className="wrap">
          <div className="sec-head left">
            <div className="eyebrow">WHY NOW</div>
            <h2 className="serif">{svc.whyTitle}</h2>
          </div>
          <div className="why-grid">
            {svc.why.map((w) => (
              <div className="why-card" key={w.n}>
                <div className="n">{w.n}</div>
                <p dangerouslySetInnerHTML={{ __html: w.text }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head left">
            <div className="eyebrow">SERVICE SCOPE</div>
            <h2 className="serif">{svc.scopeTitle}</h2>
            {svc.scopeLead && <p>{svc.scopeLead}</p>}
          </div>
          <div>
            {svc.steps.map((st) => (
              <div className="step" key={st.no}>
                <div className="no">{st.no}</div>
                <div>
                  <h3>{st.title}</h3>
                  <ul>
                    {st.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  {st.note && <p className="note">{st.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head left">
            <div className="eyebrow">PROCESS</div>
            <h2 className="serif">진행 절차</h2>
          </div>
          <div className="flow">
            {svc.flow.map((f, i) => (
              <div className="flow-card" key={f.title}>
                <div className="n">{String(i + 1).padStart(2, '0')}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faqsec">
        <div className="wrap">
          <div className="sec-head left">
            <div className="eyebrow">FAQ</div>
            <h2 className="serif">자주 묻는 질문</h2>
          </div>
          <div className="faq-list left">
            {svc.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            어떤 상황이든, 첫 상담에서
            <br />
            방향을 잡아드립니다.
          </>
        }
        sub="상황을 말씀해 주시면 필요한 절차와 예상 비용을 안내해 드립니다."
      />
    </main>
  );
}
