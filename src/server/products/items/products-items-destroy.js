/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const productsItemsDestroy = (id) => {
    return serverResponse((storage) => {
        const newProducts = storage.get('products', [])
          .reduce((result, product) => {
              if (product.id === id && product.quantity > 1) {
                  return [...result, {
                      ...product,
                      quantity: product.quantity - 1,
                  }];
              } else if(product.id === id) {
                  return result;
              }

              return [...result, product];
          }, []);

        return storage.set('products', newProducts)
    });
}

export default productsItemsDestroy;