import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:null,
    
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInstart:(state)=>{
          state.loading=true;

        },
        signInSuccess:(state,action)=>{
           state.currentUser=action.payload;
           state.loading=false;
        },
        signInFailed:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        UpdateprofileSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;

        },
        UpdateprofileFail:(state,action)=>{
          state.loading=false,
          state.error=action.payload
        },
        UpdateprofileStart:(state)=>{
            state.loading=true;
            
        },
        deleteUserStart:(state)=>{
          state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signoutUserStart:(state)=>{
            state.loading=true;
          },
          signoutUserSuccess:(state)=>{
              state.currentUser=null;
              state.loading=false;
              state.error=null;
          },
         signoutUserFail:(state,action)=>{
              state.error=action.payload;
              state.loading=false;
          },
          clearError: (state) => {
            state.error = null;
          }
    }
})
export const{signInstart,signInFailed,signInSuccess,UpdateprofileStart,UpdateprofileSuccess,UpdateprofileFail,deleteUserFail,deleteUserStart,deleteUserSuccess,signoutUserFail,signoutUserStart,signoutUserSuccess,clearError}=userSlice.actions;
export default userSlice.reducer;