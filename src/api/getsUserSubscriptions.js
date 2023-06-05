import fetcher from "./fetcher";


export const getsUserSubscriptions = (id) => {
    return fetcher.get(`/public/users/${id}/subscriptions?page=1&unitsOnPage=100`)
}