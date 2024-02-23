"use client"
import React from 'react'
import Image from 'next/image'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import HashLoader from "react-spinners/HashLoader";

const validationSchema = Yup.object({
  full_name: Yup.string().required('Full Name is required'),
  dob: Yup.string().required('Date Of Birth is required'),
  contact_no: Yup.string().required('Contact Number is required'),
  email: Yup.string().required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
})

export default function SignUp() {
  const router = useRouter()
  const handleSignup = async (values, { setSubmitting }) => {
    console.log(values)
    try{
      const res = await axios.post("/api/createUser", values)
      console.log(res.data)
      router.push("/user/login");
    }
    catch(err){
      console.log("Nice Error:", err)
    }
    finally {
      // Reset the submitting state after the login attempt, so the loader can be hidden
      setSubmitting(false);
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' mx-3 p-6 shadow-lg rounded-md bg-indigo-200'>
      <Image src='/images/generaluser.png' width={50} height={50} className='mx-auto' alt='guser'/>
          <h1 className='flex lg:text-lg sm:flex justify-center items-center font-semibold text-sm'>User Signup</h1>
          <hr className='mt-3'/>
          <Formik
                initialValues={
                  {
                    full_name: '',
                    dob: '',
                    contact_no: '',
                    email: '',
                    username: '',
                    password: ''
                  }
                }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {handleSignup(values, { setSubmitting })}}
                >
                {({ errors, touched, isSubmitting })=>(
          <Form>
          <div className='grid grid-cols-12 gap-2'>
          <div className='mt-3 col-span-6'>
            <label htmlFor="full_name" className='lg:text-base sm:block text-sm mb-2'>Full Name</label>
            <Field type="text" name="full_name" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='Full Name'/>
            <h4 className='text-[11px] mt-1 text-indigo-600'>{errors.full_name && touched.full_name ? errors.full_name : null}</h4>
          </div>
          <div className='mt-3 col-span-6'>
            <label htmlFor="dob" className='lg:text-base sm:block text-sm mb-2'>Date Of Birth</label>
            <Field type="date" name="dob" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md'/>
            <h4 className='text-[11px] mt-1 text-indigo-600'>{errors.dob && touched.dob ? errors.dob : null}</h4>
          </div>
          </div>

          <div className='grid grid-cols-12 gap-2'>
          <div className='mt-3 col-span-6'>
            <label htmlFor="contact_no" className='lg:text-base sm:block text-sm mb-2'>Contact Number</label>
            <Field type="number" name="contact_no" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='Contact Number'/>
            <h4 className='text-[11px] mt-1 text-indigo-600'>{errors.contact_no && touched.contact_no ? errors.contact_no : null}</h4>
          </div>
          <div className='mt-3 col-span-6'>
            <label htmlFor="email" className='lg:text-base sm:block text-sm mb-2'>Email</label>
            <Field type="email" name="email" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='Email'/>
            <h4 className='text-[11px] mt-1 text-indigo-600'>{errors.email && touched.email ? errors.email : null}</h4>
          </div>
          </div>

          <center>
          <div className='mt-3 w-32'>
            <h1 className='bg-indigo-800 text-sm text-white rounded-md flex justify-center item-center'>Login Credentials</h1>
          </div>
          </center>

          <div className='grid grid-cols-12 gap-2'>
          <div className='mt-3 col-span-6'>
            <label htmlFor="username" className='lg:text-base sm:block text-sm mb-2'>Username</label>
            <Field type="text" name="username" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='UserId'/>
            <h4 className='text-[11px] mt-1 text-indigo-600'>{errors.username && touched.username ? errors.username : null}</h4>
          </div>
          <div className='mt-3 col-span-6'>
            <label htmlFor="password" className='lg:text-base sm:block text-sm mb-2'>Password</label>
            <Field type="password" name="password" className='lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-gray-400 rounded-md' placeholder='Password'/>
            <h4 className='text-[11px] mt-1 text-indigo-600'>{errors.password && touched.password ? errors.password : null}</h4>
          </div>
          </div>

          <div className='mt-3'>
            <button type='submit' className='lg:text-lg sm: w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md text-xs'>SignUp</button>
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
