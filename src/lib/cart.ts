import type { Product } from "@/lib/products";

const CART_KEY = "modsquebrada_cart";

export type CartItem = {
  slug: string;
};

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item?.slug === "string");
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(slug: string) {
  const current = getCart();
  if (current.some((item) => item.slug === slug)) return current;
  const next = [...current, { slug }];
  setCart(next);
  return next;
}

export function removeFromCart(slug: string) {
  const next = getCart().filter((item) => item.slug !== slug);
  setCart(next);
  return next;
}

export function clearCart() {
  setCart([]);
}

export function cartToProducts(cart: CartItem[], products: Product[]) {
  return cart
    .map((item) => products.find((product) => product.slug === item.slug))
    .filter((item): item is Product => Boolean(item));
}
