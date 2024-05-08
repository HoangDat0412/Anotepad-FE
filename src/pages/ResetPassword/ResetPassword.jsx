import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { checkNull } from '../../validation/validation';
import { resetPassword } from '../../redux/features/user/userSlice';

export default function ResetPassword() {
    const param = useParams()
    const email = param.email;
    const token = param.token;
    const {resetPassStatus} = useSelector(state => state.userSlice)
    const navigate = useNavigate()
    if(resetPassStatus){
        navigate('/login')
    }
    const passwordRef = useRef("")
    const [errPassWord, setErrPassword] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = () => {
        !checkNull(passwordRef.current.value) ? setErrPassword("password must is not null") : setErrPassword(false)
        const flag = checkNull(passwordRef.current.value)
        if (flag) {
            dispatch(resetPassword(email,token,{
                password:passwordRef.current.value
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
                                    <h2 class="fw-bold mb-5">Reset Password</h2>
                                    <form>
                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <input type="email" value={param.email} class="form-control" placeholder='Email' />
                                        </div>
                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <input type="password" ref={passwordRef} class="form-control" placeholder='New Password' />
                                            <span style={{color:"red",fontSize:"14px"}}>{errPassWord}</span>
                                        </div>

                                        <button type="button" onClick={() => handleSubmit()} className="button-8  mb-4">
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
