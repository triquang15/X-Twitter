import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Store/Auth/Action';
import { createChat } from '../../Store/Messages/messageAction';

export const SearchUser = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const {message, auth} = useSelector(store => store);

    const handleSeachUser = (e) => {
        setUsername(e.target.value);
        dispatch(searchUser(username))
    }
    const handleClick = (id) => {
        dispatch(createChat({userId:id}));
    }

    return (
        <div>
            <div className='py-5 relative'>
                <input className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full'
                    placeholder='Search Direct Message' type="text" onChange={handleSeachUser} />
                {
                    username && (auth.searchUser.map((item) => <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
                        <CardHeader onClick={() => {
                            handleClick(item.id)
                            setUsername("")
                        }}
                            avatar={<Avatar src='https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_1280.png' />}
                            title={item.name}
                            subheader={'@'+item.username}
                        />

                    </Card>)
                )}
            </div>

        </div>
    )
}
