import {useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Box,
    Input,
    Button,
    Text
  } from '@chakra-ui/react'
import axios from '../../../api/axios'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerCreate } from '../../../api/student';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const schema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(6, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {

    let navigate = useNavigate()
    const [isLoading,setIsLoading] = useState<boolean>(false);
   const { register, formState: { errors },handleSubmit} = useForm({ resolver: yupResolver(schema)});
   const [registerForm,setRegisterForm] = useState({
        name:"",
        email:'',
        password:'',
        
        
   })

   const [errorMessages,setErrorMessages] = useState("");

   const handleInput = (e:any) =>{
    e.persist();
    setRegisterForm({...registerForm,[e.target.name]:e.target.value})
    
    
   }
   
  const registerSubmit = async (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      await axios.get('/sanctum/csrf-cookie')
      const res = await registerCreate(data);

    if(res.data.status === 200){
        localStorage.setItem('auth_token',res.data.token);
        localStorage.setItem('auth_name',res.data.username);
        toast.success(res.data.message)
        setIsLoading(false)
        navigate('/')
    }else if(res.data.status === 401){
        setErrorMessages(res.data.error)
        setIsLoading(false)
    }
    
     
  }
  return (
    <div>
        <h1>Register</h1>

        <Box maxWidth="700px" m="40px auto">
           
            <form encType='multipart/data' onSubmit={handleSubmit(registerSubmit)}>
                <FormControl>
                    <FormLabel htmlFor='name'>Full name</FormLabel>
                    <Input {...register('name')} onChange={handleInput} name="name" id='name' placeholder='Full name' />
                    {errors.name && <Text color='tomato'>{errors.name?.message}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email'>Email address</FormLabel>
                    <Input {...register('email')} onChange={handleInput} name="email" id='email' type='email' />
                    {errors.email && <Text color='tomato'>{errors.email?.message}</Text>}
                    <Text fontSize="md" color="tomato">{errorMessages}</Text>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input {...register('password')} onChange={handleInput} name="password" id='password' type='password' />
                    {errors.password && <Text color='tomato'>{errors.password?.message}</Text>}
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='confirm_password'>Confirm Password</FormLabel>
                    <Input {...register('confirm_password')} name="confirm_password" id='confirm_password' type='password' />
                    {errors.confirm_password && <Text color='tomato'>{errors.confirm_password?.message}</Text>}
                </FormControl>

                <FormControl>
                    <FormLabel></FormLabel>
                    <Button type="submit" colorScheme='teal' variant='solid'>
                        Register
                    </Button>
                </FormControl>
            </form>
        </Box>
    </div>
  )
}

export default Register