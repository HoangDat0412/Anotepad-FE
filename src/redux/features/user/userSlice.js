import { createSlice } from '@reduxjs/toolkit'
import { TOKEN } from '../../../utils/config';
import { service } from '../../../services/baseService';


// const thongTinNguoiDung = localStorage.getItem("THONG_TIN_NGUOI_DUNG")
// ? JSON.parse(localStorage.getItem("THONG_TIN_NGUOI_DUNG"))
// : {};

const initialState = {
  userLogin: null,
  userInformation: {
    user:{
      role:"GUEST",
    }
  },
  UserInformationStatus:false,
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
  userInfo:{
    user:{
      email:""
    }
  },
  listLoginHistory:[],
  resetPassStatus:false
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
      state.UserInformationStatus = true
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
    setUserNameAction:(state,action)=>{
      state.userInformation.user.user_name = action.payload
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
    },
    setResetPassStatus: (state,action)=>{
      state.resetPassStatus = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setResetPassStatus,setUserNameAction,setloginHistory,dangNhapAction,setInfoAction,setResponseRegister,logoutAction,setEmailAction,setListUser,setDashBoardInfo,adminSetUserInfo,setEmail,setPassword,setRole } = userSlice.actions

export default userSlice.reducer
// action api 
export const registerCookieActionApi = () => {
  return async (dispatch) => {
    try {
      const result = await service.get(`/user/register/cookie`)
      if(result.status === 201){
        dispatch(dangNhapAction(result.data));
        dispatch(getUserInfomation())
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
        alert("Create account success. Please verify your email !")
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
      if(result.status === 403){
        dispatch(logoutActionApi())
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
      alert("wrong email or password")
    }
  };
}
export const updateUserApi = (data) =>{
  return async (dispatch) => {
    try {
      const result = await service.put(`/user/update`,data)
      if(result.status === 200){
        alert("update success")
        dispatch(getUserInfomation())
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
export const logoutActionApi = ()=>{
  return async (dispatch) => {
    dispatch(logoutAction())
    dispatch(registerCookieActionApi())
  }
}

export const updateAccountPassword = (data) =>{
  return async (dispatch) => {
    try {
      const result = await service.post(`/user/updatepassword`,data)
      if(result.status === 200){
        alert("update password success")
      }if(result.status === 401){
        alert("password is not correct")
      }
    } catch (error) {
      alert("update false")
    }
  };
}

export const forgotPassword = (data) => {
  return async (dispatch) =>{
    try {
      const result = await service.post(`/user/forgotpassword`,data)
      if(result.status === 200){
        alert("The link to reset your password already send to your email !")
      }
      if(result.status === 404){
        alert("Not found your email !")
      }
    } catch (error) {
      alert("Not found your email !")
    }
  }
}
export const resetPassword = (email,token,data)=>{
  return async (dispatch)=>{
    try {
      const result = await service.post(`/user/resetpassword/${email}/${token}`,data)
      if(result.status === 200){
        alert("Your password change success !")
        dispatch(setResetPassStatus(true))
      }
      if(result.status === 401){
        alert("The link reset password has expired")
      }
      if(result.status === 404){
        alert("Not found the email")
      }
    } catch (error) {
      alert("The link reset password has expired")
    }
  }
}
