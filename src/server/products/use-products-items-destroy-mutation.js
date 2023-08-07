/**
 * Internal dependencies
 */
import useServerMutation from "@/server/use-server-mutation.js";

const useProductsDestroyMutation = (product) => {
    return useServerMutation((store) => {
        const serverProduct = store.findProduct(product.id);

        if (serverProduct.quantity === 1) {
            return store.removeProduct(product.id);
        }

        return store.updateProduct({
            ...serverProduct,
            quantity: product.quantity - 1,
        });
    }, (store) => ({
        products: store.products,
        findProduct: store.findProduct,
        updateProduct: store.updateProduct,
        removeProduct: store.removeProduct,
    }));
}

export default useProductsDestroyMutation;