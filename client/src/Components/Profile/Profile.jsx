import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { XCart } from '../HomePage/XCart';

export const Profile = () => {
    const [tabValue, setTabValue] = useState("1");
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    const handleOpenProfile = () => {
        console.log('handleOpenProfile');
    }

    const handleFollowUser = () => {
        console.log('handleFollowUser');
    }

    const handleTabChange = (e, newValue)=> {
        setTabValue(newValue)
        if(newValue === 4) {
            console.log('Like Post');
        } else if(newValue === 1) {
            console.log('Users Post');
        }
    }

    return (
        <div>
            <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Quang Tri Nguyen</h1>
            </section>
            <section>
                <img className='w-[100%] h-[15rem] object-cover' src="https://cdn.pixabay.com/photo/2023/10/11/11/42/coast-8308438_1280.jpg" alt="" />
            </section>
            <section className='pl-6'>
                <div className='flex justify-between items-start mt-5 h-[5rem]'>
                    <Avatar className='transform -translate-y-24' sx={{ width: "10rem", height: "10rem", border: "4px solid white" }} alt='username' src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' />
                    {true ? (<Button onClick={handleOpenProfile}
                        variant='contained' sx={{ borderRadius: '20px', bgcolor: "#00BFFF" }}>Update Profile
                    </Button>) : (
                        <Button onClick={handleFollowUser}
                            variant='contained' sx={{ borderRadius: '20px', bgcolor: "#00BFFF" }}>{true ? 'Follow' : 'Unfollow'}
                        </Button>)}
                </div>
                <div>
                    <div className='flex items-center'>
                        <h1 className='font-bold text-lg'>Quang Tri Nguyen</h1>
                        {true && <svg fill='red' width={25} height={25} viewBox="0 0 22 22" aria-label="Verified account" role="img" data-testid="icon-verified"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>}
                    </div>
                    <h1 className='text-gray-500'>@qnguyen95</h1>
                </div>
                <div className='mt-2 space-y-3'>
                    <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." <br />
                        "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                    </p>
                    <div className='py-1 flex space-x-5'>
                        <div className='flex items-center text-gray-500'>
                            <BusinessCenterIcon />
                            <p className='ml-2'>Education</p>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <LocationOnIcon />
                            <p className='ml-2'>VietName</p>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <CalendarMonthIcon />
                            <p className='ml-2'>Joined December 2023</p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-5'>
                        <div className='flex items-center space-x-1 font-semibold'>
                            <span>1100</span>
                            <span className='text-gray-500'>Following</span>
                        </div>
                        <div className='flex items-center space-x-1 font-semibold'>
                            <span>954</span>
                            <span className='text-gray-500'>Followers</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Posts" value="1" />
                            <Tab label="Replies" value="2" />                          
                            <Tab label="Media" value="3" />
                            <Tab label="Likes" value="4" />
                            <Tab label="Highlights" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {[1,1,1,1,1,1].map((item) => <XCart/>)}
                    </TabPanel>
                    <TabPanel value="2">Replies</TabPanel>
                    <TabPanel value="3">Media</TabPanel>
                    <TabPanel value="4">Likes</TabPanel>
                    <TabPanel value="5">Highlights</TabPanel>
                </TabContext>
            </section>
        </div>
    )
}
