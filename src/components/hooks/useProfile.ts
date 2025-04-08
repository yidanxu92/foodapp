import UserProfile from "@/types/UserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface ProfileData {
  _id: string;
  name: string;
  userName?: string;
  email: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  isAdmin?: boolean;
}

export const useProfile = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
   
    if (status === 'unauthenticated') {
      setLoading(false);
      return;
    }

    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch profile');
          }
          return res.json();
        })
        .then(data => {
          setData(data);
          setError(null);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [status]); 

  return { data, loading, error };
}
