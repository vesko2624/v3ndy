/**
 * External dependencies
 */
import { CircularProgress, Stack } from "@mui/material";

/**
 * Internal dependencies
 */
import useProductsIndexQuery from "@/server/products/use-products-index-query.js";
import ProductCard from "@/domain/products/components/product-card/product-card.jsx";
import useToggle from "@/hooks/use-toggle.js";
import ProductModal from "@/domain/products/components/product-modal/product-modal.jsx";

const ProductsIndexPage = () => {
    const { data: products = [], isLoading } = useProductsIndexQuery();

    const {
        on: isProductModalOpen,
        setOn: openProductModal,
        setOff: closeProductModal
    } = useToggle();

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
      <>
          <Stack direction="column" spacing={2}>
              <button type="button" onClick={openProductModal}>
                  Add Product
              </button>

              {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}
          </Stack>

          {isProductModalOpen && (
            <ProductModal onClose={closeProductModal} />
          )}
      </>
    )
}

export default ProductsIndexPage;