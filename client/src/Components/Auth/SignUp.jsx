import React from 'react'
import * as Yup from 'yup'
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { signupUser } from '../../Store/Auth/Action'

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(8,"Password must be at least 8 characters").required("Password is required")
})
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
]
export const SignUp = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            birthDate: {
                day: '',
                month: '',
                year: ""
            }
        },
        validationSchema,
        onSubmit: (values) => {
            const { day, month, year } = values.birthDate
            const birthDate = `${year} - ${month} - ${day}`
            values.birthDate = birthDate;
            dispatch(signupUser(values));
            console.log('Signup Successfully', values);
        }
    })

    const handleDateChange = (name) => (event) => {
        formik.setFieldValue("birthDate", {
            ...formik.values.birthDate,
            [name]: event.target.value
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                    <TextField fullWidth label='Userame' type='text' name='username' variant='outlined' size='large'
                        value={formik.values.username} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label='Name' type='text' name='name' variant='outlined' size='large'
                        value={formik.values.name} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label='Email' type='email' name='email' variant='outlined' size='large'
                        value={formik.values.email} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label='Password' name='password' type='password' variant='outlined' size='large'
                        value={formik.values.password} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password} />
                </Grid>
                <Grid item xs={4}>
                    <InputLabel>Date</InputLabel>
                    <Select onChange={handleDateChange('day')} fullWidth
                        onBlur={formik.handleBlur}
                        name='day' value={formik.values.birthDate.day}>
                        {days.map((day) => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel>Month</InputLabel>
                    <Select onChange={handleDateChange('month')} fullWidth
                        onBlur={formik.handleBlur}
                        value={formik.values.birthDate.month}>
                        {months.map((month) =>
                         <MenuItem key={month} value={month.value}>{month.label}</MenuItem>)}
                    </Select>
                </Grid>              
                <Grid item xs={4}>
                    <InputLabel>Year</InputLabel>
                    <Select onChange={handleDateChange('year')} fullWidth
                        onBlur={formik.handleBlur}
                        name='year' value={formik.values.birthDate.year}>
                        {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid className='mt-20' item xs={12}>
                    <Button type='submit' sx={{ borderRadius: '29px', py: '15px', bgcolor: blue[500] }}
                        fullWidth variant='contained' size='large'>Sign Up</Button>
                </Grid>
            </Grid>
        </form>
    )
}
