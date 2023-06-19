import fetcher from "./fetcher";


export const getMoodsTrack = () => {
    return fetcher.get('/public/tracks/moods');
}