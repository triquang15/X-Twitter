import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { XCart } from './XCart';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPosts } from '../../Store/Post/Action';
import { uploadToCloudinary } from '../../Utilities/UploadFileToCloud';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Field is required")
})

export const HomeSection = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const [selectImage, setSelectImage] = useState("");
    const dispatch = useDispatch();
    const {post} = useSelector(store => store)

    const handleSubmit = (value, action) => {
        dispatch(createPost(value))
        action.resetForm()
        console.log("Value ", value);
        setSelectImage("")
    }

    const formik = useFormik({
        initialValues: {
            content: "",
            image: ""
        },
        onSubmit: handleSubmit,
        validationSchema,
    })

    const handleSelectImage = async(e) => {
        setUploadImage(true);
        const imageUrl = await uploadToCloudinary(e.target.files[0])
        formik.setFieldValue("image", imageUrl);
        setSelectImage(imageUrl);
        setUploadImage(false);
    }

    useEffect(() => {
        dispatch(getAllPosts())
    },[post.like, post.repost])

    return (
        <div className='space-y-5'>
            <section>
                <h1 className='py-5 text-xl font-bold opacity-90'>For You</h1>
            </section>
            <section className={`pb-10`}>
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
                        <div>
                           {selectImage && <img src={selectImage} alt="" />}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {post.posts?.map((item) => <XCart item={item}/>)}
            </section>
        </div>
    )
}
