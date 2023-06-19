import fetcher from "./fetcher";


export const getAllGenres = () => {
    return fetcher.get('/public/tracks/genres')
}