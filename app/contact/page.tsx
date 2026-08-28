import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상담 신청',
  description:
    '노무법인 전승 상담 신청. 기업 자문, 산업안전·중대재해, 산재보상 등 상황을 남겨주시면 확인 후 연락드립니다. 대표전화 041-417-1915.',
};

export default function ContactPage() {
  return (
    <main>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">홈 › 상담 신청</div>
          <h1>상담 신청</h1>
          <p className="sub">
            상황을 남겨주시면 확인 후 연락드립니다. 급하신 경우 전화 상담이 가장 빠릅니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="contact-grid">
            <aside className="contact-info">
              <h3 className="serif">연락처 안내</h3>
              <ul>
                <li>
                  <b>대표전화</b> 041-417-1915
                </li>
                <li>
                  <b>팩스</b> 041-417-1916
                </li>
                <li>
                  <b>이메일</b> jjn@hrjs.co.kr
                </li>
                <li>
                  <b>상담시간</b> 평일 09:00–18:00
                </li>
                <li>
                  <b>천안본사</b> 충남 천안시 동남구 청수9로 1, 7층 703호 (청당동, 청오법조빌딩)
                </li>
                <li>
                  <b>카카오톡</b>{' '}
                  <a
                    href="http://pf.kakao.com/_AxmxdJn"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--navy-600)', fontWeight: 600 }}
                  >
                    노무법인전승 채널
                  </a>
                </li>
              </ul>
            </aside>

            <form
              className="cform"
              action="https://formsubmit.co/jjn@hrjs.co.kr"
              method="POST"
            >
              <input type="hidden" name="_subject" value="[홈페이지 상담신청] 새 문의가 접수되었습니다" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://wlsk0213.github.io/jeonseung-web/contact/thanks/"
              />
              <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="row">
                <label htmlFor="f-type">
                  문의 구분 <span className="req">*</span>
                </label>
                <select id="f-type" name="문의구분" required defaultValue="">
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  <option>기업 자문 (인사노무·급여·HR)</option>
                  <option>산업안전·중대재해 컨설팅</option>
                  <option>산재보상 (근로자·재해자)</option>
                  <option>사건 대리 (부당해고·임금체불 등)</option>
                  <option>직장 내 괴롭힘 조사·대응</option>
                  <option>교육 출강 의뢰</option>
                  <option>기타</option>
                </select>
              </div>
              <div className="row">
                <label htmlFor="f-name">
                  성함 / 회사명 <span className="req">*</span>
                </label>
                <input id="f-name" type="text" name="성함_회사명" required placeholder="예: 홍길동 / (주)전승" />
              </div>
              <div className="row">
                <label htmlFor="f-phone">
                  연락처 <span className="req">*</span>
                </label>
                <input id="f-phone" type="tel" name="연락처" required placeholder="010-0000-0000" />
              </div>
              <div className="row">
                <label htmlFor="f-email">이메일</label>
                <input id="f-email" type="email" name="이메일" placeholder="reply@example.com" />
              </div>
              <div className="row">
                <label htmlFor="f-msg">
                  문의 내용 <span className="req">*</span>
                </label>
                <textarea
                  id="f-msg"
                  name="문의내용"
                  required
                  placeholder="상황을 간단히 적어주세요. 사업장 규모(인원), 급한 기한이 있다면 함께 알려주시면 더 정확한 안내가 가능합니다."
                />
              </div>
              <button type="submit" className="submit">
                상담 신청하기
              </button>
              <p className="privacy">
                입력하신 정보는 상담 목적으로만 사용되며, 노무법인 전승 이메일(jjn@hrjs.co.kr)로
                전달됩니다. 상담 내용은 공인노무사법에 따라 비밀이 보장됩니다.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
