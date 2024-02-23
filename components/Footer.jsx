import React from 'react'

export default function Footer() {
  return (
        <footer>
            <div className='flex justify-center items-center h-12 rounded-2xl w-[99%] mx-auto mb-2 fixed left-0 right-0 bottom-0 bg-gradient-to-r from-indigo-200 to-indigo-400'>
                <div className='font-semibold pt-3 pb-3'>
                    <h1 className='max-[640px]:text-xs'>&copy; 2024 Calories Burned Prediction</h1>
                </div>
            </div>
        </footer>
  )
}
