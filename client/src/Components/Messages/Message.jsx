import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { SearchUser } from '../HomePage/SearchUser';
import { ChatCard } from './ChatCard';
import { ChatMessage } from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChat } from '../../Store/Messages/messageAction';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinaryImageAndVideo } from '../../Utilities/UploadFileToCloud';

export const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector(store => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async(e) => {
    setLoading(true)
    const imgUrl = await uploadToCloudinaryImageAndVideo(e.target.files[0], 'image')
    setSelectedImage(imgUrl)
    setLoading(false)
  }

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage
    };
    dispatch(createMessage(message))
  }

  useEffect(() => {
    dispatch(getAllChat())
  }, [])

  useEffect(()=> {
    setMessages([...messages, message.message])
  }, [message.message])
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid className='px-5' item xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center px-5'>
                < WestIcon />
                <h1 className='text-xl font-bold'>Home</h1>
              </div>
              <div className='h-[83vh]'>
                <div className=''>
                  <SearchUser />
                </div>
                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                  {message.chats.map((item) => {
                  return <div onClick={() => {
                      setCurrentChat(item)
                      setMessages(item.messages)
                    }}>
                      <ChatCard chat={item} />
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full' item xs={9}>
        { currentChat ? <div>
            <div className='flex justify-between items-center border-l p-5'>
              <div className='flex items-center space-x-3'>
                <Avatar src={auth.user?.id===currentChat.users[0]?.id?currentChat.users[1].imageUrl:currentChat.users[0].imageUrl} />
                <p>{auth.user?.id===currentChat.users[0]?.id?currentChat.users[1].name:currentChat.users[0].name}</p>
              </div>
              <div className='flex space-x-3'>
                <IconButton>
                  <WifiCalling3Icon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>
            </div>
            <div className='hideScrollbar overflow-y-scroll h-[80vh] px-2 space-y-2 py-2'>
             {messages.map((item) => <ChatMessage item={item} />)} 
            </div>
            <div className='sticky bottom-0 border-l'>
            { selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt="" />}
            <div className='py-5 flex items-center justify-center space-x-5'>
           
              <input onKeyPress={(e)=> {
                if(e.key==="Enter" && e.target.value) {
                  handleCreateMessage(e.target.value)
                  setSelectedImage("")
                }
              }}
              className='bg-transparent border border-[#3b40544] rounded-full w-[80%] py-3 px-5' placeholder='Start a new message' type="text" />
              <div>
                <input className='hidden' id='image-input' type="file" accept='image/*'
                  onChange={handleSelectImage} />
                <label htmlFor="image-input">
                  <AddToPhotosIcon />
                </label>
              </div>
            </div>

          </div>
          </div>: <div className='h-full space-y-5 flex flex-col justify-center items-center'>
            <ChatBubbleOutlineIcon sx={{fontSize:'15rem'}}/>
            <h1 className='text-4xl font-bold'>Select a message</h1>
            <p className='text-xl font-semibold'>Choose from your existing conversations, start a new one, or just keep swimming.</p>
            </div>}
          
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
