import { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Image,
    Text
  } from '@chakra-ui/react'
import { StudentModalType } from './StudentModal.type'
import UploadImage from '../UploadImage'
import { getStudentbyId, updateStudent } from '../../api/student'
import { useForm } from 'react-hook-form'
import { FormType } from '../StudentForm/StudentForm.type'
import { toast } from 'react-toastify'
const StudentModal = ({ isOpen, onClose,idStudent,handleGetStudents }: StudentModalType) => {
    const [avatar,setAvatar] = useState<any>(null);
    const [imgPreview,setImgPreview] = useState<any>(null);
    const [imgStudentCurrent,setImgStudentCurrent] = useState<any>(null)

    const {register,handleSubmit, reset} = useForm<FormType>();

  const handleGetStudentById = async () =>{
      const res = await getStudentbyId(Number(idStudent));
      if(res.data.status === 200){
          reset(res.data.student);
          setImgStudentCurrent(res.data.student.avatar)
      }
  }
  const submit = async(data:any) =>{
      const formData = new FormData();
      formData.append('name',data.name);
      formData.append('avatar',avatar);

      const res = await updateStudent(Number(idStudent),formData);
      if(res.data.status === 200){
          toast.success(res.data.message);
          onClose();
          setImgPreview("");
          handleGetStudents();
      }
      
  }

  useEffect(() =>{
      if(idStudent != undefined){
          handleGetStudentById();
      }
  },[idStudent])

    return (
      <>
        <Modal
         
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit(submit)}>
                <ModalHeader>Update Student</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input  placeholder='Name' {...register('name')} name="name"/>
                </FormControl>
                
                <FormControl mt={4}>
                    <FormLabel>Avatar</FormLabel>
                    <Text mt={2}>Curent Avatar</Text>
                    <Image 
                        mt={2}
                        src= {`http://127.0.0.1:8000/img/${imgStudentCurrent}`}
                        borderRadius="full" 
                        boxSize="100px" 
                        objectFit="cover"
                    />
                    <Text mt={2}>New Avatar</Text>
                    <UploadImage 
                    htmlFor={"avatarEdit"}
                    {...register('avatar')}
                    setAvatar={setAvatar} 
                    setImgPreview={setImgPreview} 
                    imgPreview={imgPreview}
                    inputProps={{
                        name:"avatar",
                        id:"avatarEdit",
                        hidden:true
                    }}
                    ></UploadImage> 
                </FormControl>
                </ModalBody>
    
                <ModalFooter>
                <Button type="submit" colorScheme='blue' mr={3}>
                    Save
                </Button>
                <Button onClick={onClose} >Cancel</Button>
                </ModalFooter>
            </form>
            
          </ModalContent>
        </Modal>
      </>
    )
}

export default StudentModal