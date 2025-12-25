
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  affiliateLink?: string;
}

export enum Category {
  Guides = 'شروحات',
  Reviews = 'مراجعات المنتجات',
  Tools = 'أدوات الأفلييت',
  CaseStudies = 'دراسات حالة'
}

export interface Stats {
  label: string;
  value: number;
}
