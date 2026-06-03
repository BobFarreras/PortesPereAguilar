// components/marketing/CatalogGhost.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import DoorCard from '@/components/doors/DoorCard';
import { SERVICES_DATA } from '@/lib/constants';

/**
 * Graella de DoorCards que sempre és al DOM.
 * Quan estem al catàleg: invisible (el real es mostra).
 * Quan estem al detall: invisible però al DOM (layoutId existeix per a la tornada).
 */
export default function CatalogGhost() {
  const pathname = usePathname();
  const t = useTranslations('solutions');
  const isOnCatalog = pathname.endsWith('/cataleg');

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      <div className="min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
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
    </div>
  );
}
