/**
 * Internal dependencies
 */
import useServerMutation from "@/server/use-server-mutation.js";

const MAX_ITEMS_PER_PRODUCT = 15;

const useProductsItemsStoreMutation = (product) => {
    return useServerMutation((store) => {
        const serverProduct = store.findProduct(product.id);

        return store.updateProduct({
            ...serverProduct,
            quantity: product.quantity >= MAX_ITEMS_PER_PRODUCT
              ? MAX_ITEMS_PER_PRODUCT
              : product.quantity + 1,
        });
    }, (store) => ({
        findProduct: store.findProduct,
        updateProduct: store.updateProduct,
    }));
}

export default useProductsItemsStoreMutation;