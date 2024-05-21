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
        <Link href="/" passHref className='text-primary text-2xl font-josefin'> 
        Melba's
        </Link>
      </NavbarBrand>

      <NavbarContent className="gap-8" justify="center">
        <NavbarItem isActive={pathname === '/'}>
          <Link href="/" passHref aria-current="page" className='hover:text-primary'>
            Home
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === '/services'}>
          <Link href="/services" passHref className='hover:text-primary'>
            Services
            </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === '/about'}>
          <Link href="/about" passHref className='hover:text-primary'>
            About
            </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === '/contact'}>
          <Link href="/contact" passHref className='hover:text-primary'>
            Contact
            </Link>
        </NavbarItem>
    
      </NavbarContent>
      <NavbarContent justify="end">
       
           
          <div className='flex gap-6 items-center'>
            
              <>
                <Link href={'/login'} passHref legacyBehavior>
                  <Button as='a' color="primary" className='hover:text-primary font-semibold rounded-full px-6 py-2 text-dark'>
                    Login
                  </Button>
                </Link>
                <Link href='/register' passHref legacyBehavior>
                  <Button as='a' color="primary" className='hover:text-primary font-semibold rounded-full px-6 py-2 text-dark'>
                    Sign Up
                  </Button>
                </Link>
              </>
            
          </div>
      </NavbarContent>
    </Navbar>
  );
}

export default Header