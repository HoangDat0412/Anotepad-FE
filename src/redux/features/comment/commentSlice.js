import { createSlice } from '@reduxjs/toolkit'
import { service } from '../../../services/baseService';

const initialState = {
    listComment:[]
}

export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    setCommentList: (state,action)=>{
        state.listComment = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setCommentList} = commentSlice.actions

export default commentSlice.reducer



export const getListComment = (id) =>{
  return async (dispatch) =>{
    try {
      const result = await service.get(`/comment/${id}`)
      if(result.status === 200){
        dispatch(setCommentList(result?.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const createComment = (id,data) => {
    return async (dispatch) =>{
        try {
          const result = await service.post(`/comment/${id}`,data)
          if(result.status === 201){
            dispatch(getListComment(id))
          }
        } catch (error) {
          console.log(error);
        }
      }
}

export const deleteComment = (id,commentid) => {
    return async (dispatch) =>{
        try {
          const result = await service.delete(`/comment/${commentid}`)
          if(result.status === 200){
            dispatch(getListComment(id))
          }
        } catch (error) {
          console.log(error);
        }
      }
}
