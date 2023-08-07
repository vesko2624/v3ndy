/**
 * External dependencies
 */
import { Button, ButtonGroup, Card, CardActions, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { Edit } from '@mui/icons-material';

/**
 * Internal dependencies
 */
import useProductsItemsStoreMutation from "@/server/products/use-products-items-store-mutation.js";
import useProductsItemsDestroyMutation from "@/server/products/use-products-items-destroy-mutation.js";
import ProductModal from "@/domain/products/components/product-modal/product-modal.jsx";
import useToggle from "@/hooks/use-toggle.js";

const ProductCard = (props) => {
    const { product } = props;
    const productsItemsStoreMutation = useProductsItemsStoreMutation(product);
    const productsItemsDestroyMutation = useProductsItemsDestroyMutation(product);

    const {
        on: isProductModalOpen,
        setOn: openProductModal,
        setOff: closeProductModal
    } = useToggle();

    return (
      <>
          <Card sx={{ minWidth: 275 }}>
              <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>{product.name}</Typography>

                    <IconButton
                      size="small"
                      onClick={openProductModal}
                    >
                        <Edit fontSize="small" color="action" />
                    </IconButton>
                  </Stack>
              </CardContent>

              <CardActions disableSpacing={true}>
                  <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                      <ButtonGroup size="small" variant="contained">
                          <Button
                            type="button"
                            onClick={() => {
                                productsItemsDestroyMutation.mutateAsync();
                            }}
                          >-</Button>

                          <Button
                            type="button"
                            onClick={() => {
                                productsItemsStoreMutation.mutateAsync()
                            }}
                          >+</Button>
                      </ButtonGroup>

                      <Typography>
                          Qty: {product.quantity}
                      </Typography>
                  </Stack>
              </CardActions>
          </Card>

          {isProductModalOpen && (
            <ProductModal
              onClose={closeProductModal}
              product={product}
            />
          )}
      </>
    )
}

export default ProductCard;