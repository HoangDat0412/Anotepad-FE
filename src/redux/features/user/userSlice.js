import { createSlice } from '@reduxjs/toolkit'
import { DOMAIN, TOKEN, USER_LOGIN } from '../../../utils/config';
import { service } from '../../../services/baseService';
import axios from 'axios';

// const thongTinNguoiDung = localStorage.getItem("THONG_TIN_NGUOI_DUNG")
// ? JSON.parse(localStorage.getItem("THONG_TIN_NGUOI_DUNG"))
// : {};

const initialState = {
  userLogin: null,
  userInformation: {
    user:{
      role:"GUEST"
    }
  },
  userList:[],
  userGuestLength:0,
  userLength:0,
  responseRegister: false,
  errorRegister: null,
  responseLogin:false,
  updateSuccess:true,
  updateFasle:null,
  userCheckoutList:null,
  userUpdate:{},
  userUpdateResult:true,
  dashboardInfo:{},
  userInfo:{},
  listLoginHistory:[],
 
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    dangNhapAction: (state, action) => {
      localStorage.setItem(TOKEN, action.payload?.token);
      state.userLogin = action.payload;
      state.responseLogin = true
    },
    setInfoAction: (state, action) => {
      state.userInformation = action.payload;
    },
    setResponseRegister:(state,action)=>{
      state.responseRegister = action.payload
    },
    logoutAction:(state,action)=>{
      localStorage.removeItem(TOKEN);
      state.userInformation = null;
      state.responseRegister = null;
    },
    setEmailAction:(state,action)=>{
      state.userInformation.user.email = action.payload
    },
    setListUser:(state,action)=>{
      state.userList = action.payload
    },
    setDashBoardInfo:(state,action)=>{
      state.dashboardInfo = action.payload
    },
    adminSetUserInfo:(state,action)=>{
      state.userInfo = action.payload
    },
    setEmail:(state,action)=>{
      state.userInfo.user.email = action.payload
    },
    setPassword:(state,action)=>{
      state.userInfo.user.password = action.payload
    },
    setRole:(state,action)=>{
      state.userInfo.user.role = action.payload
    },
    setloginHistory:(state,action)=>{
      state.listLoginHistory = action.payload
      console.log(state.listLoginHistory);
    }
  },
})

// Action creators are generated for each case reducer function
export const {setloginHistory,dangNhapAction,setInfoAction,setResponseRegister,logoutAction,setEmailAction,setListUser,setDashBoardInfo,adminSetUserInfo,setEmail,setPassword,setRole } = userSlice.actions

export default userSlice.reducer

// action api 
export const registerCookieActionApi = () => {
  
  return async (dispatch) => {
    try {
      const result = await service.get(`/user/register/cookie`)
      if(result.status === 201){
        dispatch(dangNhapAction(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerApi = (data)=>{
  return async (dispatch) => {
    try {
      const result = await service.post(`/user/register`,data)
      if(result.status === 201){
        dispatch(setResponseRegister(true));
      }
    } catch (error) {
      alert(error.response.data)
    }
  };
}

export const getUserInfomation = ()=>{
  return async (dispatch) =>{
    try {
      const result = await service.get(`/user/information`)
      if(result.status === 200){
        dispatch(setInfoAction(result.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const loginApi = (data) =>{
  return async (dispatch) => {
    try {
      const result = await service.post(`/user/login`,data)
      if(result.status === 200){
        dispatch(dangNhapAction(result.data));
        dispatch(getUserInfomation())
      }
    } catch (error) {
      alert(error.response.data)
    }
  };
}

export const updateUserApi = (data) =>{
  return async (dispatch) => {
    try {
      const result = await service.put(`/user/update`,data)
      if(result.status === 200){
        alert("update success")
      }
    } catch (error) {
      alert("update false")
    }
  };
}

export const getAllUser = () => {
  
  return async (dispatch) => {
    try {
      const result = await service.get(`/user`)
      if(result.status === 200){
        dispatch(setListUser(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDashboardInfo = () => {
  
  return async (dispatch) => {
    try {
      const result = await service.get(`/user/dashboard/info`)
      if(result.status === 200){
        dispatch(setDashBoardInfo(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) =>{
  return async (dispatch) => {
    try {
      const result = await service.delete(`/user/${id}`)
      if(result.status === 200){
        alert("Delete success")
        dispatch(getAllUser());
      }
    } catch (error) {
      console.log(error);
      alert("Delete false")
    }
  };
}
export const getUserById = (id) =>{
  return async (dispatch) => {
    try {
      const result = await service.get(`/user/${id}`)
      if(result.status === 200){
        dispatch(adminSetUserInfo(result?.data))
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const updateUserById = (id,data)=>{
  return async (dispatch) => {
    try {
      const result = await service.put(`/user/${id}`,data)
      if(result.status === 200){
        alert("update success")
      }
    } catch (error) {
      alert("update false")
    }
  };
}

export const loginHistoryApi = ()=>{
  return async (dispatch) =>{
    try {
      const result = await service.get('/user/loginhistory')
      if(result.status === 200){
        dispatch(setloginHistory(result?.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

