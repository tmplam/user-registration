import { useUserStore } from '@/store';
import { useEffect } from 'react';

export function Home() {
  const { getUserProfile, userProfile } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="text-center mt-8">
      {userProfile ? (
        <h1 className="font-semibold text-4xl italic">Hello {userProfile.email}!</h1>
      ) : (
        <h1 className="font-semibold text-4xl italic">User Registration API with React Frontend</h1>
      )}
    </div>
  );
}
