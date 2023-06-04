import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    about: null,
    country: null,
    email: null,
    id: null,
    mediaLinks: null,
    nickname: null,
    role: null,
    tracksInOtherUsersFavouritesCount: null,
    tracksPurchasedByOtherUsersCount: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload}) => {
            state.about = payload.about;
            state.nickname = payload.nickname;
            state.country = payload.country;
            state.email = payload.email;
            state.id = payload.id;
            state.mediaLinks = payload.mediaLinks;
            state.role = payload.role;
            state.tracksInOtherUsersFavouritesCount = payload.tracksInOtherUsersFavouritesCount;
            state.tracksPurchasedByOtherUsersCount = payload.tracksPurchasedByOtherUsersCount;
            state.isAuth = true;
        }
    },
})
export const {setUserData} = userSlice.actions;

export default userSlice.reducer