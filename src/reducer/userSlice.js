import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    isLogin: false
  },
  reducers: {
    loginUser : (state, action)=>{
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLogin = true;
    }, 
    clearUser : (state)=>{
      state.id = '';
      state.name = '';
      state.isLogin = false
    }
  },
});

export const { loginUser, clearUser } = user.actions;
export default user;