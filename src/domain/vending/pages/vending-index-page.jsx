/**
 * External dependencies
 */
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";

/**
 * Internal dependencies
 */
import useProductsIndexQuery from "@/server/products/use-products-index-query.js";
import useAccountBalanceShowQuery from "@/server/account/use-account-balance-show-query.js";
import useToggle from "@/hooks/use-toggle.js";
import AccountAddMoneyModal from "@/domain/account/account-add-money-modal/account-add-money-modal.jsx";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const boxStyle = {
    color: 'rgba(255, 255, 255, 0.87)',
    backgroundColor: '#242424',
    p: 2,
    minWidth: 600,
    maxWidth: '100%',
};

const VendingIndexPage = () => {
    const {data: products = [], ...productsIndexQuery} = useProductsIndexQuery();
    const {data: accountBalance = 0, ...accountBalanceShowQuery} = useAccountBalanceShowQuery();

    const {
        on: isAddMoneyModalOpen,
        setOn: openAddMoneyModal,
        setOff: closeAddMoneyModal
    } = useToggle();

    if (productsIndexQuery.isLoading || accountBalanceShowQuery.isLoading) {
        return <CircularProgress/>;
    }

    return (
      <>
          <Stack direction="column" spacing={2}>
              <Box sx={boxStyle}>
                  <Stack direction="row" justifyContent="space-between">
                      <Typography>Balance: {accountBalance.toFixed(2)}$</Typography>

                      <Button variant="contained" size="small" onClick={openAddMoneyModal}>
                          Add money
                      </Button>
                  </Stack>
              </Box>

              <Box sx={boxStyle}>
                  <Grid container spacing={2}>
                      {products.map((product) => (
                        <Grid key={product.id} item xs={6}>
                            <Item>
                                <Stack direction="column" spacing={1}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography>Name: {product.name}</Typography>

                                        <IconButton
                                          size="small"
                                        >
                                            <ShoppingCartCheckout
                                              fontSize="small"
                                              color="action"
                                            />
                                        </IconButton>
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography>Price: ${product.price.toFixed(2)}</Typography>

                                        <Typography>Qty: {product.quantity}</Typography>
                                    </Stack>
                                </Stack>
                            </Item>
                        </Grid>
                      ))}
                  </Grid>
              </Box>
          </Stack>

          {isAddMoneyModalOpen && (
            <AccountAddMoneyModal onClose={closeAddMoneyModal}/>
          )}
      </>
    )
}

export default VendingIndexPage;