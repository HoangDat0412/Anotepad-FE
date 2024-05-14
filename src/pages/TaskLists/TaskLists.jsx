import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./tasklists.scss"
import { useSelector, useDispatch } from 'react-redux'
import { addTask, setTask } from '../../redux/features/TaskList/TaskList'
import TaskItem from '../../components/TaskItem/TaskItem'
import { checkNull } from '../../validation/validation'
import { createNote, setCreateResultFalse } from '../../redux/features/note/noteSlice'
import { getListFolder } from '../../redux/features/folder/folderSlice'
import { useNavigate, useParams } from 'react-router-dom'
export default function TaskLists() {
  const dispatch = useDispatch()
  const clearTasks = useCallback(() => {
    dispatch(setTask([]));
  }, [dispatch]);

  const fetchListFolder = useCallback(() => {
    dispatch(getListFolder());
  }, [dispatch]);
  useEffect(() => {
    clearTasks()
    fetchListFolder()
  }, [clearTasks, fetchListFolder]);
  const { listFolder } = useSelector(state => state.folderSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  const { TaskList } = useSelector(state => state.taskListSlice)
  const { createResult } = useSelector(state => state.noteSlice)
  const navigate = useNavigate()
  if (createResult) {
    navigate(`/updatetasklist/${createResult?.id}`)
    dispatch(setCreateResultFalse())
  }

  const params = useParams()
  const titleRef = useRef("")
  const statusRef = useRef(null)
  // const folderRef = useRef(params.id)
  const [folderRef,setFolderRef] = useState(params.folderid)
  const password_accessRef = useRef(null)
  const password_editRef = useRef(null)
  const [newTask,setNewTask] = useState('') 
  const [errNewTask, setErrorNewTask] = useState(false)
  const taskStatusRef = useRef(null);
  const [errTitle, setErrTitle] = useState(false);

  const [deadline,setDeadline] = useState(null)
  const [errDeadline,setErrDeadline] = useState(false)
  const handleAddNewTask = () => {
    const isChecked = taskStatusRef.current?.value;
    checkNull(newTask) ? setErrorNewTask(false) : setErrorNewTask("task must not null")
    checkNull(deadline) ? setErrDeadline(false) : setErrDeadline("dealine must not null")
    const flag = checkNull(newTask) && checkNull(deadline)
    if (flag) {
      if (TaskList.length === 0) {
        dispatch(addTask({
          id: 0,
          content: newTask,
          status: isChecked,
          deadline: deadline
        }))
      } else {
        dispatch(addTask({
          id: TaskList[TaskList.length - 1].id + 1,
          content: newTask,
          status: isChecked,
          deadline: deadline
        }))
      }
      setDeadline("")
      setNewTask("")
    }
  }
  const handleSubmit = () => {
    const titleValue = titleRef.current?.value;
    !checkNull(titleValue) ? setErrTitle("Title must not null") : setErrTitle(false)
    const statusValue = statusRef.current?.value
    let folderValue = folderRef

    const password_access = password_accessRef.current?.value
    const password_edit = password_editRef.current?.value
    const flag = checkNull(titleValue)
    if (flag) {
      if (statusValue === "protected") {
        dispatch(createNote({
          title: titleValue,
          note_type: "TaskList",
          status: statusValue,
          TaskList: TaskList,
          folder_id: folderValue,
          password_access,
          password_edit
        }))

      } else {
        dispatch(createNote({
          title: titleValue,
          note_type: "TaskList",
          status: statusValue,
          TaskList: TaskList,
          folder_id: folderValue,
        }))

      }
    }
  };

  return (
    <div className='container-fluid container-lg'>
      <h1 class="bard-hello">TaskList</h1>
      <form className='mt-3'>
        <div class="mb-3">
          <input type="text" class="form-control" ref={titleRef} placeholder='Note Title' />
          {errTitle ? <p style={{ color: "red" }}>{errTitle}</p> : null}
        </div>
        <div class="d-flex gap-2 align-items-end ">
          <div data-mdb-input-init class="form-outline">
            <label style={{fontSize:"14px"}} className="form-label">New Task</label>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} class="form-control" placeholder='Add new task here' />
            
          </div>
          <div >
          <label style={{fontSize:"14px"}} className="form-label">Status</label>
            <select class="form-select" ref={taskStatusRef} >
              <option value={false} >In Progress</option>
              <option value={true} >Done</option>
            </select>
          </div>
          <div>
          <label style={{fontSize:"14px"}} className="form-label">Deadline</label>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} class="form-control"/>
          </div>
          <div>
            <button type='button' className='button-4' onClick={() => handleAddNewTask()}>Add Task</button>
          </div>
        </div>
        <div className='d-flex'>
        {errNewTask ? <p className='mb-4' style={{ color: "red", margin: "0" }}>{errNewTask}</p> : <p className='mb-4'></p>}
        {errDeadline ? <p className='mb-4' style={{ color: "red", margin: "0" }}> ,  <span className='ps-1'>{errDeadline}</span></p> : <p className='mb-4'></p>}
        </div>
        {
          TaskList?.length > 0 ?        <table class="table table-striped mt-3 mb-3">
          <thead>
            <tr>
              <th scope="col">TaskName</th>
              <th scope="col">Status</th>
              <th scope="col">Deadline</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              TaskList?.map((item, index) => (
                <TaskItem item={item} key={item?.id} edit={true} />
              ))
            }
          </tbody>
        </table> : ""
        }



        <select class="form-select mt-4" value={folderRef} onChange={(e) => setFolderRef(e.target.value)} aria-label="Default select example">
          <option value={0} >Choose Folder</option>
          {listFolder?.map((folder) => (
            <option value={folder?.id} >{folder?.name}</option>
          ))}
        </select>

        {userInformation?.user?.role === "GUEST" ? <select class="form-select mt-3" ref={statusRef} aria-label="Default select example" >
          <option value="private">Private</option>
        </select> : <button type="button" class="button-4 mt-3" data-bs-toggle="modal" data-bs-target="#modelsetstatus">
          Note Read Permission
        </button>}

        <br />


        <button type="button" onClick={() => handleSubmit()} class="button-8 mt-3">Create TaskList</button>
      </form>
          {
            userInformation?.user?.role !== "GUEST" ?     <div class="modal fade" id="modelsetstatus" tabindex="-1" aria-labelledby="modelsetstatus" aria-hidden="true">
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
              </div>
            </div>
          </div> : ""
          }
  
    </div>
  )
}
