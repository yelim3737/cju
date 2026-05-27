import React, { useState } from 'react';
import { BookOpen, Map, Globe, User, LogOut, Sparkles, Shield, Menu, X, ArrowRight } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  user: UserProfile;
  onOpenLogin: () => void;
  onOpenStudentId: () => void;
  onOpenLibrary: () => void;
  onLogout: () => void;
}

export default function Header({
  activeTab,
  onTabChange,
  user,
  onOpenLogin,
  onOpenStudentId,
  onOpenLibrary,
  onLogout
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { key: 'admission' as ActiveTab, label: '입학안내' },
    { key: 'academic' as ActiveTab, label: '학사정보' },
    { key: 'research' as ActiveTab, label: '연구활동' },
    { key: 'campus' as ActiveTab, label: '캠퍼스라이프' },
    { key: 'home' as ActiveTab, label: '대학소개' }
  ];

  const toggleLanguage = () => {
    alert('청주대학교 영문 국문 다국어 서비스 전환: 국어 버전이 기본 활성화 상태입니다. (We currently default to the Korean primary version.)');
  };

  const handleMapAlert = () => {
    // Elegant visual jump or notify
    const footer = document.getElementById('footer-contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('청주대학교 주소: 충청북도 청주시 청원구 대성로 298 (우: 28503)');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-hidden"
        >
          <span className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg select-none shadow-md shadow-blue-900/30 font-serif">CJU</span>
          <div className="text-left">
            <h1 className="text-base sm:text-lg font-bold text-primary tracking-tight font-sans">청주대학교</h1>
            <div className="text-[9px] text-[#00668a] font-mono tracking-widest leading-none">CHEONGJU UNIVERSITY</div>
          </div>
        </button>

        {/* Desktop Navigation Links (Middle) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 h-full">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onTabChange(item.key);
                setMenuOpen(false);
              }}
              className={`px-3 lg:px-4 py-2 text-[14px] font-semibold transition-all relative h-12 flex items-center cursor-pointer ${
                activeTab === item.key
                  ? 'text-primary'
                  : 'text-zinc-500 hover:text-primary'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.key && (
                <span className="absolute bottom-0 left-3 right-3 h-0.75 bg-primary rounded-t-full transition-all" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Trailing Area */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Quick link action icons */}
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-500 mr-2">
            <button
              onClick={onOpenLibrary}
              title="열람석 배정기"
              className="p-2 rounded-full hover:bg-zinc-100 hover:text-primary transition-all cursor-pointer"
            >
              <BookOpen className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={handleMapAlert}
              title="캠퍼스맵 및 찾아오시는길"
              className="p-2 rounded-full hover:bg-zinc-100 hover:text-primary transition-all cursor-pointer"
            >
              <Map className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={toggleLanguage}
              title="다국어 설정"
              className="p-2 rounded-full hover:bg-zinc-100 hover:text-primary transition-all cursor-pointer"
            >
              <Globe className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Login or User summary */}
          {user.loggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-zinc-100 border border-zinc-200 transition-all text-xs font-semibold text-zinc-700 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-xs shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <span className="max-sm:hidden">{user.name} 님</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 rounded-sm py-0.5 px-1 uppercase shrink-0 font-bold tracking-wider">ON</span>
              </button>

              {profileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div 
                    className="absolute right-0 mt-2 z-50 w-56 bg-white rounded-lg shadow-xl border border-zinc-200 p-2 animate-in slide-in-from-top-2 duration-150"
                  >
                    <div className="p-2 border-b border-zinc-100 text-left">
                      <div className="text-xs font-bold text-zinc-800">{user.name}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{user.dept}</div>
                      <div className="text-[9px] text-zinc-400 font-mono">학번: {user.studentId}</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenStudentId();
                      }}
                      className="w-full text-left flex items-center gap-2 p-2 rounded-md text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors mt-1 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>모바일 신분증 열기</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenLibrary();
                      }}
                      className="w-full text-left flex items-center gap-2 p-2 rounded-md text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>스마트 열람석 예약</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left flex items-center gap-2 p-2 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-zinc-100 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="py-1.5 sm:py-2 px-4 rounded-lg border border-zinc-300 text-xs sm:text-sm font-bold text-zinc-700 hover:bg-zinc-50 hover:text-primary hover:border-primary transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              로그인
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white p-3 space-y-1 block animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onTabChange(item.key);
                setMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === item.key
                  ? 'bg-blue-50/50 text-primary'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-primary'
              }`}
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>
          ))}

          {/* Quick link actions in mobile layout footer */}
          <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-zinc-100">
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenLibrary();
              }}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-primary transition-all text-[11px] font-semibold"
            >
              <BookOpen className="w-4.5 h-4.5 mb-1 text-primary" />
              <span>열람석 스마트 예약</span>
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleMapAlert();
              }}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-primary transition-all text-[11px] font-semibold"
            >
              <Map className="w-4.5 h-4.5 mb-1 text-secondary" />
              <span>캠퍼스 안내</span>
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                toggleLanguage();
              }}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-primary transition-all text-[11px] font-semibold"
            >
              <Globe className="w-4.5 h-4.5 mb-1 text-[#002f63]" />
              <span>다국어</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
