import React from 'react';
import { Award, Shield, Sparkles, BookOpen, Fingerprint, Microscope, Layers, Star } from 'lucide-react';

export default function ResearchSection() {
  const stats = [
    { label: '국가지원 공공 연구비 규모', val: '462억 원', target: '충청북도 대학 최고 수준' },
    { label: '연간 신규 교외 연구개발 과제', val: '124건', target: '전년 대비 18% 증가성공' },
    { label: 'SCI급 국제 우수 저널 논문등재', val: '312편', target: '미국/유럽 글로벌 석학 협동' }
  ];

  const labs = [
    {
      title: '첨단바이오융합연구소 (Advanced Bio-Fusion Institute)',
      director: '이민우 교수 (바이오메디컬학과)',
      desc: '난치성 종양 세포 및 줄기세포 유전 형질 조작을 통한 차세대 저분자 표적 치료제 원천 신약 유기 합성 파이프라인 구축 사업을 주도합니다.',
      tag: '신약개발 핵심과제',
      funding: '연간 24억 규모 지원'
    },
    {
      title: '스마트그린시티 융합연구소',
      director: '최현우 교수 (건축공학과)',
      desc: 'BIM 3D 설계 예측 모델과 IoT 제어 기술을 융합하여 제로에너지 친환경 아파트 및 탄소배출 제로 자가보정 하우징 원리 실증 연구를 수행합니다.',
      tag: '친환경 스마트빌딩',
      funding: '정부 중점연구소 지원'
    },
    {
      title: '미래지능형 모빌리티 솔루션 랩',
      director: '박서하 교수 (소프트웨어학부)',
      desc: '자율주행 ADAS 시스템을 위한 실시간 엣지 컴퓨터 비전 세분화 알고리즘 및 저전력 EV 배터리 상태 예측 열화 패턴 추적 모델을 개발합니다.',
      tag: 'AI 자율주행 연구소',
      funding: '삼성전자 산학협동 주선'
    }
  ];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300 text-left">
      
      {/* 1. Research Hero */}
      <section className="relative w-full h-[300px] flex items-center justify-start overflow-hidden bg-zinc-900 rounded-2xl shadow-lg">
        <div className="absolute inset-0 z-0 bg-blue-950">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-left text-white space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-[10px] rounded-md border border-emerald-500/30">
            <Microscope className="w-4 h-4 text-emerald-400" />
            <span>R&D Research Excellence</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            연구활동 및 산학협력 선도교
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 max-w-md leading-relaxed font-medium">
            청주대학교는 대규모 국가지원 과제 확충과 최고 권위 산학 융합 인프라를 바탕으로 미래 지식 생태계의 패러다임을 재구조합니다.
          </p>
        </div>
      </section>

      {/* 2. Stats Row Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.04)] border border-zinc-150 relative overflow-hidden">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{stat.label}</span>
            <div className="text-3xl font-black text-primary font-mono mt-1.5">{stat.val}</div>
            <div className="text-[11px] text-zinc-500 font-semibold mt-2 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{stat.target}</span>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Research Lab Showcases */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary font-sans leading-none">CJU 대표 중점 연구센터 학술 요강</h3>
          <p className="text-xs text-zinc-500 mt-1">대학 연구 경쟁력을 상징하는 3대 최고 국가 과제 연구단을 소개합니다.</p>
        </div>

        <div className="space-y-4">
          {labs.map((lab, index) => (
            <div key={index} className="p-5 rounded-xl bg-white border border-zinc-150 hover:border-primary transition-all duration-300 shadow-[0px_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1.5 flex-1 pr-6">
                <span className="inline-block px-2.5 py-0.5 roundedbg-blue-50 text-[10px] font-bold text-primary border border-blue-105 bg-blue-50/50">
                  {lab.tag}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-zinc-900">{lab.title}</h4>
                <p className="text-xs text-zinc-400 font-bold">책임연구원: {lab.director}</p>
                <p className="text-xs text-zinc-600 leading-relaxed pt-1.5">{lab.desc}</p>
              </div>

              <div className="shrink-0 bg-zinc-50 border border-zinc-200 py-3 py-3 px-5 rounded-lg text-center w-full sm:w-auto">
                <div className="text-[10px] text-zinc-450 uppercase font-bold tracking-wider">과제 재원 규모</div>
                <div className="text-xs font-black text-primary mt-1">{lab.funding}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
