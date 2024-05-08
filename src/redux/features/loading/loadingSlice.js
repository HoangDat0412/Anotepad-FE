import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showSidebar:true
}

export const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    setShowSidebar :(state,action)=>{
        state.showSidebar = action?.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setShowSidebar } = loadingSlice.actions

export default loadingSlice.reducer

