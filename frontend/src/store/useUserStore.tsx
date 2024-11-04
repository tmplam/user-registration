import { apiGetProfile } from '@/apis';
import {
  setAccessToken as setLocalStorageAccessToken,
  getAccessToken as getLocalStorageAccessToken,
  removeAccessToken,
} from '@/utils/localStorageUtils';
import { create } from 'zustand';

interface UserProfile {
  email: string;
  createdAt: Date;
}

interface UserStore {
  accessToken: string | null;
  userProfile: UserProfile | null;
  getUserProfile: () => void;
  getAccessToken: () => void;
  clearAccessToken: () => void;
  setAccessToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  accessToken: null,
  userProfile: null,

  getUserProfile: async () => {
    const response = await apiGetProfile();
    const profile = response.data as UserProfile;
    console.log(response.data);
    set({ userProfile: profile });
  },

  getAccessToken: () => {
    const token = getLocalStorageAccessToken();
    set({ accessToken: token });
  },

  clearAccessToken: () => {
    removeAccessToken();
    set({ accessToken: null, userProfile: null });
  },

  setAccessToken: (token: string) => {
    setLocalStorageAccessToken(token);
    set({ accessToken: token });
  },
}));
