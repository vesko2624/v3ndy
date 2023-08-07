/**
 * Internal dependencies
 */
import useServerMutation from "@/server/use-server-mutation.js";

const useProductsUpdateMutation = (product) => {
    return useServerMutation((store, data) => {
        const serverProduct = store.findProduct(product.id);

        return store.updateProduct({
            ...serverProduct,
            name: data.name,
            price: data.price,
        });
    }, (store) => ({
        findProduct: store.findProduct,
        updateProduct: store.updateProduct,
    }));
}

export default useProductsUpdateMutation;