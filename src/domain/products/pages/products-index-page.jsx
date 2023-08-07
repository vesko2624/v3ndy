/**
 * External dependencies
 */
import { Stack } from "@mui/material";

/**
 * Internal dependencies
 */
import useProductsIndexQuery from "@/server/products/use-products-index-query.js";
import useProductsStoreMutation from "@/server/products/use-products-store-mutation.js";
import ProductCard from "@/domain/products/components/product-card/product-card.jsx";

const ProductsIndexPage = () => {
    const { data: products = [] } = useProductsIndexQuery();
    const productsStoreMutation = useProductsStoreMutation();

    return (
      <Stack direction="column" spacing={2}>
          <button
            type="button"
            onClick={() => {
                productsStoreMutation.mutateAsync({
                    name: 'ivan',
                })
            }}
          >
              Add Product
          </button>

          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
      </Stack>
    )
}

export default ProductsIndexPage;