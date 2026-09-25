export function withProductDefaults(product) {
  return {
    ...product,
    variants: product.variants?.length
      ? product.variants
      : [
          {
            sku: `product-${product._id}`,
            color: "Default",
            sizes: "m",
            stock: 20,
          },
        ],
  };
}
