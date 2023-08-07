/**
 * External dependencies
 */
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

/**
 * Internal dependencies
 */
import productFormSchema from "@/domain/products/components/product-modal/product-modal.schema.js";
import useProductsStoreMutation from "@/server/products/use-products-store-mutation.js";
import useProductsUpdateMutation from "@/server/products/use-products-update-mutation.js";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: 'black',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const ProductModal = (props) => {
    const {product, onClose} = props;

    const productsStoreMutation = useProductsStoreMutation();
    const productsUpdateMutation = useProductsUpdateMutation(product);

    const isEdit = !!product;
    const mutation = isEdit ? productsUpdateMutation : productsStoreMutation;

    const form = useForm({
        mode: 'onChange',
        resolver: productFormSchema,
        defaultValues: {
            name: product?.name || '',
            price: product?.price || '',
        }
    });

    const {isDirty, isValid, errors} = form.formState;

    const onSubmit = (data) => {
        mutation.mutateAsync(data);
    }

    return (
      <Modal open onClose={onClose}>
          <Box as="form" onSubmit={form.handleSubmit(onSubmit)} sx={style}>
              <h2>{isEdit ? 'Edit Product' : 'Create Product'}</h2>

              <Stack direction="column" spacing={3} sx={{paddingY: 3}}>
                  <Controller
                    name="name"
                    control={form.control}
                    render={({field}) => (
                      <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        required
                        autoFocus
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="price"
                    control={form.control}
                    render={({field}) => (
                      <TextField
                        label="Price"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        required
                        {...field}
                      />
                    )}
                  />
              </Stack>

              <Stack justifyContent="flex-end" spacing={2} direction="row" sx={{pt: 3, ml: 'auto'}}>
                  <Button variant="text" onClick={onClose}>Cancel</Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isDirty || !isValid}
                  >Submit</Button>
              </Stack>
          </Box>
      </Modal>
    );
}

export default ProductModal;