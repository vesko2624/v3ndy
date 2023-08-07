/**
 * Internal dependencies
 */
import useServerMutation from "@/server/use-server-mutation.js";

const useAccountBalanceUpdateMutation = () => {
    return useServerMutation((addMoney, data) => {
        return addMoney(data.amount);
    }, (store) => store.addMoney);
}

export default useAccountBalanceUpdateMutation;