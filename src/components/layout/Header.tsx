'use client'

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {

  const pathname = usePathname();

  return (
    <Navbar className='font-semibold bg-blue-500 py-3' classNames={{ item: 'data-[active=true]:text-primary' }}>
      <NavbarBrand>
        <Link href="/" className='text-primary text-2xl font-josefin'>Melba's</Link>
      </NavbarBrand>

      <NavbarContent className="gap-8" justify="center">
        <NavbarItem isActive={pathname === '/'}>
          <Link href="/" aria-current="page" className='hover:text-primary'>Home</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/menu'}>
          <Link href="/menu" className='hover:text-primary'>Menu</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/services'}>
          <Link href="/services" className='hover:text-primary'>Services</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/about'}>
          <Link href="/about" className='hover:text-primary'>About</Link>
        </NavbarItem>
    
      </NavbarContent>
      <NavbarContent justify="end">
       
           
          <div className='flex gap-6 items-center'>
            
              <>
                <Link href={'/login'} className='hover:text-primary'>Login</Link>
                <Button as={Link} color="primary" href={'/register'} className='font-semibold rounded-full px-6 py-2 text-dark'>
                  Sign Up
                </Button>
              </>
            
          </div>
      </NavbarContent>
    </Navbar>
  )
}

export default Header