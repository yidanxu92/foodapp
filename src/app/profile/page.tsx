/**
 * Profile Page Component
 * 
 * This component handles user profile management functionality.
 * Key features:
 * - Displays and updates user profile information
 * - Handles authentication state
 * - Provides admin-specific UI elements
 * - Manages profile update operations with server
 * 
 * The component includes:
 * - Authentication protection
 * - Loading states
 * - Profile form for data editing
 * - Success/error notifications
 */

'use client'
import { useProfile } from '@/components/hooks/useProfile';
import ProfileForm from '@/components/common/form/ProfileForm';
import UserTabs from '@/components/layout/UserTabs';
import UserProfile from '@/types/UserProfile';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { FormEvent } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader';

const ProfilePage = () => {
  // Access session and profile data
  const { data: session, status } = useSession();
  const { data: profileData, loading } = useProfile();


  // Redirect if user is not authenticated
  if (status === 'unauthenticated') {
    redirect('/login');
  }

  // Show loading state while fetching data
  if (status === 'loading' || (loading && session)) {
    return <Loader className={""} />;
  }

  // Handle profile update submission
  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>, data: UserProfile) {
    event.preventDefault();

    // Create promise for profile update
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        resolve(response);
      } else {
        reject();
      }
    });

    // Show toast notifications for update status
    toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error saving profile"
    });
  }

  return (
    <section className="pt-10 pb-20">
      {profileData ? (
        <UserTabs admin={!!profileData.isAdmin} className={!!profileData.isAdmin ? "max-w-6xl mx-auto" : "max-w-2xl mx-auto"} />
      ) : (
        <div className="h-12" /> 
      )}
      <div className="mt-16 max-w-2xl mx-auto">
        <ProfileForm user={profileData??null} onSave={handleProfileUpdate} />
      </div>
    </section>
  );
}

export default ProfilePage;
