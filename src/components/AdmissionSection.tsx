import React, { useState } from 'react';
import { GraduationCap, ArrowRight, ClipboardCheck, Sparkles, Send, Bot, Check, Info } from 'lucide-react';

export default function AdmissionSection() {
  const [selectedCategory, setSelectedCategory] = useState<'undergrad' | 'transfer' | 'grad'>('undergrad');
  
  // Predictor states
  const [gradeScore, setGradeScore] = useState<number>(3.5);
  const [showPrediction, setShowPrediction] = useState(false);

  // Counselor states
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: '안녕하세요! 청주대학교 입학 도우미입니다. 수시 모집, 정시 수능 모집 혹은 장학 요건에 관해 무엇이든 물어보세요.', time: '오전 09:00' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const nowStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    
    // Append user message
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: nowStr }]);
    setInputMessage('');

    // Generate responsive bot reply
    setTimeout(() => {
      let botReply = '질문해주신 문의 사항은 정식 입학 요강 승인 기준에 의해 검토되고 있습니다. 입학처 대표전화(043-229-8000)로 주시면 더 상세한 유선 안내가 가능합니다.';
      const text = userText.toLowerCase();

      if (text.includes('정시') || text.includes('수능')) {
        botReply = '2026학년도 정시모집은 수능 성적 100% 반영이 기본 원칙이며, 일부 실기학과의 경우 수능 40% + 실기 60% 비율로 점수를 산출합니다. 자세한 백분위는 우측 합격 예측기를 참고해 주십시오!';
      } else if (text.includes('장학') || text.includes('수석')) {
        botReply = '청주대학교는 수시 및 정시 최초합격 수석 학생에게 등록금 정액 및 학생생활관 우선 배정 등을 보장하는 "우암 수석 장장학금" 제도를 안정적으로 운영하고 있습니다.';
      } else if (text.includes('편입')) {
        botReply = '편입학은 일반 편입과 학사 편입 전형으로 구별되며, 전적 대학 취득학점과 전 학년 성적 평균(GPA)이 가장 핵심적인 전형 요소로 평가받습니다.';
      } else if (text.includes('경영')) {
        botReply = '경영학부 전공은 매 학기 인기가 많은 학과 중 하나이며, 수험생 평균 등급은 대략 3등급 중반에서 4등급 초반 선에서 가장 많이 합격이 결정되는 추세를 보입니다.';
      } else if (text.includes('소프트') || text.includes('컴퓨터') || text.includes('it')) {
        botReply = '소프트웨어학부는 학생들의 코딩 원천 지식 축적을 위해 인공지능 트랙과 캡스톤 프로젝트를 제공하고 있습니다. 수시 평균 전형 성적선은 3등급대 중후반 수준입니다.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply, time: nowStr }]);
    }, 1000);
  };

  const getAdmissionsData = () => {
    switch (selectedCategory) {
      case 'undergrad':
        return {
          title: '2025-2026학년도 신입학 전형',
          subtitle: '전국 우수 교사 및 학제와의 동행',
          details: [
            { term: '학생부교과 (수시)', desc: '교과 성적 100% 반영으로 학생들의 일괄적이고 투명한 내신 성적으로 합격을 변별합니다. (수능 최저 등급 적용 없음)' },
            { term: '창의면접 전형 (수시)', desc: '교과 70% + 비대면/대면 인성·잠재력 면접 30%를 일괄 합산하여 논리적인 구술력과 전공 적합도를 고루 심층 평가합니다.' },
            { term: '실기/실적 위주 (수시/정시)', desc: '예술대학 및 음악/디자인/체육 계열 특성화를 위해 실기 전공 배점 비율을 최고 60% 이상 집중 편성합니다.' }
          ]
        };
      case 'transfer':
        return {
          title: '2025학년도 편입학 전형 모집',
          subtitle: '새로운 배움의 지평으로 도약하는 터닝포인트',
          details: [
            { term: '일반 편입학 지원 자격', desc: '전문 대학 졸업자 또는 4년제 대학에서 2학년(4학기) 이상 수료하고 소정의 자격 학점(65학점 이상)을 완성한 글로벌 인재.' },
            { term: '학사 편입학 전형 선별', desc: '4년제 정규 대학 학사 학위 소득자 및 합치 자격 소유자 대상. 모집 단위 입학 정원의 2% 이내, 입학 총원의 4% 이내 우수자 취득.' },
            { term: '반영 비율 요소', desc: '전적 대학 전 학년 환산 백분위 성적 100%를 직결 선발하며, 일부 예체능계 학과의 경우에만 추가 실기 반영이 조율됩니다.' }
          ]
        };
      case 'grad':
        return {
          title: '25년도 전기/후기 대학원 모집',
          subtitle: '최고의 지성들이 모여 진리를 궁구하는 최고위 학사 과정',
          details: [
            { term: '일반공동 대학원 석사/박사', desc: '풍부한 우수 국가지원 과제를 가동 중인 이공계 및 보건과학 학술 연구원, 학제간 융합 연구의 장.' },
            { term: '특수 대학원 세부분야', desc: '비즈니스 실무 대학원, 사회복지 경영대학원 등 주중 야간/주말 주선 강의로 직장인 병행 심층 교육 실천.' },
            { term: '국제 펠로우십 장학 지원', desc: '글로벌 유수 협력 대학 유학생 선원 중 교수 추천 과제 및 연구 참여 실적 평가원 대상 등록비 보전제도 수혜.' }
          ]
        };
    }
  };

  const adData = getAdmissionsData();

  // Recommendations for predictor
  const getRecommendation = (g: number) => {
    if (g <= 2.0) {
      return { status: '안정권 합격', list: ['간호학과', '소프트웨어학부', '경영학부'], comment: '학생의 내신 등급은 청주대학교 모든 주요 단과대학 인기 학과군에 대해 최우선 안정 합격 등급입니다. 전액 수석 장학생을 설계해보십시오!' };
    } else if (g <= 3.5) {
      return { status: '적정 지원권', list: ['소프트웨어학부', '건축공학과', '영어영문학과'], comment: '인기 기술·학제 계열 학과에 충분히 승부할 수 있는 우수 성적대입니다. 전공 적합 면접 전형을 병행 공략하시면 더욱 유리합니다.' };
    } else if (g <= 5.0) {
      return { status: '소신 지원 가능', list: ['경영학부 회계트랙', '시각디자인학과', '건축학과 스마트트랙'], comment: '일부 전략 전공 및 비즈니스 보조 학과 지원이 유효합니다. 교과 외 전형 및 실기 배점이 고조된 실기 전형을 검토하십시오.' };
    } else {
      return { status: '면접 및 실기 집중 권장', list: ['동아리 특전 전선', '실기 위주 전형 교직'], comment: '교과 70%선 외에 실기 배점 비중이 높은 전형 조합 및 학과 전선을 추천해 드립니다.' };
    }
  };

  const recommendation = getRecommendation(gradeScore);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Admissions Hero Banner (Replicates first mockup image top block) */}
      <section className="relative w-full h-[320px] md:h-[400px] flex items-center justify-start overflow-hidden bg-zinc-900 rounded-2xl shadow-lg">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCXS9w5dq-Lp2H29iFzPcvRi8ywJxgYdbMDqTZNeQoiOa48CJZUtMWqgLIhw9W1flLGkLkXlW0OUIOGZejriz7GX6feMUp3R7mLpnIlMyylZxfoKMg3krM-PNqjRG_qWYx58Jv-JQLwUJRDTPvlMAFfPl-7IzXJy5y5bm0YNjPBukskNlIuVOQOJamnzwRMr2XogTTVha7pXKN9cy6XSe-YjuUhC6XAfQ2b0BYpWSUPs3qeDnjYm9U4xBfzDcvJz3fjxjmyMzAyAo" 
            alt="Cheongju University Admissions Campaign Image" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-left text-white space-y-4">
          <span className="inline-block px-3 py-1 bg-amber-500 text-[#002f63] font-bold text-[10px] rounded-md tracking-wider uppercase">
            Admissions Guidelines 2025/2026
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            2025학년도 신입생 및 편학 모집 안내
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 max-w-md leading-relaxed font-medium">
            청주대학교는 수험생 여러분의 정당한 노력과 열정을 투명하게 평가하여 우수한 배움의 파트너로 동행할 것입니다.
          </p>
        </div>
      </section>

      {/* 2. Selection Tabs */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex border-b border-zinc-250 bg-white p-1 rounded-xl shadow-xs">
          <button
            onClick={() => setSelectedCategory('undergrad')}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'undergrad'
                ? 'bg-primary text-white shadow-md'
                : 'text-zinc-650 hover:bg-zinc-50'
            }`}
          >
            신입학 (Undergraduate)
          </button>
          <button
            onClick={() => setSelectedCategory('transfer')}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'transfer'
                ? 'bg-primary text-white shadow-md'
                : 'text-zinc-650 hover:bg-zinc-50'
            }`}
          >
            편입학 (Transfer)
          </button>
          <button
            onClick={() => setSelectedCategory('grad')}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'grad'
                ? 'bg-primary text-white shadow-md'
                : 'text-zinc-650 hover:bg-zinc-50'
            }`}
          >
            대학원 (Graduate School)
          </button>
        </div>
      </section>

      {/* 3. Guide Detail Blocks + Predictor Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Column - Admissions Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 p-6 space-y-6 text-left">
          <div className="border-b border-zinc-150 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-secondary font-mono">{adData.subtitle}</span>
            <h3 className="text-xl font-black text-primary mt-1">{adData.title}</h3>
          </div>

          <div className="space-y-4">
            {adData.details.map((detail, index) => (
              <div key={index} className="p-4 rounded-xl bg-zinc-50 border border-zinc-150 hover:border-primary transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-xs shrink-0 font-sans">{index + 1}</span>
                  <h4 className="font-bold text-sm text-zinc-900">{detail.term}</h4>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed pl-7">
                  {detail.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs space-y-2 text-zinc-600 leading-relaxed">
            <h4 className="font-bold flex items-center gap-1.5 text-primary">
              <Info className="w-4.5 h-4.5" />
              <span>제출서류 및 지원 자격 유의사항</span>
            </h4>
            <p>
              * 모든 정식 기한 내 서류는 등기 우편 또는 입학처 수납처 방문 제출만 유효하며, 위조 및 오기가 발견될 경우 즉각 무효 처리됩니다.<br />
              * 교과 내신 성적 자동 조율 및 검정고시 성적 대조 서비스는 온라인 원서접수 대행 포털(진학사, 유웨이)을 통해 일괄 검수됩니다.
            </p>
          </div>
        </div>

        {/* Right 1 Column - Quick Helper Interactive Calculator */}
        <div className="space-y-6">
          
          {/* A. Highschool Grade Predictor */}
          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-150 p-5 text-left space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <ClipboardCheck className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-sm text-zinc-900">내 손안의 수시 합격 예측기</h4>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5 flex justify-between">
                  <span>자신의 고등학교 평균 등급</span>
                  <span className="font-mono text-primary font-bold">{gradeScore.toFixed(1)} 등급</span>
                </label>
                <input 
                  type="range"
                  min="1.0"
                  max="9.0"
                  step="0.1"
                  value={gradeScore}
                  onChange={(e) => {
                    setGradeScore(parseFloat(e.target.value));
                    setShowPrediction(true);
                  }}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-bold px-1 mt-1 font-mono">
                  <span>1.0 (최우수)</span>
                  <span>5.0</span>
                  <span>9.0 (최저)</span>
                </div>
              </div>

              {showPrediction && (
                <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-200 text-xs text-zinc-650">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span>지원 성향 예측결과</span>
                    <span className="px-2 py-0.5 rounded-sm bg-primary text-white text-[10px] font-bold">{recommendation.status}</span>
                  </div>
                  <p className="leading-relaxed font-sans font-medium text-zinc-550">
                    {recommendation.comment}
                  </p>
                  <div className="pt-2 border-t border-blue-100">
                    <span className="text-[10px] font-bold text-zinc-800">합격 추천 학과 목록:</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {recommendation.list.map((m, i) => (
                        <span key={i} className="text-[10px] bg-white border border-blue-100 rounded px-2 py-0.5 font-semibold text-primary">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* B. Admissions Counselor Chatbot */}
          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-150 overflow-hidden flex flex-col h-[280px] text-left">
            <div className="bg-primary/95 text-white p-3.5 flex items-center gap-2">
              <Bot className="w-4.5 h-4.5 text-amber-300" />
              <div>
                <h4 className="font-bold text-xs">CJU 입학 카운슬러 챗봇</h4>
                <p className="text-[9px] text-zinc-300">실시간 빠른 안내 지원</p>
              </div>
            </div>

            {/* Chat list */}
            <div className="flex-grow p-3 space-y-3 overflow-y-auto no-scrollbar text-[11px]">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[85%] space-y-0.5">
                    <div className={`p-2.5 rounded-lg leading-relaxed ${
                      m.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-zinc-100 text-zinc-800 rounded-tl-none border border-zinc-200'
                    }`}>
                      {m.text}
                    </div>
                    <div className="text-[8px] text-zinc-400 text-right font-mono px-1">
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-2 border-t border-zinc-200 flex gap-1.5 bg-zinc-52">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="전형 또는 장학금 문의..."
                className="flex-grow bg-white border border-zinc-300 rounded-md px-2.5 py-1 text-xs focus:ring-1 focus:ring-primary focus:outline-hidden"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-opacity-90 text-white rounded-md p-1.5 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </section>

    </div>
  );
}
