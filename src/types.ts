export type ActiveTab = 'home' | 'admission' | 'academic' | 'research' | 'campus';

export interface UserProfile {
  name: string;
  dept: string;
  studentId: string;
  loggedIn: boolean;
  role: 'student' | 'guest';
}

export interface NewsItem {
  id: number;
  category: '일반공지' | '연구/산학' | '입학' | '학사';
  title: string;
  date: string;
  image: string;
  summary: string;
}

export interface MajorItem {
  id: number;
  college: '비즈니스대학' | '인문사회대학' | '공과대학' | '예술대학' | '보건의료과학대학';
  name: string;
  description: string;
  tags: string[];
  image?: string;
  iconName: string;
  curriculum?: string[];
  careers?: string[];
}

export interface ClubItem {
  id: number;
  type: 'performing' | 'sports' | 'volunteer';
  name: string;
  description: string;
  count: number;
  icon: string;
}

export interface CampusEvent {
  id: number;
  month: string;
  day: string;
  title: string;
  location: string;
  color: string;
  description: string;
}
