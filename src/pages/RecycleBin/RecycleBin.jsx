import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteRecycleNote, RecycleNote, getListNoteRecycle } from '../../redux/features/note/noteSlice';
import moment from 'moment';

export default function RecycleBin() {

    const dispatch = useDispatch()
    const { listNoteRecycle } = useSelector(state => state.noteSlice)

    const fetchData = useCallback(() => {
        dispatch(getListNoteRecycle());
    }, [dispatch]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className='container'>
            <h1 className="bard-hello">Recycle Bin</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">NoteId</th>
                        <th scope="col">Title</th>
                        <th scope="col">Note Type</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listNoteRecycle?.map((note) => (
                            <tr key={note?.id}>
                                <th >{note?.id}</th>
                                <td>{note?.title}</td>
                                <td>{note?.note_type}</td>
                                <td>{moment(note?.createdAt).format("DD/MM/YYYY")}</td>
                                <td className='d-flex align-items-center'>
                                    <button className='button-8 me-2' onClick={() => dispatch(RecycleNote(note?.id))} >Recycle</button>
                                    <button className='button-45' onClick={() => dispatch(DeleteRecycleNote(note?.id))} >Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
