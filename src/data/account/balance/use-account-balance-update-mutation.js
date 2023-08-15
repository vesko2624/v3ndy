/**
 * External dependencies
 */
import { useMutation } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import accountBalanceUpdate from "@/server/account/balance/account-balance-update.js";

function useAccountBalanceUpdateMutation() {
    return useMutation(
      (data) => {
          return accountBalanceUpdate(data);
      }
    );
}

export default useAccountBalanceUpdateMutation;
