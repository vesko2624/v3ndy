/**
 * External dependencies
 */
import { useMutation } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import productsItemsDestroy from "@/server/products/items/products-items-destroy.js";

function useProductsItemsDestroyMutation(id) {
    return useMutation(
      () => {
          return productsItemsDestroy(id);
      }
    );
}

export default useProductsItemsDestroyMutation;
