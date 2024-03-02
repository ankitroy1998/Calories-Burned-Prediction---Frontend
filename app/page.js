'use client'
import Image from 'next/image'
import { Typewriter } from 'react-simple-typewriter'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center mx-4 sm:mx-10 lg:flex-row h-screen'>
      
      <div className='w-full max-w-[640px] text-center lg:text-left'>
        <div className='font-extrabold font-serif text-2xl text-indigo-600 mb-6 sm:text-4xl'>
          Welcome to
          <div>
            Calorie Burned Prediction Tool🔥
          </div>
        </div>
        <div className='text-sm sm:text-lg lg:text-2xl'>
          <Typewriter
            words={['Curious about the burn before you earn?', 'Dive into the future of fitness with our cutting-edge Calorie Burned Prediction tool! 💪']}
            cursor
            cursorStyle='|'
            typeSpeed={100}
          />
        </div>
      </div>
      
      <div className='mt-4 sm:mt-0 lg:ml-4'>
        <Image src='/images/hero.png' width={450} height={450} alt='hero' />
      </div>

    </div>
  )
}



