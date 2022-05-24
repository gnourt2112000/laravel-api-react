import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Student from "./student"
import "./css.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./protectedRoute"

export const App = () => {
  return (
  <ChakraProvider theme={theme}>
    hello
    Cocacola
    <Box  fontSize="xl">
       

        <BrowserRouter>
        <Navbar></Navbar>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="10vmin" pointerEvents="none" />
        </VStack>
          <Routes>
            <Route path="/"  element={
              <ProtectedRoute>
                <Student/>
              </ProtectedRoute>
            }>
            </Route>
            <Route path="/login" element= {localStorage.getItem('auth_token') ? <Navigate to="/" replace /> : <Login/>}>
             
            </Route>
            <Route path="/register" element= {localStorage.getItem('auth_token') ? <Navigate to="/" replace /> : <Register/>}>
          
            </Route>
           
          </Routes>
        </BrowserRouter>
    </Box>
  </ChakraProvider>
)}
