/**
 * External dependencies.
 */
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import useServerStore from "@/server/use-server-store.js";

const DELAY = 150;

const useServerQuery = (callback, storeSelector) => {
    const serverStore = useServerStore(storeSelector);
    const [response, setResponse] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setResponse(callback(serverStore));
            setIsLoading(false);
        }, DELAY);

        return () => {
            clearTimeout(timeout);
        }
    }, [serverStore, isLoading, callback]);

    return { data: response, isLoading }
}

export default useServerQuery;