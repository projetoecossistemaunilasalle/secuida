export interface FeaturedImageOption {
  id: string;
  src: string;
  alt: string;
}

export const featuredImageOptions = [
  {
    id: 'hands-holding-plant',
    src: `${import.meta.env.BASE_URL}hands_holding_plant.png`,
    alt: 'Mãos segurando uma planta pequena.',
  },
] satisfies FeaturedImageOption[];

export const defaultFeaturedImageId = featuredImageOptions[0].id;

export function findFeaturedImageOption(imageId: string | undefined) {
  return featuredImageOptions.find((image) => image.id === imageId);
}
