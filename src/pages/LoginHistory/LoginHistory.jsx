import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginHistoryApi } from '../../redux/features/user/userSlice'
import moment from 'moment'
export default function LoginHistory() {
  const dispatch = useDispatch()
  const fetchLoginHistory = useCallback(() => {
    dispatch(loginHistoryApi());
  }, [dispatch]);

  useEffect(() => {
    fetchLoginHistory();
  }, [fetchLoginHistory]);
  const { listLoginHistory } = useSelector(state => state.userSlice)
  return (
    <div className='container'>
      <h1 class="bard-hello">Login History</h1>
      <hr />

      <p>Login Times: {listLoginHistory?.length} </p>

      {
        listLoginHistory?.length > 0 ?       <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Browser login</th>
            <th scope="col">Os</th>
            <th scope="col">Platform</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {
            listLoginHistory?.map(login => (
              <tr key={login?.id}>
                <th >{login?.browser}</th>
                <td>{login?.os}</td>
                <td>{login?.platform}</td>
                <td>{moment(login?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
              </tr>

            ))
          }
        </tbody>
      </table> : null
      }

    </div>
  )
}
