/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const accountBalanceUpdate = (data) => {
    return serverResponse((storage) => {
        return storage.set(
            'accountBalance',
            storage.get('accountBalance', 0) + data.amount
        );
    });
}

export default accountBalanceUpdate;