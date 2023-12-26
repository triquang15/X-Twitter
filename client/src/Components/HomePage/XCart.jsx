import React, { useState } from 'react'
import RepeatIcon from '@mui/icons-material/Repeat'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReplyModal from './ReplyModal';
import { useDispatch } from 'react-redux';
import { likePost, rePostHandler } from '../../Store/Post/Action';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';

export const XCart = ({item}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const hanldeOpenReply = () => setOpenReplyModal(true);
    const handleCloseReplyModal = () => setOpenReplyModal(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = () => {
        console.log("Delete Post");
        handleClose();
    }

    const handleRePost = () => {
        dispatch(rePostHandler(item?.id))
        console.log('handleRePost');
    }

    const handleLikePost = ()=> {
        dispatch(likePost(item?.id))
        console.log('handleLikePost');
    }

    return (
        <React.Fragment>
            <div className='flex space-x-5'>
                <Avatar onClick={() => navigate(`/profile/${item?.user.id}`)} className='cursor-pointer' alt='' 
                src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center space-x-2'>
                            <span className='font-semibold'>{item?.user?.fullName}</span>
                            <span className='text-gray-600'>@{item?.user?.fullName.split(" ").join("_").toLowerCase()} .2m</span>
                            <svg fill='red' width={25} height={25} viewBox="0 0 22 22" aria-label="Verified account" role="img" data-testid="icon-verified"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                        </div>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                                <MenuItem onClick={handleDeletePost}>Edit</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div onClick={()=> navigate(`/post/${item?.id}`)} className='cursor-pointer'>
                            <p className='mb-2 p-0'>{item?.content}</p>
                            <img className='w-[28rem] border border-gray-400 p-5 rounded-md' src={item?.image} alt="" />
                        </div>
                        <div className='py-5 flex flex-wrap justify-between items-center'>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={hanldeOpenReply} />
                                <p>{item?.totalReplies}</p>
                            </div>
                            <div className={`${item?.reposts ? 'text-green-600' : 'text-gray-600'} space-x-3 flex items-center`}>
                                <RepeatIcon onClick={handleRePost} className='cursor-pointer' />
                                <p>{item?.totalReposts}</p>
                            </div>
                            <div className={`${item?.like ? 'text-pink-600' : 'text-gray-600'} space-x-3 flex items-center`}>
                               {item?.like ? <FavoriteOutlined onClick={handleLikePost} className='cursor-pointer' />: <FavoriteIcon onClick={handleLikePost} className='cursor-pointer'/>}
                                <p>{item?.totalLikes}</p>
                            </div>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <BarChartIcon className='cursor-pointer' onClick={hanldeOpenReply} />
                                <p>575</p>
                            </div>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <FileUploadIcon className='cursor-pointer' onClick={hanldeOpenReply} />
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <ReplyModal item={item} open={openReplyModal} handleClose={handleCloseReplyModal}/>
            </section>
        </React.Fragment>
    )
}
