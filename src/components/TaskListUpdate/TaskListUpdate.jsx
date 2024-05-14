import React, { useCallback, useEffect, useRef, useState } from 'react'
import {  setFolderAction, setHighLightNote, setNoteHistory, setPassword_accessAction, setPassword_editAction, setStatusAction, setTitleAction, updateNote } from '../../redux/features/note/noteSlice';
import { getListFolder } from '../../redux/features/folder/folderSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../../components/TaskItem/TaskItem';
import { checkNull } from '../../validation/validation';
import { addTask } from '../../redux/features/TaskList/TaskList';
import Comment from '../Comment/Comment';
import { EmailShareButton, FacebookMessengerShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { DOMAIN_FE } from '../../utils/config';

export default function TaskListUpdate() {
  const param = useParams()
  const dispatch = useDispatch()

  const fetchData = useCallback(() => {
    dispatch(getListFolder());
    dispatch(setNoteHistory({
      note_id:param.id
    }))
  }, [dispatch, param.id]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);
  const { listFolder } = useSelector(state => state.folderSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  const { noteDetail } = useSelector(state => state.noteSlice)
  const { TaskList } = useSelector(state => state.taskListSlice)
  const [errTitle, setErrTitle] = useState(false);
  const newTaskRef = useRef(null);
  const taskStatusRef = useRef(null);
  const [errNewTask, setErrorNewTask] = useState(false)
  const handleSubmit = () => {
    !checkNull(noteDetail?.note?.title) ? setErrTitle("Title không được bỏ trống") : setErrTitle(false)
    const flag = checkNull(noteDetail?.note?.title)
    if (flag) {
      if (noteDetail?.note?.status === "protected") {
        dispatch(updateNote(param.id, {
          title: noteDetail?.note?.title,
          note_type: "TaskList",
          status: noteDetail?.note?.status,
          content: TaskList,
          folder_id: noteDetail?.note?.folder,
          password_access: noteDetail?.note?.password_access,
          password_edit: noteDetail?.note?.password_edit
        }))
      } else {
        dispatch(updateNote(param.id, {
          title: noteDetail?.note?.title,
          note_type: "TaskList",
          status: noteDetail?.note?.status,
          content: TaskList,
          folder_id: noteDetail?.note?.folder,
        }))
      }
    }
  };
  const handleAddNewTask = () => {
    const isChecked = taskStatusRef.current?.value;
    const newTask = newTaskRef.current?.value;
    checkNull(newTask) ? setErrorNewTask(false) : setErrorNewTask("task must not null")
    const flag = checkNull(newTask)
    if (flag) {
      if (TaskList.length === 0) {
        dispatch(addTask({
          id: TaskList.length,
          content: newTask,
          status: isChecked
        }))
      } else {
        dispatch(addTask({
          id: TaskList[TaskList.length - 1].id + 1,
          content: newTask,
          status: isChecked
        }))
      }

    }
  }
  const shareUrl = `${DOMAIN_FE}/updatetasklist/${param.id}`;
  return (
    <div className='container-fluid container-lg'>
      <div className='d-flex justify-content-between mt-2 '>
        <h1 className='bard-hello pt-0 pt-lg-4'>{noteDetail?.note?.note_type}</h1>
        <div className='d-flex align-items-center gap-3'>
          {noteDetail?.note?.user_id === userInformation?.user?.id ? <div>
            {
              !noteDetail?.note?.highlight ? <i onClick={() => dispatch(setHighLightNote(param.id))} style={{ fontSize: "20px", color: "#9c9c9f" }} class="fa-solid fa-star"></i> : <i onClick={() => dispatch(setHighLightNote(param.id))} style={{ fontSize: "20px", color: "rgb(246, 192, 80)" }} class="fa-solid fa-star"></i>
            }
          </div> : null}
          <div class="dropdown">
            <button style={{ fontWeight: "bold" }} class="button-8 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Share
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: "240px" }}>
              <div className='p-2 d-flex gap-4'>
                <div>
                  <div className='mb-2 text-primary' >
                    <FacebookShareButton url={shareUrl}><i class="fa-brands fa-facebook me-1"></i> Facebook</FacebookShareButton>
                  </div>
                  <div className='mb-2 text-primary'><EmailShareButton url={shareUrl}><i class="fa-solid fa-envelope me-1"></i> Email</EmailShareButton></div>
                  <div className='mb-2 text-primary'><LinkedinShareButton url={shareUrl}><i class="fa-brands fa-linkedin me-1"></i> Linkedin</LinkedinShareButton></div>

                </div>
                <div>
                  <div className='mb-2 text-primary'><FacebookMessengerShareButton url={shareUrl}><i class="fa-brands fa-facebook-messenger me-1"></i> Messenger</FacebookMessengerShareButton></div>
                  <div className='mb-2 text-primary'><TwitterShareButton url={shareUrl}><i class="fa-brands fa-square-twitter me-1"></i> Twitter</TwitterShareButton></div>
                  <div className='mb-2 text-primary'><TelegramShareButton url={shareUrl}><i class="fa-brands fa-telegram me-1"></i>Telegram</TelegramShareButton></div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <form className='mt-3'>
        <div class="mb-3">
          <input type="text" class="form-control" value={noteDetail?.note?.title} onChange={(e) => dispatch(setTitleAction(e.target.value))} placeholder='Note Title' />
          {errTitle ? <p style={{ color: "red" }}>{errTitle}</p> : null}
        </div>

        <div class="d-flex gap-2 align-items-end ">
          <div data-mdb-input-init class="form-outline">
            <label style={{ fontSize: "14px" }} className="form-label">New Task</label>
            <input type="text" ref={newTaskRef} class="form-control" />

          </div>
          <div >
            <label style={{ fontSize: "14px" }} className="form-label">Status</label>
            <select class="form-select" ref={taskStatusRef} >
              <option value={false} >In Progress</option>
              <option value={true} >Done</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: "14px" }} className="form-label">Deadline</label>
            <input type="date" class="form-control" />
          </div>
          <div>
            <button type='button' className='button-4' onClick={() => handleAddNewTask()}>Add Task</button>
          </div>
        </div>
        <div className='d-flex gap-2'>
          {errNewTask ? <p className='mb-4' style={{ color: "red", margin: "0" }}>{errNewTask}</p> : <p className='mb-4'></p>}
        </div>

        <table class="table table-striped mt-3 mb-3">
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
        </table>
        {
          noteDetail?.note?.user_id === userInformation?.user?.id && listFolder.length > 0 ? (
            <select class="form-select mt-3" value={noteDetail?.note?.folder} onChange={(e) => dispatch(setFolderAction(e.target.value))} aria-label="Default select example">
              <option value={null} >Choose Folder</option>
              {listFolder?.map((folder) => (
                <option value={folder?.id} >{folder?.name}</option>
              ))}
            </select>
          ) : null
        }
        {
          noteDetail?.note?.user_id === userInformation?.user?.id ? (userInformation?.user?.role === "GUEST" ? <select class="form-select mt-3" value={noteDetail?.note?.status} onChange={(e) => dispatch(setStatusAction(e.target.value))} aria-label="Default select example" >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select> : <button type="button" class="button-4 mt-3" data-bs-toggle="modal" data-bs-target="#modelsetstatus">
            Note Read Permission
          </button>) : null
        }
        <br />
        <button type="button" onClick={() => handleSubmit()} class="button-8 mt-3">Update</button>
      </form>

      <Comment id={param.id} note_user_id={noteDetail?.note?.user_id} />

      <div class="modal fade" id="modelsetstatus" tabindex="-1" aria-labelledby="modelsetstatus" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modelsetstatus">Note Read Permission</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <select class="form-select mt-3" value={noteDetail?.note?.status} onChange={(e) => dispatch(setStatusAction(e.target.value))}   >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="protected">Protected</option>
                </select>

                <div class="mb-3 mt-3">
                  <input type="password" value={noteDetail?.note?.password_access} onChange={(e) => dispatch(setPassword_accessAction(e.target.value))} class="form-control" placeholder='Password For Protected Note' />
                </div>

                <div class="mb-3 row">
                  <label for="inputPassword" class="col-form-label">Note Edit Permission</label>
                  <div class="">
                    <input type="password" value={noteDetail?.note?.password_edit} onChange={(e) => dispatch(setPassword_editAction(e.target.value))} class="form-control" placeholder='Editor Password' />
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
