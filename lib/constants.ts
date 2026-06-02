// lib/constants.ts
import { ServiceCategory } from '@/types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: '1',
    title: 'Portes Corredisses',
    description: 'Automatismes fluids i disseny robust per a accessos residencials i industrials de màxim trànsit.',
    imageUrl: '/images/Correderes/imgi_2_Porta-corredissa-amb-tanca-de-corten-1.webp',
    slug: 'portes-corredisses',
  },
  // Dins de lib/constants.ts, actualitza l'objecte de Portes Seccionals:
    {
      id: '2',
      title: 'Portes Seccionals',
      description: 'Aïllament tèrmic superior i obertura vertical silenciosa que maximitza l\'espai del teu garatge.',
      imageUrl: '/images/Seccionals/imgi_13_Porta-seccional-llisa-imitiai�-fusta.webp',
      slug: 'portes-seccionals',
      gallery: [
        '/images/Seccionals/imgi_13_Porta-seccional-llisa-imitiai�-fusta.webp',
        '/images/Seccionals/imgi_39_seccional-llisa-gris-4-2048x1536.webp', // Exemple de foto secundària
        '/images/Seccionals/imgi_33_Porta-seccional-folrada-de-xapa-corten-3-2048x1536.webp',
        '/images/Seccionals/imgi_45_Porta-seccional-folrada-de-tauler-mar�.-1-2048x1536.webp',
        '/images/Seccionals/imgi_47_seccional-llisa-gris-4-scaled.webp'
      ],
    features: [
      {
        title: "Panells Sandvitx de 40mm",
        description: "Doble xapa d'acer galvanitzat amb nucli d'escuma de poliuretà injectat per a un aïllament tèrmic i acústic extrem (coeficient U)."
      },
      {
        title: "Sistema Antipinsament",
        description: "Disseny exclusiu de les juntes entre panells que impedeix qualsevol risc d'atrapament de dits durant l'obertura o tancament."
      },
      {
        title: "Motorització Silenciosa",
        description: "Automatismes de corretja dentada d'alta resistència amb obertura suau, aturada d'emergència i control remot encriptat."
      },
      {
        title: "Estanqueïtat Total",
        description: "Juntes de cautxú EPDM a tot el perímetre inferior, superior i lateral que bloquegen el vent, la pluja i la pols."
      }
    ]
  },
  {
    id: '3',
    title: 'Estructures Metàl·liques',
    description: 'Enginyeria estructural a mida. Pèrgoles, cobertes i altells dissenyats amb precisió mil·limètrica.',
    imageUrl: '/images/Aplicacions/imgi_3_C60270E6-BBEE-4881-A091-FBB9D1B7DD75-A6ABBEBF-46DB-414F-A836-1728459E9F51.webp',
    slug: 'estructures-metalliques',
  },
  {
    id: '4',
    title: 'Serralleria de Disseny',
    description: 'Reixes, baranes i tancaments perimetrals on la seguretat inquebrantable es troba amb l\'estètica.',
    imageUrl: '/images/Tancaments/imgi_22_tanca-anguls-SI.2.webp',
    slug: 'serralleria',
  },
  {
    id: '5',
    title: 'Portes Basculants',
    description: 'Obertura clàssica i eficient per a garatges, combinant mecanismes de contrapesos precisos amb estètica personalitzada.',
    imageUrl: '/images/Basculants/imgi_33_Basculant-de-corten-amb-canal-ample-2048x1365.webp', // Substitueix per la teva imatge real
    slug: 'portes-basculants',
  },
  {
    id: '6',
    title: 'Portes Practicables',
    description: 'Elegància i funcionalitat en portes batents, ideals per a accessos de finques i vianants amb automatització d\'alta gamma.',
    imageUrl: '/images/Practicables/imgi_55_Conjunt-de-porta-practicable-una-fulla-i-peatonal-dacer-corten-2048x1536.webp', // Substitueix per la teva imatge real
    slug: 'portes-practicables',
  },
];