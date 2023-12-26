import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { XCart } from '../HomePage/XCart';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findPostById } from '../../Store/Post/Action';

export const PostDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleBack = () => navigate(-1);
    const {id} = useParams()
    const {post} = useSelector(store => store)

    useEffect(()=>{
        if(id){
            dispatch(findPostById(id))
        }
    }, [])

  return (
    <React.Fragment>
        <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
            <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
            <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Posts</h1>
        </section>
        <section>
            <XCart item={post.post}/>
            <Divider sx={{margin:'2rem 0rem'}}/>
        </section>
        <section>
            {post.post?.replyPosts.map((item => <XCart item={item}/>))}
        </section>
    </React.Fragment>
  )
}
