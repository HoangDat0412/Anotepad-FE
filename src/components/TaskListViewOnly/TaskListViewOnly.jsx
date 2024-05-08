import React, { useCallback, useEffect, useRef} from 'react'
import { editPermissionApi, getNote} from '../../redux/features/note/noteSlice';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../../components/TaskItem/TaskItem';
import Comment from '../Comment/Comment';
import { EmailShareButton, FacebookMessengerShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { DOMAIN_FE } from '../../utils/config';

export default function TaskListViewOnly() {

  const param = useParams()
  const dispatch = useDispatch()
  const fetchData = useCallback(() => {
    dispatch(getNote(param.id));
  }, [dispatch,param.id]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);
  const passwordAccess = useRef("")
  const handleEdit = () => {
    dispatch(editPermissionApi({
      note_id: parseInt(param.id),
      password_edit: passwordAccess.current?.value
    }))
  }
  const { noteDetail } = useSelector(state => state.noteSlice)
  const { TaskList } = useSelector(state => state.taskListSlice)

  const shareUrl = `${DOMAIN_FE}/updatetasklist/${param.id}`;

  return (
    <div className='container'>
          <div className='d-flex justify-content-between mt-2 '>
        <h1 className='bard-hello'>{noteDetail?.note?.note_type}</h1>
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

    {
        noteDetail?.note?.status === "protected" ? (<div class="input-group mt-3">
          <input type="password" class="form-control" ref={passwordAccess} placeholder='Edit permission password' />
          <span style={{ cursor: "pointer" }} class="input-group-text" onClick={() => handleEdit()}>Submit</span>
        </div>) : ""
      }

    <form className='mt-3'>
      <div class="mb-3">
        <input type="text" class="form-control" value={noteDetail?.note?.title}  placeholder='Note Title' />
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
                <TaskItem item={item} key={item?.id} edit={false} />
              ))
            }
          </tbody>
        </table>


    </form>

    <Comment id={param.id} note_user_id={noteDetail?.note?.user_id}/>

  </div>
  )
}
