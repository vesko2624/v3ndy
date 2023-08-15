/**
 * External dependencies
 */
import { useMutation } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import productsItemsStore from "@/server/products/items/products-items-store.js";

function useProductsItemsStoreMutation(id) {
    return useMutation(
      () => {
          return productsItemsStore(id);
      }
    );
}

export default useProductsItemsStoreMutation;
