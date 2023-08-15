/**
 * External dependencies
 */
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from '@mui/lab';

/**
 * Internal dependencies
 */
import useAccountBalanceUpdateMutation from "@/data/account/balance/use-account-balance-update-mutation.js";
import accountAddMoneyModalSchema from "@/domain/account/account-add-money-modal/account-add-money-modal.schema.js";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 400,
    color: 'black',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const AccountAddMoneyModal = (props) => {
    const {onClose} = props;

    const queryClient = useQueryClient();
    const accountBalanceUpdateMutation = useAccountBalanceUpdateMutation();

    const form = useForm({
        mode: 'onChange',
        resolver: accountAddMoneyModalSchema,
        defaultValues: {
            amount: '',
        }
    });

    const {isDirty, isValid, errors} = form.formState;

    const onSubmit = (data) => {
        accountBalanceUpdateMutation.mutateAsync(data, {
            onSuccess() {
                queryClient.invalidateQueries(['account/balance/show']);
                onClose();
            },
        });
    }

    return (
      <Modal open onClose={onClose}>
          <Box as="form" onSubmit={form.handleSubmit(onSubmit)} sx={style}>
              <h2>Add balance</h2>

              <Stack direction="column" spacing={3} sx={{paddingY: 3}}>
                  <Controller
                    name="amount"
                    control={form.control}
                    render={({field}) => (
                      <TextField
                        label="Amount"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        required
                        autoFocus
                        {...field}
                      />
                    )}
                  />
              </Stack>

              <Stack justifyContent="flex-end" spacing={2} direction="row" sx={{pt: 3, ml: 'auto'}}>
                  <Button variant="text" onClick={onClose}>Cancel</Button>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    disabled={!isDirty || !isValid}
                    loading={accountBalanceUpdateMutation.isMutating}
                  >Submit</LoadingButton>
              </Stack>
          </Box>
      </Modal>
    );
}

export default AccountAddMoneyModal;