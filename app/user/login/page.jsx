"use client"
import React from 'react'
import Image from 'next/image'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import HashLoader from "react-spinners/HashLoader";
import { useCookies } from 'react-cookie';
import { useEffect,useState } from 'react';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
})

export default function Login() {

  const router = useRouter()
  const [cookies, setCookie] = useCookies("");

  useEffect(()=>{
    if(cookies.username){
      router.push('/user/profile')
    }
  },[])

  const handleLogin = async (values, { setSubmitting }) => {
      console.log(values)
      try{
          const response = await axios.post("/api/loginUser", values)
          console.log(response.data)
          //Session Storage Setup
          setCookie('username', response.data.user.username);
          router.push('/user/profile')
      }catch(error){
        console.log(error)
      }
      finally {
        // Reset the submitting state after the login attempt, so the loader can be hidden
        setSubmitting(false);
      }
    }

  return (
    <div className='flex sm:flex justify-center items-center h-screen'>
        <div className='mx-3 w-96 p-6 shadow-lg rounded-md bg-indigo-200'>
          <Image src='/images/generaluser.png' width={50} height={50} className='mx-auto' alt='guser'/>
          <h1 className='flex lg:text-lg sm:flex justify-center items-center font-semibold text-sm'>Member Login</h1>
          <hr className='mt-3'/>
          <Formik
            initialValues={
              {
                username: '',
                password: ''
              }
            }
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {handleLogin(values, { setSubmitting })}}
          >
            {({ errors, touched, isSubmitting })=>(
        <Form>
          <div className='mt-3'>
            <label htmlFor="username" className='lg:text-base sm:block text-sm mb-2'>Username</label>
            <Field type="text" name="username" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='Username'/>
            <h4 className='text-indigo-600 text-[11px] mt-1'>{errors.username && touched.username ? errors.username : null}</h4>
          </div>
          <div className='mt-3'>
            <label htmlFor="password" className='lg:text-base sm:block text-sm mb-2'>Password</label>
            <Field type="password" name="password" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='Password'/>
            <h4 className='text-indigo-600 text-[11px] mt-1'>{errors.password && touched.password ? errors.password : null}</h4>
          </div>
          <div className='mt-3'>
            <a href="#" className='flex text-sm text-indigo-600 hover:text-indigo-800 justify-end'>Forgot Password?</a>
          </div>
          <div className='mt-3'>
            <button type='submit' className='lg:text-lg sm: w-full text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md'>Login</button>
          </div>
          {/* Add React HashLoader after login button click in form*/}
          <div className='mt-3 flex justify-center items-center'>
            {isSubmitting && <HashLoader color={"#8c97f9"} loading={true} size={50} speedMultiplier={2}/>}
          </div>
          </Form>
            )}
          </Formik>
        </div>
    </div> 
  )
}
