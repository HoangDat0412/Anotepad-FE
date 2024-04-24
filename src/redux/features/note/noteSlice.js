import { createSlice } from '@reduxjs/toolkit'
import { DOMAIN, TOKEN, USER_LOGIN } from '../../../utils/config';
import { service } from '../../../services/baseService';
import { setTask } from '../TaskList/TaskList';

const initialState = {
    listNote:[],
    noteDetail:{},
    createResult:false,
    notePermission:false,
    noteTodayandMonth:{}
}

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {
    setListNoteAction: (state, action) => {
      state.listNote = action.payload;
    },
    setNoteDetail:(state,action)=>{
      state.noteDetail = action?.payload
      console.log(state.noteDetail);
    },
    setTitleAction:(state,action)=>{
      state.noteDetail.note.title = action.payload
    },
    setStatusAction:(state,action)=>{
      state.noteDetail.note.status = action.payload
    },
    setFolderAction:(state,action)=>{
      state.noteDetail.note.folder = action.payload
    },
    setPassword_accessAction:(state,action)=>{
      state.noteDetail.note.password_access = action.payload
    },
    setPassword_editAction:(state,action)=>{
      state.noteDetail.note.password_edit = action.payload
    },
    setCreateResult:(state,action)=>{
      state.createResult = {
        id:action.payload.note.id
      }
    },
    setCreateResultFalse:(state,action)=>{
      state.createResult = false
    },
    setNotePermission : (state,action)=>{
      state.notePermission = action.payload
    },
    setNoteTodayandMoth : (state,action) =>{
      state.noteTodayandMonth = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setNoteTodayandMoth,setListNoteAction,setCreateResult,setCreateResultFalse,setNotePermission,setNoteDetail,setTitleAction,setStatusAction,setFolderAction,setPassword_accessAction,setPassword_editAction } = noteSlice.actions

export default noteSlice.reducer

// action api 
export const getAllNote = () => {
  
  return async (dispatch) => {
    try {
      const result = await service.get(`/note`)
      if(result.status === 200){
        dispatch(setListNoteAction(result.data));
      }
    } catch (error) {
      // dispatch(setErrorRegister(error));
      console.log(error);
    }
  };
};

export const getNoteInFolder = (id) => {
  return async (dispatch) =>{
      try {
        console.log(id);
        const result = await service.get(`/folder/${id}`)
        if(result.status === 200){
          dispatch(setListNoteAction(result?.data))
        }
      } catch (error) {
        console.log(error);
      }
    }
}

export const createNote = (data) =>{
  return async (dispatch) =>{
    try {
      const result = await service.post('/note',data)
      if(result.status === 201){
        dispatch(setCreateResult(result.data))
      }
    } catch (error) {
      console.log(error);
      alert("Create false !")
    }
  }
}

export const updateNote = (id,data) =>{
  return async (dispatch) =>{
    try {
      const result = await service.put(`/note/${id}`,data)
      if(result.status === 200){
        alert("Update success !")
      }
    } catch (error) {
      console.log(error);
      alert("Update false !")
    }
  }
}
export const getNote = (id) => {
  return async (dispatch) => {
    try {
      const res = await service.get(`/note/${id}`)
      dispatch(setNoteDetail(res.data))
      if(res.data.content.length > 0){
        dispatch(setTask(res.data.content))
      }
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      const res = await service.delete(`/note/${id}`)
      if(res.status === 200){
        dispatch(getAllNote())
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getNotePermission = (id) =>{
  return async (dispatch) => {
    try {
      const res = await service.get(`/note/getpermission/${id}`)
      if(res.status === 200){
        dispatch(setNotePermission(res?.data))
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const accessPermissionApi =  (data)=>{
  return async (dispatch)=>{
    try {
      const result = await service.post(`/note/accesspermission`,data)
      if(result.status === 201){
        dispatch(getNotePermission(data.note_id))
        dispatch(getNote(data.note_id))
      }else{
        alert("wrong password")
      }
    } catch (error) {
      console.log(error);
      alert("wrong password")
    }
  }
}
export const editPermissionApi =(data)=>{
  return async (dispatch)=>{
    try {
      const result = await service.post(`/note/editpermission`,data)
      console.log(data);
      console.log(result);
      if(result.status === 201){
        dispatch(getNotePermission(data.note_id))
        dispatch(getNote(data.note_id))
      }
      if(result.status === 200){
        dispatch(getNotePermission(data.note_id))
        dispatch(getNote(data.note_id))
      }else{
        alert("wrong password")
      }
    } catch (error) {
      console.log(error);
      alert("wrong password")
    }
  }
}

export const getNoteTodayandMonthApi = ()=>{
  return async (dispatch)=>{
    try {
      const result = await service.get('/note/getNoteIn/DayandMonth')
      dispatch(setNoteTodayandMoth(result?.data))
    } catch (error) {
      console.log(error);
    }
  }
}

