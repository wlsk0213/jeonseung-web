'use client';

import { useEffect } from 'react';

// 기업 상담 도우미(/consultation/)에서 고른 내용을 상담 신청서에 채워 넣는다. 같은 탭 sessionStorage만 사용.
export default function ContactPrefill() {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('jeonseung.consultation.v1');
      if (!raw) return;
      const data = JSON.parse(raw) as { inquiry?: string; message?: string; service?: string; quote?: string; answers?: string };
      // 메일에 항상 붙도록 숨은 칸에 따로 넣는다(고객이 문의 내용을 지워도 남음)
      const hidden: [string, string | undefined][] = [
        ['h-service', data.service],
        ['h-quote', data.quote],
        ['h-answers', data.answers],
      ];
      hidden.forEach(([id, v]) => {
        const el = document.getElementById(id) as HTMLInputElement | null;
        if (el && v) el.value = v;
      });
      const msg = document.getElementById('f-msg') as HTMLTextAreaElement | null;
      const type = document.getElementById('f-type') as HTMLSelectElement | null;
      if (msg && data.message && !msg.value) msg.value = data.message;
      if (type && data.inquiry && [...type.options].some((o) => o.text === data.inquiry)) {
        type.value = [...type.options].find((o) => o.text === data.inquiry)!.value;
      }
      sessionStorage.removeItem('jeonseung.consultation.v1');
      document.getElementById('f-name')?.focus();
    } catch {
      /* 저장소를 못 쓰는 브라우저는 무시 */
    }
  }, []);
  return null;
}
