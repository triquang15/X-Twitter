import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

export const PopularUser = () => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        action={
          <Button size='small'>Follow</Button>
        }
        title="Tri Quang"
        subheader="@qnguyen95"
      />
    </div>
  )
}
