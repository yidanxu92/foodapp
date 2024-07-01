import UserProfile from "@/types/UserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useProfile = () => {
    const { data: session, status } = useSession();
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (status === 'authenticated') {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/profile', {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch profile');
                    }

                    const profileData = await response.json();
                    setData(profileData);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            setLoading(false); // If not authenticated, set loading to false
        }
    }, [status]);

    return { data, loading, error };
};

export default useProfile;
