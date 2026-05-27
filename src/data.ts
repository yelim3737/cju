import { NewsItem, MajorItem, ClubItem, CampusEvent } from './types';

export const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    category: '일반공지',
    title: '2026학년도 1학기 수강신청 안내 및 주요 변경사항',
    date: '2026.02.15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQxaNBFIszsBQOHgDQRIf4abE_F1tiNQ7Lchq4yMYK_JKCik4d5byudhxN1OI4ADd4FG1FE8ZoPsGV4M_5ENkHlC8x7JXIshcjSHewQ29a9QyAMQh1HQbksTHDa9tDdld_ZTvirRTiifnB8QP8arLNynvBafU8Gn6PbOmbRePvWmGzk5_Ebv9gtNE9LPh4-VcVOC2D22KPyGqGH0DeTSjgMEVtWIewERpjUm5PlI855S05JPrSvrtta6BFJ7G73sjCp_L71yi9FGc',
    summary: '2026학년도 제1학기 교양 및 전공 수강신청 일정과 분반 구성 방식의 변경사항을 안내하오니 학업 처리에 참고하시기 바랍니다. 선후배 수강 우선순위 보장을 위한 제도가 신설되었습니다.'
  },
  {
    id: 2,
    category: '연구/산학',
    title: '첨단바이오융합연구소, 국가 신약개발 과제 최종 선정',
    date: '2026.02.10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiXomJciaog8dY0TMw-8R8fF-M95P0sxFK-HKMHZ7PlQ5roU5vGbqTvQ1YoH9FYLI3suXPF1TxTcHe4TTKPyMnz6tELfhYDiYzTwoUin5kVWyTT2Udtcqfw76imfHvG3BByxOKCPJOcR6XwEgfnPH7CMUPtCHyhaEqwiDrprWJa4h-ZfxGREs451p9cYK1xCZ6vSBuFR_RoO-1LAQltLZQJz-H4E-T3FF4qHLTMnSOHmI2ajikdMNC9CEZZzuCQBF5oLPpAWg_WSM',
    summary: '청주대학교 첨단바이오융합연구소가 주도하는 차세대 저분자 표적 치료제 개발 프로젝트가 과학기술정보통신부 혁신 연구과제에 선정되어 대규모 국가 연구비를 지원받게 되었습니다.'
  },
  {
    id: 3,
    category: '입학',
    title: '2026학년도 신입생 수시모집 전국 순회 입학설명회 개최 안내',
    date: '2025.12.05',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwQBKh8m9-8EdONcds1Z3X4TWjhBAlbzLOBKkSuWlCRNwZ1MXsuDVgpRJBNrnNsfeLSlrwvSqegAN6mOZnfGrnis-Xz5dPGwIbX60zCgkC5qA_1m9ze4nroKR491E0Ifr0TbrHd0nkST3r-Cafed48isokUDStygc-NTFUzmu7s7bv74oz5KVmgcBSHyHUcB_dRrjr9z-isGVbBkrBqBPxyo9RXmP8TTC_SIDUeT7Q_gDp43hYwpcQU0PK6SPxCgTEgFGtB1AfsnE',
    summary: '우수한 고교 글로벌 리더 모집을 위해 전국 주요 도시에서 심층 1:1 진학 컨설팅을 제공하는 2026 수시모집 입학설명회를 개최합니다. 현직 입학사정관과의 직접 상담 기회가 준비되어 있습니다.'
  }
];

