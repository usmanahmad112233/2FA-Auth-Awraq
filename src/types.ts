export interface SavedAccount {
  id: string;
  name: string;
  secret: string;
  issuer?: string;
  period?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Guide' | 'Security' | 'News';
  date: string;
  readTime: string;
}

export interface SecurityScore {
  score: number;
  factors: {
    label: string;
    passed: boolean;
    impact: number;
  }[];
}

export interface TOTPConfig {
  issuer: string;
  label: string;
  secret: string;
  algorithm: string;
  digits: number;
  period: number;
}
