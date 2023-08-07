/**
 * Internal dependencies
 */
import { getAvailableId } from "@/server/helpers.js";
import useServerMutation from "@/server/use-server-mutation.js";

const useProductsStoreMutation = () => {
    return useServerMutation((store, product) => {
        return store.addProduct({
            id: getAvailableId(store.products),
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    }, (store) => ({
        products: store.products,
        addProduct: store.addProduct,
    }));
}

export default useProductsStoreMutation;