import fetcher from "./fetcher";


export const getTrackTypes = () => {
    return fetcher.get('/public/tracks/types')
}