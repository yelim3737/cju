import React, { useState } from 'react';
import { ActiveTab, UserProfile, NewsItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AdmissionSection from './components/AdmissionSection';
import AcademicSection from './components/AcademicSection';
import ResearchSection from './components/ResearchSection';
import CampusSection from './components/CampusSection';
import { LoginModal, StudentIdModal, LibraryModal } from './components/Modals';
import { X, Calendar, MapPin, Share2, Printer, Bookmark } from 'lucide-react';

export default function App() {
  // Global States
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [user, setUser] = useState<UserProfile>({
    name: '김청주',
    dept: '소프트웨어학부',
    studentId: '202610342',
    loggedIn: false,
    role: 'student'
  });

  // Modal Open Flags
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isStudentIdOpen, setIsStudentIdOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser({
      name: '김청주',
      dept: '소프트웨어학부',
      studentId: '202610342',
      loggedIn: false,
      role: 'student'
    });
    setIsStudentIdOpen(false);
    alert('성공적으로 로그아웃 되었습니다.');
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection 
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenStudentId={() => setIsStudentIdOpen(true)}
            onOpenLibrary={() => setIsLibraryOpen(true)}
            onNewsSelect={(news) => setSelectedNews(news)}
          />
        );
      case 'admission':
        return <AdmissionSection />;
      case 'academic':
        return <AcademicSection />;
      case 'research':
        return <ResearchSection />;
      case 'campus':
        return <CampusSection user={user} />;
      default:
        return (
          <HomeSection 
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenStudentId={() => setIsStudentIdOpen(true)}
            onOpenLibrary={() => setIsLibraryOpen(true)}
            onNewsSelect={(news) => setSelectedNews(news)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans antialiased text-zinc-900 transition-colors selection:bg-primary/25">
      
      {/* Header with quick launch bounds */}
      <Header 
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenStudentId={() => setIsStudentIdOpen(true)}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>

      {/* Footer Area */}
      <Footer />

      {/* Login dialogue window */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Mobile RFID Identity Pass card window */}
      <StudentIdModal 
        isOpen={isStudentIdOpen}
        onClose={() => setIsStudentIdOpen(false)}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Central Library Reservation Desk */}
      <LibraryModal 
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        user={user}
      />

      {/* Core CJU News Expansion modal overlay */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-200 flex flex-col animate-in fade-in zoom-in-95 duration-200 max-h-[85vh]">
            
            {/* Header image banner */}
            <div className="h-56 overflow-hidden relative shrink-0">
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 text-white">
                <span className="inline-block bg-primary text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">{selectedNews.category}</span>
                <h3 className="text-lg md:text-xl font-bold mt-1.5 pr-8 leading-snug drop-shadow-sm">{selectedNews.title}</h3>
              </div>
            </div>

            {/* Inner text area container */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-zinc-650 text-left leading-relaxed">
              <div className="flex justify-between items-center text-[10.5px] border-b border-zinc-150 pb-2 text-zinc-400 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>CJU 기획공보센터 • 등록일: {selectedNews.date}</span>
                </span>
                <div className="flex gap-2">
                  <button onClick={() => alert('해당 기사가 클립보드에 스크랩되었습니다.')} className="hover:text-primary"><Bookmark className="w-4 h-4" /></button>
                  <button onClick={() => alert('CJU 포털 기사가 복사되었습니다.')} className="hover:text-primary"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>

              <p className="font-semibold text-zinc-800 text-sm">{selectedNews.summary}</p>
              
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-primary rounded-full inline-block"></span>
                  <span>상세 지침 지식 및 관련 일정 안내</span>
                </h4>
                <p>
                  본 고시내용은 청주대학교 교무처 학사지원팀 및 대학혁신R&D사업단 주관 하에 추진되는 정식 기획안입니다. 본 문서에 표기된 수치는 연간 추진 계획에 입각하여 예산 편성이 완료되었습니다.
                </p>
                <p>
                  추가 문의가 있을 경우 본관 기획처 대표 채널을 이용하시거나 홈페이지 학술 보조 리포팅 창구를 이용해 주시면 보다 완결된 부서별 가이드를 전수 지급해 드립니다.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-[10.5px] text-zinc-500 font-sans space-y-1.5">
                <p className="font-bold text-zinc-805">📌 참고 정보통신 고지:</p>
                <p>- 청주대학교 학적 보안 방침에 의해, 본 뉴스 기사 내에 링크된 전형 가이드 및 PDF 교외 배포 전재 전단은 로그아웃 시 일부 다운로드가 차단될 수 있습니다.</p>
              </div>
            </div>

            {/* Footer action button */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200 shrink-0 text-right">
              <button
                onClick={() => setSelectedNews(null)}
                className="py-1.5 px-5 bg-primary text-white font-bold rounded-lg text-xs leading-none tracking-wider text-center hover:bg-opacity-95 transition-all text-sans"
              >
                본 고시 닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
