import React, { useState } from 'react';
import { Search, Calendar, BookOpen, Bus, Award, ArrowRight, Clock, MapPin, X, HelpCircle, Sparkles } from 'lucide-react';
import { NEWS_DATA } from '../data';
import { NewsItem } from '../types';

interface HomeSectionProps {
  onTabChange: (tab: 'home' | 'admission' | 'academic' | 'research' | 'campus') => void;
  onOpenStudentId: () => void;
  onOpenLibrary: () => void;
  onNewsSelect: (news: NewsItem) => void;
}

export default function HomeSection({
  onTabChange,
  onOpenStudentId,
  onOpenLibrary,
  onNewsSelect
}: HomeSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFeature, setActiveQuickFeature] = useState<'none' | 'scholarship' | 'bus'>('none');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    if (query.includes('입학') || query.includes('수시') || query.includes('정시') || query.includes('모집') || query.includes('인원')) {
      onTabChange('admission');
    } else if (query.includes('과') || query.includes('학부') || query.includes('경영') || query.includes('컴퓨터') || query.includes('소프트') || query.includes('전공')) {
      onTabChange('academic');
    } else if (query.includes('연구') || query.includes('프로젝트') || query.includes('과제') || query.includes('바이오')) {
      onTabChange('research');
    } else if (query.includes('캠퍼스') || query.includes('기숙사') || query.includes('체육관') || query.includes('동아리') || query.includes('축제')) {
      onTabChange('campus');
    } else {
      alert(`[통합 검색 결과]\n"${searchQuery}" 관련 학내 콘텐츠:\n- 학과소개 탭에서 "경영학부" 및 "소프트웨어학부" 정보를 참고하십시오.\n- 캠퍼스라이프 탭에서 해당 주요 학사일정을 조회하실 수 있습니다.`);
    }
  };

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Hero Banner with Image & Mask (Replicates Image 6 Hero Area) */}
      <section className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden bg-primary shadow-inner">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWi2xUbMKzW6gOmapne4Yw7ptap7NT199HD8I35h--JynUZDtXAGkaWHd385xQ9pj6SopvOOMgLmg76_fR5fFoW-R0vYrFAgl-E2rzvuG5hwgiPhO4W2jpckkVrrt5hkdo8nVHPLj8XkqSdPVINR7yzpGozoZWzU3cLY47p65_JJEA-EtLPEMikb_vMYW8YzBPbS32dZi0ZMkSnLWtJbozzU3ZNn-UIUEsDRe83Q7nYVTfzloujgvml4m4jQv9lfexPN4mDk4G5gA" 
            alt="Cheongju University Main Campus bathed in beautiful sunlight" 
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/55 via-blue-950/40 to-[#f8f9fb]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase border border-white/20 backdrop-blur-xs">
            Cheongju University Portal
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            미래를 선도하는 글로벌 대학
          </h2>
          <p className="text-sm md:text-base text-zinc-200/90 max-w-2xl mx-auto drop-shadow-xs font-medium leading-relaxed">
            청주대학교와 함께 세상을 넓혀 나갈 청춘을 기다립니다.<br className="max-sm:hidden" />
            최첨단 기술 도약 및 실무 융합 역량 강화로 학문과 열정의 수평선을 열어보십시오.
          </p>

          {/* Unified search engine container */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="w-full max-w-2xl bg-white rounded-full shadow-xl flex items-center p-1.5 sm:p-2 border border-zinc-200/10 hover:border-zinc-300 transition-all mx-auto mt-6"
          >
            <div className="pl-4 text-primary shrink-0">
              <Search className="w-5 h-5 opacity-70" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="관심 키워드 검색 (예: 장학금, 모집요강, 경영학부, 가을축제)"
              className="flex-grow bg-transparent border-0 ring-0 focus:ring-0 focus:outline-hidden text-sm text-zinc-800 placeholder-zinc-400 pl-2 pr-4 h-11"
            />
            <button 
              type="submit"
              className="bg-primary text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-opacity-95 transition-all shadow-md shrink-0 cursor-pointer"
            >
              검색
            </button>
          </form>
        </div>
      </section>

      {/* 2. Quick Bento Grid navigation (Replicates Image 6 Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          
          <button
            onClick={onOpenStudentId}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Sparkles className="w-6 h-6" /> {/* Badge equivalent */}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 text-center">모바일 신분증</span>
          </button>

          <button
            onClick={onOpenLibrary}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <BookOpen className="w-6 h-6" /> {/* Library equivalents */}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 text-center">중앙도서관</span>
          </button>

          <button
            onClick={() => onTabChange('campus')}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Calendar className="w-6 h-6" /> {/* Calendar equivalent */}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 text-center">학사일정</span>
          </button>

          <a
            href="#cju-news-feed"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <HelpCircle className="w-6 h-6" /> {/* Notice Equivalent */}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 text-center">공지사항</span>
          </a>

          <button
            onClick={() => setActiveQuickFeature(activeQuickFeature === 'scholarship' ? 'none' : 'scholarship')}
            className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer ${
              activeQuickFeature === 'scholarship' ? 'border-primary' : 'border-zinc-100'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Award className="w-6 h-6" /> {/* Graduate/Scholar equivalents */}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 text-center">장학제도</span>
          </button>

          <button
            onClick={() => setActiveQuickFeature(activeQuickFeature === 'bus' ? 'none' : 'bus')}
            className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer ${
              activeQuickFeature === 'bus' ? 'border-primary' : 'border-zinc-100'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Bus className="w-6 h-6" /> {/* Transport equivalent */}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 text-center">통학버스</span>
          </button>

        </div>

        {/* 2.1 Dynamic Interactive Dropdown Views for bento clicks */}
        {activeQuickFeature === 'scholarship' && (
          <div className="mt-6 p-6 bg-blue-50/50 border border-blue-100 rounded-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-primary text-base">청주대학교 우수 장학금 및 수혜 조건 조회</h3>
              </div>
              <button onClick={() => setActiveQuickFeature('none')} className="text-zinc-400 hover:text-zinc-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-lg border border-blue-100 space-y-2">
                <div className="font-bold text-zinc-800">우암 수석 장장학금</div>
                <p className="text-zinc-500 leading-relaxed">학기 성적 평점 4.3 이상 취득한 성적 우수 수석 학생에게 등록금 전액 및 생활 지원비 지급</p>
                <div className="inline-block text-[10px] bg-blue-50 text-primary px-2 py-0.5 rounded font-bold">등록금 100% 면제</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 space-y-2">
                <div className="font-bold text-zinc-800">CJU 글로벌 리더십</div>
                <p className="text-zinc-500 leading-relaxed font-sans">외국어 공인 점수 취득자(TOEIC 850, 토플 100점 이상 등) 중 성적 평점 3.5 이상 통과자 수혜</p>
                <div className="inline-block text-[10px] bg-blue-50 text-primary px-2 py-0.5 rounded font-bold">해외 연수 전액 지원</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 space-y-2">
                <div className="font-bold text-zinc-800 text-sans">청청 근로 근로장학</div>
                <p className="text-zinc-500 leading-relaxed">학내 부서(도서관, 학과사무실, 전산센터)에서 일주일 10시간 내 근로를 성실히 이행하는 학생</p>
                <div className="inline-block text-[10px] bg-blue-50 text-primary px-2 py-0.5 rounded font-bold">시간당 최고 9,860원 시급 정산</div>
              </div>
            </div>
          </div>
        )}

        {activeQuickFeature === 'bus' && (
          <div className="mt-6 p-6 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-secondary text-base">CJU 통학 순환 및 셔틀버스 실시간 운행 운행시간표</h3>
              </div>
              <button onClick={() => setActiveQuickFeature('none')} className="text-zinc-400 hover:text-zinc-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-600">
              <div className="bg-white p-4 rounded-lg border border-zinc-200 space-y-3">
                <div className="font-bold text-zinc-900 border-b border-zinc-100 pb-1.5 flex justify-between items-center">
                  <span>오전 등교 셔틀 (청주 시내 주요 거점)</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 py-0.5 px-2 rounded-sm font-bold font-sans">ACTIVE</span>
                </div>
                <ul className="space-y-2 leading-relaxed">
                  <li className="flex justify-between">
                    <span>• 청주 가경 버스터미널 역 (1번 출구 정류소)</span>
                    <strong className="font-mono text-primary">08:15 / 08:30</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>• 청주 충북대학교 교차로 버스쉘터 부근</span>
                    <strong className="font-mono text-primary">08:35 / 08:50</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>• 복대동 지웰시티 주차장 남문 입구</span>
                    <strong className="font-mono text-primary">08:20 / 08:40</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-zinc-200 space-y-3">
                <div className="font-bold text-zinc-900 border-b border-zinc-100 pb-1.5 flex justify-between items-center">
                  <span>캠퍼스 셔틀 (순환 왕복 코스)</span>
                  <span className="text-[10px] bg-amber-50 text-amber-600 py-0.5 px-2 rounded-sm font-bold font-sans">15분 간격</span>
                </div>
                <ul className="space-y-2 leading-relaxed">
                  <li className="flex justify-between">
                    <span>• 대학 정문 버스 승차장 ➔ 본관 로컬 ➔ 학생회관 삼거리</span>
                    <span>상시 운행 (09:00 - 18:00)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>• 대운동장 테니스코트 ➔ 기숙사 우암마을 ➔ 인문사회대학</span>
                    <span>상시 운행 (09:00 - 18:00)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. News Feed Block (Replicates Image 6 News Cards) */}
      <section id="cju-news-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        
        <div className="flex justify-between items-end border-b border-zinc-250 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-primary font-sans leading-none">CJU News & Highlights</h2>
            <p className="text-xs text-zinc-500 mt-1.5">청주대학교의 주요 학술 성과, 공지사항 및 핵심 입학 뉴스를 전달해 드립니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_DATA.map((news) => (
            <article 
              key={news.id}
              onClick={() => onNewsSelect(news)}
              className="bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 border border-zinc-100 flex flex-col cursor-pointer group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold bg-primary text-white rounded-md shadow-xs">
                    {news.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {news.title}
                </h3>
                <p className="text-xs text-zinc-520 line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>
                <div className="w-full pt-4 mt-auto border-t border-zinc-100 flex justify-between items-center text-[11px] text-zinc-400 font-bold">
                  <span className="font-mono">{news.date}</span>
                  <span className="text-primary hover:underline flex items-center gap-1">
                    자세히 읽기 <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

    </div>
  );
}
