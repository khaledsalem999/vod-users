import {createSlice, createAsyncThunk, PayloadAction, createAction, createSelector} from '@reduxjs/toolkit';
import RandomUser, { makeid } from '../RandomUser';

const usersApiUrl = process.env.REACT_APP_USERS_API_URL;


//We fetch data from randomusers api here
export const fetchFromUsersApi = createAsyncThunk('users/fetchFromUsersApi', async () => {
    const userData = await fetch(`${usersApiUrl}?results=10`);
    return await userData.json();
})

//we use this to append new user with add contact
export const appendUserDataFromForm = createAction<RandomUser>('users/appendUserDataFromForm');

//we use this to update user in edit contact
export const updateUserData = createAction<UpdateUserPayload>('users/updateUserData');

//we use this to delete user
export const deleteUser = createAction<string>('users/deleteUser');

interface randomUserState {
    loading: string
    data: RandomUser[]
}

const initialState: randomUserState = {
    loading: 'idle',
    data: []
}

export interface UpdateUserPayload {
    id: string;
    updatedUser: RandomUser;
}

//builder cases set according to the apps behavior and needs
const usersApiSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFromUsersApi.pending, (state, action) => {
            state.loading = 'loading';
        })
        builder.addCase(fetchFromUsersApi.fulfilled, (state, action) => {
            state.loading = 'success';
            state.data = action.payload.results.map((user: any) => <RandomUser>{
                id: makeid(5),
                firstName: user.name.first,
                lastName: user.name.last,
                email: user.email,
                address: `${user.location.street.name}, ${user.location.street.number}, ${user.location.city}, ${user.location.state}`,
                avatar: user.picture.medium,
                phone: user.phone 
            });
        })
        builder.addCase(fetchFromUsersApi.rejected, (state, action) => {
            state.loading = 'error';
        })
        builder.addCase(appendUserDataFromForm, (state, action: PayloadAction<RandomUser>) => {
            state.data = [action.payload, ...state.data];
        })
        builder.addCase(updateUserData, (state, action: PayloadAction<UpdateUserPayload>) => {
            const { id, updatedUser } = action.payload;
            const index = state.data.findIndex(user => user.id === id);
            if (index !== -1) {
              state.data[index] = updatedUser;
            }
        });
        builder.addCase(deleteUser, (state, action: PayloadAction<string>) => {
            const userIdToDelete = action.payload;
            state.data = state.data.filter(user => user.id !== userIdToDelete);
        });
    }
});

export const selectUserById = (state: randomUserState, userId: string) => {
    return state.data.find(user => user.id === userId);
};


export default usersApiSlice.reducer;