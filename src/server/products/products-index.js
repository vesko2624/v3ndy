/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const productsIndex = () => {
    return serverResponse((storage) => {
        return storage.get('products', []);
    });
}

export default productsIndex;