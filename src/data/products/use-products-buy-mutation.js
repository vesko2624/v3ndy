/**
 * External dependencies
 */
import { useMutation } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import productsBuy from "@/server/products/products-buy.js";

function useProductsBuyMutation() {
    return useMutation(
      (id) => {
          return productsBuy(id);
      }
    );
}

export default useProductsBuyMutation;
