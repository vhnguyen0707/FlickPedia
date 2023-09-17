import { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';
import { Stack, TextField, Button, Box, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import userRequests from '../../axios/modules/userRequests';

const SignUp = ({toggleCurrentForm}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError ] = useState('');

    const dispatch = useDispatch();
    const {values, errors, touched, getFieldProps, handleSubmit, resetForm} = useFormik({
        initialValues: {
            username: '',
            displayName: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            displayName: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            confirmPassword: Yup.string().min(8, 'Must be at least 8 characters').required('Required')
                                .oneOf([Yup.ref('password')], 'Passwords do not match')
                                //oneOf to match 1 of the values inside array
                                //ref -> password value
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const { response:data, err } = await userRequests.signup(values);
            setIsLoading(false);

            if (data) {
                resetForm();
                dispatch(setUser(data));
                toast.success(`Signed in as ${data.username}`);
                toggleCurrentForm();
                dispatch(setAuthModalOpen(false));
            } 
            if (err) setError(err.message)
        }
    })
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack marginTop="30px" spacing={3}>
                <TextField
                    type="text"
                    placeholder="Username"
                    name="username"
                    {...getFieldProps('username')}
                    color="success"
                    error={touched.username && errors.username !== undefined}
                    helperText={touched.username && errors.username}
                    />
                <TextField
                    type="text"
                    placeholder="Display Name"
                    name="displayName"
                    {...getFieldProps('displayName')}
                    color="success"
                    error={touched.displayName && errors.displayName !== undefined}
                    helperText={touched.displayName && errors.displayName}
                    />
                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...getFieldProps('password')}
                    color="success"
                    error={touched.password && errors.password !== undefined}
                    helperText={touched.password && errors.password}
                    />
                <TextField
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    {...getFieldProps('confirmPassword')}
                    color="success"
                    error={touched.confirmPassword && errors.confirmPassword !== undefined}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    variant='contained'
                >
                    Sign up</LoadingButton>
                <Button 
                    variant='text'
                    onClick={toggleCurrentForm}
                >Sign in</Button>
                {error && <Alert severity='error'>{error}</Alert>}
            </Stack>
        </Box>
    )
}

export default SignUp