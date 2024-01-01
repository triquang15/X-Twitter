import * as React from 'react';
import Box from '@mui/material/Box';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, Backdrop, Button, CircularProgress, IconButton } from '@mui/material';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { uploadToCloudinaryImageAndVideo } from '../../Utilities/UploadFileToCloud';
import { useDispatch } from 'react-redux';
import { createComment, createPost } from '../../Store/Post/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'.6rem',
  outline:'none'
};

export default function PostModal({handleClose, open}) {
const [selectedImage, setSelectedImage] = React.useState();
const [selectedVideo, setSelectedVideo] = React.useState();
const [isLoading, setIsLoading] = React.useState(false);
const dispatch = useDispatch();

const handleSelectImage = async(e)=> {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinaryImageAndVideo(e.target.files[0], "image")
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl)
}

const handleSelectVideo = async(e)=> {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinaryImageAndVideo(e.target.files[0], "video")
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("image", videoUrl)
}

const formik = useFormik({
    initialValues:{
        content:'',
        image:'',
        video:''
    },
    onSubmit:(values) => {
        console.log('Values', values);
        dispatch(createPost(values))     
    }
});


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className='flex space-x-4 items-center'>
                        <Avatar/>
                        <div>
                            <p className='font-bold text-lg'>Tri Quang</p>
                            <p className='text-sm'>@qnguyen95</p>
                        </div>
                    </div>
                    <textarea className='outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm' placeholder='What is happening?' onChange={formik.handleChange}
                    name="content" id={formik.values.content} rows="4"></textarea>
                    <div className='flex space-x-5 items-center mt-5'>
                        <div>
                            <input type="file" accept='image/*' id='image-input' onChange={handleSelectImage} style={{display:'none'}} />
                            <label htmlFor="image-input">
                                <IconButton color='primary' component="span">
                                    <AddToPhotosIcon/>
                                </IconButton>
                            </label>
                            <span>Image</span>
                        </div>
                        <div>
                            <input type="file" accept='video/*' id='video-input' onChange={handleSelectVideo} style={{display:'none'}} />
                            <label htmlFor="video-input">
                                <IconButton color='primary'>
                                    <SlowMotionVideoIcon/>
                                </IconButton>
                            </label>
                            <span>Video</span>
                        </div>
                    </div>
                   {selectedImage && <div>
                        <img src={selectedImage} alt="" className='h-[10rem]' />
                    </div>}
                    <div className='flex w-full justify-end'>
                        <Button sx={{borderRadius:'1.5rem'}} variant='contained' type='submit'>Post</Button>
                    </div>
                </div>
            </form>
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}