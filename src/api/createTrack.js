import fetcher from "./fetcher";


export const createTrack = (payload) => {
    return fetcher.post('/public/tracks/publish', payload)
}