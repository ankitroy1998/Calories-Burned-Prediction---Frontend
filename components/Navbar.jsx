'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Cookies,useCookies } from 'react-cookie';

export default function Navbar() {
  const router = useRouter();
  const [cookies, setCookies] = useCookies("");
  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('username');
    router.push('/');
  };
  return (
    <nav className="fixed h-12 right-0 left-0 top-0 flex justify-between items-center rounded-2xl w-[99%] mx-auto mt-2 bg-gradient-to-r from-indigo-200 to-indigo-400">
        <div className='hover:cursor-pointer'>
          <Link href="/">
            <div className='flex select-none justify-between items-center font-bold'>
            <Image className='p-2 hue-rotate-180' src="/images/logo.png" width={50} height={50} alt="logo"/>
            <header className='max-[640px]:text-xs'>Calorie Burned Prediction</header>
            </div>
          </Link>  
        </div>
        <div className='flex justify-between items-center'>
            {!cookies.username?<><Link href="/user/login">
            <div className='hover:text-indigo-800 cursor-pointer mr-3 px-1 max-[640px]:text-xs'>Login</div>
            </Link>
            <Link href="/user/signup">
            <div className='hover:text-indigo-800 cursor-pointer mr-3 px-1 max-[640px]:text-xs'>SignUp</div>
            </Link>
            </>:
            <><Link href="/user/profile">
            <div className='cursor-pointer mr-3'><Image src='/images/user.png' width={30} height={30} className='mx-auto rounded-full border border-indigo-200' alt='userprofile'/></div>
            </Link>
            <div className='hover:text-indigo-900 cursor-pointer mr-3 px-1 max-[640px]:text-xs' onClick={handleLogout}>LogOut</div>
            </>}
        </div>
    </nav>
  )
}
