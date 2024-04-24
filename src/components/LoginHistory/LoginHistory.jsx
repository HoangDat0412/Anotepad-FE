import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginHistoryApi } from '../../redux/features/user/userSlice'
import moment from 'moment'

export default function LoginHistory() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loginHistoryApi())
    },[])
    const {listLoginHistory} = useSelector(state => state.userSlice)
    return (
        <div class="modal fade" id="modelhistory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title bard-hello" id="exampleModalLabel">Login History</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className='container'>
                            <p>Login Times: {listLoginHistory?.length} </p>
                            {
                                listLoginHistory?.map(login =>(
                                    <div className='mb-3' key={login?.id}>
                                    <span className=''>Browser login: {login?.browser}</span>
                                    <span className='px-2'>Os: {login?.os}</span>
                                    <span className='px-2'>Platform: {login?.platform}</span>
                                    <span className='px-2'>Login at: {moment(login?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                                ))
                            }
                           
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
