import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, likePost } from '../../Store/Post/Action';
import { isLikeByReqUser } from '../../Utilities/isLikeByReqUser';

export const PostCard = ({ item }) => {
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch();
    const { post, auth } = useSelector(store => store);
    const handleShowComment = () => {
        setShowComments(!showComments);
    }

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createComment(reqData))
    }

    const handleLikePost = () => {
        dispatch(likePost(item.id))
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user?.name}
                subheader={"@" + item.user?.username}
            />
            <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography paragraph>
                    {item.content}
                </Typography>
            </CardContent>
            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton className={``} onClick={handleLikePost}>
                        {isLikeByReqUser(auth.user.id ,item) ? <FavoriteIcon className='text-red-600' /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={handleShowComment}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <ShareIcon />
                    </IconButton>

                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>

                </div>
            </CardActions>
            {showComments && <section>
                <div className='flex items-center space-x-5 mx-3 my-5'>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                    <input onKeyPress={(e) => {
                        if (e.key == "Enter") {
                            handleCreateComment(e.target.value)
                            console.log(e.target.value);
                        }
                    }}
                        className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
                        placeholder='Post your reply' type="text" />
                </div>
                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs'>

                    {item.comments?.map((comment) => <div className='flex items-center space-x-5'>
                        <Avatar sx={{ height: '2rem', width: '2rem', fontSize: '.8rem' }}>
                            {comment.user.name[0]}
                        </Avatar>
                        <p>{comment.content}</p>
                    </div>)}

                </div>
            </section>}
        </Card>
    )
}
