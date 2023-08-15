/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const productsBuy = (id) => {
    return serverResponse((storage) => {
        const products = storage.get('products', []);
        const accountBalance = storage.get('accountBalance', 0);
        const product = products.find((product) => product.id === id);

        if (product && product.quantity && product.price < accountBalance) {
            product.quantity--;
            storage.set('products', products);
            storage.set('accountBalance', accountBalance - product.price);
        }

        return product;
    });
}

export default productsBuy;