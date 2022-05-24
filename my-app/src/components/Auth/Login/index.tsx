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
import { login } from '../../../api/student';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(6, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const Login = () => {

    let navigate = useNavigate();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [errorMessages,setErrorMessages] = useState("");
   const { register, formState: { errors },handleSubmit} = useForm({ resolver: yupResolver(schema)});
   const [loginForm,setLoginForm] = useState({
        email:'',
        password:'',
        
        
   })

   const handleInput = (e:any) =>{
    e.persist();
    setLoginForm({...loginForm,[e.target.name]:e.target.value})
    
    
   }
   
  const submit = async (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
        await axios.get('/sanctum/csrf-cookie')
      const res = await login(data);
   
      if(res.data.status === 200){
        localStorage.setItem('auth_token',res.data.token);
        localStorage.setItem('auth_name',res.data.username);
        toast.success(res.data.message)
        setIsLoading(false);
        navigate('/')
    }else if(res.data.status === 401){
        setErrorMessages(res.data.message)
        setIsLoading(false);
    }
    
     
  }
  return (
    <div>
        {isLoading ? <div className='loading-lazy'></div>:""}
        <h1>Login</h1>
        <Box maxWidth="700px" m="40px auto">
            <Text fontSize="md" color="tomato">{errorMessages}</Text>
            <form encType='multipart/data' onSubmit={handleSubmit(submit)}>
                
                <FormControl>
                    <FormLabel htmlFor='email'>Email address</FormLabel>
                    <Input {...register('email')} onChange={handleInput} name="email" id='email' type='email' />
                    {errors.email && <Text color='tomato'>{errors.email?.message}</Text>}
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input {...register('password')} onChange={handleInput} name="password" id='password' type='password' />
                    {errors.password && <Text color='tomato'>{errors.password?.message}</Text>}
                </FormControl>


                <FormControl>
                    <FormLabel></FormLabel>
                    <Button type="submit" colorScheme='teal' variant='solid'>
                        Login
                    </Button>
                </FormControl>
            </form>
        </Box>
    </div>
  )
}

export default Login