import React, { useState } from 'react'
import { checkNull } from '../../validation/validation'
import { useDispatch, useSelector } from 'react-redux'
import { setEmailAction, updateUserApi } from '../../redux/features/user/userSlice'

export default function Profile(props) {
  const dispatch = useDispatch()
  const [errEmail,setErrEmail] = useState()
  const [password,setPassword] = useState("")
  const [errPassword,setErrPassword] = useState()
  const {userInformation} = useSelector(state => state.userSlice)

  const handleUpdate = ()=>{
    !checkNull(userInformation?.user?.email) ? setErrEmail("email không được bỏ trống") : setErrEmail(false)
    !checkNull(password) ? setErrPassword("password không được bỏ trống") : setErrPassword(false)
    const flag = checkNull(userInformation?.user?.email) && checkNull(password)

    if(flag){
      dispatch(updateUserApi({
        email:userInformation?.user?.email,
        password
      }))
    }
  }
  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title bard-hello" id="exampleModalLabel">Your account information</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='container'>

      <p>Notes: {props?.information?.notes}</p>
      <p>Role: {props?.information?.user?.role}</p>
      <hr />
      <div>
        <form>
          <div class="mb-3">
            <input type="text" value={userInformation?.user?.email} onChange={(e) => dispatch(setEmailAction(e.target.value))} class="form-control" placeholder='Email' />
            <p style={{color:"red"}}>{errEmail}</p>
          </div>
          <div class="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  class="form-control" placeholder='Password' />
            <p style={{color:"red"}}>{errPassword}</p>
          </div>
          <button type='button' className='btn btn-success' onClick={()=> handleUpdate()}>Update</button>
        </form>


      </div>
    </div>
      </div>
    </div>
  </div>
</div>

  )
}
