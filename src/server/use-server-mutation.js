/**
 * External dependencies.
 */
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import useServerStore from "@/server/use-server-store.js";

const DELAY = 150;

const useServerMutation = (callback, selector) => {
    const store = useServerStore(selector);
    const [response, setResponse] = useState();
    const [isMutating, setIsMutating] = useState(false);
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        if (!isMutating) {
            return;
        }

        const timeout = setTimeout(() => {
            setResponse(callback(store, ...requestData))
            setIsMutating(false);
        }, DELAY);

        return () => {
            clearTimeout(timeout);
        }
    }, [store, isMutating, callback, requestData]);

    const mutateAsync = (...data) => {
        setIsMutating(true);
        setRequestData(data);
    }

    return { data: response, mutateAsync, isMutating }
}

export default useServerMutation;