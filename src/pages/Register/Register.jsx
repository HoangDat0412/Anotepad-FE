import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { checkNull } from '../../validation/validation'
import { useDispatch, useSelector } from 'react-redux'
import { registerApi } from '../../redux/features/user/userSlice'

export default function Register() {
  const emailRef = useRef("")
  const [errEmail,setErrEmail] = useState(false)
  const passwordRef = useRef("")
  const [errPassWord,setErrPassword] = useState(false)
  const dispatch = useDispatch()
  const {responseRegister} = useSelector(state => state.userSlice)
  const navigate = useNavigate()
  const handleRegister = ()=>{
    !checkNull(emailRef.current.value) ? setErrEmail("email không được bỏ trống") : setErrEmail(false)
    !checkNull(passwordRef.current.value) ? setErrPassword("email không được bỏ trống") : setErrPassword(false)
    const flag = checkNull(emailRef.current.value) && checkNull(passwordRef.current.value)
    if(flag){
      dispatch(registerApi({
        email:emailRef.current.value,
        password:passwordRef.current.value
      }))
    }
    
    if(responseRegister){
      navigate('/login')
    }
  }
  return (
    <div className='container'>
    <section class="text-center">
      <div class="p-5" ></div>


      <div class="card mx-4 mx-md-5 shadow-5-strong" >
        <div class="card-body py-5 px-md-5">

          <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <h2 class="fw-bold mb-5">Sign up now</h2>
              <form>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" ref={emailRef} placeholder='Email' />
                  <p style={{color:"red"}}>{errEmail}</p>
                </div>


                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" ref={passwordRef} placeholder='Password '/>
                  <p style={{color:"red"}}>{errPassWord}</p>
                </div>

                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4" onClick={()=> handleRegister()}>
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
