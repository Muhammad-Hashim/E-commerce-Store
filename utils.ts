import data from "./pages/api/data.json";
import { INotFound, IProduct } from "./types";
export function getData() {
  const { top_categories, top_products } = data;
  return { top_categories, top_products };
}

const notFound = { message: "Not Found" };
export function getProduct(
  categoryId: number,
  productId: number,
): IProduct | INotFound {
  if (!categoryId && !productId) {
    return notFound;
  }
  const foundCategory = data.all_products.find(
    (prod) => prod.category_id === Number(categoryId),
  );
  if (!foundCategory) {
    return notFound;
  }
  if (Array.isArray(foundCategory.products)) {
    const foundProduct = (foundCategory.products as Array<IProduct>).find(
      (el) => el.id === Number(productId),
    );
    if (!foundProduct) {
      return notFound;
    }
    return foundProduct;
  }
  return notFound;
}
interface StaticPropsReturn {
  params: {
    categoryId: string;
    productId: string;
  };
}
export function getTopProductsIds(): StaticPropsReturn[] {
  // Get the top products and make static files for them
  const result: StaticPropsReturn[] = [];
  data.top_products.forEach((topProduct) => {
    topProduct.products.forEach((product) => {
      result.push({
        params: {
          categoryId: topProduct.category_id.toString(),
          productId: product.id.toString(),
        },
      });
    });
  });
  console.log(
    "🚀 ~ file: utils.ts ~ line 42 ~ getStaticProducts ~ result",
    result,
  );
  return result;
}
export function getCategory(category_id: string) {
  const foundCategory = data.all_products.find(
    (product) => product.category_id === Number(category_id),
  );
  if (!foundCategory) {
    return undefined;
  }
  return foundCategory;
}
