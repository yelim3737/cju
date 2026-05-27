import React, { useState } from 'react';
import { Calendar, Music, Activity, Heart, HeartPulse, Sparkles, MapPin, Send, HelpCircle, X, ChevronRight, Check } from 'lucide-react';
import { CLUBS_DATA, EVENTS_DATA } from '../data';
import { ClubItem, CampusEvent, UserProfile } from '../types';

interface CampusSectionProps {
  user: UserProfile;
}

export default function CampusSection({ user }: CampusSectionProps) {
  const [selectedClubType, setSelectedClubType] = useState<'all' | 'performing' | 'sports' | 'volunteer'>('all');
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(EVENTS_DATA[0]);
  
  // Interactive Club register form
  const [clubs, setClubs] = useState<ClubItem[]>(CLUBS_DATA);
  const [isRegisteringClub, setIsRegisteringClub] = useState<ClubItem | null>(null);
  const [joinedClubsLogs, setJoinedClubsLogs] = useState<Array<{ name: string; club: string; id: number }>>([]);
  const [studentName, setStudentName] = useState(user.loggedIn ? user.name : '');
  const [selectedRole, setSelectedRole] = useState('기획 단원');
  const [message, setMessage] = useState('');

  // Story Interactions
  const [stories, setStories] = useState([
    {
      id: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5MxuCQZGW_qEw4VMG27NbbfRxB6leDF75i9W8misOjOYPUlyofVs6fEW6CCLUc-oSNMROBnVc3Xg-E9K8DVV5u4duC1BdCfgcjJpvEv3sIEDZVI0YEiaodi5jfnCB0zB5iJjtqaPqgU0dV3l9aR9Q3pkeaSw9OstKOKJ-R4oSgz3zWXsQAE9ueq7gEG3Yi5kjq-eEA9iCD7GekWrrs8D2_nvgXXzS83Bx-pQWN23Rg-lPn11z9A_uEQ5aQJJxqLPm5Qgxjrxkz20',
      title: '본관 잔디밭과 푸른 가을 하늘',
      likes: 128,
      comments: ['어제 찍은 건데 대성로 가로수 단풍 너무 이쁩니다.', '공강시간 힐링 맛집']
    },
    {
      id: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjFQcV9AGX25QluKKZ-QBPjDo4J4pcY7kfWw4iJC_MjsiP2USXhNS8tWECRUJei8I2yNMQwI1jvmUE3HQrOtGY7V5rtMOOI9gDOjKYjG-_M2DwOCSGR4blk97DM7omihK4POSV5d47jyyxEfbHszJQY5m_9C8_P4V7I4Nae14RnDBKKge9DnQqd4lZwR8V072a3W1gMmcTX3VwWzKmv5YdakDr_r1OH47FWUDozhk081PYao8SqtuelF5TTKl2fn0T9W-kE7htL7U',
      title: '체육대회 학생들의 응원 열정',
      likes: 245,
      comments: ['소프트웨어학부 줄다리기 우승 축하드려요!', '체육대회 사진첩 업로드 감사합니다']
    },
    {
      id: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4Sk1Itnr0g85MA1g7J9rc8cu2dKAoAkpjmW71U65-QV0LSekARExoc9jNHACOFEg3gzcAg6aSdSE48RtBOTcYAf2wzUj7suevxgvdX3p5HfQxn3mnHv8U76UZLwfTuNyDlCQdVxcN_vekBJXr34YmBayFzuGXoImz4xiVHhRSib3CLgAImsmY9igKqjyKl56tujoxzkxKzh20nvIBcO3LGcvCbsaaPckPvYEos_swof_egK6qVQoQZiQXdLnwo5t74gSOARAo4Y',
      title: '중앙도서관 계단 햇빛 받으며 독서',
      likes: 94,
      comments: ['정독실 자리 예약기 덕분에 시험기간에 완전 쾌적!']
    },
    {
      id: 4,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPlMy_h6jg-yTsMphjyWGvSre701aMxqRMjSmtrRO-E14ZaDCKcYTZyJo2GnMU_Gtm81lhZRTw6XuYFfiRvFg3W1LXVk5n7vaz-brtApsNT6lqWKAIvPesMUIWjzFQfT4YZjtpdztAVtmdeWyxFI6ce4hLp1QqR0YqtbqVgDRc-ucQajvgpaGqyp2_HAEYNgO8fEj7xEQvwWjzwZe7PCmgNeCMEgG5dcHb9kEI4OMSgKFvDTUdHvsigIIxFGW1fEOmekS5qay6WnM',
      title: '가을 대동제 밴드 축제 전야제',
      likes: 412,
      comments: ['소리울림 밴드 형님들 미쳤다...', '라인업 내년에도 역대급이기를!']
    }
  ]);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  const filteredClubs = clubs.filter((club) => {
    return selectedClubType === 'all' || club.type === selectedClubType;
  });

  const handleHeartClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStories(stories.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStoryIdx === null || !newCommentText.trim()) return;
    
    const commenter = user.loggedIn ? user.name : '방문자';
    const updatedStories = [...stories];
    const storyId = stories[activeStoryIdx].id;
    const story = updatedStories.find(s => s.id === storyId);
    
    if (story) {
      story.comments = [...(story.comments || []), `${commenter}: ${newCommentText.trim()}`];
      setStories(updatedStories);
      setNewCommentText('');
    }
  };

  const handleRegisterClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegisteringClub) return;
    
    const applicantName = studentName.trim() || (user.loggedIn ? user.name : '김민우');
    
    // Update club member count in local state
    setClubs(clubs.map(c => c.id === isRegisteringClub.id ? { ...c, count: c.count + 1 } : c));
    
    // Log registration
    setJoinedClubsLogs([
      ...joinedClubsLogs,
      { name: applicantName, club: isRegisteringClub.name, id: Date.now() }
    ]);
    
    alert(`🎉 연합동아리 [${isRegisteringClub.name}] 에 성공적으로 신청되었습니다!\n신청자: ${applicantName}\n동아리 총원 가입이 완료되었습니다.`);
    setIsRegisteringClub(null);
  };

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300 text-left">
      
      {/* 1. Life Hero Banner */}
      <section className="relative w-full h-[320px] md:h-[400px] flex items-center justify-start overflow-hidden bg-zinc-900 rounded-2xl shadow-lg">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpNcT0wZ9RZLFATLIRHyLKf_weAFaq9-sAUWj1JMBQ_g3wizHBydK4rtTcitNNjrPZYR8kbokEXssmuSYsNg3tzMF9qoH6MbOWwx8zp55rfAumuAluIXIcYicsI1VBIDtIMHIdETvh18Dp8EzXZaPy8P0BR0G5Pppx279hBxrUBl0vGocfyvSsrI47V9WS0lEUK6OcrEBD_NAtWG8PMesnNjtkgeDk7vFhipWGSSE25I81KzonjLt677Se_RyHztYN6OvVNmEGSiw" 
            alt="Cheongju University Students under beautiful autumn maple trees" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-left text-white space-y-4">
          <span className="inline-block px-3 py-1 bg-emerald-500 text-white font-bold text-[10px] rounded-md tracking-wider uppercase">
            Youth & Energy Campus Life
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            활기찬 기운이 가득한 캠퍼스 라이프
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 max-w-md leading-relaxed font-medium">
            청주대학교의 현대적 기숙사, 다채로운 동아리 활동, 가을 대동제 등 낭만이 가득한 청춘의 스토리를 확인해 보십시오.
          </p>
        </div>
      </section>

      {/* 2. Campus Facilities Showcase Grid (Replicates Image 2 Facilities) */}
      <section className="space-y-6 max-w-7xl mx-auto px-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary font-sans">캠퍼스 대표 복지 및 학내 시설</h3>
          <p className="text-xs text-zinc-500 mt-1">최신 기자재와 쾌적한 학습 휴식 환경으로 면학 분위기를 고조합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-zinc-150 flex flex-col group">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfhO-tTgj3ns2ciXDv1dbB9bGwdqcbQ34w_82mtGng_DVI0-vnIwo5-GusO0cNbSoUZ-lyP1jD29RhVXyJ7GyI_h700oNfLpArK3WND5qnvNJa4qd8eauETuBYx6xLgkRYBrkag5qyVcfvCoYOPDKgrrdkzeeiE1hoEDXee80oWQwdSWR4WAqZnLCfvxPXjybCh3Jbv4QBQ8Xq4Cri_jPe8CKPGlz9ADkUVGOIbL8e_6VpU-vcpjLYr9hcwPLek5YSuggbtqo8ICw" 
                alt="Student Union Center" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform" 
              />
            </div>
            <div className="p-4 text-left space-y-1.5">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">STUDENT ACTIVITIES</div>
              <h4 className="font-bold text-sm text-zinc-900">학생회관 (Student Union)</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">동아리 전용 룸, 극단 대강당, 학생 은행 및 편의점, 우체국, 구내식당 등이 집중 편입된 복합 청년 자치 본부실입니다.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-zinc-150 flex flex-col group">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdEddipfjsGB-qEtOQLEuax8uFB8gF6y3SPSIWcata0O09WNRukIIpHzLy7i-yNfxkVynj_rV5CQItdjJkfS61Vzgdt1UM4dpwEr6bzPYEdx6eeV4WDzQ4-n4nOlJhO5p_vUtIALx5U7jvyEnyp3KFWFfMPEF1RBfgumBONgs2lheaHV4ApOQYrcV-X5nn5AaYmeVBQR3kDkaiGZHNDYxFoo-yETypxO6h_Su10R8i1dO32qtTwAI_7ne722bEQ68b4TTaBgDhXPc" 
                alt="Dormitory Village" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform" 
              />
            </div>
            <div className="p-4 text-left space-y-1.5">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">RESIDENCE HALL</div>
              <h4 className="font-bold text-sm text-zinc-900">기숙사 (우암마을)</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">독서실 연계형 2인 1실 구성의 생활관으로 체육실, 조리 시설 및 원거리 유학생을 우선 주선하는 따뜻한 친환경 안식처입니다.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-zinc-150 flex flex-col group">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRX9JNMixgr6HWlxWirXLIyDxIyT-RJCkoatJleCtU_FlRcnDv7F05IaQrRp8g7SfIVpGxlVdsL2WRYmldkqGaqQMWf2xJ1pvMXpE3oH344dpmkzqEP8vOq-m00lhFDp2H-w-Vk28U2fZlGi1Soe_6tPC5-3A7dtv6rQ9JBhRAXnaJMHd2-RZYQvtpeG3pA8VCuGoDTqvlzAKmoL5FTcMx1wDjnp8D5TTh9UfSVRm3OUlulHvyPNDHH2-6J19ivJsWOg5mLyYQFtA" 
                alt="Gym & Arena Sports" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform" 
              />
            </div>
            <div className="p-4 text-left space-y-1.5">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">SPORTS CENTER</div>
              <h4 className="font-bold text-sm text-zinc-900">종합체육관 및 피트니스</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">실내 농구장, 인조 잔디 테니스장 외 헬스 피트니스 센터가 완비되어 학생 누구나 학기 중 건강을 조율할 수 있는 기지입니다.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Event Calendar (Left) & Clubs Register Area (Right) */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column 2 - Event agenda view */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-zinc-150 pb-4">
            <div>
              <h3 className="font-bold text-primary text-base">학사 최고 행사 아젠다</h3>
              <p className="text-[11px] text-zinc-400">교내 대동제 및 주요 세미나 일정을 클릭하여 일관 상세 요강 조회가 가능합니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* List */}
            <div className="space-y-2.5">
              {EVENTS_DATA.map((evt) => {
                const isSelected = selectedEvent?.id === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/60 border-primary shadow-xs'
                        : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-inner leading-none">
                      <span className="text-[9px] uppercase tracking-tighter opacity-80">{evt.month}</span>
                      <span className="text-base font-mono mt-0.5">{evt.day} </span>
                    </div>
                    <div className="text-xs truncate space-y-1">
                      <div className="font-bold text-zinc-800">{evt.title}</div>
                      <div className="text-[10px] text-zinc-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-secondary" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selection Display Panel */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-left flex flex-col justify-between">
              {selectedEvent ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[10px] bg-sky-100 text-primary font-bold px-2 py-0.5 rounded-sm w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedEvent.month} {selectedEvent.day}일 정식 공표</span>
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900">{selectedEvent.title}</h4>
                  <p className="text-zinc-600 leading-relaxed font-sans font-medium text-[11px]">{selectedEvent.description}</p>
                  <p className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 pt-2 border-t border-zinc-150">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>장소: {selectedEvent.location}</span>
                  </p>
                </div>
              ) : (
                <p className="text-zinc-500">행사를 선택해 보십시오.</p>
              )}
            </div>

          </div>
        </div>

        {/* Right Column 1 - Joint Clubs Registrants */}
        <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-150 p-5 space-y-4">
          
          <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
            <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              <span>연합 동아리 가입 창구</span>
            </h4>
            
            {/* Filter chips */}
            <select
              value={selectedClubType}
              onChange={(e) => setSelectedClubType(e.target.value as any)}
              className="text-[11px] border border-zinc-300 rounded p-1 bg-zinc-50 font-semibold"
            >
              <option value="all">전체 장르</option>
              <option value="performing">공연/예술</option>
              <option value="sports">체육/레저</option>
              <option value="volunteer">사회봉사회</option>
            </select>
          </div>

          {/* List of Clubs */}
          <div className="space-y-2 h-[155px] overflow-y-auto no-scrollbar">
            {filteredClubs.map((club) => (
              <div key={club.id} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-150 flex items-center justify-between gap-3 text-xs">
                <div className="text-left w-2/3">
                  <div className="font-bold text-zinc-800 truncate">{club.name}</div>
                  <div className="text-[10px] text-zinc-400 font-bold mt-0.5">활동 단원수: {club.count}명</div>
                </div>
                <button
                  onClick={() => setIsRegisteringClub(club)}
                  className="bg-primary hover:bg-opacity-95 text-white py-1 px-3 rounded-md font-bold text-[10px] cursor-pointer"
                >
                  가입신청
                </button>
              </div>
            ))}
          </div>

          {/* Registrant Live wall log */}
          {joinedClubsLogs.length > 0 && (
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-[10px] text-zinc-650 font-bold">
              📢 가입 접수 알림판:<br />
              {joinedClubsLogs.slice(-2).map((log) => (
                <div key={log.id} className="text-emerald-800 flex justify-between font-sans mt-0.5">
                  <span>• {log.name} 학생 👉 [{log.club}]</span>
                  <span>가입 완료</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </section>

      {/* 4. CJU Story (Instagram like feeds gallery board) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary flex items-center gap-2">
            <Heart className="w-5.5 h-5.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>CJU Story & Campus Moment</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-1">학생들이 직접 남긴 생생한 오늘의 학업, 휴식, 아름다운 조경 사진 피드입니다.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stories.map((story, i) => (
            <div 
              key={story.id}
              onClick={() => setActiveStoryIdx(i)}
              className="bg-white rounded-xl overflow-hidden shadow-xs border border-zinc-150 cursor-pointer group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-zinc-100">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Heart Pulsing feedback */}
                <button
                  onClick={(e) => handleHeartClick(story.id, e)}
                  className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/90 shadow-md text-rose-500 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart className="w-4.5 h-4.5 fill-rose-500 stroke-rose-500" />
                </button>
              </div>

              <div className="p-3 text-left space-y-1">
                <h4 className="font-bold text-xs text-zinc-900 truncate leading-snug">{story.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                  <span>좋아요 {story.likes}개</span>
                  <span className="text-primary hover:underline font-bold text-[9px]">댓글달기 ({story.comments?.length || 0})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Club Register Form Modal */}
      {isRegisteringClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-zinc-300 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsRegisteringClub(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5 space-y-1">
              <span className="text-[10px] bg-primary text-white font-bold py-0.5 px-2 rounded">CJU 동아리 접수</span>
              <h3 className="font-bold text-sm text-zinc-950 pt-1.5">{isRegisteringClub.name}</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                정식 동아리 수납 부원으로 등록하여 학내 복지와 공연에 참여해 보십시오.
              </p>
            </div>

            <form onSubmit={handleRegisterClubSubmit} className="space-y-4 text-xs text-left">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">지원자 이름</label>
                <input
                  type="text"
                  required
                  placeholder="예: 김청주"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">전공 구분 및 관심 전선</label>
                <input
                  type="text"
                  disabled
                  value={user.loggedIn ? `${user.dept} (${user.studentId})` : '비회원 게스트 지원자'}
                  className="w-full px-3 py-2 bg-zinc-100 border border-zinc-300 rounded-lg text-zinc-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">동아리 내 수임 희망 역할</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-2 border border-zinc-300 rounded-lg bg-white"
                >
                  <option value="기획 단원">기획 및 행정 지원단원</option>
                  <option value="메인 아티스트/플레이어">공연 및 리그 메인 주자</option>
                  <option value="미디어 홍보 위원">sns 디자인 및 미디어 위보관</option>
                </select>
              </div>

              <div className="bg-zinc-50 p-2.5 rounded-lg border text-[10px] text-zinc-500 font-sans leading-relaxed">
                📢 가입 완료 즉시, 해당 회원의 활동 내역이 동아리 메일함에 전수 송신되며 신청이 완료됩니다.
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-primary hover:bg-opacity-95 text-white rounded-lg font-bold shadow-md cursor-pointer text-xs uppercase"
              >
                신청하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. Active Story Expanded Modal for Comments */}
      {activeStoryIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 flex flex-col md:flex-row h-[500px] md:h-[420px] animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setActiveStoryIdx(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo side */}
            <div className="w-full md:w-1/2 bg-black h-48 md:h-full relative shrink-0">
              <img 
                src={stories[activeStoryIdx].image} 
                className="w-full h-full object-cover" 
                alt="Story content zoom" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white p-1">
                <h4 className="text-sm font-bold">{stories[activeStoryIdx].title}</h4>
                <p className="text-[10px] text-zinc-300 font-bold mt-1">좋아요 {stories[activeStoryIdx].likes}개 수집됨</p>
              </div>
            </div>

            {/* Comments side */}
            <div className="w-full md:w-1/2 p-5 flex flex-col justify-between h-48 md:h-full bg-white text-left text-xs">
              <div>
                <h3 className="font-black text-primary border-b border-zinc-150 pb-2 mb-3">익명 한학내 한마디 소통함 (Comments)</h3>
                
                {/* Scroll comments */}
                <div className="space-y-2 h-[210px] md:h-[230px] overflow-y-auto no-scrollbar pr-1">
                  {(stories[activeStoryIdx].comments || []).map((cmt, id) => (
                    <div key={id} className="p-2 bg-zinc-50 rounded-lg border border-zinc-150 flex flex-col font-sans">
                      <span className="font-semibold text-zinc-800 text-[11px]">{cmt.split(': ')[0]}</span>
                      <span className="text-zinc-650 text-[10px] mt-0.5 leading-normal">{cmt.split(': ')[1]}</span>
                    </div>
                  ))}
                  {(stories[activeStoryIdx].comments || []).length === 0 && (
                    <p className="text-zinc-400 py-10 text-center">작성된 한마디가 없습니다. 첫 한마디를 남겨보세요!</p>
                  )}
                </div>
              </div>

              {/* Input comment */}
              <form onSubmit={handleAddCommentSubmit} className="pt-3 border-t border-zinc-150 flex gap-1.5 bg-white">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="댓글 입력..."
                  className="flex-grow px-2 px-3 py-1.5 border border-zinc-300 rounded focus:ring-1 focus:ring-primary focus:outline-hidden"
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-opacity-95 text-white rounded p-2 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
