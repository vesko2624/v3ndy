/**
 * External dependencies
 */
import { useMutation } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import productsUpdate from "@/server/products/products-update.js";

function useProductsUpdateMutation(id) {
    return useMutation(
      (data) => {
          return productsUpdate(id, data);
      }
    );
}

export default useProductsUpdateMutation;
