import fetcher from "./fetcher";


export const updateUserInfoRequest = (payload) => {
    return fetcher.patch('/my/user', payload)
}