import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkNull } from '../../validation/validation'
import { deleteFolder, updateFolder } from '../../redux/features/folder/folderSlice'
export default function FolderItem(props) {
    const dispatch = useDispatch()
    const [folderName,setFolderName] = useState(props?.folder?.name)
    const [errFolder,setErrFolder] = useState()
    const handleUpdateFolderName = ()=>{
        !checkNull(folderName) ? setErrFolder("Folder không được bỏ trống") : setErrFolder(false)
        const flag = checkNull(folderName) 
        if(flag){
          dispatch(updateFolder(props?.folder?.id,{name:folderName}))
        }
    }
    return (
        <tr>
            <td>
                <div class="input-group ">
                    <input type="text" class="form-control" onChange={(e)=> setFolderName(e.target.value)} value={folderName} />
                </div>
                <p className='mb-3' style={{color:"red"}}>{errFolder}</p>
            </td>
            <td className=''><button className='btn btn-primary' onClick={() => handleUpdateFolderName()}><i class="fa-solid fa-check"></i></button> <button className='btn btn-danger' onClick={() => dispatch(deleteFolder(props?.folder?.id))}><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    )
}
