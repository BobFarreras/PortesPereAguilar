// lib/constants.ts
import { ServiceCategory } from '@/types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: '1',
    translationKey: 'portesCorredisses',
    imageUrl: '/images/Correderes/imgi_2_Porta-corredissa-amb-tanca-de-corten-1.webp',
    slug: 'portes-corredisses',
    gallery: [
      '/images/Correderes/imgi_2_Porta-corredissa-amb-tanca-de-corten-1.webp',
      '/images/Correderes/imgi_3_Porta-corredissa-dinox-tronquelada-amb-tanca-1024x768.webp',
      '/images/Correderes/imgi_28_Porta-corredissa-a-3-fulles-2-300x287.webp',
      '/images/Correderes/imgi_33_Porta-corredissa-de-dacer-Corten-300x225.webp',
      '/images/Correderes/imgi_11_corredera-telescpeat-corten-1-1.webp',
    ],
    features: ['automatitzacioFluida', 'materialsAltaQualitat', 'seguretatIntegrada', 'dissenyPersonalitzable'],
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
    gallery: [
      '/images/Aplicacions/imgi_3_C60270E6-BBEE-4881-A091-FBB9D1B7DD75-A6ABBEBF-46DB-414F-A836-1728459E9F51.webp',
      '/images/Aplicacions/imgi_2_Trasllat-bola-Forum-a-Calonge-editada-2-5.webp',
      '/images/Aplicacions/imgi_5_Porta-oberta-de-l\'altell-.2.webp',
      '/images/Aplicacions/imgi_6_03961359-6615-4882-B77C-20DD0BD34885-E6185BA5-E759-461B-8FD0-623CD1F18652-1.webp',
      '/images/Aplicacions/imgi_7_18C98767-0F10-43F6-BAD8-1FC4BDAADC04-5D8C979C-CD73-4681-9C06-BDDD9D1106AB.webp',
    ],
    features: ['enginyeriaAMida', 'altaResistencia', 'acabatsPersonalitzats', 'muntatgeProfessional'],
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
    gallery: [
      '/images/Tancaments/imgi_22_tanca-anguls-SI.2.webp',
      '/images/Tancaments/imgi_19_barana-troq-corten-2-SI.2-2048x1536.webp',
      '/images/Tancaments/imgi_33_tanca-corten-combinat-3-SI-.2.webp',
      '/images/Tancaments/imgi_36_tanca-llibret-1.2-1-2048x1536.webp',
      '/images/Tancaments/imgi_40_9D9C226F-F58A-443D-B255-A31889EFC303-89F88240-5E6B-4DD0-96B7-0685A6273758-1-1365x2048.webp',
    ],
    features: ['seguretatMaxima', 'dissenyEstetic', 'materialsRobustos', 'mantenimentMinim'],
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
    gallery: [
      '/images/Basculants/imgi_33_Basculant-de-corten-amb-canal-ample-2048x1365.webp',
      '/images/Basculants/imgi_10_Porta-basculant-dacer-corten-lames-amples.-1.webp',
      '/images/Basculants/imgi_37_basc-llibret-gris-1-2048x1536.webp',
      '/images/Basculants/imgi_47_basc-fusta-canal-ample-2-1-1536x1152.webp',
      '/images/Basculants/imgi_6_Porta-basculant-galvanitzada-xula.webp',
    ],
    features: ['mecanismeContrapesos', 'oberturaEficient', 'esteticaPersonalitzable', 'durabilitatExtrema'],
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
    gallery: [
      '/images/Practicables/imgi_55_Conjunt-de-porta-practicable-una-fulla-i-peatonal-dacer-corten-2048x1536.webp',
      '/images/Practicables/imgi_3_Porta-practicable-de-dues-fulles-de-llibret..webp',
      '/images/Practicables/imgi_15_practpeat-corten-lama-ample-1.webp',
      '/images/Practicables/imgi_5_Porta-practicable-amb-desnivell-amb-xapa-lacada-blanca-2-1.webp',
      '/images/Practicables/imgi_65_prac-peat-corten-plafons-scaled.webp',
    ],
    features: ['automatitzacioInteligent', 'eleganciaFunctional', 'versatilitatAccessos', 'acabatsPremium'],
    seoFallback: {
      title: 'Portes Practicables',
      description: "Elegància i funcionalitat en portes batents, ideals per a accessos de finques i vianants amb automatització d'alta gamma.",
    },
  },
];
