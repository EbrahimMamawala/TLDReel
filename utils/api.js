const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData(endpoint, options = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
}