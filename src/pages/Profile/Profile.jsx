import React, { useEffect, useState } from 'react'
import { checkNull } from '../../validation/validation'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccountPassword, updateUserApi } from '../../redux/features/user/userSlice'

export default function Profile(props) {
  const dispatch = useDispatch()
  const { userInformation } = useSelector(state => state.userSlice)
  const [userName,setUserName] = useState(userInformation?.user?.user_name)
  useEffect(() => {
    // Update userName when userInformation changes
    setUserName(userInformation?.user?.user_name || '');
  }, [userInformation]); 
  const [errUserName, setErrUserName] = useState()

  const [oldpass, setOldPass] = useState("")
  const [errOldpass, setErrOldpass] = useState()

  const [newpass,setNewpass] = useState("")
  const [errNewpass,setErrNewpass] = useState()

  const [confirmpass,setConfirmpass] = useState("")
  const [errConfirmpass,setErrConfirmpass] = useState()
 

  const handleUpdate = () => {
    !checkNull(userName) ? setErrUserName("Username must is not null") : setErrUserName(false)
    const flag = checkNull(userName)

    if (flag) {
      dispatch(updateUserApi({
        user_name: userName,
      }))
    }
  }

  const handleUpdatePassword = () => {
    !checkNull(newpass) ? setErrNewpass("New password must is not null") : setErrNewpass(false)
    !checkNull(oldpass) ? setErrOldpass("Password must is not null") : setErrOldpass(false)
    !checkNull(confirmpass) ? setErrConfirmpass("Repeat new password must is not null") : setErrConfirmpass(false)
    
    let checkequal = false
    if(newpass === confirmpass){
      checkequal = true
    }
    if(checkequal === false){
      alert("New password and repeat password is different!") 
    }
    const flag = checkNull(newpass) && checkNull(oldpass) && checkNull(confirmpass) && checkequal

    if(flag){
      dispatch(updateAccountPassword({
        password:oldpass,
        new_password:newpass
      }))
    }
  }
  return (
    <div className='container'>

      <h1 className="bard-hello">Account</h1>

      <hr />
      <form className='pt-3 mb-4'>
        <div className=" mb-3">
          <label class="form-label" style={{fontSize:"15px"}}>Your name</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} class="form-control" />
          <p style={{ color: "red" }}>{errUserName}</p>
        </div>
        <button type='button' className='button-8' onClick={() => handleUpdate()}>Update</button>
      </form>

      

      <br />
      <h1 className="bard-hello">Change Password</h1>
      <hr />

      <form className='pt-3 mb-4'>
        <div className=" mb-3">
          <label class="form-label" style={{fontSize:"15px"}}>Old password</label>
          <input type="password" value={oldpass} onChange={(e) => setOldPass(e.target.value)} class="form-control" />
          <p style={{ color: "red",fontSize:"14px" }}>{errOldpass}</p>
        </div>
        <div className=" mb-3">
          <label class="form-label" style={{fontSize:"15px"}}>New password</label>
          <input type="password" value={newpass} onChange={(e) => setNewpass(e.target.value)} class="form-control" />
          <p style={{ color: "red",fontSize:"14px" }}>{errNewpass}</p>
        </div>
        <div className=" mb-3">
          <label class="form-label" style={{fontSize:"15px"}}>Repeat new password</label>
          <input type="password" value={confirmpass} onChange={(e) => setConfirmpass(e.target.value)} class="form-control" />
          <p style={{ color: "red",fontSize:"14px" }}>{errConfirmpass}</p>
        </div>
        <button type='button' className='button-8' onClick={() => handleUpdatePassword()}>Change Password</button>
      </form>


      
      
      <div>


      </div>
    </div>

  )
}
