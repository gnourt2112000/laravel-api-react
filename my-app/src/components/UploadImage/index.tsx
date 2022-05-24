import React from 'react'
import { Box, Button, Flex, FormLabel, Image, Input, Text } from '@chakra-ui/react'
import { UploadType } from './UploadImage.type';
const UploadIamge = ({setAvatar,setImgPreview,imgPreview,inputProps,htmlFor}:UploadType) => {

const handleImgPreview = (event:any) =>{
    const fileSelected = event.target.files[0];
    setAvatar(fileSelected);
    let reader = new FileReader();
    reader.onloadend = () =>{
        setImgPreview(reader.result);
    }
    
    reader.readAsDataURL(fileSelected)
}
  return (
    <>
        <FormLabel htmlFor={htmlFor} textAlign="center" width="300px" cursor="pointer" p={2} borderRadius="lg" background="gray">
            Choose file
        </FormLabel>
        <Input  onChange={handleImgPreview}  type="file" {...inputProps}></Input>
        <Image src={imgPreview} w="200px"/>
    </>
  )
}

export default UploadIamge