import React, { useEffect, useRef, useState } from 'react'
import "./tasklists.scss"
import { useSelector, useDispatch } from 'react-redux'
import { addTask, setTask } from '../../redux/features/TaskList/TaskList'
import TaskItem from '../../components/TaskItem/TaskItem'
import { checkNull } from '../../validation/validation'
import { createNote, setCreateResultFalse } from '../../redux/features/note/noteSlice'
import { getListFolder } from '../../redux/features/folder/folderSlice'
import { useNavigate } from 'react-router-dom'
export default function TaskLists() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getListFolder())
    dispatch(setTask([]))
  },[])
  const {listFolder } = useSelector(state => state.folderSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  const { TaskList } = useSelector(state => state.taskListSlice)
  const {createResult } = useSelector(state => state.noteSlice)
  const navigate = useNavigate()
  if(createResult){
    navigate(`/updatetasklist/${createResult?.id}`)
    dispatch(setCreateResultFalse())
  }
  const titleRef = useRef("")
  const statusRef = useRef(null)
  const folderRef = useRef(null)
  const password_accessRef = useRef(null)
  const password_editRef = useRef(null)
  const newTaskRef = useRef(null);
  const taskStatusRef = useRef(null);
  const [errNewTask,setErrorNewTask] = useState(false)
  const [errTitle, setErrTitle] = useState(false);
  const handleAddNewTask = () => {
    const isChecked = taskStatusRef.current?.value;
    const newTask = newTaskRef.current?.value;
    checkNull(newTask) ? setErrorNewTask(false): setErrorNewTask("task must not null")
    const flag = checkNull(newTask)
    if(flag){

      if(TaskList.length === 0){
        dispatch(addTask({
          id: 0,
          content: newTask,
          status: isChecked
        }))
      }else{
        dispatch(addTask({
          id: TaskList[TaskList.length-1].id + 1,
          content: newTask,
          status: isChecked
        }))
      }

    }
  }
  const handleSubmit = () => {
    const titleValue = titleRef.current?.value;
    !checkNull(titleValue) ? setErrTitle("Title không được bỏ trống") : setErrTitle(false)
    const statusValue = statusRef.current?.value
    let folderValue = folderRef.current?.value
    if (folderValue === "Choose Folder") {
      folderValue = null
    }
    const password_access = password_accessRef.current?.value
    const password_edit = password_editRef.current?.value
    const flag =  checkNull(titleValue)
    if (flag) {
      if (statusValue === "protected") {
        dispatch(createNote({
          title: titleValue,
          note_type: "TaskList",
          status: statusValue,
          TaskList:TaskList,
          folder_id: folderValue,
          password_access,
          password_edit
        }))

      } else {
        dispatch(createNote({
          title: titleValue,
          note_type: "TaskList",
          status: statusValue,
          TaskList:TaskList,
          folder_id: folderValue,
        }))

      }

    }
  };

  return (
    <div className='container'>
      <h1 class="bard-hello">TaskList</h1>
      <form className='mt-3'>
        <div class="mb-3">
          <input type="text" class="form-control" ref={titleRef} placeholder='Note Title' />
          {errTitle ? <p style={{ color: "red" }}>{errTitle}</p> : null}
        </div>

        <div class="d-flex gap-2 align-items-start mb-4">
          
            <div data-mdb-input-init class="form-outline">
              <input type="text" ref={newTaskRef} class="form-control" placeholder='Add new task here' />
              {errNewTask ? <p style={{color:"red",margin:"0"}}>{errNewTask}</p> : null}
            </div>
            
       

          <div >
            <select class="form-select" ref={taskStatusRef} >
              <option value={false} >False</option>
              <option value={true} >True</option>
            </select>
          </div>
          <div >
            <button type='button' className='btn btn-primary' onClick={() => handleAddNewTask()}>Add</button>
          </div>
        </div>

        <table class="table mt-3 mb-3">
          <thead>
            <tr>
       
              <th scope="col">TaskName</th>
              <th scope="col">Status</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {
                  TaskList?.map((item,index) => (
                    <TaskItem item={item} key={item?.id} edit={true}/>
                  ))  
            }
          </tbody>
        </table>



        <select class="form-select mt-4" ref={folderRef} aria-label="Default select example">
          <option >Choose Folder</option>
          {listFolder?.map((folder)=>(
            <option value={folder?.id} >{folder?.name}</option>
          ))}
        </select>

        {userInformation?.user?.role === "GUEST" ? <select class="form-select mt-3" ref={statusRef} aria-label="Default select example" >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select> : <button type="button" class="btn btn-default mt-3" data-bs-toggle="modal" data-bs-target="#modelsetstatus">
          Note Read Permission
        </button>}

        <br />


        <button type="button" onClick={() => handleSubmit()} class="btn btn-primary mt-3">Submit</button>
      </form>

      <div class="modal fade" id="modelsetstatus" tabindex="-1" aria-labelledby="modelsetstatus" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modelsetstatus">Note Read Permission</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <select class="form-select mt-3" ref={statusRef}  >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="protected">Protected</option>
                </select>

                <div class="mb-3 mt-3">
                  <input type="password" ref={password_accessRef} class="form-control" placeholder='Password For Protected Note' />
                </div>

                <div class="mb-3 row">
                  <label for="inputPassword" class="col-form-label">Note Edit Permission</label>
                  <div class="">
                    <input type="password" ref={password_editRef} class="form-control" placeholder='Editor Password' />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
