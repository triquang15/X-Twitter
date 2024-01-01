import { Avatar, Button, Card, IconButton } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import { StoryCircle } from './StoryCircle';
import { PostCard } from '../Post/PostCard';
import PostModal from '../Post/PostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../Store/Post/Action';

export const HomeSection = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const {post} = useSelector(store => store);

    const handleOpenPostModal = () => {
        setOpen(true);
        console.log("handleOpenPostModal........");
    }
    useEffect(() => {
        dispatch(getAllPosts())
    }, [post.newComment])
    return (
        <div className='px-20'>
            <section className='flex items-center p-5 rounded-b-md'>
                <div className='flex flex-col items-center mr-4 cursor-pointer'>
                    <Avatar sx={{ width: '5rem', height: '5rem' }}>
                        <AddIcon sx={{ fontSize: '3rem' }} />                       
                    </Avatar>
                    <p>New</p>
                </div>
                {[1,1,1,1,1].map((item) => <StoryCircle/>)}
            </section>
            <Card className='p-5 mt-5'>
                <div className='flex justify-between'>
                    <Avatar/> 
                    <input onClick={handleOpenPostModal} readOnly className='outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border' type="text" />
                </div>
                <div className='flex justify-center space-x-9 mt-5'>
                    <div className='flex items-center'>
                        <IconButton color='primary' onClick={handleOpenPostModal}>
                            <ImageIcon/>
                        </IconButton>
                        <span>Media</span>
                    </div>
                    <div className='flex items-center'>
                        <IconButton color='primary' onClick={handleOpenPostModal}>
                            <VideocamIcon/>
                        </IconButton>
                        <span>Video</span>
                    </div>
                    <div className='flex items-center'>
                        <IconButton color='primary' onClick={handleOpenPostModal}>
                            <ArticleIcon/>
                        </IconButton>
                        <span>Article</span>
                    </div>
                </div>
            </Card>
            <div className='mt-5 space-y-5'>
                {post.posts.map((item) => <PostCard item={item}/>)}
               
            </div>
            <div>
                <PostModal handleClose={handleClose} open={open}/>
            </div>
        </div>
    )
}
