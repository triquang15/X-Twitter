import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import SubscribeModal from '../Subscribe/SubscribeModal';

export const RightPart = () => {
    const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);
    const handleOpenSubscribeModal = () => setOpenSubscribeModal(true);
    const handleCloseSubscribeModal = () => setOpenSubscribeModal(false);

    const handleChangeTheme = ()=> {
        console.log('handleChangeTheme');
    }

  return (
    <div className='py-5 sticky top'>
        <div className='relative flex items-center'>
            <input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12' placeholder='Search' />
            <div className='absolute top-0 left-0 pl-3 pt-3'>
                <SearchIcon className='text-gray-500'/>
            </div>
            <Brightness4Icon className='ml-3 cursor-pointer' onClick={handleChangeTheme}/>
        </div>
        <section className='my-5'>
            <h1 className='text-xl font-bold'>Subscribe to Premium</h1>
            <h1 className='font-semibold my-2'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</h1>
            <Button onClick={handleOpenSubscribeModal} variant='contained' sx={{padding:"10px", paddingX:'20px', borderRadius:'25px', bgcolor: "#00BFFF"}}>Subscribe</Button>
        </section>
        <section className='mt-7 space-y-5'>
            <h1 className='font-bold text-xl py-1'>Trends for you</h1>
            {[1,1,1,1].map((item) =>  <div className='flex justify-between w-full'>
           <div>
                <p className='text-sm'>Trending in Singapore</p>
                <p className='font-bold'>Karma</p>
                <p className='text-sm'>65.5K posts</p>
            </div>
            <MoreHorizIcon/>
            </div>)}     
        </section>
        <section>
            <SubscribeModal open={openSubscribeModal} handleClose={handleCloseSubscribeModal}/>
        </section>
    </div>
  )
}
