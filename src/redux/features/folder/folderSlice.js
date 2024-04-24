import { createSlice } from '@reduxjs/toolkit'
import { service } from '../../../services/baseService';

const initialState = {
    listFolder:[],
    listNote:[]
}

export const folderSlice = createSlice({
  name: 'folderSlice',
  initialState,
  reducers: {
    setFolderList: (state,action)=>{
        state.listFolder = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setFolderList} = folderSlice.actions

export default folderSlice.reducer



export const getListFolder = (data) =>{
  return async (dispatch) =>{
    try {
      const result = await service.get('/folder/folders',data)
      if(result.status === 200){
        dispatch(setFolderList(result?.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const createFolder = (data) => {
    return async (dispatch) =>{
        try {
          const result = await service.post('/folder',data)
          if(result.status === 201){
            dispatch(getListFolder())
          }
        } catch (error) {
          console.log(error);
        }
      }
}
export const updateFolder = (id,data) => {
    return async (dispatch) =>{
        try {
          const result = await service.put(`/folder/${id}`,data)
          if(result.status === 200){
            dispatch(getListFolder())
          }
        } catch (error) {
          console.log(error);
        }
      }
}
export const deleteFolder = (id) => {
    return async (dispatch) =>{
        try {
          const result = await service.delete(`/folder/${id}`)
          if(result.status === 200){
            dispatch(getListFolder())
          }
        } catch (error) {
          console.log(error);
        }
      }
}
