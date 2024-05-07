'use client'
import Link from 'next/link'

import { List, Props } from '@/types'
import { useState } from 'react'
import Image from 'next/image'
import { NavLink } from './navlink'
import { usePathname } from 'next/navigation'

const links: Props = [
  {
    name: 'Products',
    link: 'products'
  },
  {
    name: 'About',
    link: 'about'
  },
  {
    name: 'Login',
    link: 'login'
  }
]

export function Navbar() {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'
  const [isOpen, setIsOpen] = useState(true)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }
  return isLoginPage ? null : (
    <div className='fixed top-0  z-[20] mx-auto w-full  flex-wrap  bg-Light_secondary p-6 backdrop-blur dark:bg-Dark_primary/80'>
      <nav className='  flex  justify-between'>
        <div className='  '>
          <Link href='/' className='text-2xl font-bold text-Dark_text'>
            Ungaki
          </Link>
        </div>

        <div className='hidden w-[80%] justify-end px-8 md:flex lg:w-[60%]'>
          <div className='show flex w-[60%] justify-around px-8 text-Dark_text '>
            {links?.map((link: List) => (
              <NavLink name={link.name} link={link.link} key={link.link + link.name} />
            ))}
          </div>
        </div>
        <div className='md:hidden'>
          <button onClick={toggleNavbar}>
            {isOpen ? (
              <Image src='/bar.svg' width={20} height={20} alt='close' />
            ) : (
              <Image src='/close_bar.svg' width={20} height={20} alt='open' />
            )}
          </button>
        </div>
      </nav>

      {!isOpen && (
        <div className='flex basis-full  flex-col items-center text-center text-xl text-Dark_text transition-all md:hidden md:text-justify'>
          {links?.map((link: List) => (
            <NavLink name={link.name} link={link.link} key={link.link + link.name} />
          ))}
          <div className='flex w-full justify-end p-8'></div>
        </div>
      )}
    </div>
  )
}
