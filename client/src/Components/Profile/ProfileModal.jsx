import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateUser } from '../../Store/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../Utilities/UploadFileToCloud';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: 4
};

export default function KeepMountedModal({open, handleClose}) {
    const dispatch = useDispatch()
    const [uploadImageUrl, setUploadImageUrl] = React.useState(false);
    const [selectImageUrl, setSelectImageUrl] = React.useState("");

    const [uploadBackgroundImage, setUploadBackgroundImage] = React.useState(false);
    const [selectBackgroundImage, setSelectBackgroundImage] = React.useState("");

    const {auth} = useSelector(store => store);


    const handleSubmit = (values) => {
        dispatch(updateUser(values))
        console.log('handleSubmit', values);
        setSelectImageUrl("")
        setSelectBackgroundImage("")
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            website: '',
            location: '',
            bio: '',
            backgroundImage: '',
            imageUrl: ''
        },
        onSubmit: handleSubmit
    })

    const handleChangeImageUrl = async(e) => {
        setUploadImageUrl(true);
        const { name } = e.target
        const file = await uploadToCloudinary(e.target.files[0])
        formik.setFieldValue(name, file);
        setSelectImageUrl(file)
        setUploadImageUrl(false);
    }

    const handleChangeBackgroundImage = async(e) => {
        setUploadBackgroundImage(true);
        const { name } = e.target
        const file = await uploadToCloudinary(e.target.files[0])
        formik.setFieldValue(name, file);
        setSelectBackgroundImage(file)
        setUploadBackgroundImage(false);
    }

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <IconButton onClick={handleClose} aria-aria-label='delete'>
                                    <CloseIcon />
                                </IconButton>
                                <p className=''>Edit Profile</p>
                            </div>
                            <Button type='submit'>Save</Button>
                        </div>
                        <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
                            <React.Fragment>
                                <div className='w-full'>
                                    <div className='relative'>
                                        <img className='w-full h-[12rem] object-cover object-center'
                                            src={selectBackgroundImage || auth.user?.backgroundImage} alt="" />
                                        <input onChange={handleChangeBackgroundImage} type="file" name='backgroundImage' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'  />
                                    </div>
                                </div>
                                <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                                    <div className='relative'>
                                        <Avatar sx={{width:'10rem', height:'10rem', border:'4px solid white'}}
                                         src={selectImageUrl || auth.user?.imageUrl}/>
                                         <input onChange={handleChangeImageUrl} name='imageUrl' type="file"
                                         className='absolute top-0 left-0 w-[10rem h-full opacity-0 cursor-pointer]' />
                                    </div>
                                </div>
                            </React.Fragment>
                            <div className='space-y-3'>
                                <TextField fullWidth id='name' name='name' label='Name'
                                    value={formik.values.name || auth.user?.name} onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name} />

                                <TextField fullWidth multiline rows={4}
                                    id='bio' name='bio' label='Bio'
                                    value={formik.values.bio || auth.user?.bio} onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio} />

                                <TextField fullWidth id='website' name='website' label='Website'
                                    value={formik.values.website || auth.user?.website} onChange={formik.handleChange}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website} />

                                <TextField fullWidth id='location' name='location' label='Location'
                                    value={formik.values.location || auth.user?.location} onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location} />
                                    <div className='my-3'>
                                        <p className='text-lg'>Birth date . Edit</p>
                                        <p className='text-lg'>November 15, 1990</p>
                                    </div>
                                    <p className='py-3 text-2xl font-bold'>X for Professionals</p>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}