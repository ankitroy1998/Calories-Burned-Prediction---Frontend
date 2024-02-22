"use client"
import {Formik, Form, Field} from 'formik'
import axios from 'axios'
import { useEffect,useState } from 'react';

export default function Home() {

  const [data, setData] = useState("");
  const handleData = async (values) => {
    console.log(values)
    try{
      const res = await axios.post("/api/prediction", values)
      console.log(res.data)
      // Assuming the server response contains the result field
      const resultData = res.data.predictions;

      // Update the state with the result data
      setData(resultData);
    } catch(error) {
      console.error("Error submitting data:", error);
    }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-blue-400'>
        <div className='w-96 p-6 shadow-lg rounded-md bg-blue-200'>
        <h1 className='flex justify-center items-center font-semibold text-lg'>Enter Details</h1>
        <Formik
        initialValues={
              {
                Gender: 'Male',
                Age: '29',
                Height: '172',
                Weight: '45',
                Duration: '30',
                HeartRate : '85',
                Temperature: '37'
              }
            }
            // validationSchema={validationSchema}
            onSubmit={values => {handleData(values)}}
          >
            {({ errors, touched })=>(
          <Form>
            <label htmlfor="Gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <Field type="text" name="Gender" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlfor="Age" className="block text-sm font-medium text-gray-700">Age</label>
            <Field type="number" name="Age" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlfor="Height" className="block text-sm font-medium text-gray-700">Height</label>
            <Field type="number" name="Height" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlfor="Weight" className="block text-sm font-medium text-gray-700">Weight</label>
            <Field type="number" name="Weight" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlfor="Duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <Field type="number" name="Duration" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlfor="HeartRate" className="block text-sm font-medium text-gray-700">Heart Rate</label>
            <Field type="number" name="HeartRate" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlfor="Temperature" className="block text-sm font-medium text-gray-700">Temperature</label>
            <Field type="number" name="Temperature" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <button type="submit" className="mt-4 w-full bg-indigo-500 text-white p-3 rounded-md">Submit</button>
            <label htmlfor="result" className="block text-sm font-medium text-gray-700">Result</label>
            <Field type="number" name="result" value={data} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </Form>
            )}
        </Formik>
        </div>
    </div> 
  )
}
