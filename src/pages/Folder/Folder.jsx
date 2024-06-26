import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkNull } from '../../validation/validation'
import { createFolder, getListFolder } from '../../redux/features/folder/folderSlice'
import { getAllNote } from '../../redux/features/note/noteSlice'
import CardNote from '../../components/CardNote/CardNote'
import FolderName from '../../components/FolderName/FolderName.jsx'
import './folder.scss'
import { NavLink } from 'react-router-dom'
import Home from '../Home/Home.jsx'
export default function Folder() {
  const dispatch = useDispatch()
  const [folder, setFolder] = useState("")
  const [errFolder, setErrFolder] = useState("")
  const { listFolder } = useSelector(state => state.folderSlice)
  const { listNote } = useSelector(state => state.noteSlice)
  const fetchData = useCallback(() => {
    dispatch(getListFolder());
    dispatch(getAllNote());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateFolder = () => {
    !checkNull(folder) ? setErrFolder("Folder không được bỏ trống") : setErrFolder(false)
    const flag = checkNull(folder)
    if (flag) {
      dispatch(createFolder({
        name: folder
      }))
      setFolder("")
    }
  }

  return (
    <div className='container-fluid container-lg' >
      <h2 class="bard-hello pt-0 pt-lg-4">Dashboard</h2>

      <div class="input-group mt-3">
        <input value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="Folder Name" type="text" class="form-control" />
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleCreateFolder()}>Create Folder</button>
      </div>
      <p className='mb-3' style={{ color: "red" }}>{errFolder}</p>
      <div className="row pt-3" style={{marginLeft:"1px", marginRight:"1px"}}>
        <div className="col-12 col-md-4 col-lg-3 folder_sidebar">
          <div className='mt-4'>
            <ul class="tree">
              <li class="tree__item">
                <span onClick={() => dispatch(getAllNote())} className="tree__action sidebar__action">
                  <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                    <i className="tree__icon fa-solid fa-folder"></i>

                    <span className="tree__link-text"><span className="sidebar__item-name">All Note</span></span>
                  </span>
                </span>
              </li>
              {
                listFolder?.map((folder) => (
                  <FolderName folder={folder} />
                ))
              }

            </ul>
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-9 pt-3 pt-md-0 ps-md-4">
        <h2 class="bard-hello" style={{fontSize:"20px"}}>{listNote?.folder?.name}</h2>
          <div className='row'>
            {
              listNote?.notes?.length ? "" : <div>
                <NavLink to={`/richnote/${listNote?.folder?.id || 0}`} className='button-8 me-2'>Create Your First Note</NavLink>
                <NavLink to={`/tasklists/${listNote?.folder?.id || 0}`} className='button-8'>Create Your First TaskList</NavLink>
              </div> 
            }
            
            {
              listNote?.notes?.map(note => (
                <div className="col-6 col-sm-4 col-lg-3 p-1 mb-3 d-flex justify-content-center" key={note?.id}>
                  <CardNote note={note} key={note?.id} type="Folder" folderID={listNote?.folder?.id || 0} />
                </div>
              ))
            }

          </div>
        </div>
      </div>

      <Home/>

    </div>
  )
}
