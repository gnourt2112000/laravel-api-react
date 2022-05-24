import React, { useState } from 'react'
import { Box, Button, Flex, FormLabel, Image, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { FormType, StudentFormType } from './StudentForm.type';
import { createStudent } from '../../api/student';
import { toast } from 'react-toastify';
import UploadImage from '../UploadImage';
const StudentForm = ({setIsLoading,handleGetStudents}:StudentFormType) => {
  const [avatar,setAvatar] = useState<any>(null);
  const [imgPreview,setImgPreview] = useState<any>(null);

  const [errorMessages,setErrorMessages] = useState<any>({
    name:"",
    avatar:""
  });
  const {register,handleSubmit} = useForm<FormType>();
  const handleImgPreview = (event:any) =>{
    const fileSelected = event.target.files[0];
    setAvatar(fileSelected);
    let reader = new FileReader();
    reader.onloadend = () =>{
      setImgPreview(reader.result);
    }

    reader.readAsDataURL(fileSelected)
  }

  const submit = async (data:any, event:any) =>{
    setIsLoading(true);
    let formData = new FormData();
    formData.append("name",data.name);
    formData.append("avatar",avatar);
    
    
    console.log(formData.values);
    
    //let formData = {...data,avatar:avatar}
    
    const response = await createStudent(formData);
    if(response.data.status == 200){
      setIsLoading(false);

      setImgPreview("");

      event.target.reset();
      setAvatar("");
      toast.success(response.data.message)

      setErrorMessages("");

      //call api after add dâ
      handleGetStudents();
    }else if(response.data.status == 402){
      setIsLoading(false);
      setErrorMessages(response.data.errorMessage);
    }

  }
  return (
    <Box maxWidth="700px" m="auto" borderWidth={1} p={4} boxShadow="lg">
        <form onSubmit={handleSubmit(submit)} encType='multipart/data'>
            <Flex alignItems="center" gap="1rem">
                <Input  placeholder='name' type="text" {...register("name")} name="name"></Input>
                <UploadImage 
                  htmlFor={"avatar"}
                  setAvatar={setAvatar} 
                  setImgPreview={setImgPreview} 
                  imgPreview={imgPreview}
                  inputProps={{
                    name:"avatar",
                    id:"avatar",
                    hidden:true
                  }}
                ></UploadImage>  
               
                <Button type='submit' background="teal">Add</Button>
            </Flex>
        </form>
        <Text fontSize="md" color="tomato">{errorMessages.name}</Text>
        <Text fontSize="md" color="tomato">{errorMessages.avatar}</Text>
        
    </Box>

  )
}

export default StudentForm