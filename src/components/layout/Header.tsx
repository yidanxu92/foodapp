'use client'
import { CartIcon } from '@/icons/CartIcon'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { signOut, useSession, getSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../util/ContextProvider'
import { usePathname,useRouter } from 'next/navigation';
import { useProfile } from '@/components/hooks/useProfile';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { UserIcon } from '@/icons/UserIcon';
import { SignOutIcon } from '@/icons/SignOutIcon';
import { MenuIcon } from '@/icons/MenuIcon';
import { ShoppingBagIcon } from '@/icons/ShoppingBagIcon';
import { TagIcon } from '@/icons/TagIcon';
import { UsersIcon } from '@/icons/UsersIcon';


const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { data: profileData } = useProfile();
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    
    async function loadSession() {
      await getSession();
    }
    loadSession();
  }, []);



  const handleProfileClick = () => {
    router.push('/profile');  
  };

  const handleCartClick = () => {
    router.push('/cart');
  };
  
  const cartItemsCount = cartProducts.reduce((sum, item) => 
    sum + (item.quantity || 1), 0
  );

  return (
    <Navbar className='font-semibold bg-blue-500 py-3'>
      <NavbarBrand>
        <Link href="/" passHref className='text-melba text-2xl font-josefin'>
          Melba
        </Link>
      </NavbarBrand>

      <NavbarContent className="gap-8" justify="center">
        <NavbarItem>
          <Link 
            href="/" 
            className={`hover:text-primary transition-colors ${pathname === '/' ? 'text-primary' : 'text-black'}`}
          >
            Home
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link 
            href="/menu" 
            className={`hover:text-primary transition-colors ${pathname === '/menu' ? 'text-primary' : 'text-black'}`}
          >
            Menu
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link 
            href="/services" 
            className={`hover:text-primary transition-colors ${pathname === '/services' ? 'text-primary' : 'text-black'}`}
          >
            Services
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link 
            href="/about" 
            className={`hover:text-primary transition-colors ${pathname === '/about' ? 'text-primary' : 'text-black'}`}
          >
            About
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link 
            href="/contact" 
            className={`hover:text-primary transition-colors ${pathname === '/contact' ? 'text-primary' : 'text-black'}`}
          >
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
                <DropdownItem 
                  key="profile" 
                  href="/profile" 
                  startContent={<UserIcon className={"w-6"} />}
                >
                  My Profile
                </DropdownItem>

                <DropdownItem key="orders" href="/orders" startContent={<ShoppingBagIcon className={"w-6"} />}>Orders</DropdownItem>

                {<DropdownItem className={profileData?.isAdmin ? '' : 'hidden'} key="categories" href="/categories" startContent={<TagIcon className={"w-6"} />} >Categories</DropdownItem>}
                {<DropdownItem className={profileData?.isAdmin ? '' : 'hidden'} key="menu-items" href="/menu-items" startContent={<MenuIcon className={"w-6"} />}>Menu Items</DropdownItem>}
                {<DropdownItem className={profileData?.isAdmin ? '' : 'hidden'} key="users" href="/users" startContent={<UsersIcon className={"w-6"} />}>Users</DropdownItem>}
            
                <DropdownItem key="signOut" onClick={() => signOut({ callbackUrl: '/' })} startContent={<SignOutIcon className={'w-6'} />}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button as={Link} href='/cart' className='bg-transparent relative min-w-10' startContent={<CartIcon className={'w-8 stroke-white'} />}>
              {cartItemsCount > 0 &&
                <span className='w-4 h-4 rounded-full bg-primary text-dark text-xs text-center absolute right-1 top-0'>
                  {cartItemsCount}
                </span>
              }
            </Button>

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
