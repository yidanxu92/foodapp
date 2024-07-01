'use client'
import UserTabs from '@/components/layout/UserTabs'
import UsersTable from '@/components/features/users/UsersTable'
import useProfile from '@/components/hooks/useProfile'
import UserProfile from '@/types/UserProfile'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loader from '@/components/common/Loader'

const UsersPage = () => {
  const { data: session, status } = useSession();
  const { loading, data: profileData } = useProfile();
  const isAdmin = profileData?.isAdmin;
  const [users, setUsers] = useState<UserProfile[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error, e.g., show an error message or redirect
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  useEffect(() => {
    if (profileData && !isAdmin) {
      router.push('/');
    }
  }, [profileData]);

  if (status === 'loading' || loading) {
    return <Loader className={""}/>
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
        <>
          <UserTabs admin={profileData.isAdmin} />
          <div className="max-w-4xl mx-auto mt-12">
            <UsersTable users={users} />
          </div>
        </>}
    </section>
  )
}

export default UsersPage;
