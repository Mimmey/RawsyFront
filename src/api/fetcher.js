

const BASE_URL = ''

export const request = (path, options) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        options = {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Basic ${token}`
            }
        }
    }
    return fetch(`${BASE_URL}${path}`, options)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response)
            }
            return response;
        })
}

const fetcher = {

    get: (path, options, callback = res => res.json()) => {
        return request(path, {
            method: 'GET'
        })
            .then(callback)
    },
    post: (path, data) => {
        return request(path, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    },
    put: (path, options) => {
        return request(path, {
            method: 'PUT',
            ...options
        })
    }
}


export default fetcher;
