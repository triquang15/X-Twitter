import React from 'react'
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { XCart } from '../HomePage/XCart';
import { Divider } from '@mui/material';

export const PostDetails = () => {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

  return (
    <React.Fragment>
        <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
            <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
            <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Posts</h1>
        </section>
        <section>
            <XCart/>
            <Divider sx={{margin:'2rem 0rem'}}/>
        </section>
        <section>
            {[1,1,1,1].map((item => <XCart/>))}
        </section>
    </React.Fragment>
  )
}
