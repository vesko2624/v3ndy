/**
 * External dependencies
 */
import { useQuery } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import accountBalanceShow from "@/server/account/balance/account-balance-show.js";

function useAccountBalanceShowQuery() {
    return useQuery(
      ['account/balance/show'],
      () => {
          return accountBalanceShow();
      }
    );
}

export default useAccountBalanceShowQuery;
