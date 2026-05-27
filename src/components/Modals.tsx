import React, { useState } from 'react';
import { X, Lock, User, Sparkles, Check, Bookmark, Calendar, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'demo' || username.trim() === 'admin' || username.trim() === '') {
      onLoginSuccess({
        name: username.trim() ? (username.trim() === 'demo' ? '김청주' : '이민우') : '홍길동',
        dept: '소프트웨어학부',
        studentId: '202610342',
        loggedIn: true,
        role: 'student'
      });
      onClose();
    } else {
      onLoginSuccess({
        name: username,
        dept: '신입지원자',
        studentId: '2026-GUEST',
        loggedIn: true,
        role: 'guest'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-primary mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-primary">CJU 통합로그인</h2>
          <p className="text-xs text-zinc-500 mt-1">청주대학교 포털 시스템에 방문해 주셔서 환영합니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">학번 또는 ID (비워두면 홍길동 로그인)</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4.5 h-4.5 text-zinc-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ID 또는 'demo' 입력"
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-zinc-300 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4.5 h-4.5 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-zinc-300 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100 text-[11px] text-zinc-600 leading-relaxed">
            💡 <strong className="text-primary">테스트 계정안내:</strong><br />
            - <strong>학번란에 &apos;demo&apos; 혹은 공란</strong>으로 로그인하시면 재학생 신분(김청주, 소프트웨어학부)으로 바로 로그인되어 모바일 신분증 조회가 가능합니다!
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-primary text-white font-medium text-sm rounded-lg hover:bg-opacity-90 transition-all shadow-md focus:outline-hidden"
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}

interface StudentIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenLogin: () => void;
}

export function StudentIdModal({ isOpen, onClose, user, onOpenLogin }: StudentIdModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-zinc-950 text-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Aesthetic Hologram Top */}
        <div className="h-24 bg-gradient-to-r from-primary via-secondary to-blue-900 relative">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-3 left-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300/80 font-bold">Cheongju University</span>
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>모바일 학생 신분증</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
            </h3>
          </div>
        </div>

        {/* Card Content body */}
        <div className="p-6 flex flex-col items-center bg-zinc-900/95">
          {user.loggedIn ? (
            <>
              {/* Profile Image representation */}
              <div className="w-28 h-28 rounded-full border-4 border-zinc-800 overflow-hidden bg-zinc-800 flex items-center justify-center text-primary mb-4 relative group">
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                  <User className="w-16 h-16 text-blue-200" />
                </div>
                <div className="absolute bottom-0 bg-primary/90 text-[9px] text-white py-0.5 px-3 rounded-full font-bold">
                  {user.role === 'student' ? '재학생' : 'GUEST'}
                </div>
              </div>

              {/* NFC Signal visual effect */}
              <div className="flex gap-1 mb-4">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">LFC PASS ACTIVE</span>
              </div>

              <div className="text-center space-y-1 mb-6">
                <div className="text-xl font-bold text-white">{user.name}</div>
                <div className="text-xs text-zinc-400 font-medium">{user.dept}</div>
                <div className="text-xs text-zinc-500 font-mono tracking-wider">학번: {user.studentId}</div>
              </div>

              {/* Mock Barcode */}
              <div className="w-full bg-white p-3 rounded-lg flex flex-col items-center justify-center shadow-lg border border-zinc-700">
                <div className="font-mono text-zinc-900 tracking-[0.25em] text-xs font-bold py-1 select-none">
                  ||||| | ||||| || ||| |||| |
                </div>
                <div className="text-[9px] font-mono text-zinc-500 tracking-widest mt-0.5">
                  CJU-{user.studentId}-ACTIVE
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 mt-6">
                <div className="bg-zinc-800/80 p-2.5 rounded-lg text-center">
                  <div className="text-[10px] text-zinc-400">학위 과정</div>
                  <div className="text-xs font-bold text-zinc-200 mt-0.5">학사 학위</div>
                </div>
                <div className="bg-zinc-800/80 p-2.5 rounded-lg text-center">
                  <div className="text-[10px] text-zinc-400">발행년도</div>
                  <div className="text-xs font-bold text-zinc-200 mt-0.5">2026학년</div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-10 text-center flex flex-col items-center">
              <Lock className="w-12 h-12 text-zinc-500 mb-4" />
              <h4 className="text-base font-bold text-white">신분증 조회를 위해 로그인이 필요합니다</h4>
              <p className="text-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
                모바일 신분증은 보안 인증 서류로, 개인 신원 조회를 거친 뒤 학내 건물 탑승 및 열람실 발권에 사용 가능합니다.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="mt-6 inline-flex items-center gap-1.5 py-2 px-5 bg-primary hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                <span>간편 학번 로그인</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export function LibraryModal({ isOpen, onClose, user }: LibraryModalProps) {
  const [selectedRoom, setSelectedRoom] = useState<'1F' | '2F' | '3F'>('1F');
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [reservedSeat, setReservedSeat] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalSeats = 24;
  // Deterministic seat status simulation (some seats busy)
  const isSeatTaken = (seatNum: number) => {
    return [3, 4, 7, 11, 12, 16, 20, 21].includes(seatNum);
  };

  const handleSeatClick = (seatNum: number) => {
    if (isSeatTaken(seatNum)) return;
    setSelectedSeat(seatNum);
  };

  const confirmReservation = () => {
    if (selectedSeat === null) return;
    if (!user.loggedIn) {
      alert('도서관 좌석 배정을 진행하려면 먼저 우측 상단에서 로그인해 주십시오.');
      return;
    }
    setReservedSeat(`${selectedRoom} 열람실 [${selectedSeat}번 좌석]`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-primary">CJU 중앙도서관 스마트 열람석 배정기</h2>
        </div>

        {reservedSeat ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-500">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900">도서관 좌석 예약 완료</h3>
              <p className="text-xs text-zinc-500 mt-1">
                {user.name} ({user.dept}) 학생의 모바일 신분증 정보로 좌석이 선점되었습니다.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 max-w-sm mx-auto text-sm font-bold text-emerald-800">
              {reservedSeat}
            </div>
            <p className="text-[10px] text-zinc-400">
              * 배정 후 20분 내에 무인 키오스크 또는 열람실 입구 리더기에 모바일 신분증을 태그하지 않으시면 자동 반납 처리됩니다.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setReservedSeat(null)}
                className="py-2 px-6 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                다른 좌석 예약하기
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Nav room choices */}
            <div className="flex border-b border-zinc-200">
              {(['1F', '2F', '3F'] as const).map((room) => (
                <button
                  key={room}
                  onClick={() => {
                    setSelectedRoom(room);
                    setSelectedSeat(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                    selectedRoom === room
                      ? 'border-primary text-primary'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {room === '1F' ? '제1 멀티미디어 열람실' : room === '2F' ? '제2 정독 학습실' : '제3 스터디 연구실'}
                </button>
              ))}
            </div>

            {/* Seat Visual Board */}
            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
              <div className="text-center text-[10px] text-zinc-400 mb-3 bg-zinc-200 py-1 rounded font-bold tracking-widest uppercase">SCREEN / FRONT WINDOW</div>
              <div className="grid grid-cols-6 gap-x-3 gap-y-2.5">
                {Array.from({ length: totalSeats }).map((_, index) => {
                  const num = index + 1;
                  const taken = isSeatTaken(num);
                  const isSelected = selectedSeat === num;

                  return (
                    <button
                      key={index}
                      onClick={() => handleSeatClick(num)}
                      disabled={taken}
                      className={`py-2 text-xs font-bold rounded text-center border transition-all ${
                        taken
                          ? 'bg-zinc-250 border-zinc-300 text-zinc-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-primary border-primary text-white scale-105 shadow-md shadow-blue-900/25'
                          : 'bg-white border-zinc-300 hover:border-primary text-zinc-700 cursor-pointer hover:bg-blue-50/20'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Color legends */}
              <div className="flex justify-center gap-6 mt-4 text-[10px] text-zinc-500 font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-white border border-zinc-300 rounded inline-block"></span>
                  <span>사용 가능</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-zinc-250 border border-zinc-300 rounded inline-block"></span>
                  <span>교내 이용 중</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-primary rounded inline-block"></span>
                  <span>선택된 좌석</span>
                </div>
              </div>
            </div>

            {/* Seat Selection and Confirmation */}
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                {selectedSeat ? (
                  <p className="text-xs text-zinc-700">
                    선택: <strong className="text-primary">{selectedRoom} 열람실 [{selectedSeat}번]</strong>
                  </p>
                ) : (
                  <p className="text-xs text-zinc-530">빈 좌석을 선택해 주십시오.</p>
                )}
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  현재 이용자: {user.loggedIn ? `${user.name} (${user.dept})` : '로그인되지 않음'}
                </p>
              </div>

              <button
                disabled={selectedSeat === null}
                onClick={confirmReservation}
                className={`py-2 px-5 font-semibold text-xs rounded-lg transition-all ${
                  selectedSeat !== null
                    ? 'bg-primary text-white hover:bg-opacity-90 shadow-md cursor-pointer'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                배정 확정하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
