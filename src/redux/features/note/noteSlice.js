import { createSlice } from '@reduxjs/toolkit'
import { service } from '../../../services/baseService';
import { setTask } from '../TaskList/TaskList';
import { toast } from 'react-toastify';
const initialState = {
    listNote:{},
    noteDetail:{},
    createResult:false,
    notePermission:false,
    noteTodayandMonth:{},
    highlightnotes : [],
    notehistory:{},
    searchResult:[],
    listNoteRecycle:[]
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
    },
    setListHighLight:(state,action)=>{
      state.highlightnotes = action.payload
    },
    setNoteHistoryAction:(state,action) => {
      // const 
      console.log("notehistory",action.payload);
      let NoteInMonth = action.payload?.NoteInMonth
      NoteInMonth = NoteInMonth.filter(item => item.deletenote === 0)
      let noteInDay = action.payload?.noteInDay
      noteInDay = noteInDay.filter(item => item.deletenote === 0)
      const notehistory = {
        NoteInMonth,
        noteInDay
      }
      console.log(notehistory);
      state.notehistory = notehistory
    },
    setSearchResult:(state,action)=>{
      state.searchResult = action.payload.filter(item => item.deletenote === false)
    },
    setListNoteRecycle:(state,action) =>{
      state.listNoteRecycle = [...action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const {setListNoteRecycle,setSearchResult,setNoteHistoryAction,setNoteTodayandMoth,setListHighLight,setListNoteAction,setCreateResult,setCreateResultFalse,setNotePermission,setNoteDetail,setTitleAction,setStatusAction,setFolderAction,setPassword_accessAction,setPassword_editAction } = noteSlice.actions

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
        toast.success("Create Note Success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Create Note False");
    }
  }
}

export const updateNote = (id,data) =>{
  return async (dispatch) =>{
    try {
      const result = await service.put(`/note/${id}`,data)
      if(result.status === 200){
        toast.success("Update Note Success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update Note False");
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

export const getListNoteRecycle = () =>{
  return async (dispatch) =>{
    try {
      const result = await service.get(`/note/getlistnote/deleted`)
      if(result.status === 200){
        dispatch(setListNoteRecycle(result.data))
      }
    } catch (error) {
      // toast.error("Get note false");
    }
  }
}
export const RecycleNote = (id) =>{
  return async (dispatch) =>{
    try {
      const result = await service.get(`/note/returnnote/${id}`)
      if(result.status === 200){
        
        dispatch(getListNoteRecycle())
        toast.success("Recycle note success !")
      }
    } catch (error) {
      toast.error("Recycle note false !");
    }
  }
}
export const DeleteRecycleNote = (id) =>{
  return async (dispatch) =>{
    try {
      const result = await service.delete(`/note/deletenote/${id}`)
      if(result.status === 200){
        
        dispatch(getListNoteRecycle())
        toast.success("Delete recycle note success !")
      }
    } catch (error) {
      toast.error("Get note false");
    }
  }
}

export const deleteNote = (data) => {
  return async (dispatch) => {
    try {
      const res = await service.delete(`/note/${data?.id}`)
      if(res.status === 200){
        toast.success("Delete Note Success");
        if(data?.type === "Today"){
          dispatch(getNoteTodayandMonthApi())
          dispatch(getAllNote())
          dispatch(setListHighLightNote())
        }
        if(data?.type === "Highlight"){
          dispatch(setListHighLightNote())
          dispatch(getAllNote())
          dispatch(getNoteTodayandMonthApi())
        }
        if(data?.type === "Folder"){
          if(data?.folderid === 0){
            dispatch(getAllNote())
            dispatch(setListHighLightNote())
            dispatch(getNoteTodayandMonthApi())
          }else{
            dispatch(getNote(data?.folderid))
            dispatch(setListHighLightNote())
            dispatch(getNoteTodayandMonthApi())
          }
        }

        // dispatch(getAllNote())

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
        toast.success("Access success");
      }else{
        toast.error("Wrong password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong password");
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
        toast.success("Access success");
      }else{
        toast.error("Wrong password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong password");
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

export const setHighLightNote = (id)=>{
  return async (dispatch) =>{
    try {
      const result = await service.get(`/note/highlight/${id}`)
      if(result.status=== 200){
        dispatch(getNote(id))
        toast.success("Set highlight note success");
      }else{
        toast.error("False to set highlight note");
      }
    } catch (error) {
      toast.error("False to set highlight note");
    }
  }
}

export const setListHighLightNote = ()=>{
  return async (dispatch) =>{
    try {
      const result = await service.get(`/note/highlights/list`)
      if(result.status=== 200){
        dispatch(setListHighLight(result.data))
      }
    } catch (error) {
      console.log(error);
      dispatch(setListHighLight({}))
    }
  }
}

export const setNoteHistory = (data) => {
  return async (dispatch) =>{
    try {
      await service.post(`/notehistory`,data)  
    } catch (error) {
      console.log(error);
    }
  }
}

export const getUserNoteHistory = () => {
  return async (dispatch) =>{
    try {
      const result = await service.get(`/notehistory`)  
      if(result.status === 200){
        dispatch(setNoteHistoryAction(result.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const SearchNote = (name) => {
  return async (dispatch) =>{
    try {
      const result = await service.get(`/note/search/${name}`)  
      if(result.status === 200){
        dispatch(setSearchResult(result.data))
      }else{
        dispatch(setSearchResult([]))
      }
    } catch (error) {
      console.log(error);
      dispatch(setSearchResult([]))
    }
  }
}

