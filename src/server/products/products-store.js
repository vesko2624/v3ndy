/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";
import { getAvailableId } from "@/server/helpers.js";

const productsStore = (product) => {
    return serverResponse((storage) => {
        const products = storage.get('products', []);
        const newProduct = {
            id: getAvailableId(products),
            name: product.name,
            price: product.price,
            quantity: 1,
        };

        return storage.set('products', [
            ...products,
            newProduct
        ])
    });
}

export default productsStore;