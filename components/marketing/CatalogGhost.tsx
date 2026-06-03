// components/marketing/CatalogGhost.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import DoorCard from '@/components/doors/DoorCard';
import { SERVICES_DATA } from '@/lib/constants';

/**
 * Graella invisible de targetes del catàleg.
 * Es manté al DOM sempre per permetre l'animació de shared element
 * quan es torna del detall al catàleg.
 */
export default function CatalogGhost() {
  const t = useTranslations('solutions');

  return (
    <div
      className="fixed inset-0 z-[-1] pointer-events-none opacity-0"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="h-full">
              <DoorCard
                service={service}
                title={t(`servicesList.${service.translationKey}.title`)}
                description={t(`servicesList.${service.translationKey}.description`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
