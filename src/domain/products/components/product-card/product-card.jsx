/**
 * External dependencies
 */
import { Button, ButtonGroup, Card, CardActions, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Edit } from '@mui/icons-material';

/**
 * Internal dependencies
 */
import useProductsItemsStoreMutation from "@/data/products/items/use-products-items-store-mutation.js";
import useProductsItemsDestroyMutation from "@/data/products/items/use-products-items-destroy-mutation.js";
import ProductModal from "@/domain/products/components/product-modal/product-modal.jsx";
import useToggle from "@/hooks/use-toggle.js";

const ProductCard = (props) => {
    const { product } = props;

    const queryClient = useQueryClient();
    const productsItemsStoreMutation = useProductsItemsStoreMutation(product.id);
    const productsItemsDestroyMutation = useProductsItemsDestroyMutation(product.id);

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
                                productsItemsDestroyMutation.mutateAsync(null, {
                                    onSuccess() {
                                        queryClient.invalidateQueries(['products/index']);
                                    }
                                });
                            }}
                          >-</Button>

                          <Button
                            type="button"
                            onClick={() => {
                                productsItemsStoreMutation.mutateAsync(null, {
                                    onSuccess() {
                                        queryClient.invalidateQueries(['products/index']);
                                    }
                                })
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