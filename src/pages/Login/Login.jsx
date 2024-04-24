import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { checkNull } from '../../validation/validation'
import { loginApi } from '../../redux/features/user/userSlice'

export default function Login() {
  const emailRef = useRef("")
  const [errEmail,setErrEmail] = useState(false)
  const passwordRef = useRef("")
  const [errPassWord,setErrPassword] = useState(false)
  const dispatch = useDispatch()
  const {responseLogin} = useSelector(state => state.userSlice)
  const navigate = useNavigate()

  const handleRegister = ()=>{
    !checkNull(emailRef.current.value) ? setErrEmail("email không được bỏ trống") : setErrEmail(false)
    !checkNull(passwordRef.current.value) ? setErrPassword("email không được bỏ trống") : setErrPassword(false)
    const flag = checkNull(emailRef.current.value) && checkNull(passwordRef.current.value)
    if(flag){
      dispatch(loginApi({
        email:emailRef.current.value,
        password:passwordRef.current.value
      }))
    }
    
    if(responseLogin){
      navigate('/')
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
                <h2 class="fw-bold mb-5">Sign in now</h2>
                <form>


                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="form3Example3" ref={emailRef} class="form-control" placeholder='Email' />
                    <p style={{color:"red"}}>{errEmail}</p>
                  </div>


                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form3Example4" ref={passwordRef} class="form-control" placeholder='Password '/>
                    <p style={{color:"red"}}>{errPassWord}</p>
                  </div>

                  <button type="button" onClick={()=> handleRegister()} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">
                    Sign in
                  </button>

                  <br />

                  <span>You do not have account <NavLink to='/register'>Sign up now</NavLink> </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