export const MAJORS_DATA: MajorItem[] = [
  {
    id: 1,
    college: '비즈니스대학',
    name: '경영학부',
    description: '글로벌 비즈니스 환경을 선도할 창의적이고 전문적인 경영 인재를 양성합니다. 실무 중심의 교육과 풍부한 산학협력 프로그램을 통해 학생들이 졸업 후 즉시 역량을 발휘할 수 있는 현장 적응력을 극대화합니다.',
    tags: ['경영학전공', '회계학전공'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCP7IAFdt6x_UcQzu2K7ZKr5Qywgx8riUGk5aHF1SfGGH62iY7a-bK0zSQ-N_EmeMP4uhSCNCpPIfv7gTByUR6NZ2igJv7l4tJjD-_ZSYwZqw8_Bq-qZH3JXoirRJuUDKb7M7jFhFYPzcWCiqQ5Z2fuofr94HYCpnlcyf4gq_ZDLYkfCaAAV-Q80p0k4vflVsLn-uwoC0RNo-hcyDI3WvVjZhjFzxWF29nE3S99Ldb8Zd_Vyh3X8AOWnPs21tJEV0m0A14bqSGzQE',
    iconName: 'Briefcase',
    curriculum: ['마케팅원론', '재무관리', '조직행동론', '회계원리', '글로벌경영전략'],
    careers: ['삼성, 현대 등 대기업 기획/마케팅팀', '공인회계사(CPA) 및 세무사', '정부 및 정부산하기관 행정직', '경영컨설턴트']
  },
  {
    id: 2,
    college: '공과대학',
    name: '소프트웨어학부',
    description: '초연결 사회 및 4차 산업혁명을 실천하고 주도할 AI, 클라우드, 빅데이터 분석 및 지능형 소프트웨어 개발 전문가를 육성합니다. 프로젝트 중심의 최첨단 실습실 인프라를 활용하여 원천 프로그래밍 역량을 배양합니다.',
    tags: ['인공지능', '소프트웨어'],
    iconName: 'Cpu',
    curriculum: ['자료구조 & 알고리즘', '인공지능 개론', '웹/모바일 하이브리드 앱 개발', '데이터베이스 모델링', '캡스톤디자인'],
    careers: ['네이버/카카오 등 IT 선도 기업의 프론트/백엔드 개발자', 'AI 연구소 및 데이터 사이언티스트', '정보보안 및 인프라 엔지니어']
  },
  {
    id: 3,
    college: '공과대학',
    name: '건축공학과',
    description: '구조 디자인, 친환경 에너지 에너지 고효율 스마트 빌딩 기술, 건설 IT 융합 및 미래 지향적 스마트 건설 공정 관리를 마스터하는 정예 건축 엔지니어를 양성합니다.',
    tags: ['스마트건축', '건조구조'],
    iconName: 'Compass',
    curriculum: ['건축구조설계', '스마트시티 공학', 'BIM 데이터 통합 설계', '친환경빌딩 설비공학', '건설시공 및 공정관리'],
    careers: ['현대건설, 대우건설 등 건설사 부서', '건축설계사무소 및 엔지니어링 기업', 'LH, 수자원공사 등 국영공기업']
  },
  {
    id: 4,
    college: '예술대학',
    name: '시각디자인학과',
    description: '급변하는 2D/3D 디지털 미디어 패러다임과 디자인 마케팅 기법에 능동적으로 대처하며 UX/UI 브랜드 정체성을 재정비하는 실무적인 최고의 시각 예술 및 브랜딩 디자인 전문가를 교육합니다.',
    tags: ['UX/UI 디자인', '그래픽/브랜딩'],
    iconName: 'Palette',
    curriculum: ['타이포그래피 리서치', '모션 그래픽스 실습', 'UI 인터랙션 설계', '브랜드 패키징 디자인', '광고 캠페인 영상'],
    careers: ['대기업 사내 디자인실/기획 사업 부문', '브랜드 컨설팅 에이전시', 'UX/UI 리서치 기획자 및 아트디렉터']
  },
  {
    id: 5,
    college: '인문사회대학',
    name: '영어영문학과',
    description: '언어와 문화를 깊이 탐험하는 인문학적 소양을 바탕으로 실제 전수 능력을 키우며 영미권 유수의 석학 사상과 교감하는 글로벌 커뮤니케이션 전문 글로벌 인재를 육성합니다.',
    tags: ['글로벌소통', '영미문화'],
    iconName: 'Globe',
    curriculum: ['영미단편소설론', '고급 영작문 실무', '시사 영어 및 통번역 연습', '미래 융합 영문학', '비즈니스 영어'],
    careers: ['영미권 문화 콘텐츠 기획사', '항공사, 무역회사 글로벌 마케팅 본부', '통번역 대리인 및 영어 어학 교육 전문가']
  },
  {
    id: 6,
    college: '보건의료과학대학',
    name: '간호학과',
    description: '인간 존엄성에 대한 경외심을 토대로, 체계적인 시뮬레이션 임상 실습 및 간호 전문 지식을 통합하여 환자 중심의 따뜻한 전인 건강 간호를 실천하는 전문 라이선스 복지 보건 지도 인재를 조형합니다.',
    tags: ['전인간호', '보건의료'],
    iconName: 'HeartPulse',
    curriculum: ['기본간호학 및 현장 실습', '성인 만성병 간호학', '아동 청소년 간호 임상학', '지역사회 융합 보건학', '간호 리더십 관리론'],
    careers: ['국내외 유수 대학병원 간호직', '보건직 국가 공무원 및 보건 진료 연구직', '해외 의료 봉사 센터 및 특수 보건 교직원']
  }
];

export const CLUBS_DATA: ClubItem[] = [
  {
    id: 1,
    type: 'performing',
    name: '우암극예술연구회 (UAM Theater)',
    description: '대학 연극의 전통을 계승하여 매년 정기 연극 공연을 기획하고 제작하는 청주대학 최고의 열정 공연 연극 중앙동아리',
    count: 32,
    icon: 'Music'
  },
  {
    id: 2,
    type: 'performing',
    name: '소리울림 (Acoustic Band)',
    description: '어쿠스틱 감성 통기타부터 일렉기타 사운드까지 따뜻한 앙상블을 노래하는 버스킹 최강 대학 밴드 소리울림',
    count: 24,
    icon: 'Radio'
  },
  {
    id: 3,
    type: 'sports',
    name: 'CJU 축구사랑 (CJU Football Crew)',
    description: '주말 전대 축구 리그전 및 훈련 매치업을 정기 운영하며 다진 팀워크로 교내 건강 복지와 단합 대회를 누리는 축구팀',
    count: 52,
    icon: 'Activity'
  },
  {
    id: 4,
    type: 'sports',
    name: '스매시 베드민턴 (SMASH Bad-Club)',
    description: '요일별 체육관 코트를 가득 채우며 누구나 가볍고 땀 흘려 즐기며 멘진십을 함양하는 복식 배드민턴 클럽',
    count: 41,
    icon: 'Gauge'
  },
  {
    id: 5,
    type: 'volunteer',
    name: '로터랙트 글로벌 봉사회',
    description: '글로벌 유수 기부 봉사 단체 로터리와 연계하여 지역 소외 아동 학습 지도, 연탄 배달, 환경 플로깅을 전개하는 의리 봉사단',
    count: 35,
    icon: 'Heart'
  }
];

export const EVENTS_DATA: CampusEvent[] = [
  {
    id: 1,
    month: '10월',
    day: '15',
    title: '우암대동제 (가을 대축제)',
    location: '대운동장 및 캠퍼스 일원',
    color: 'emerald',
    description: '청주대학교 가을 학기의 꽃! 화려한 초청 아티스트 무대뿐만 아니라 60여 개 학과가 직접 운영하는 기획 부스, 길거리 버스킹, 캠프파이어 푸드트럭 페스타가 대운동장에서 성대히 치러집니다.'
  },
  {
    id: 2,
    month: '10월',
    day: '22',
    title: '글로벌 명사 초청 청청 세미나',
    location: '보건의료과학대학 세미나실',
    color: 'sky',
    description: '세계 유수 브랜드의 CEO와 학계 글로벌 석학을 정기 초청하여 4차 산업혁명 대비 학생들의 비전 정비와 글로벌 현장 진출 전략을 실명 전수하는 고품격 공개 강의 시간입니다.'
  },
  {
    id: 3,
    month: '11월',
    day: '05',
    title: '동아리 청년 문화 예술제 발표회',
    location: '학생회관 대강당 및 로비',
    color: 'amber',
    description: '학술 연구, 댄스 가요, 사회 봉사 등 다양한 분야의 중앙 동아리들이 한해 거둔 멋진 활동 영상, 사진 전시, 포토존을 운영하며 대강당 특설무대에서 가슴 뛰는 전야제 공연을 펼칩니다.'
  }
];
