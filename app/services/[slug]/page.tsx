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

  const serviceJsonLd = svc.areaServed
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: svc.title,
        serviceType: svc.serviceType || svc.title,
        description: svc.heroSub,
        url: `https://jeonseung.co.kr/services/${svc.slug}/`,
        areaServed: svc.areaServed.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
        provider: {
          '@type': 'LegalService',
          name: '노무법인 전승',
          url: 'https://jeonseung.co.kr/',
          telephone: '+82-41-417-1915',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '청수9로 1, 7층 703호',
            addressLocality: '천안시 동남구',
            addressRegion: '충청남도',
            postalCode: '31198',
            addressCountry: 'KR',
          },
          employee: {
            '@type': 'Person',
            name: '전지나',
            jobTitle: '대표 공인노무사',
            url: 'https://jeonseung.co.kr/members/',
            hasCredential: ['충청남도 갑질·괴롭힘 예방 안심노무사', '충청남도의회 갑질 상담 조사관'],
          },
        },
        ...(svc.proof
          ? {
              additionalProperty: svc.proof.items.map((it) => ({
                '@type': 'PropertyValue',
                name: it.label,
                value: it.value,
                description: it.desc,
              })),
            }
          : {}),
      }
    : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {serviceJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      )}
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

      {svc.proof && (
        <section className="proof">
          <div className="wrap">
            <div className="sec-head left">
              <div className="eyebrow">TRACK RECORD</div>
              <h2 className="serif">{svc.proof.title}</h2>
              {svc.proof.lead && <p>{svc.proof.lead}</p>}
            </div>
            <div className="proof-grid">
              {svc.proof.items.map((it) => (
                <div className="proof-card" key={it.label}>
                  <div className="v">{it.value}</div>
                  <div className="l">{it.label}</div>
                  {it.desc && <p>{it.desc}</p>}
                </div>
              ))}
            </div>
            {svc.proof.tags && (
              <div className="proof-tags">
                {svc.proof.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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

      {svc.related && svc.related.length > 0 && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head left">
              <div className="eyebrow">READ MORE</div>
              <h2 className="serif">관련 글</h2>
            </div>
            <ul className="related-list">
              {svc.related.map((r) => (
                <li key={r.href}>
                  {r.ext ? (
                    <a href={r.href} target="_blank" rel="noopener">
                      {r.title} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link href={r.href}>{r.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
