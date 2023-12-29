import { Avatar } from '@mui/material'
import React from 'react'

export const StoryCircle = () => {
  return (
    <div>
          <div className='flex flex-col items-center mr-4 cursor-pointer'>
                    <Avatar sx={{ width: '5rem', height: '5rem' }}
                      src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' 
                    >                                  
                    </Avatar>
                    <p>Leo Messi</p>
                </div>
    </div>
  )
}
