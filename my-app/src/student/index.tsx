import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { StudentType } from '../api'
import { getStudents } from '../api/student'
import Navbar from '../components/Navbar'
import StudentForm from '../components/StudentForm'
import StudentTable from '../components/StudentTable'
import { useNavigate } from 'react-router-dom'
import StudentModal from '../components/StudentModal'
const Student = () => {
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [isGetData,setIsGetData] = useState<boolean>(false);
  const [students,setStudents] = useState<StudentType[]>([]);
  const [idStudent,setIdStudent] = useState<number|undefined>(undefined);

  //console.log(idStudent);
  

  const {isOpen,onClose,onOpen} = useDisclosure();
  const handleGetStudents = async () =>{
    setIsGetData(true);
    const res = await getStudents();
    if(res.data.status == 200){
      setStudents(res.data.students);
      setIsGetData(false);
    }
  }

  useEffect(()=>{
    handleGetStudents();
  },[])

  return (
    <>
      
      <Box textAlign="center" margin="30px auto">
          {isLoading ? <div className='loading-lazy'></div>:""}
          <StudentForm setIsLoading={setIsLoading} handleGetStudents={handleGetStudents}/>
          <StudentModal isOpen={isOpen} onClose={onClose} idStudent={idStudent} handleGetStudents={handleGetStudents}/>
          {!isGetData ? <StudentTable data={students} onOpen={onOpen} setIdStudent={setIdStudent}/>: <Spinner size="xl"/>}
          <ToastContainer/>
      </Box>
    </>
    
  )
}

export default Student