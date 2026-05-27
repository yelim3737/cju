import React, { useState } from 'react';
import { Search, Briefcase, Cpu, Compass, Palette, Globe, HeartPulse, Sparkles, BookOpen, Clock, Heart, GraduationCap, X, ChevronRight, Calculator, Plus, Trash2 } from 'lucide-react';
import { MAJORS_DATA } from '../data';
import { MajorItem } from '../types';

export default function AcademicSection() {
  const [selectedCollege, setSelectedCollege] = useState<string>('전체보기');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<MajorItem | null>(null);

  // GPA Calculator States
  const [gpaCourses, setGpaCourses] = useState<Array<{ name: string; credit: number; grade: number; label: string }>>([
    { name: '대학 영어', credit: 2, grade: 4.5, label: 'A+' },
    { name: '프로그래밍 기초', credit: 3, grade: 4.0, label: 'A0' },
    { name: '경영학원론', credit: 3, grade: 3.5, label: 'B+' }
  ]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCredit, setNewCourseCredit] = useState<number>(3);
  const [newCourseGrade, setNewCourseGrade] = useState<string>('A+');

  const gradeValues: Record<string, number> = {
    'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0': 3.0, 'C+': 2.5, 'C0': 2.0, 'D+': 1.5, 'D0': 1.0, 'F': 0.0
  };

  const addGPACourse = () => {
    if (!newCourseName.trim()) return;
    setGpaCourses([
      ...gpaCourses,
      {
        name: newCourseName.trim(),
        credit: newCourseCredit,
        grade: gradeValues[newCourseGrade],
        label: newCourseGrade
      }
    ]);
    setNewCourseName('');
  };

  const removeGPACourse = (idx: number) => {
    setGpaCourses(gpaCourses.filter((_, i) => i !== idx));
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;
    gpaCourses.forEach((c) => {
      totalCredits += c.credit;
      weightedSum += c.grade * c.credit;
    });
    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';
  };

  const colleges = ['전체보기', '비즈니스대학', '인문사회대학', '공과대학', '예술대학', '보건의료과학대학'];

  const getMajorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  const filteredMajors = MAJORS_DATA.filter((major) => {
    const matchesCollege = selectedCollege === '전체보기' || major.college === selectedCollege;
    const matchesSearch = major.name.includes(searchQuery) || major.description.includes(searchQuery) || major.tags.some(t => t.includes(searchQuery));
    return matchesCollege && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300 text-left">
      
      {/* 1. Academic College Hero Banner */}
      <section className="relative w-full h-[320px] md:h-[400px] flex items-center justify-start overflow-hidden bg-zinc-900 rounded-2xl shadow-lg">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4IyX1eNCjUZSwCdzjy60WXAwDGdufjnT2vfdfNVv7iS8c0LYjSTcjYJUHeW2HIazbPsXwxCEF0aUnAunQ7U9k_rxowSd7VGcNjCnHH32_Bgw0fYlYTASMpQJF4E40r7r5mo8MrN_vlFxgKN8LlV7DDgu1LaPViH5MaWrazit_ZHDYMiL5eh1SpuoaENV5gLcOM4QZV5S4DfOi-PEYA7ScOBs0UiUtwtf52v-bp6PEUhISLcTHFYYDwLwWVnD2Z2fsaPGAwraGEtA" 
            alt="Cheongju University modern library background bathed in digital sunlight" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-left text-white space-y-4">
          <span className="inline-block px-3 py-1 bg-sky-500 text-white font-bold text-[10px] rounded-md tracking-wider uppercase">
            Colleges Academics & Majors
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            단과대학 및 학과소개
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 max-w-md leading-relaxed font-medium">
            미래를 선도하는 청주대학교의 실무 지향적 학과 구성을 탐험하고, 자신의 적성과 글로벌 꿈에 맞는 커리어 로드맵을 그려 가십시오.
          </p>
        </div>
      </section>

      {/* 2. Colleges Scrolling Filter Chips + Major Search Box */}
      <section className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-xs border border-zinc-150">
        
        {/* Chips */}
        <div className="flex gap-2 p-1 overflow-x-auto no-scrollbar w-full md:w-auto">
          {colleges.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollege(col)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCollege === col
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-650'
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        {/* Major Search Query */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-zinc-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="단과대학 또는 학과명 검색..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 rounded-lg border border-zinc-300 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

      </section>

      {/* 3. Majors Grid & Smart GPA Calculator */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Majors Card List Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {filteredMajors.map((major) => {
              const isFeatured = major.image !== undefined;

              return (
                <div
                  key={major.id}
                  onClick={() => setSelectedMajor(major)}
                  className={`bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group ${
                    isFeatured ? 'md:col-span-2' : ''
                  }`}
                >
                  {isFeatured && (
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={major.image} 
                        alt={major.name} 
                        className="w-full h-full object-cover transform scale-101 group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-[10px] bg-sky-500 font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider">{major.college}</span>
                        <h3 className="text-xl font-bold mt-1.5">{major.name}</h3>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-4 text-left flex-grow flex flex-col justify-between">
                    <div>
                      {!isFeatured && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase">{major.college}</span>
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                            {getMajorIcon(major.iconName)}
                          </div>
                        </div>
                      )}

                      {!isFeatured && <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-primary transition-colors">{major.name}</h3>}
                      
                      <p className="text-xs text-zinc-520 mt-2 line-clamp-3 leading-relaxed">
                        {major.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex gap-1">
                        {major.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-bold bg-zinc-50 border border-zinc-200 rounded-sm px-2 py-0.5 text-zinc-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] text-primary hover:underline flex items-center gap-1 font-bold">
                        자세히 보기 <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Smart GPA Calculator Widget Right 1 Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-zinc-200 p-5 space-y-4">
            
            <div className="flex items-center gap-2 border-b border-zinc-150 pb-3">
              <Calculator className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-bold text-sm text-zinc-900">학기 모의 성적 학점 계산기</h4>
                <p className="text-[10px] text-zinc-400">장학생 평점 조건 가 가늠용 시뮬레이터</p>
              </div>
            </div>

            {/* GPA Score Highlight box */}
            <div className="bg-primary text-white p-4 rounded-xl text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-1 right-1 opacity-10">
                <Calculator className="w-20 h-20" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-200">성적 예측 평균(GPA)</span>
              <div className="text-3xl font-black font-mono tracking-tight mt-1">{calculateGPA()} / 4.5</div>
              <p className="text-[10px] text-zinc-300 mt-1.5 leading-relaxed font-sans font-medium">
                우암수석장학 수혜 조건: 평점 <strong className="text-white">4.3↑</strong><br />
                교내성적우수최저 요건: 평점 <strong className="text-white font-sans font-bold">3.0↑</strong>
              </p>
            </div>

            {/* Courses items list */}
            <div className="space-y-2 h-[135px] overflow-y-auto no-scrollbar pr-1">
              {gpaCourses.map((course, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-zinc-50 border border-zinc-150 text-xs">
                  <div className="text-left">
                    <div className="font-bold text-zinc-800">{course.name}</div>
                    <div className="text-[9px] text-zinc-400 font-bold">{course.credit}학점 • {course.label} 성적</div>
                  </div>
                  <button 
                    onClick={() => removeGPACourse(idx)}
                    className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input additions form */}
            <div className="space-y-2 bg-zinc-50 p-2.5 rounded-lg border border-zinc-155 text-xs">
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="과목입력 (예: 인공지능실습)"
                className="w-full px-2.5 py-1 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-primary focus:outline-hidden"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-0.5 font-bold">학점</label>
                  <select 
                    value={newCourseCredit}
                    onChange={(e) => setNewCourseCredit(parseInt(e.target.value))}
                    className="w-full bg-white border border-zinc-300 rounded p-1 text-[11px]"
                  >
                    <option value="1">1학점</option>
                    <option value="2">2학점</option>
                    <option value="3">3학점</option>
                    <option value="4">4학점</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-0.5 font-bold">성적</label>
                  <select
                    value={newCourseGrade}
                    onChange={(e) => setNewCourseGrade(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded p-1 text-[11px] font-mono"
                  >
                    {Object.keys(gradeValues).map((lbl) => (
                      <option key={lbl} value={lbl}>{lbl}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                onClick={addGPACourse}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-1.5 px-3 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>과목 추가</span>
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* 4. Major detailed Drawer/Overlay (Replaces full screen page toggler) */}
      {selectedMajor && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
          <div 
            className="fixed inset-0" 
            onClick={() => setSelectedMajor(null)}
          />
          <div className="relative w-full max-w-lg h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col text-left border-l border-zinc-200 animate-in slide-in-from-right duration-300">
            
            <button 
              onClick={() => setSelectedMajor(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] bg-primary text-white font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider w-fit shrink-0">
              {selectedMajor.college}
            </span>
            <h3 className="text-2xl font-black text-primary mt-2">{selectedMajor.name}</h3>
            
            {/* Short Tag list */}
            <div className="flex gap-1.5 mt-3">
              {selectedMajor.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-zinc-100 border border-zinc-200 rounded px-2.5 py-0.5 font-bold text-zinc-500">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="my-6 w-full h-px bg-zinc-200" />

            <div className="space-y-6 flex-grow">
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-zinc-900 border-l-4 border-primary pl-2 uppercase font-sans">학과 교육 비전</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {selectedMajor.description}
                </p>
              </div>

              {selectedMajor.curriculum && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-zinc-900 border-l-4 border-primary pl-2 uppercase font-sans">주요 핵심 교과목 (Curriculum)</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedMajor.curriculum.map((curr, idx) => (
                      <div key={idx} className="bg-zinc-50 border border-zinc-150 p-2.5 rounded-lg flex items-center gap-1.5 font-medium text-zinc-700">
                        <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{curr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMajor.careers && (
                <div className="space-y-2 pb-6">
                  <h4 className="font-bold text-sm text-zinc-900 border-l-4 border-primary pl-2 uppercase font-sans">졸업 후 진출 주요 분야 (Careers)</h4>
                  <ul className="space-y-2 text-xs text-zinc-600 leading-relaxed font-semibold">
                    {selectedMajor.careers.map((career, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedMajor(null)}
              className="mt-auto w-full py-2.5 bg-primary text-white font-bold rounded-lg text-xs tracking-wider uppercase text-center shadow-lg hover:bg-opacity-95 transition-all text-sans"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
