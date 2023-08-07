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
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (!isMutating) {
            return;
        }

        const timeout = setTimeout(() => {
            const response = callback(store, requestData);
            setResponse(response)
            setIsMutating(false);
            options?.onSuccess?.(response);
        }, DELAY);

        return () => {
            clearTimeout(timeout);
        }
    }, [store, isMutating, callback, requestData, options]);

    const mutateAsync = (data, options = {}) => {
        setIsMutating(true);
        setRequestData(data);
        setOptions(options)
    }

    return { data: response, mutateAsync, isMutating }
}

export default useServerMutation;