import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../redux/features/TaskList/TaskList';
export default function TaskItem(props) {
    const dispatch = useDispatch()
    const [taskUpdate, settaskUpdate] = useState(props?.item?.content || null)
    const [taskStatusUpdate, settaskStatusUpdate] = useState(props?.item?.status || null);
    const handleUpdateTask = () => {
        dispatch(updateTask({
            id: props?.item?.id,
            content: taskUpdate,
            status: taskStatusUpdate
        }))
    }
    const handleDelete = () => {
        dispatch(deleteTask(props?.item?.id))
    }

    return (
        <tr >
            <td> <input type="text" class="form-control" onChange={(e) => settaskUpdate(e.target.value)} value={taskUpdate} /></td>
            <td>  <select class="form-select" onChange={(e) => settaskStatusUpdate(e.target.value)} value={taskStatusUpdate} >
                <option value={false} >False</option>
                <option value={true} >True</option>
            </select></td>
            {props?.edit ? <td className='d-flex gap-1 justify-content-end'> <button type='button' className='btn btn-primary' onClick={() => handleUpdateTask()}><i class="fa-solid fa-check"></i></button> <button className='btn btn-danger' onClick={() => handleDelete()}><i class="fa-solid fa-trash-can"></i></button>  </td> : null}



        </tr>
    )
}
