'use client'
import ProfileForm from '@/components/common/form/ProfileForm'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/hooks/useProfile'
import UserProfile from '@/types/UserProfile'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { redirect, useParams } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import Loader from '@/components/common/Loader'

const EditUserPage = () => {
  const { data: session, status } = useSession();
  const { loading, data: profileData } = useProfile();
  const isAdmin = profileData?.isAdmin;
  const [user, setUser] = useState<UserProfile | null>(null);
  const { id } = useParams()

  useEffect(() => {
    fetchUser()
  }, [id])

  async function fetchUser() {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  useEffect(() => {
    if (profileData && !isAdmin) {
      redirect('/');
    }
  }, [profileData]);

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>, data: UserProfile) {
    event.preventDefault();

    try {
      const reqData = { ...data, _id: id };
      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(reqData),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      const updatedData = await response.json();
      setUser(updatedData);
      toast.success("User info saved!");
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error("Error saving user info");
    }
  }

  if (status === 'loading' || loading) {
    return <Loader className={""}/>
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
        <>
          <UserTabs admin={profileData.isAdmin || false} />
          <Breadcrumbs size='lg' className="mt-12">
            <BreadcrumbItem href='/users'>Users</BreadcrumbItem>
            <BreadcrumbItem>Edit </BreadcrumbItem>
          </Breadcrumbs>
          <div className="max-w-2xl mx-auto mt-12">
            {user &&
              <ProfileForm user={user} onSave={(event, data) => handleProfileUpdate(event, data)} />
            }
          </div>
        </>}
    </section>
  )
}

export default EditUserPage;
