/**
 * External dependencies
 */
import { useMutation } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import productsStore from "@/server/products/products-store.js";

function useProductsStoreMutation() {
    return useMutation(
      (data) => {
          return productsStore(data);
      }
    );
}

export default useProductsStoreMutation;
