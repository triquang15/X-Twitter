import { Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUser } from '../../Store/Auth/Action'

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
})
export const SignIn = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values))
            console.log('Login Sucessfully', values);
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label='Username' type='text' name='username' variant='outlined' size='large'
                        value={formik.values.username} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label='Password' name='password' type='password' variant='outlined' size='large'
                        value={formik.values.password} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password} />
                </Grid>
                <Grid className='mt-20' item xs={12}>
                    <Button type='submit' sx={{ borderRadius: '29px', py: '15px', bgcolor: blue[500] }}
                        fullWidth variant='contained' size='large'>Sign In</Button>
                </Grid>
            </Grid>
        </form>
    )
}
