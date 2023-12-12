import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { XCart } from './XCart';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Field is required")
})

export const HomeSection = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const [selectImage, setSelectImage] = useState("");

    const handleSubmit = (value) => {
        console.log("Value ", value);
    }

    const formik = useFormik({
        initialValues: {
            content: "",
            image: ""
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
                    </div>
                </div>
            </section>
            <section>
                {[1,1,1,1,1,1].map((item) => <XCart/>)}
            </section>
        </div>
    )
}
