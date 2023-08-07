/**
 * Internal dependencies
 */
import useServerMutation from "@/server/use-server-mutation.js";

const useProductsStoreMutation = (product) => {
    return useServerMutation((store) => {
        const serverProduct = store.findProduct(product.id);

        return store.updateProduct({
            ...serverProduct,
            quantity: product.quantity + 1,
        });
    }, (store) => ({
        findProduct: store.findProduct,
        updateProduct: store.updateProduct,
    }));
}

export default useProductsStoreMutation;