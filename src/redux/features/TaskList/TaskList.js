import { createSlice } from '@reduxjs/toolkit'


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


