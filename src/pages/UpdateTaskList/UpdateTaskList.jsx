import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accessPermissionApi, getNote, getNotePermission } from '../../redux/features/note/noteSlice';
import TaskListUpdate from '../../components/TaskListUpdate/TaskListUpdate';
import TaskListViewOnly from '../../components/TaskListViewOnly/TaskListViewOnly';

export default function UpdateTaskList() {
  const dispatch = useDispatch()
  const param = useParams()
  useEffect(() => {
    dispatch(getNote(param.id))
    dispatch(getNotePermission(param.id))
  }, []);
  const passwordAccess = useRef("")
  const handleAccess = ()=>{
    dispatch(accessPermissionApi({
      note_id:parseInt(param.id),
      password_access:passwordAccess.current?.value
    }))
  }
  const { noteDetail, notePermission } = useSelector(state => state.noteSlice)
  
  // console.log("note permisss", notePermission?.permission);
  if (notePermission?.permission === "ALL" || notePermission?.permission === "EDIT") {
    return (
      <TaskListUpdate/>
    )
  } else if (noteDetail?.note?.status === "public") {
    return (
      <TaskListViewOnly/>
    )
  } else if (noteDetail?.note?.status === "protected") {
    if (notePermission) {
      return (
      <TaskListViewOnly/>
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
