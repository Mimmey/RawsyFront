import fetcher from "./fetcher";


export const getAvatarById = (id) => {
    return fetcher.get(`/public/users/${id}/avatar`, {}, res => res.blob())
        .then(blobData => {
            return window.URL.createObjectURL(blobData);
        })
}