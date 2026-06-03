// lib/constants/quoteOptions.ts

export type ProductCategory = 'portes' | 'estructures' | 'automatismes';

export interface DoorType {
  id: string;
  translationKey: string;
  imageUrl: string;
}

export interface StructureType {
  id: string;
  translationKey: string;
  imageUrl: string;
}

export interface AutomationDoor {
  id: string;
  translationKey: string;
  imageUrl: string;
}

export interface Material {
  id: string;
  translationKey: string;
}

export interface Finish {
  id: string;
  translationKey: string;
}

export interface Accessory {
  id: string;
  translationKey: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'portes',
  'estructures',
  'automatismes',
];

export const DOOR_TYPES: DoorType[] = [
  { id: 'seccional', translationKey: 'seccional', imageUrl: '/images/Seccionals/imgi_13_Porta-seccional-llisa-imitacio-fusta.webp' },
  { id: 'basculant', translationKey: 'basculant', imageUrl: '/images/Basculants/imgi_33_Basculant-de-corten-amb-canal-ample-2048x1365.webp' },
  { id: 'corredissa', translationKey: 'corredissa', imageUrl: '/images/Correderes/imgi_2_Porta-corredissa-amb-tanca-de-corten-1.webp' },
  { id: 'enrotllable', translationKey: 'enrotllable', imageUrl: '/images/Seccionals/imgi_39_seccional-llisa-gris-4-2048x1536.webp' },
  { id: 'practicable', translationKey: 'practicable', imageUrl: '/images/Practicables/imgi_55_Conjunt-de-porta-practicable-una-fulla-i-peatonal-dacer-corten-2048x1536.webp' },
];

export const STRUCTURE_TYPES: StructureType[] = [
  { id: 'tancaments', translationKey: 'tancaments', imageUrl: '/images/Tancaments/imgi_22_tanca-anguls-SI.2.webp' },
  { id: 'pergoles', translationKey: 'pergoles', imageUrl: '/images/Aplicacions/imgi_3_C60270E6-BBEE-4881-A091-FBB9D1B7DD75-A6ABBEBF-46DB-414F-A836-1728459E9F51.webp' },
  { id: 'disseny', translationKey: 'disseny', imageUrl: '/images/Aplicacions/imgi_5_Porta-oberta-de-laltell-.2.webp' },
  { id: 'altres', translationKey: 'altres', imageUrl: '/images/Aplicacions/imgi_6_03961359-6615-4882-B77C-20DD0BD34885-E6185BA5-E759-461B-8FD0-623CD1F18652-1.webp' },
];

export const AUTOMATION_DOORS: AutomationDoor[] = [
  { id: 'seccional', translationKey: 'seccional', imageUrl: '/images/Seccionals/imgi_13_Porta-seccional-llisa-imitacio-fusta.webp' },
  { id: 'basculant', translationKey: 'basculant', imageUrl: '/images/Basculants/imgi_33_Basculant-de-corten-amb-canal-ample-2048x1365.webp' },
  { id: 'corredissa', translationKey: 'corredissa', imageUrl: '/images/Correderes/imgi_2_Porta-corredissa-amb-tanca-de-corten-1.webp' },
  { id: 'enrotllable', translationKey: 'enrotllable', imageUrl: '/images/Seccionals/imgi_39_seccional-llisa-gris-4-2048x1536.webp' },
  { id: 'practicable', translationKey: 'practicable', imageUrl: '/images/Practicables/imgi_55_Conjunt-de-porta-practicable-una-fulla-i-peatonal-dacer-corten-2048x1536.webp' },
];

export const MATERIALS: Material[] = [
  { id: 'galvanitzat', translationKey: 'galvanitzat' },
  { id: 'corten', translationKey: 'corten' },
  { id: 'inox', translationKey: 'inox' },
  { id: 'alumini', translationKey: 'alumini' },
  { id: 'fusta', translationKey: 'fusta' },
];

export const FINISHES: Finish[] = [
  { id: 'llis', translationKey: 'llis' },
  { id: 'woodgrain', translationKey: 'woodgrain' },
  { id: 'brushed', translationKey: 'brushed' },
  { id: 'microperforat', translationKey: 'microperforat' },
  { id: 'llacat', translationKey: 'llacat' },
];

export const RAL_COLORS = [
  { id: 'ral9016', name: 'RAL 9016', hex: '#F7F5F0' },
  { id: 'ral9005', name: 'RAL 9005', hex: '#0E0E10' },
  { id: 'ral7016', name: 'RAL 7016', hex: '#333940' },
  { id: 'ral6005', name: 'RAL 6005', hex: '#0A4C3C' },
  { id: 'ral3000', name: 'RAL 3000', hex: '#8B2323' },
  { id: 'ral5010', name: 'RAL 5010', hex: '#1A4C7A' },
  { id: 'ral1015', name: 'RAL 1015', hex: '#E6D5A8' },
  { id: 'ral8017', name: 'RAL 8017', hex: '#4A3228' },
  { id: 'ral9001', name: 'RAL 9001', hex: '#F5E6C8' },
  { id: 'ral7035', name: 'RAL 7035', hex: '#C5C6C9' },
  { id: 'ral1023', name: 'RAL 1023', hex: '#D4A017' },
  { id: 'ral2008', name: 'RAL 2008', hex: '#C75B12' },
];

export const ACCESSORIES: Accessory[] = [
  { id: 'motor', translationKey: 'motor' },
  { id: 'fotocelules', translationKey: 'fotocelules' },
  { id: 'comandamentWifi', translationKey: 'comandamentWifi' },
  { id: 'timbre', translationKey: 'timbre' },
  { id: 'plexiglass', translationKey: 'plexiglass' },
  { id: 'barrots', translationKey: 'barrots' },
  { id: 'pantallaPrivacitat', translationKey: 'pantallaPrivacitat' },
  { id: 'detectorObstacle', translationKey: 'detectorObstacle' },
];

export const DIMENSION_LIMITS = {
  width: { min: 500, max: 12000, default: 3000 },
  height: { min: 500, max: 5000, default: 2500 },
};
