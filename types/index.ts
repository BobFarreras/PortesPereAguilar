export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Imatge principal (miniatura)
  slug: string;
  gallery?: string[]; // Nova propietat: Llista d'imatges per al carrusel
  features?: {        // Nova propietat: Característiques tècniques detallades
    title: string;
    description: string;
  }[];
}