export interface ServiceCategory {
  id: string;
  /** Clau per accedir a les traduccions: t(`services.${translationKey}.title`) */
  translationKey: string;
  imageUrl: string;
  slug: string;
  gallery?: string[];
  /** Array d'IDs de features que es resolen via t(`services.${translationKey}.features.${id}`) */
  features?: string[];
  /** Text SEO per defecte (ca) usat a generateMetadata; les traduccions per locale es resolen a generateMetadata. */
  seoFallback: {
    title: string;
    description: string;
  };
}
