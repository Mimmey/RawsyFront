import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getCurrentUserInfo} from "../api/getCurrentUserInfo";
import {getTrackByIdUser} from "../api/getTrackByIdUser";
import {getsUserSubscriptions} from "../api/getsUserSubscriptions";
import {updateUserInfoRequest} from "../api/updateUserInfo";
import {getAvatarById} from "../api/getAvatar";
import fetcher from "../api/fetcher";


export const fetchPublishedTracks = createAsyncThunk(
    'users/fetchPublishedTracks',
    async (_, {getState}) => {
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
    async (_, {getState}) => {
        const state = getState();
        const subscriptions = await getsUserSubscriptions(state.user.id);

        if (subscriptions) {
            return subscriptions;
        }
    }
)

export const fetchSubscribersUser = createAsyncThunk(
    'users/fetchSubscribersUser',
    async (_, {getState}) => {
        const state = getState();

        let subs = fetcher.get(`/public/users/${state.user.id}/subscribers`)

        if (subs) {
            return subs;
        }
    }
)

export const updateUserInfo = createAsyncThunk(
    'users/updateUserInfo',
    async (payload) => {
        delete payload.country;

        await updateUserInfoRequest(payload)
            .then(() => {
                const [_, pass] = atob(window.localStorage.getItem('token')).split(":");
                console.log(`${payload.nickname}:${pass}`)
                window.localStorage.setItem('token', btoa(`${payload.nickname}:${pass}`))
            })
        return payload;
    }
)

export const getAvatar = createAsyncThunk(
    'users/getAvatar',
    async (_, {getState}) => {
        const state = getState();
        return await getAvatarById(state.user.id);
    }
)

export const updateTrack = createAsyncThunk(
    'user/updateTrack',
    async ({id, payload}) => {
        payload.type = payload.typeId;
        delete payload.typeId;
        fetcher.patch(`/my/published/tracks/${id}`, payload)
    }
)


const initialState = {
    avatar: null,
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
    favoriteTracks: {
        isLoading: false,
        list: []
    },
    buyTracks: {
        isLoading: false,
        list: []
    },
    subscriptions: {
        isLoading: true,
        list: []
    },
    subscribers: {
        isLoading: true,
        list: []
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, {payload}) => {
            state.about = payload.about;
            state.nickname = payload.nickname;
            state.country = payload.country;
            state.email = payload.email;
            state.id = payload.id;
            state.mediaLinks = payload.mediaLinks.map(({content}) => content);
            state.role = payload.role;
            state.tracksInOtherUsersFavouritesCount = payload.tracksInOtherUsersFavouritesCount;
            state.tracksPurchasedByOtherUsersCount = payload.tracksPurchasedByOtherUsersCount;
            state.isAuth = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, {payload}) => {
            state.about = payload.about;
            state.nickname = payload.nickname;
            state.country = payload.country;
            state.email = payload.email;
            state.id = payload.id;
            state.mediaLinks = payload.mediaLinks.map(({content}) => content);
            state.role = payload.role;
            state.tracksInOtherUsersFavouritesCount = payload.tracksInOtherUsersFavouritesCount;
            state.tracksPurchasedByOtherUsersCount = payload.tracksPurchasedByOtherUsersCount;
            state.isAuth = true;
        })
        builder.addCase(fetchPublishedTracks.pending, (state, action) => {
            state.publishedTracks.isLoading = true;
        })
        builder.addCase(fetchPublishedTracks.fulfilled, (state, {payload}) => {
            state.publishedTracks.isLoading = false;
            state.publishedTracks.list = payload;
        })
        builder.addCase(fetchSubscriptionsUser.pending, (state, {payload}) => {
            state.subscriptions.isLoading = true;
        })
        builder.addCase(fetchSubscriptionsUser.fulfilled, (state, {payload}) => {
            state.subscriptions.isLoading = false;
            state.subscriptions.list = payload;
        })
        builder.addCase(updateUserInfo.fulfilled, (state, {payload}) => {
            state.about = payload.about;
            state.email = payload.email;
            state.mediaLinks = payload.mediaLinks;
            state.nickname = payload.nickname;
        })
        builder.addCase(getAvatar.fulfilled, (state, {payload}) => {
            state.avatar = payload;
        })
        builder.addCase(fetchSubscribersUser.fulfilled, (state, payload) => {
            state.subscribers.list = payload;
            state.subscribers.isLoading = false;
        })
    },
})
export const {setUserData} = userSlice.actions;

export default userSlice.reducer