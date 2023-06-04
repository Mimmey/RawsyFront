import fetcher from "./fetcher";


export const getAvatarById = (id) => {
    return fetcher.get(`/public/users/${id}/avatar`)
}