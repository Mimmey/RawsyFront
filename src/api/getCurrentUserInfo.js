import fetcher from "./fetcher";


export const getCurrentUserInfo = () => {
    return fetcher.get('/my/user')
}

