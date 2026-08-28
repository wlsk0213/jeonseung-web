interface Props {
  title?: React.ReactNode;
  sub?: string;
}

export default function CtaBand({
  title = (
    <>
      지금 상황을 말씀해 주세요.
      <br />
      가야 할 절차를 알려드리겠습니다.
    </>
  ),
  sub = '기업 자문 문의와 재해자 상담 모두, 첫 상담에서 방향을 잡아드립니다.',
}: Props) {
  return (
    <div className="cta-band" id="contact">
      <div className="wrap">
        <h2 className="serif">{title}</h2>
        <p>{sub}</p>
        <div className="cta-row">
          <a href="tel:041-417-1915" className="btn solid">
            📞 041-417-1915
          </a>
          <a href="http://pf.kakao.com/_AxmxdJn" target="_blank" rel="noopener noreferrer" className="btn solid">
            💬 카카오톡 상담
          </a>
          <a href="mailto:contact@hrjs.co.kr" className="btn line">
            상담 신청
          </a>
        </div>
      </div>
    </div>
  );
}
