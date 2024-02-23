import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center mx-10 sm:flex-row h-screen'>
      <div className='w-full max-w-[640px]'>
        <div className='font-extrabold font-serif text-2xl text-indigo-600 mb-6 sm:text-md'>
          Welcome to Our Calorie Burned Prediction System
        </div>
        <div className='text-sm sm:text-xs'>
          <p>
            This is a simple web application that predicts the calories burned by a person based on the given inputs parameters.
          </p>
        </div>
      </div>
      
    </div>
  )
}