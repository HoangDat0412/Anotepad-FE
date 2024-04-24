import React, { useEffect, useRef, useState } from 'react'
import { checkNull } from '../../validation/validation';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteComment, getListComment } from '../../redux/features/comment/commentSlice';
import moment from 'moment';
import { deleteNote } from '../../redux/features/note/noteSlice';

export default function Comment(props) {
    const id = props.id
    const note_user_id = props?.note_user_id

    const nameRef = useRef(null)
    const [errName,setErrName] = useState(false);
    const comment = useRef(null)
    const [errComment,setErrComment] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getListComment(id))
    },[])
    const {listComment} = useSelector(state => state.commentSlice)
    const { userInformation } = useSelector(state => state.userSlice)
    const handleComment = ()=>{
        !checkNull(nameRef?.current?.value || "") ? setErrName("name không được bỏ trống") : setErrName(false)
        !checkNull(comment?.current?.value || "") ? setErrComment("name không được bỏ trống") : setErrComment(false)
        const flag = checkNull(nameRef.current?.value) && checkNull(comment.current?.value)
        if(flag){
            dispatch(createComment(id,{
                user_name:nameRef.current?.value,
                comment:comment.current?.value
            }))
        }
    }
  return (
    <div class="comment pt-5" >
    <div class="mb-3">
        <input type="text" ref={nameRef} class="form-control"  placeholder='User Name' />
        {errName ? <p style={{ color: "red" }}>{errName}</p> : null}
      </div>
        <div class=" pb-4">
          <textarea class="form-control" v-model="comment" 
            placeholder="Viết bình luận ..." rows="3" ref={comment}></textarea>
            {errComment ? <p style={{ color: "red" }}>{errComment}</p> : null}

            <button className='btn btn-primary mt-1' onClick={()=> handleComment()}>Comment</button>
        </div>

        <div>
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start align-items-center">
 
                <div class="w-100">
                    {
                        listComment?.map(comment => (
                            <div class=" mb-4" key={comment?.id}>
                            <div class="mb-0 d-flex justify-content-start gap-3 align-items-center">
                              <h6 style={{margin:"0",color:"#4285f4"}}>{comment?.user_name}</h6>
                              <span >{moment(comment?.createdAt).format('dd/mm/yyyy')}</span>
                              { userInformation?.user?.id === note_user_id ?  <span style={{margin:"0",color:"#4285f4"}}><i  onClick={()=> dispatch(deleteComment(id,comment?.id))} className="fa fa-trash-alt"></i></span> : ""}
                            </div>
                            <p class="mb-0">{comment?.comment}</p>
                          </div>
                        ))
                    }
                </div>
              </div>
              
            </div>
          </div>
        </div>

    </div>
  )
}
