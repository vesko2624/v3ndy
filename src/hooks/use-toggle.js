/**
 * External dependencies
 */
import { useCallback, useState } from 'react';

const useToggle = (initial = false) => {
    const [on, handleSetOn] = useState(initial);

    const set = useCallback((payload) => {
        handleSetOn(payload);
    }, []);

    const setOn = useCallback(() => {
        handleSetOn(true);
    }, []);

    const setOff = useCallback(() => {
        handleSetOn(false);
    }, []);

    const toggle = useCallback(() => {
        handleSetOn((old) => !old);
    }, []);

    return {
        on,
        set,
        setOn,
        setOff,
        toggle,
    };
}

export default useToggle;