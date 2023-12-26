import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { replyPost } from '../../Store/Post/Action';

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

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Field is required")
})

export default function ReplyModal({handleClose, open, item}) {
    const navigate = useNavigate();
    const [uploadImage, setUploadImage] = React.useState(false);
    const [selectImage, setSelectImage] = React.useState("");
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(replyPost(values))
        console.log("Values ", values);
        handleClose()
        
    }

    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            postId: item?.id
        },
        onSubmit: handleSubmit,
        validationSchema,
    })

    const handleSelectImage = (e) => {
        setUploadImage(true);
        const imageUrl = e.target.files[0]
        formik.setFieldValue("image", imageUrl);
        setSelectImage(imageUrl);
        setUploadImage(false);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex space-x-5'>
                        <Avatar onClick={() => navigate(`/profile/${6}`)} className='cursor-pointer' alt='' src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' />
                        <div className='w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='flex cursor-pointer items-center space-x-2'>
                                    <span className='font-semibold'>Tri Quang Nguyen</span>
                                    <span className='text-gray-600'>@qnguyen95 .41m</span>
                                    <svg fill='red' width={25} height={25} viewBox="0 0 22 22" aria-label="Verified account" role="img" data-testid="icon-verified"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                                </div>

                            </div>
                            <div className='mt-2'>
                                <div onClick={() => navigate(`/post/${3}`)} className='cursor-pointer'>
                                    <p className='mb-2 p-0'>Take my work, create something beautiful, enrich your life and the lives of strangers.</p>

                                </div>

                            </div>
                        </div>                     
                    </div>
                    <section className={`py-10`}>
                            <div className='flex space-x-5'>
                                <Avatar alt='username' src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' />
                                <div className='w-full'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div>
                                            <input className={`border-none outline-none text-xl bg-transparent`}
                                                {...formik.getFieldProps("content")}
                                                type="text" name='content' placeholder='What is happening?' />
                                            {formik.errors.content && formik.touched.content && (
                                                <span className='text-red-500'>{formik.errors.content}</span>
                                            )}
                                        </div>
                                        <div className='flex justify-between items-center mt-5'>
                                            <div className='flex space-x-5 items-center'>
                                                <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                                    <ImageIcon className='text-[#1d9bf0]' />
                                                    <input type="file" name='imageFile' className='hidden' onChange={handleSelectImage} />
                                                </label>
                                                <FmdGoodIcon className='text-[#1d9bf0]' />
                                                <TagFacesIcon className='text-[#1d9bf0]' />
                                            </div>
                                            <div>
                                                <Button type='submit' variant="contained" sx={{ width: "100%", borderRadius: "30px", paddingY: "7px", paddingX: "20px", bgcolor: "#00BFFF" }}>Post</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                </Box>
            </Modal>
        </div>
    );
}