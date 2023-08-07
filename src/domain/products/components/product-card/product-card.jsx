/**
 * External dependencies
 */
import { Button, ButtonGroup, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import useProductsItemsStoreMutation from "@/server/products/use-products-items-store-mutation.js";
import useProductsItemsDestroyMutation from "@/server/products/use-products-items-destroy-mutation.js";

const ProductCard = (props) => {
    const { product } = props;
    const productsItemsStoreMutation = useProductsItemsStoreMutation(product);
    const productsItemsDestroyMutation = useProductsItemsDestroyMutation(product);

    return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
              {product.name}
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
    )
}

export default ProductCard;