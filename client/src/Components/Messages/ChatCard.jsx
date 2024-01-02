import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

export const ChatCard = ({chat}) => {
    const {message, auth} = useSelector(store => store);
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{
                        width: '3.5rem', height: '3.5rem', fontSize: '1.5rem', bgcolor: '#191c29',
                        color: 'rgb(88,199,250'
                    }} src={auth.user.id===chat.users[0].id?chat.users[1].imageUrl:chat.users[0].imageUrl} />
                } action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                } title={auth.user.id===chat.users[0].id?chat.users[1].name:chat.users[0].name}
                subheader={'New Message'}>
            </CardHeader>
        </Card>
    )
}
