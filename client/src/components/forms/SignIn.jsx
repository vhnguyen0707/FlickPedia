import { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';
import { Stack, TextField, Button, Box, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

//fetch
import userRequests from '../../axios/modules/userRequests';

const SignIn = ({toggleCurrentForm}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError ] = useState('');

    const dispatch = useDispatch();
    const {values, errors, touched, getFieldProps, handleSubmit, resetForm} = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Required')
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const { response, err } = await userRequests.signin(values);
            setIsLoading(false);
            if (response) {
                resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success(`Signed in as ${response.username}`);
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
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...getFieldProps('password')}
                    color="success"
                    error={touched.password && errors.password !== undefined}
                    helperText={touched.password && errors.password}
                    />
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    variant='contained'
                >
                    Sign in</LoadingButton>
                <Button 
                    variant='text'
                    onClick={toggleCurrentForm}
                >Sign up</Button>
                {error && <Alert severity='error'>{error}</Alert>}
            </Stack>
        </Box>
    )
}

export default SignIn