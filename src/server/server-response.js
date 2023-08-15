const DELAY = 150;

const storage = {
    get(key, defaultValue) {
        const server = JSON.parse(localStorage.getItem('server'));

        if (!server?.[key]) {
            return this.set(key, defaultValue);
        }

        return server[key];
    },
    set(key, value) {
        const server = JSON.parse(localStorage.getItem('server')) ?? {};

        localStorage.setItem('server', JSON.stringify({
            ...server,
            [key]: value,
        }));

        return value;
    }
}

const serverResponse = (callback, options = {}) => {
    const { signal } = options;

    if (signal?.aborted) {
        return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            const response = callback(storage);
            resolve(response);
        }, DELAY);

        signal?.addEventListener('abort', () => {
            window.clearTimeout(timeout);
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });
}

export default serverResponse;