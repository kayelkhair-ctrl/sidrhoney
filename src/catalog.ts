import productsData from "../content/products.json";

export type Nutrition = {
  energyKcal: number;
  fat: number;
  saturates: number;
  carbs: number;
  sugars: number;
  fibre: number;
  protein: number;
  salt: number;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  image: string;
  description: string;
  about: string[];
  enjoy: string[];
  storage: string;
  brands: string;
  nutrition: Nutrition | null;
};

export const products = productsData as Product[];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
