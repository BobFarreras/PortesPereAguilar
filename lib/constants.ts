// lib/constants.ts
import { ServiceCategory } from '@/types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: '1',
    translationKey: 'portesCorredisses',
    imageUrl: '/images/Correderes/imgi_2_Porta-corredissa-amb-tanca-de-corten-1.webp',
    slug: 'portes-corredisses',
    seoFallback: {
      title: 'Portes Corredisses',
      description: 'Automatismes fluids i disseny robust per a accessos residencials i industrials de màxim trànsit.',
    },
  },
  {
    id: '2',
    translationKey: 'portesSeccionals',
    imageUrl: '/images/Seccionals/imgi_13_Porta-seccional-llisa-imitacio-fusta.webp',
    slug: 'portes-seccionals',
    gallery: [
      '/images/Seccionals/imgi_13_Porta-seccional-llisa-imitacio-fusta.webp',
      '/images/Seccionals/imgi_39_seccional-llisa-gris-4-2048x1536.webp',
      '/images/Seccionals/imgi_33_Porta-seccional-folrada-de-xapa-corten-3-2048x1536.webp',
      '/images/Seccionals/imgi_45_Porta-seccional-folrada-de-tauler-mari.-1-2048x1536.webp',
      '/images/Seccionals/imgi_47_seccional-llisa-gris-4-scaled.webp',
    ],
    features: ['panellsSandvitx', 'antipinsament', 'motoritzacio', 'estanqueitat'],
    seoFallback: {
      title: 'Portes Seccionals',
      description: "Aïllament tèrmic superior i obertura vertical silenciosa que maximitza l'espai del teu garatge.",
    },
  },
  {
    id: '3',
    translationKey: 'estructuresMetaliques',
    imageUrl: '/images/Aplicacions/imgi_3_C60270E6-BBEE-4881-A091-FBB9D1B7DD75-A6ABBEBF-46DB-414F-A836-1728459E9F51.webp',
    slug: 'estructures-metalliques',
    seoFallback: {
      title: 'Estructures Metàl·liques',
      description: 'Enginyeria estructural a mida. Pèrgoles, cobertes i altells dissenyats amb precisió mil·limètrica.',
    },
  },
  {
    id: '4',
    translationKey: 'serralleriaDisseny',
    imageUrl: '/images/Tancaments/imgi_22_tanca-anguls-SI.2.webp',
    slug: 'serralleria',
    seoFallback: {
      title: 'Serralleria de Disseny',
      description: "Reixes, baranes i tancaments perimetrals on la seguretat inquebrantable es troba amb l'estètica.",
    },
  },
  {
    id: '5',
    translationKey: 'portesBasculants',
    imageUrl: '/images/Basculants/imgi_33_Basculant-de-corten-amb-canal-ample-2048x1365.webp',
    slug: 'portes-basculants',
    seoFallback: {
      title: 'Portes Basculants',
      description: 'Obertura clàssica i eficient per a garatges, combinant mecanismes de contrapesos precisos amb estètica personalitzada.',
    },
  },
  {
    id: '6',
    translationKey: 'portesPracticables',
    imageUrl: '/images/Practicables/imgi_55_Conjunt-de-porta-practicable-una-fulla-i-peatonal-dacer-corten-2048x1536.webp',
    slug: 'portes-practicables',
    seoFallback: {
      title: 'Portes Practicables',
      description: "Elegància i funcionalitat en portes batents, ideals per a accessos de finques i vianants amb automatització d'alta gamma.",
    },
  },
];
