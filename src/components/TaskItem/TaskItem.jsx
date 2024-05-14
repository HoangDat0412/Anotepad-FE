import React, { useState } from 'react'
import {  useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../redux/features/TaskList/TaskList';
import { checkNull } from '../../validation/validation';
export default function TaskItem(props) {
    const dispatch = useDispatch()
    const [taskUpdate, settaskUpdate] = useState(props?.item?.content || null)
    const [errTaskUpdate, setErrTaskUpdate] = useState(false)
    const [taskStatusUpdate, settaskStatusUpdate] = useState(props?.item?.status || null);
    const [deadline,setDeadline] = useState(props?.item?.deadline || null)
    const [errDeadline, setErrDeadline] = useState(false)
    const handleUpdateTask = () => {
        checkNull(taskUpdate) ? setErrTaskUpdate(false) : setErrTaskUpdate("task must not null")
        checkNull(deadline) ? setErrDeadline(false) : setErrDeadline("dealine must not null")
        const flag = checkNull(taskUpdate) && checkNull(deadline)
        if(flag){
            dispatch(updateTask({
                id: props?.item?.id,
                content: taskUpdate,
                status: taskStatusUpdate,
                deadline:deadline
            }))
        }
    }
    const handleDelete = () => {
        dispatch(deleteTask(props?.item?.id))
    }

    const handleSetTaskUpdate = (data) =>{
        settaskUpdate(data)
        handleUpdateTask()
    }
    const handleSetTaskStatus = (data) =>{
        settaskStatusUpdate(data)
        handleUpdateTask()
    }
    const handleSetDeadline = (data) =>{
        setDeadline(data)
        handleUpdateTask()
    }

    return (
        <tr >
            <td>
                 <input type="text" class="form-control" onChange={(e) => handleSetTaskUpdate(e.target.value)} value={taskUpdate} />
                 <span style={{fontSize:"14px",color:"red"}}>{errTaskUpdate}</span>
            </td>
            <td>  <select class="form-select" onChange={(e) => handleSetTaskStatus(e.target.value)} value={taskStatusUpdate} >
                <option value={false}>In Progress</option>
                <option value={true} >Done</option>
            </select></td>
            <td>  
                <input type="date" value={deadline} onChange={(e) => handleSetDeadline(e.target.value)} class="form-control"/>
                <span style={{fontSize:"14px",color:"red"}}>{errDeadline}</span>
            </td>
            {props?.edit ? <td className='d-flex gap-1 justify-content-end' style={{height:"100%"}}><button style={{margin: "9px"}} className='button-45' onClick={() => handleDelete()}><i class="fa-solid fa-trash-can"></i></button>  </td> : null}
        </tr>
    )
}
