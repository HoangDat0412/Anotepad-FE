import React, { useCallback, useEffect } from 'react'
import './search.scss'
import SearchItem from '../../components/SearchItem/SearchItem'
import { useDispatch, useSelector } from 'react-redux';
import { SearchNote, getUserNoteHistory, setSearchResult } from '../../redux/features/note/noteSlice';


export default function Search() {
    const dispatch = useDispatch()
    const fetchData = useCallback(() => {
        dispatch(getUserNoteHistory())
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const { notehistory,searchResult } = useSelector(state => state.noteSlice)

    const handleSearch = (search) => {
        if (search) {
            dispatch(SearchNote(search))
        } else {
            dispatch(setSearchResult([]))
        }
    }
    return (
        <div className='search_model'><div class="modal fade " id="modelSearch" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="input-group mt-3 mb-3">
                            <button class="btn btn-outline-secondary" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
                            <input type="text" onChange={(e) => handleSearch(e.target.value)} class="form-control" placeholder="Search note ..." />
                        </div>

                        <div className='search_content'>
                            {
                                searchResult?.length > 0 ?                             <div className='group_note mb-3'>
                                <p><i className="fa-regular fa-clock me-2"></i> Search result</p>
                                <div>
                                    {
                                        searchResult?.map((item) => (
                                            <SearchItem key={item?.id} item={item} />
                                        ))
                                    }
                                </div>
                            </div> :                           <div>
                                <div className='group_note mb-3'>
                                    <p><i className="fa-regular fa-clock me-2"></i> Past day</p>
                                    <div>
                                        {
                                            notehistory?.noteInDay?.map((item) => (
                                                <SearchItem key={item?.id} item={item} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='group_note'>
                                    <p ><i className="fa-regular fa-clock me-2"></i> Past 30 days</p>
                                    <div>
                                        {
                                            notehistory?.NoteInMonth?.map((item) => (
                                                <SearchItem key={item?.id} item={item} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            }
 
                        </div>
                    </div>
                </div>
            </div>
        </div></div>
    )
}
