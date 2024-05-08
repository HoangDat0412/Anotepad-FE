import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ValidateEmail, checkNull } from '../../validation/validation'
import { useDispatch, useSelector } from 'react-redux'
import { registerApi } from '../../redux/features/user/userSlice'

export default function Register() {
  const emailRef = useRef("")
  const [errEmail,setErrEmail] = useState(false)
  const passwordRef = useRef("")
  const [errPassWord,setErrPassword] = useState(false)
  const user_name = useRef("")
  const [errUser_name,setErrUser_name] = useState(false)
  const dispatch = useDispatch()
  const {responseRegister} = useSelector(state => state.userSlice)
  const navigate = useNavigate()
  const handleRegister = ()=>{
   
    !checkNull(emailRef.current.value) ? setErrEmail("email must be required") : setErrEmail(false)
    !ValidateEmail(emailRef.current.value) ? setErrEmail("invalid email") : setErrEmail(false)
    !checkNull(passwordRef.current.value) ? setErrPassword("password must be required") : setErrPassword(false)
    !checkNull(user_name.current.value) ? setErrUser_name("username must be required") : setErrUser_name(false)
    const flag = checkNull(emailRef.current.value) && checkNull(passwordRef.current.value) && checkNull(user_name.current.value) && ValidateEmail(emailRef.current.value)
    if(flag){
      dispatch(registerApi({
        email:emailRef.current.value,
        password:passwordRef.current.value,
        user_name:user_name.current.value
      }))
    }
  }
  if(responseRegister){
    navigate('/login')
  }
  return (
    <div style={{overflowX:"unset"}} className='container'>
    <section class="text-center">
      <div class="pt-5" ></div>
      <div class="card mx-4 mx-md-5 shadow-5-strong" >
        <div class="card-body py-5 px-md-5">

          <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <h2 class="fw-bold mb-5">Sign up now</h2>
              <form>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email" class="form-control" ref={emailRef} placeholder='Email' />
                  <p style={{color:"red"}}>{errEmail}</p>
                </div>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text"  class="form-control" ref={user_name} placeholder='UserName '/>
                  <p style={{color:"red"}}>{errUser_name}</p>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" class="form-control" ref={passwordRef} placeholder='Password '/>
                  <p style={{color:"red"}}>{errPassWord}</p>
                </div>



                <button type="button" data-mdb-button-init data-mdb-ripple-init class="button-8 mb-4" onClick={()=> handleRegister()}>
                  Sign up
                </button>

                <br />

                <span>You have account <NavLink to='/login'>Sign in now</NavLink> </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
  )
}
