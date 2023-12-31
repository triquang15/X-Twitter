import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { PostCard } from '../Post/PostCard';
import { ReelCard } from '../Reels/ReelCard';
import ProfileModal from './ProfileModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const tabs = [
  { value: 'posts', name: 'Posts' },
  { value: 'reels', name: 'Reels' },
  { value: 'saved', name: 'Saved' },
  { value: 'likes', name: 'Likes' },
];
const reels = [1, 1, 1, 1]
const savedPost = [1, 1, 1]

export const Profile = () => {
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfile = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const dispatch = useDispatch();
  const {id} = useParams()

  const [value, setValue] = React.useState('posts');
  const {auth} = useSelector(store=> store);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className='my-10 w-[80%]'>
      <div className='rounded-md'>
        <div className='h-[15rem]'>
          <img className='w-full h-full rounded-t-md' src={auth.user?.backgroundImage} alt="" />
        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar sx={{ width: '10rem', height: '10rem' }} className='transform -translate-y-24'
            src={auth.user?.imageUrl} />
          {true ? (<Button onClick={handleOpenProfile} sx={{ borderRadius: '20px' }} variant='outlined'>Edit Profile</Button>)
            : (<Button sx={{ borderRadius: '20px' }} variant='outlined'>Follow</Button>)}
        </div>
        <div className='p-5'>
          <div>
            <h1 className='py-1 font-bold text-xl'>{auth.user?.name}</h1>
            <p>@{auth.user?.username}</p>
          </div>
          <div className='flex gap-5 items-center py-3'>
            <span>50 Posts</span>
            <span>35 Followers</span>
            <span>90 Following</span>
          </div>
          <div>
            <p>{auth.user?.bio}</p>
          </div>
        </div>
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}
            </Tabs>
          </Box>
          <div className='flex justify-center'>
            {value === 'posts' ? (<div className='space-y-5 w-[80%] my-10'>
              {[1, 1, 1, 1].map((item) =>
              (<div className='border border-slate-100 rounded-md'>
                <PostCard />
              </div>
              ))}
            </div>) :
              value === 'reels' ? <div className='flex justify-center flex-wrap gap-2 my-10'>
                {reels.map((item) => <ReelCard />)}
              </div> :
                value === 'saved' ? <div className='flex justify-center flex-wrap gap-2 my-10'>
                  {savedPost.map((item) => <PostCard />)}
                </div> : (<div className='flex justify-center flex-wrap gap-2 my-10'> {[1, 1, 1, 1].map((item) =>
              (<div className='border border-slate-100 rounded-md'>
                <PostCard />
              </div>
              ))}</div>)}
          </div>
        </section>
      </div>
      <section>
      <ProfileModal handleClose={handleClose} open={openProfileModal}/>
      </section>
    </Card>
  )
}
