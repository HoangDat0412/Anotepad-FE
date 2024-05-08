import React, { useCallback, useEffect } from 'react'
import "./home.scss"
import { useSelector, useDispatch } from 'react-redux'
import { getNoteTodayandMonthApi, setListHighLightNote } from '../../redux/features/note/noteSlice'
import CardNote from '../../components/CardNote/CardNote'

export default function Home() {
  const dispatch = useDispatch()
  const { noteTodayandMonth,highlightnotes } = useSelector(state => state.noteSlice)
  const fetchNoteTodayAndMonth = useCallback(() => {
    dispatch(setListHighLightNote());
    dispatch(getNoteTodayandMonthApi());
  }, [dispatch]);

  useEffect(() => {
    fetchNoteTodayAndMonth();
  }, [fetchNoteTodayAndMonth]);

  return (
    <div className='home container'>
      <h1 className='mt-2'><span class="bard-hello" >Highlight Topic</span></h1>

      <div className='row'>
        {
          highlightnotes?.length > 0 ? (highlightnotes?.map((item) => (
            <div className='p-1 col-6 col-md-4 col-lg-3 col-xl-2 mb-3 d-flex justify-content-center' >
              <CardNote note={item} key={item?.id} />
            </div>
          ))) : <p style={{ color: '#747775' }}>Not found ...</p>
        }
      </div>

      <h1 className='mt-2'><span class="bard-hello" >New Note</span></h1>

      <div className='row'>
        {
          noteTodayandMonth?.notesToday?.length > 0 ? (noteTodayandMonth?.notesToday?.map((item, index) => (
            <div className='p-1 col-6 col-md-4 col-lg-3 col-xl-2 mb-3 d-flex justify-content-center'>
              <CardNote note={item} key={item?.id} />
            </div>
          ))) : <p style={{ color: '#747775' }}>Not found ...</p>
        }
      </div>

      <h1 className='mt-2'><span class="bard-hello" >Pass 30 days</span></h1>

      <div className='row'>
        {
          noteTodayandMonth?.notesMonth?.length > 0 ? (noteTodayandMonth?.notesMonth?.map((item, index) => (
            <div className='p-1 col-6 col-md-4 col-lg-3 col-xl-2 mb-3 d-flex justify-content-center'>
              <CardNote note={item} key={item?.id} />
            </div>
          ))) : <p style={{ color: '#747775' }}>Not found ...</p>
        }
      </div>

    </div>
  )
}
