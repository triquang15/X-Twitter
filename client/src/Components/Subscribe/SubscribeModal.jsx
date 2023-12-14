import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    outline: 'none',
    p: 4,
    borderRadisus: 4
};

const features = ["Verification & Security: SMS two-factor authentication, Encrypted direct messages",
"Customization: Hide your subscriptions, App icons, Bookmark folders",
"Creator Hub: Get paid to post, X Pro (web only), Analytics (web only)",
"Enhanced Experience: Background video playback, Reply boost"]

export default function SubscribeModal({handleClose, open}) {

    const [plan, setPlan] = React.useState('Annually');

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex items-center space-x-3'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>

                    </div>
                    <div className='flex justify-center py-10 '>
                        <div className='w-[80%] space-y-10'>
                            <h1 className='text-center text-4xl font-bold'>Who are you? <br />
                                <p className='text-center text-lg font-semibold'>Choose the right subscription for you:</p>
                            </h1>
                            <div className='columns-2'>
                                <div className='p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-200'>
                                    <h1 className='text-2xs pr-5'>Premium <br />
                                        <strong className='text-xl'>I am an individual</strong>  <br /> For individuals and creators</h1>
                                </div>
                                <div className='p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-200'>
                                    <h1 className='text-2xs pr-5'>Verified Organizations<br />
                                        <strong className='text-xl'>I am an Organization</strong>  <br /> For businesses, government ...</h1>
                                </div>
                            </div>

                            <div className='flex justify-between border rounded-full px-5 py-3  border-gray-500'>
                                <div>
                                    <span onClick={() => setPlan('Annually')} className={`${plan === 'Annually' ? 'text-black' : 'text-gray-400'} cursor-pointer`}>Annual plan</span>
                                    <span className='text-green-500 text-sm ml-5'>SAVE 14%</span>
                                </div>
                                <p onClick={() => setPlan('Monthly')} className={`${plan === 'Monthly' ? 'text-black' : 'text-gray-400'} cursor-pointer`}>Monthly plan</p>
                            </div>
                            <div className='space-y-3'>
                                {features.map((item) => <div className='flex items-center space-x-5'>
                                    <FiberManualRecordIcon sx={{ width: '7px', height: '7px' }} />
                                    <p className='text-xs'>{item}</p>
                                </div>)}
                            </div>
                            <div className='cursor-pointer flex justify-center px-5 py-3 bg-gray-900 text-white rounded-full'>
                                <span className='line-through italic'>SGD 225.96/year</span><br />
                               <span className='px-5'>SGD 115.99/year</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}