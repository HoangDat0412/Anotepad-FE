import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser, getUserById, setEmail, setPassword, setRole, updateUserById } from '../../redux/features/user/userSlice';
import { checkNull } from '../../validation/validation';


export default function ManageUser() {
   
    const dispatch = useDispatch();
    const { userList,userInfo } = useSelector(state => state.userSlice)
    const [errEmail,setErrEmail] = useState("")
    const [errPassword,setErrPassword] = useState("")
    const fetchAllUser = useCallback(() => {
        dispatch(getAllUser());
      }, [dispatch]);
      
      useEffect(() => {
        fetchAllUser();
      }, [fetchAllUser]);

    const handleUpdate = () =>{
        !checkNull(userInfo?.user?.email) ? setErrEmail("email không được bỏ trống") : setErrEmail(false)
        !checkNull(userInfo?.user?.password) ? setErrPassword("password không được bỏ trống") : setErrPassword(false)
        const flag = checkNull(userInfo?.user?.email) && checkNull(userInfo?.user?.password)

        if(flag){
            dispatch(updateUserById(userInfo?.user?.id,{
                email:userInfo?.user?.email,
                password:userInfo?.user?.password,
                role:userInfo?.user?.role
            }))
        }
    }

    return (
        <div>
            <h2>Manage User</h2>
            <div className='pt-4'>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">User_id</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>

                        {userList?.map(user => (
                            <tr key={user?.id}>
                                <th scope="row">{user?.id}</th>
                                <td>{user?.email || ""}</td>
                                <td>{user?.role}</td>
                                <td>
                                    <button className='button-45' onClick={() => dispatch(deleteUser(user?.id))}>Delete</button>
                                </td>
                                {
                                    user?.role === "GUEST" ? "":                                <td>
                                    <button className='button-8' data-bs-toggle="modal" data-bs-target="#updateuser" onClick={()=> dispatch(getUserById(user?.id))}>Update</button>
                                </td> 
                                }
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="updateuser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateuser" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Update User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Notes: {userInfo?.notes}</p>
                            <hr />
                            <div>
                                <form>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" value={userInfo?.user?.email} onChange={(e) => dispatch(setEmail(e.target.value))} placeholder='Email' />
                                        <p style={{color:"red"}}>{errEmail}</p>
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control" value={userInfo?.user?.password} onChange={(e) => dispatch(setPassword(e.target.value))}  placeholder='Password' />
                                        <p style={{color:"red"}}>{errPassword}</p>
                                    </div>
                                    <div class="mb-3">
                                        <select class="form-select mt-3" value={userInfo?.user?.role} onChange={(e) => dispatch(setRole(e.target.value))}  aria-label="Default select example">
                                            <option value="USER" >USER</option>
                                            <option value="GUEST">GUEST</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </div>
                                    <button type='button' className='btn btn-success' onClick={()=> handleUpdate()}>Update</button>
                                </form>


                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
