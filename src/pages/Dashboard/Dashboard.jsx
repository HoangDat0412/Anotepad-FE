import React, { useCallback, useEffect } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardInfo } from '../../redux/features/user/userSlice';

export default function Dashboard() {

    const dispatch = useDispatch();
    const { dashboardInfo } = useSelector(state => state.userSlice)
    const fetchDashboardInfo = useCallback(() => {
        dispatch(getDashboardInfo());
      }, [dispatch]);
      
      useEffect(() => {
        fetchDashboardInfo();
      }, [fetchDashboardInfo]);

    return (
        <div className='container'>
            <div class="d-flex justify-content-between align-items-center">
                <h2>Dashboard</h2>
                <p class="text-primary"></p>
            </div>
            <div class="row mt-4">
                <div class="col-3">
                    <div class="card" >
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">Guest</h5>
                                </div>

                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <i class="fa-regular fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <h2 class="mt-1 mb-3">{dashboardInfo?.guestlength}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">User</h5>
                                </div>

                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <i class="fa-regular fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <h2 class="mt-1 mb-3">{dashboardInfo?.userlength}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">Notes</h5>
                                </div>

                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <i class="fa-regular fa-note-sticky"></i>
                                    </div>
                                </div>
                            </div>
                            <h2 class="mt-1 mb-3">{dashboardInfo?.notes}</h2>
                        </div>
                    </div>
                </div>



            </div>

            <div className='mt-4'>
                <h3>Top 10 Lastest User</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">email</th>
                            <th scope="col">role</th>
                            <th scope="col">createAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardInfo?.lastestUser?.map(user=>(
                        <tr>
                            <th scope="row">{user?.id}</th>
                            <td>{user?.email}</td>
                            <td>{user?.role}</td>
                            <td>{ moment(user?.createdAt).format('DD-MM-YYYY') }</td>
                        </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
