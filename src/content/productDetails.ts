import type { ProductDetail } from "./productDetail";
import { weingut } from "./weingut";

export const productDetails: ProductDetail[] = [weingut];

export const findProductDetail = (path: string) => productDetails.find((product) => product.path === path);
