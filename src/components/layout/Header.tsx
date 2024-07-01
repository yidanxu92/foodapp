'use client'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { usePathname } from 'next/navigation';
import useProfile from '../hooks/useProfile';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { UserIcon } from '@/icons/UserIcon';
import { SignOutIcon } from '@/icons/SignOutIcon';

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { data: profileData } = useProfile();

  return (
    <Navbar className='font-semibold bg-blue-500 py-3'>
      <NavbarBrand>
        <Link href="/" passHref className='text-melba text-2xl font-josefin'>
          Melba
        </Link>
      </NavbarBrand>

      <NavbarContent className="gap-8" justify="center">
        <NavbarItem isActive={pathname === '/'}>
          <Link href="/" passHref aria-current="page" className='hover:text-primary'>
            Home
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === '/services'}>
          <Link href="/services" passHref className='hover:text-dark'>
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
        {session ? (
          <div className='flex items-center h-full'>
            <Dropdown className='text-gray-500'>
              <DropdownTrigger>
                <Button
                  className='bg-transparent h-full'
                  startContent={<Avatar src={profileData?.image ? profileData.image : ''} isBordered color='primary' size='sm' />}
                  endContent={<ChevronDownIcon className={'w-4 stroke-white'} />}
                  disableAnimation
                />
              </DropdownTrigger>

              <DropdownMenu aria-label="Link Actions" color='primary' variant='flat'>
                <DropdownItem key="profile" href="/profile" startContent={<UserIcon className={"w-6"} />}>
                  My Profile
                </DropdownItem>
                <DropdownItem key="signOut" onClick={() => signOut({ callbackUrl: '/' })} startContent={<SignOutIcon className={'w-6'} />}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <div className='flex gap-6 items-center'>
            <Link href={'/login'} className='hover:text-primary'>
              Login
            </Link>
            <Button as={Link} color="primary" href={'/register'} className='font-semibold rounded-full px-6 py-2 text-dark'>
              Sign Up
            </Button>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
