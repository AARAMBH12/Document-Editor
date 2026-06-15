export const api_base_url = "http://localhost:3000";

export async function apiFetch(path, options = {}) {
    const url = api_base_url + path;
    // default Accept header so server returns JSON on errors
    options.headers = Object.assign({ Accept: 'application/json' }, options.headers || {});
    try {
        const res = await fetch(url, options);
        const contentType = res.headers.get('content-type') || '';

        if (!res.ok) {
            let body;
            try {
                body = contentType.includes('application/json') ? await res.json() : await res.text();
            } catch (parseErr) {
                body = `Unable to parse body: ${parseErr.message}`;
            }
            const err = new Error(`Request failed ${res.status} ${res.statusText} for ${url}`);
            err.status = res.status;
            err.statusText = res.statusText;
            err.url = url;
            err.body = body;
            throw err;
        }

        if (contentType.includes('application/json')) {
            return res.json();
        }
        return res.text();
    } catch (networkErr) {
        const err = new Error(`Network error for ${url}: ${networkErr.message}`);
        err.cause = networkErr;
        throw err;
    }
}
