import fetcher from "./fetcher";


export const getTrackByIdUser = (id) => {
    return fetcher.get(`/public/users/${id}/published/tracks?page=1&unitsOnPage=100`)
}