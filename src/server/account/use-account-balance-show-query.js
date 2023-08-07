import useServerQuery from "@/server/use-server-query.js";

const useAccountBalanceShowQuery = () => {
    return useServerQuery((account) => {
        return account.balance;
    }, (store) => store.account);
}

export default useAccountBalanceShowQuery;