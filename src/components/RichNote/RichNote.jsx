import React, { useCallback, useEffect, useRef, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { checkNull } from '../../validation/validation';
import { setFolderAction, setHighLightNote, setNoteHistory, setPassword_accessAction, setPassword_editAction, setStatusAction, setTitleAction, updateNote } from '../../redux/features/note/noteSlice';
import { getListFolder } from '../../redux/features/folder/folderSlice';
import { EmailShareButton, FacebookMessengerShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import Comment from '../../components/Comment/Comment';
import { APIKEY_TIMYCLOUND, DOMAIN_FE } from '../../utils/config';
export default function RichNoteEdit() {
 
  const param = useParams()
  const dispatch = useDispatch()
  const { listFolder } = useSelector(state => state.folderSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  const { noteDetail } = useSelector(state => state.noteSlice)
  const fetchData = useCallback(() => {
    dispatch(getListFolder());
    dispatch(setNoteHistory({
      note_id:param.id
    }))
  }, [dispatch,param.id]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  const editorRef = useRef(null);
  const [errEditer, setErrEditor] = useState(false);
  const [errTitle, setErrTitle] = useState(false);
  const handleSubmit = () => {
    const editorValue = editorRef.current?.getContent()
    !checkNull(editorValue) ? setErrEditor("Content không được bỏ trống") : setErrEditor(false)
    !checkNull(noteDetail?.note?.title) ? setErrTitle("Title không được bỏ trống") : setErrTitle(false)

    const flag = checkNull(editorValue) && checkNull(noteDetail?.note?.title)
    if (flag) {
      if (noteDetail?.note?.status === "protected") {
        dispatch(updateNote(param.id, {
          title: noteDetail?.note?.title,
          note_type: "RichNote",
          status: noteDetail?.note?.status,
          content: editorValue,
          folder_id: noteDetail?.note?.folder,
          password_access: noteDetail?.note?.password_access,
          password_edit: noteDetail?.note?.password_edit
        }))

      } else {
        dispatch(updateNote(param.id, {
          title: noteDetail?.note?.title,
          note_type: "RichNote",
          status: noteDetail?.note?.status,
          content: editorValue,
          folder_id: noteDetail?.note?.folder,
        }))
      }
    }
  };
  const shareUrl = `${DOMAIN_FE}/updaterichnote/${param.id}`;
  return (
    <div className='container-fluid container-lg richnote'>
      <div className='d-flex justify-content-between mt-2 '>
        <h1 className='bard-hello'>{noteDetail?.note?.note_type}</h1>
        <div className='d-flex align-items-center gap-3'>
          {noteDetail?.note?.user_id === userInformation?.user?.id ?           <div>
            {
              !noteDetail?.note?.highlight ? <i onClick={() => dispatch(setHighLightNote(param.id))} style={{fontSize:"20px",color:"#9c9c9f"}} class="fa-solid fa-star"></i> : <i onClick={() => dispatch(setHighLightNote(param.id))} style={{fontSize:"20px",color:"rgb(246, 192, 80)"}} class="fa-solid fa-star"></i>
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
      <form className='mt-3 mb-5'>
        <div class="mb-3">
          <input type="text" class="form-control" value={noteDetail?.note?.title} onChange={(e) => dispatch(setTitleAction(e.target.value))} placeholder='Note Title' />
          {errTitle ? <p style={{ color: "red" }}>{errTitle}</p> : null}
        </div>
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey={APIKEY_TIMYCLOUND}
          init={{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          initialValue={noteDetail?.content?.content}
        />



        {errEditer ? <p style={{ color: "red" }}>{errEditer}</p> : null}
        {
          noteDetail?.note?.user_id === userInformation?.user?.id ? (
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
        {
          noteDetail?.note?.user_id === userInformation?.user?.id ? <button type="button" onClick={() => handleSubmit()} class="button-8 mt-3">Update</button> : (noteDetail?.note?.status === "protected" ? <button type="button" onClick={() => handleSubmit()} class="button-8 mt-3">Update</button> : null)
        }
      </form>

      <Comment id={param.id} note_user_id={noteDetail?.note?.user_id} />
      {
        userInformation?.user?.role !== "GUEST" ? <div class="modal fade" id="modelsetstatus" tabindex="-1" aria-labelledby="modelsetstatus" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modelsetstatus">Note Read Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <select class="form-select mt-3" value={noteDetail?.note?.status} onChange={(e) => dispatch(setStatusAction(e.target.value))}  >
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
            </div>
          </div>
        </div> : ""
      }

    </div>
  )
}
