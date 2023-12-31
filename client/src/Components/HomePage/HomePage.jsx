import { Grid } from '@mui/material'
import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import { HomeSection } from './HomeSection'
import { RightPart } from './RightPart'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Profile } from '../Profile/Profile'
import { CreateReel } from '../Reels/CreateReel'
import { Reels } from '../Reels/Reels'
import { useDispatch, useSelector } from 'react-redux'

export const HomePage = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const {auth} = useSelector(store => store);
  
  return (
    <div className='px-20'>
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className='sticky top-0'>
            <Navigation />
          </div>
        </Grid>
      <Grid lg={location.pathname==='/'?6:6} item className='px-5 flex justify-center'xs={12}>
      <Routes>
            <Route path='/' element={<HomeSection/>}></Route>
            <Route path='/home' element={<HomeSection/>}></Route>
            <Route path='/explore' element={<Reels/>}></Route>
            <Route path='/grok' element={<CreateReel/>}></Route>
            <Route path='/profile/:id' element={<Profile/>}></Route>
          </Routes>
      </Grid>
      <Grid item lg={3} className='relative'>
        <div className='sticky top-0 w-full'>
          <RightPart/>
        </div>
      </Grid>
      </Grid>
    </div>
  )
}
