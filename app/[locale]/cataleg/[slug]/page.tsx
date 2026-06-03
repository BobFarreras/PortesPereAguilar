// app/[locale]/cataleg/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SERVICES_DATA } from '@/lib/constants';
import ProductDetailView from '@/components/marketing/ProductDetailView';

// 1. Tipem els params com una Promesa (Estàndard Next.js 15+)
interface ProductPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return SERVICES_DATA.flatMap((service) =>
    ['ca', 'es', 'en', 'fr'].map((locale) => ({
      locale,
      slug: service.slug,
    }))
  );
}

// 2. Afegim 'async' per resoldre la promesa dels params abans d'injectar el SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Producte no trobat | Portes Pere Aguilar',
    };
  }

  // TODO Fase 5: substituir seoFallback per getTranslations({ locale, namespace: `servicesList.${service.translationKey}` })
  return {
    title: `${service.seoFallback.title} | Portes Pere Aguilar`,
    description: service.seoFallback.description,
  };
}

// 3. El Server Component passa a ser asíncron per poder accedir a 'slug'
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound(); // Si el slug no existeix, forcem el 404 d'enginyeria
  }

  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 px-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto">
        <ProductDetailView key={slug} service={service} />
      </div>
    </main>
  );
}
