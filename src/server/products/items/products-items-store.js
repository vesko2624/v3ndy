/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const MAX_ITEMS_PER_PRODUCT = 15;

const productsItemsStore = (id) => {
    return serverResponse((storage) => {
        const newProducts = storage.get('products', [])
          .map((product) => {
              if (product.id === id) {
                  return {
                      ...product,
                      quantity: product.quantity >= MAX_ITEMS_PER_PRODUCT
                        ? MAX_ITEMS_PER_PRODUCT
                        : product.quantity + 1,
                  }
              }

              return product;
          });

        return storage.set('products', newProducts)
    });
}

export default productsItemsStore;