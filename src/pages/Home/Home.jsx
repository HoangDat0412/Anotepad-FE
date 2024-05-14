import React, { useCallback, useEffect } from 'react'
import "./home.scss"
import { useSelector, useDispatch } from 'react-redux'
import { getNoteTodayandMonthApi, setListHighLightNote } from '../../redux/features/note/noteSlice'
import CardNote from '../../components/CardNote/CardNote'
// import { NavLink } from 'react-router-dom'

export default function Home() {
  const dispatch = useDispatch()
  const {  highlightnotes } = useSelector(state => state.noteSlice)
  //noteTodayandMonth,
  const fetchNoteTodayAndMonth = useCallback(() => {
    dispatch(setListHighLightNote());
    dispatch(getNoteTodayandMonthApi());
  }, [dispatch]);

  useEffect(() => {
    fetchNoteTodayAndMonth();
  }, [fetchNoteTodayAndMonth]);

  return (
    <div className='home container-fluid container-lg'>
      <p></p>
      <h1 className='mt-2'><span class="bard-hello" >Highlight Topic</span></h1>

      <div className='row'>
        {
          highlightnotes?.length > 0 ? (highlightnotes?.map((item) => (
            <div className='p-1 col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-3 d-flex justify-content-center' >
              <CardNote note={item} key={item?.id} type="Highlight" />
            </div>
          ))) : <p style={{ color: '#747775' }}>Please Highlight The New Topic</p>
        }
      </div>

      {/* <h1 className='mt-2'><span class="bard-hello" >New Note Today</span></h1>
      <div className='row mb-4'>
        {
          (noteTodayandMonth?.notesToday?.map((item, index) => (
            <div className='p-1 col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-3 d-flex justify-content-center'>
              <CardNote note={item} key={item?.id} type="Today" />
            </div>
          ))) 
        }
        {
          noteTodayandMonth?.notesToday?.length > 0 ? "" : <div>
            <NavLink to={`/richnote/0`} className='button-8 me-2'>Create Your First Note</NavLink>
            <NavLink to={`/tasklists/0`} className='button-8'>Create Your First TaskList</NavLink>
          </div>
        }
      </div> */}


      {/* <h1 className='mt-2'><span class="bard-hello" >Pass 30 days</span></h1>

      <div className='row'>
        {
          noteTodayandMonth?.notesMonth?.length > 0 ? (noteTodayandMonth?.notesMonth?.map((item, index) => (
            <div className='p-1 col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-3 d-flex justify-content-center'>
              <CardNote note={item} key={item?.id} />
            </div>
          ))) : <p style={{ color: '#747775' }}>Not found Your Note In Pass 30 Days</p>
        }
      </div> */}

    </div>
  )
}
