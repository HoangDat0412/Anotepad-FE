import { createSlice } from '@reduxjs/toolkit'
import { TOKEN, USER_LOGIN } from '../../../utils/config';

// const thongTinNguoiDung = localStorage.getItem("THONG_TIN_NGUOI_DUNG")
// ? JSON.parse(localStorage.getItem("THONG_TIN_NGUOI_DUNG"))
// : {};

const initialState = {
    TaskList:[]
}

export const taskListSlice = createSlice({
  name: 'taskListSlice',
  initialState,
  reducers: {
    addTask :(state,action)=>{
        state.TaskList.push(action.payload)
    },
    updateTask : (state,action)=>{
      for (let index = 0; index < state.TaskList.length; index++) {
        if(state.TaskList[index].id === action.payload.id){
          state.TaskList[index] = action.payload
        }
      }
    },
    deleteTask : (state,action)=>{
       state.TaskList = state.TaskList.filter(item => item.id !== action.payload)
    },
    setTask : (state,action)=>{
      state.TaskList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTask,updateTask,deleteTask,setTask } = taskListSlice.actions

export default taskListSlice.reducer

// action api 


