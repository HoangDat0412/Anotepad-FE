import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { editPermissionApi } from '../../redux/features/note/noteSlice';
import Comment from '../../components/Comment/Comment';
import { APIKEY_TIMYCLOUND, DOMAIN_FE } from '../../utils/config';
import { EmailShareButton, FacebookMessengerShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';

export default function RichNoteViewOnly() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const passwordAccess = useRef("")
  const handleEdit = () => {
    dispatch(editPermissionApi({
      note_id: parseInt(param.id),
      password_edit: passwordAccess.current?.value
    }))
  }
  const param = useParams()
  const dispatch = useDispatch()
  const { noteDetail } = useSelector(state => state.noteSlice)
  const editorRef = useRef(null);
  const shareUrl = `${DOMAIN_FE}/updaterichnote/${param.id}`;
  return (
    <div className='container-fluid container-lg richnote'>
      <div className='d-flex justify-content-between mt-2 pt-0 pt-lg-4'>
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
      <form className='mt-3 mb-5'>
        <div class="mb-3">
          <input type="text" class="form-control" value={noteDetail?.note?.title} placeholder='Note Title' />
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
      </form>
      <Comment id={param.id} note_user_id={noteDetail?.note?.user_id} />
    </div>
  )
}
