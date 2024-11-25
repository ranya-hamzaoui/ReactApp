import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/user'

interface authStateI {
  isConnected: boolean,
  user : User | {} ,
  tokens : {
      token : string, 
      refreshToken : string
  }
}

const initialState: authStateI = {
    isConnected: false,
    user : {} as User ,
    tokens : {
        token : "", 
        refreshToken : ""
    }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isConnected = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    logout: (state) => {
        state = initialState
    }
  },
})

export const { login, logout } = authSlice.actions