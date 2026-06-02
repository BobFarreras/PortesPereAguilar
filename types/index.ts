// types/index.ts

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string; // Ruta cap a on apuntarà, ex: 'corredisses', 'seccionals'
}