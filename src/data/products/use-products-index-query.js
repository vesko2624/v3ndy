/**
 * External dependencies
 */
import { useQuery } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import productsIndex from "@/server/products/products-index.js";

function useProductsIndexQuery() {
    return useQuery(
      ['products/index'],
      () => {
          return productsIndex();
      }
    );
}

export default useProductsIndexQuery;
