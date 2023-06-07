import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getCurrentUserInfo} from "../api/getCurrentUserInfo";
import {getTrackByIdUser} from "../api/getTrackByIdUser";
import {getsUserSubscriptions} from "../api/getsUserSubscriptions";



export const fetchPublishedTracks = createAsyncThunk(
    'users/fetchPublishedTracks',
    async (_, { getState }) => {
        const state = getState();
        return await getTrackByIdUser(state.user.id);
    }
)

export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
    async () => {
        const userData = await getCurrentUserInfo();

        if (userData) {
            return userData;
        }
    }
)

export const fetchSubscriptionsUser = createAsyncThunk(
    'users/fetchSubscriptionsUser',
    async (_, { getState }) => {
        const state = getState();
        const subscriptions = await getsUserSubscriptions(state.user.id);

        if (subscriptions) {
            return subscriptions;
        }
    }
)


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
    isAuth: false,
    publishedTracks: {
        isLoading: true,
        list: []
    },
    subscriptions: {
        isLoading: true,
        list: []
    }
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
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
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
        })
        builder.addCase(fetchPublishedTracks.pending, (state, action) => {
            state.publishedTracks.isLoading = true;
        })
        builder.addCase(fetchPublishedTracks.fulfilled, (state, { payload }) => {
            state.publishedTracks.isLoading = false;
            state.publishedTracks.list = payload;
        })
        builder.addCase(fetchSubscriptionsUser.pending, (state, { payload }) => {
            state.subscriptions.isLoading = true;
        })
        builder.addCase(fetchSubscriptionsUser.fulfilled, (state, { payload }) => {
            state.subscriptions.isLoading = false;
            state.subscriptions.list = payload;
        })
    },
})
export const {setUserData} = userSlice.actions;

export default userSlice.reducer