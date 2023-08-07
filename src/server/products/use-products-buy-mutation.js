/**
 * Internal dependencies
 */
import useServerMutation from "@/server/use-server-mutation.js";

const useProductsBuyMutation = () => {
    return useServerMutation((store, productId) => {
        const serverProduct = store.findProduct(productId);

        if(serverProduct.quantity <= 0) {
            return;
        }

        store.subMoney(serverProduct.price);
        return store.updateProduct({
            ...serverProduct,
            quantity: serverProduct.quantity - 1
        });
    }, (store) => ({
        findProduct: store.findProduct,
        updateProduct: store.updateProduct,
        subMoney: store.subMoney,
    }));
}

export default useProductsBuyMutation;