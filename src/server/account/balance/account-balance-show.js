/**
 * Internal dependencies.
 */
import serverResponse from "@/server/server-response.js";

const accountBalanceShow = () => {
    return serverResponse((storage) => {
        return storage.get('accountBalance', 0);
    });
}

export default accountBalanceShow;