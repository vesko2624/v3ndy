/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const productsUpdate = (id, data) => {
    return serverResponse((storage) => {
        const newProducts = storage.get('products', [])
          .map((product) => {
              if (product.id === id) {
                  return {
                      ...product,
                      name: data.name,
                      price: data.price,
                  }
              }

              return product;
          })

        return storage.set('products', newProducts)
    });
}

export default productsUpdate;