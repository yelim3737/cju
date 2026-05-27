import React from 'react';

export default function Footer() {
  const links = [
    { label: '개인정보처리방침', bold: true },
    { label: '이메일무단수집거부', bold: false },
    { label: '캠퍼스맵', bold: false },
    { label: '찾아오시는길', bold: false }
  ];

  const handleLinkClick = (label: string) => {
    if (label === '찾아오시는길' || label === '캠퍼스맵') {
      alert(`[${label} 안내]\n- 주소: 충청북도 청주시 청원구 대성로 298 청주대학교\n- 대표전화: 043-229-8114\n- 가까운 대중교통: 청주여고 및 시청 방면 버스 노선 다수 정차`);
    } else {
      alert(`[${label}]\n청주대학교 홈페이지 정보통신 법률공시에 의해 보호 및 공정 운영 중인 조항입니다.`);
    }
  };

  return (
    <footer id="footer-contact" className="bg-zinc-100 text-zinc-650 mt-auto border-t border-zinc-250 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Foot top brand and links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left font-serif">
            <h2 className="text-xl font-bold tracking-tight text-primary">청주대학교 (CJU)</h2>
            <p className="text-[10px] text-zinc-500 tracking-wider font-mono mt-0.5">CHEONGJU UNIVERSITY</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleLinkClick(link.label)}
                className={`text-xs font-semibold hover:underline text-zinc-600 transition-colors cursor-pointer ${
                  link.bold ? 'text-primary underline decoration-primary font-bold' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Foot divider */}
        <div className="w-full h-px bg-zinc-250" />

        {/* Foot bottom text */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
          <div className="space-y-1.5 text-zinc-500">
            <p>충청북도 청주시 청원구 대성로 298 (내덕동) 청주대학교 | 우편번호: 28503</p>
            <p>대표전화: 043-229-8114 | 팩스: 043-229-8432</p>
          </div>
          
          <div className="font-semibold text-zinc-400 font-mono text-[11px]">
            © 2024 CHEONGJU UNIVERSITY. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
}
