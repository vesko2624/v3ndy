/**
 * External dependencies
 */
import { useState } from "react";
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";

/**
 * Internal dependencies
 */
import useProductsIndexQuery from "@/server/products/use-products-index-query.js";
import useAccountBalanceShowQuery from "@/server/account/use-account-balance-show-query.js";
import useToggle from "@/hooks/use-toggle.js";
import AccountAddMoneyModal from "@/domain/account/account-add-money-modal/account-add-money-modal.jsx";
import InsufficientBalance from "@/domain/account/insufficient-balance/insufficient-balance.jsx";
import InsufficientQuantity from "@/domain/products/components/insufficient-quantity/insufficient-quantity.jsx";
import useProductsBuyMutation from "@/server/products/use-products-buy-mutation.js";

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
};

const availableCoins = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 2.00];

const VendingIndexPage = () => {
    const {data: products = [], ...productsIndexQuery} = useProductsIndexQuery();
    const {data: accountBalance = 0, ...accountBalanceShowQuery} = useAccountBalanceShowQuery();
    const productsBuyMutation = useProductsBuyMutation();
    const [insertedMoney, setInsertedMoney] = useState(0);

    const {
        on: isAddMoneyModalOpen,
        setOn: openAddMoneyModal,
        setOff: closeAddMoneyModal
    } = useToggle();

    const {
        on: isInsufficientBalanceModalOpen,
        setOn: openInsufficientBalanceModal,
        setOff: closeInsufficientBalanceModal
    } = useToggle();

    const {
        on: isInsufficientQuantityModalOpen,
        setOn: openInsufficientQuantityModal,
        setOff: closeInsufficientQuantityModal
    } = useToggle();

    if (productsIndexQuery.isLoading || accountBalanceShowQuery.isLoading) {
        return <CircularProgress/>;
    }

    return (
      <>
          <Stack direction="column" spacing={2}>
              <Box sx={boxStyle}>
                  <Stack direction="column" spacing={4}>
                      {productsBuyMutation.isMutating ? (
                        <CircularProgress style={{ margin: 'auto', width: 48, height: 48 }}/>
                      ) : (
                          <Stack direction="row" justifyContent="space-between">
                              <Stack direction="column">
                                  <Typography>Balance: {(accountBalance - insertedMoney).toFixed(2)}$</Typography>

                                  <Typography>Inserted Money: {(insertedMoney).toFixed(2)}$</Typography>
                              </Stack>

                              <Stack direction="row" spacing={1}>
                                  {insertedMoney > 0 && (
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => setInsertedMoney(0)}
                                      >
                                          Retrieve Coins
                                      </Button>
                                  )}

                                  <Button variant="contained" size="small" onClick={openAddMoneyModal}>
                                      Add money
                                  </Button>
                              </Stack>
                          </Stack>
                      )}

                      <Stack direction="column">
                          <Typography>Insert Coins:</Typography>

                          <Grid container rowSpacing={2} columnSpacing={10}>
                              {availableCoins.map((coin) => (
                                <Grid key={coin} item xs={1}>
                                    <Item
                                      component={Button}
                                      sx={{ width: 30 }}
                                      onClick={() => {
                                          if(parseFloat((accountBalance - insertedMoney - coin).toFixed(2)) < 0) {
                                              return;
                                          }

                                          setInsertedMoney((insertedMoney) => insertedMoney + coin);
                                      }}
                                    >{coin.toFixed(2)}$</Item>
                                </Grid>
                              ))}
                          </Grid>
                      </Stack>
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
                                          disabled={productsBuyMutation.isMutating}
                                          onClick={() => {
                                              if (parseFloat(insertedMoney.toFixed(2)) < parseFloat(product.price.toFixed(2))) {
                                                  openInsufficientBalanceModal();

                                                  return;
                                              }

                                              if (product.quantity <= 0) {
                                                  openInsufficientQuantityModal();

                                                  return;
                                              }

                                              productsBuyMutation.mutateAsync(product.id, {
                                                  onSuccess() {
                                                      setInsertedMoney((oldMoney) => Math.abs(oldMoney - product.price));
                                                  }
                                              });
                                          }}
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

          {isInsufficientBalanceModalOpen && (
            <InsufficientBalance onClose={closeInsufficientBalanceModal}/>
          )}

          {isInsufficientQuantityModalOpen && (
            <InsufficientQuantity onClose={closeInsufficientQuantityModal}/>
          )}
      </>
    )
}

export default VendingIndexPage;