import fetcher from "./fetcher";

export const setUserAvatar = (data) => {
    return fetcher.put('/my/avatar', {
        body: JSON.stringify(data)
    })
}