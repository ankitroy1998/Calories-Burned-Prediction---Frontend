"use client"
import {Formik, Form, Field} from 'formik'
import axios from 'axios'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation'
import { useCookies } from "react-cookie";
import HashLoader from "react-spinners/HashLoader";
import * as Yup from 'yup';

export default function Home() {

  const router = useRouter();
  const [data, setData] = useState("");
  const cookies = useCookies("");
  const [error, setError] = useState('');
  
  useEffect(()=>{
    if(!cookies[0].username){
      router.push('/user/login')
    }
     axios.post("/api/getUser/", {username: cookies[0].username})
    .then((res)=>{
      setData(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
},[]);
if (!data) {
  // Render loading state or return null
  return <div className='flex justify-center items-center h-screen'><HashLoader color={"#8c97f9"} loading={true} size={50} speedMultiplier={2}/></div>;
}

  const validate = Yup.object().shape({
    Gender: Yup.string()
      .required('Gender is required'),
    Age: Yup.string()
      .required('Age is required'),
    Height: Yup.string()
      .required('Height is required'),
    Weight: Yup.string()
      .required('Weight is required'),
    Duration: Yup.string()
      .required('Duration is required'),
    HeartRate: Yup.string()
      .required('Heart Rate is required'),
    Temperature: Yup.string()
      .required('Body Temperature is required')
  });

  const handleData = async (values) => {
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
    <div className='flex justify-center items-center h-screen bg-indigo-100'>
        <div className='w-96 p-6 shadow-lg rounded-md bg-blue-200'>
        <h1 className='flex justify-center items-center font-semibold text-lg'>Enter Details</h1>
        <Formik
        initialValues={
              {
                Gender: '',
                Age: '',
                Height: '',
                Weight: '',
                Duration: '',
                HeartRate : '',
                Temperature: '',
              }
            }
            validationSchema={validate}
            onSubmit={values => {handleData(values)}}
          >
            {({ errors, touched })=>(
          <Form>
            <label htmlfor="Gender" className="lg:text-base sm:block text-sm mb-2">Gender</label>
            <Field type="text" name="Gender" placeholder="Male/Female" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.Gender}</h4>
            <label htmlfor="Age" className="lg:text-base sm:block text-sm mb-2">Age</label>
            <Field type="number" name="Age" placeholder="29" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.Age}</h4>
            <label htmlfor="Height" className="lg:text-base sm:block text-sm mb-2">Height</label>
            <Field type="number" name="Height" placeholder="172" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.Height}</h4>
            <label htmlfor="Weight" className="lg:text-base sm:block text-sm mb-2">Weight</label>
            <Field type="number" name="Weight" placeholder="45" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.Weight}</h4>
            <label htmlfor="Duration" className="lg:text-base sm:block text-sm mb-2">Duration</label>
            <Field type="number" name="Duration" placeholder="30" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.Duration}</h4>
            <label htmlfor="HeartRate" className="lg:text-base sm:block text-sm mb-2">Heart Rate</label>
            <Field type="number" name="HeartRate" placeholder="85" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.HeartRate}</h4>
            <label htmlfor="Temperature" className="lg:text-base sm:block text-sm mb-2">Temperature</label>
            <Field type="number" name="Temperature" placeholder="37" className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
            <h4 className='text-xs text-red-600 mb-1'>{errors.Temperature}</h4>
            <button type="submit" className="mt-4 w-full bg-indigo-500 text-white p-3 rounded-md">Submit</button>
            <label htmlfor="result" className="lg:text-base sm:block text-sm mb-2 mt-1">Result</label>
            <Field type="number" name="result" value={data} className="lg:text-base sm:border w-full text-xs px-2 py-1 focus:outline none focus:ring-0 focus:border-indigo-400 rounded-md" />
          </Form>
            )}
        </Formik>
        </div>
    </div> 
  )
}
