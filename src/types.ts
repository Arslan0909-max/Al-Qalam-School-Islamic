export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  iconName: string;
  description?: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  features?: string[];
}

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TrustBadgeItem {
  id: string;
  title: string;
  subtitle?: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect?: 'landscape' | 'portrait' | 'square';
}

