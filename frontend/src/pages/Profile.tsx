import { useUserStore } from '@/store';
import { useEffect } from 'react';

export function Profile() {
  const { userProfile, getUserProfile } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="flex justify-center mt-8 rounded-xl shadow-lg">
      <figure className="bg-slate-100 rounded-xl p-8 w-full">
        <img
          className="w-24 h-24 rounded-full mx-auto border shadow-md"
          src="/images/avatar.png"
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 text-center space-y-4">
          <blockquote>
            <p className="text-lg font-medium">“Hello, this is description of profile page!”</p>
          </blockquote>
          {userProfile ? (
            <figcaption className="font-medium">
              <div className="text-sky-500 dark:text-sky-400">{userProfile?.email}</div>
              <div className="text-slate-700 dark:text-slate-500">
                Joined at: {new Date(userProfile.createdAt).toDateString()}
              </div>
            </figcaption>
          ) : (
            <div className="flex justify-center">
              <div className="w-5 h-5 ml-3 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </figure>
    </div>
  );
}
