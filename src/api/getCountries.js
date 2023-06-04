import fetcher from "./fetcher";


export const getCountries = () => {
    return fetcher.get('/public/countries')
}