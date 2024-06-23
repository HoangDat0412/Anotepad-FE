import React, { useCallback, useEffect } from 'react'
import "./richnote.scss"
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkNull } from '../../validation/validation';
import { createNote, setCreateResultFalse } from '../../redux/features/note/noteSlice';
import { getListFolder } from '../../redux/features/folder/folderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { APIKEY_TIMYCLOUND } from '../../utils/config';
export default function RichNote() {

  const dispatch = useDispatch()
  const fetchFolderList = useCallback(() => {
    dispatch(getListFolder());
  }, [dispatch]);
  
  useEffect(() => {
    fetchFolderList();
  }, [fetchFolderList]);
  const { listFolder } = useSelector(state => state.folderSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  const { createResult } = useSelector(state => state.noteSlice)
  const navigate = useNavigate()
  if (createResult) {
    navigate(`/updaterichnote/${createResult?.id}`)
    dispatch(setCreateResultFalse())
  }
  const params = useParams()
  const editorRef = useRef(null);
  const [errEditer, setErrEditor] = useState(false);
  const titleRef = useRef("")
  const [errTitle, setErrTitle] = useState(false);
  const statusRef = useRef(null)

  // const folderRef = useRef(params.folderid)
  const [folderRef,setFolderRef] = useState(params.folderid || 0)

  const password_accessRef = useRef(null)
  const password_editRef = useRef(null)
  const handleSubmit = () => {
    const editorValue = editorRef.current?.getContent()
    !checkNull(editorValue) ? setErrEditor("Content không được bỏ trống") : setErrEditor(false)
    const titleValue = titleRef.current?.value;
    !checkNull(titleValue) ? setErrTitle("Title không được bỏ trống") : setErrTitle(false)
    const statusValue = statusRef.current?.value
    let folderValue = folderRef
    const password_access = password_accessRef.current?.value
    const password_edit = password_editRef.current?.value
    const flag = checkNull(editorValue) && checkNull(titleValue)
    if (flag) {
      if (statusValue === "protected") {
        dispatch(createNote({
          title: titleValue,
          note_type: "RichNote",
          status: statusValue,
          content: editorValue,
          folder_id: folderValue,
          password_access,
          password_edit
        }))

      } else {
        dispatch(createNote({
          title: titleValue,
          note_type: "RichNote",
          status: statusValue,
          content: editorValue,
          folder_id: folderValue,
        }))
      }
    }
  };

  return (
    <div className='container-fluid richnote container-lg'>

      <h1 className='bard-hello mt-2 pt-0 pt-lg-4'>RichNote</h1>
      <form className='mt-3'>
        <div class="mb-3">
          <input type="text" class="form-control" ref={titleRef} placeholder='Note Title' />
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
          initialValue=""
        />

        {errEditer ? <p style={{ color: "red" }}>{errEditer}</p> : null}
        {
          listFolder.length > 0 ?         <select class="form-select mt-3" value={folderRef} onChange={(e) => setFolderRef(e.target.value)} aria-label="Default select example">
          <option >Choose Folder</option>
          {listFolder?.map((folder) => (
            <option value={folder?.id} >{folder?.name}</option>
          ))}
        </select> : ""
        }

        {userInformation?.user?.role === "GUEST" ? <select class="form-select mt-3" ref={statusRef} aria-label="Default select example" >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select> : <button type="button" class="button-4 mt-3" data-bs-toggle="modal" data-bs-target="#modelsetstatus">
          Note Read Permission
        </button>}
        <br />
        <button type="button" onClick={() => handleSubmit()} class="button-8 mt-3 mb-3">Create Note</button>
      </form>
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
