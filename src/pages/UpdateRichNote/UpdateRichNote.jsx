import React, { useCallback, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RichNoteEdit from '../../components/RichNote/RichNote';
import { accessPermissionApi, getNote, getNotePermission } from '../../redux/features/note/noteSlice';
import RichNoteViewOnly from '../../components/RichNoteViewOnly/RichNoteViewOnly';

export default function UpdateRichNote() {
  const dispatch = useDispatch()
  const { noteDetail, notePermission } = useSelector(state => state.noteSlice)
  const {UserInformationStatus} = useSelector(state => state.userSlice)
  const param = useParams()
  const fetchData = useCallback(() => {
    if(UserInformationStatus){
      dispatch(getNote(param.id));
      dispatch(getNotePermission(param.id));
    }
    
  }, [UserInformationStatus,dispatch,param.id]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const passwordAccess = useRef("")

  const handleAccess = ()=>{
    dispatch(accessPermissionApi({
      note_id:parseInt(param.id),
      password_access:passwordAccess.current?.value
    }))
  }
 
  
  // console.log("note permisss", notePermission?.permission);
  if (notePermission?.permission === "ALL" || notePermission?.permission === "EDIT") {
    return (
      <RichNoteEdit />
    )
  } else if (noteDetail?.note?.status === "public") {
    return (
      <RichNoteViewOnly />
    )
  } else if (noteDetail?.note?.status === "protected") {
    if (notePermission) {
      return (
        <RichNoteViewOnly />
      )
    } else {
      return (
        <div>
          <div class="input-group">
                <input type="password" class="form-control" ref={passwordAccess} placeholder='Access permission password' />
                <span style={{ cursor: "pointer" }} class="input-group-text" onClick={() => handleAccess()}>Submit</span>
              </div>
        </div>
      )
    }
  } else {
    return (
      <div>
        Page Not Found !
      </div>
    )
  }

}
