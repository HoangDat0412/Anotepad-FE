import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FolderItem from '../../components/FolderItem/FolderItem'
import { useSelector, useDispatch } from 'react-redux'
import { checkNull } from '../../validation/validation'
import { createFolder, getListFolder } from '../../redux/features/folder/folderSlice'
import { getAllNote, getNoteInFolder } from '../../redux/features/note/noteSlice'
import CardNote from '../../components/CardNote/CardNote'

export default function Folder() {
  const dispatch = useDispatch()
  const [folder, setFolder] = useState("")
  const [errFolder, setErrFolder] = useState("")
  const { listFolder } = useSelector(state => state.folderSlice)
  const {listNote } = useSelector(state => state.noteSlice)
  useEffect(() => {
    dispatch(getListFolder())
    dispatch(getAllNote())
  }, [])

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
    <div className='container-fluid'>
      <div className="row mt-3">
        <div className="col-12 col-md-4 col-lg-3 ">
          <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Manage Folder</button>

          <div className='mt-4'>
            <div className='mb-2' key={folder?.id}>
              <button onClick={() => dispatch(getAllNote())} className='btn btn-default'><i class="fa-solid fa-folder" style={{ color: "yellow", fontSize: "20px" }}></i> <span className='ms-2'>All Note</span> </button>
            </div>
            {
              listFolder?.map((folder) => (
                <div className='mb-2' key={folder?.id}>
                  <button onClick={() => dispatch(getNoteInFolder(folder?.id))} className='btn btn-default'><i class="fa-solid fa-folder" style={{ color: "yellow", fontSize: "20px" }}></i> <span className='ms-2'>{folder?.name}</span> </button>
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-9 ">
          <div className='row'>
            {
              listNote?.map(note =>(
                <div className="col-6 col-lg-4 col-xl-3 p-1 mb-3 d-flex justify-content-center" key={note?.id}>
                  <CardNote note={note} key={note?.id}/>
              </div>
              ))
            }

          </div>
        </div>
      </div>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title bard-hello"id="staticBackdropLabel">Manager Folder</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <input type="text" class="form-control" value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="Folder Name" />
                <span style={{ cursor: "pointer" }} class="input-group-text" onClick={() => handleCreateFolder()}>Create</span>
              </div>
              <p className='mb-3' style={{ color: "red" }}>{errFolder}</p>


              <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Folder</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listFolder?.map(folder => (
                      <FolderItem folder={folder} key={folder.id} />
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
