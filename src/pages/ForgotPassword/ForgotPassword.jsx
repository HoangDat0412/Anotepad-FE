import React, { useRef, useState } from 'react'
import { checkNull } from '../../validation/validation'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../redux/features/user/userSlice'

export default function ForgotPassword() {
    const emailRef = useRef("")
    const [errEmail,setErrEmail] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = ()=>{
      !checkNull(emailRef.current.value) ? setErrEmail("email must is not null") : setErrEmail(false)
      const flag = checkNull(emailRef.current.value)
      if(flag){
        dispatch(forgotPassword({
          email:emailRef.current.value,
        }))
      }
    }
  return (
    <div>
            <div className='container'>

<section class="text-center">

  <div class="p-5" ></div>


  <div class="card mx-4 mx-md-5 shadow-5-strong" >
    <div class="card-body py-5 px-md-5">

      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <h2 class="fw-bold mb-5">Forgot Password</h2>
          <form>


            <div data-mdb-input-init class="form-outline mb-4">
              <input type="email"  ref={emailRef} class="form-control" placeholder='Email' />
              <p style={{color:"red"}}>{errEmail}</p>
            </div>

            <button  type="button" onClick={() => handleSubmit()} className="button-8 mt-4 mb-4">
              submit
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
    </div>
  )
}
