import fetcher from "./fetcher";

export const setUserAvatar = (data) => {
    return fetcher.put('/my/avatar', {
        headers: {
            "Content-Type": 'multipart/form-data'
        },
        body: data
    })
}