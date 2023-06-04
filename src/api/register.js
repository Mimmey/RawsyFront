import fetcher from "./fetcher";


export const register = (userData) => {

    const token = btoa(`${userData.nickname}:${userData.password}`);

    return fetcher.post('/auth/register', userData)
        .then(data => {
            window.localStorage.setItem('token', token)
            return data;
        })
}