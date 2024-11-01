import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import { app } from '../firebaseConfig';
import { Platform } from 'react-native';

interface AuthState {
  user: User | null;
  token: string | null;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  handleAuthentication: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const auth = getAuth(app);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLogin: false,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string) => set({ token }),
      
      handleAuthentication: async (email: string, password: string, username?: string) => {
        const { isLogin, setUser, setToken } = get();
        try {
          const userCredential = isLogin
            ? await signInWithEmailAndPassword(auth, email, password)
            : await createUserWithEmailAndPassword(auth, email, password);

          const user = userCredential.user;
          const token = await user.getIdToken();

          // Set username for new users
          if (!isLogin && username) {
            await updateProfile(user, { displayName: username });
          }

          setUser(user);
          setToken(token);
        } catch (error) {
          console.error('Authentication error:', error);
        }
      },
      
      logout: async () => {
        await signOut(auth);
        set({ user: null, token: null, isLogin: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() =>
        Platform.OS === "web" ? localStorage : AsyncStorage
      ),
    }
  )
);

// Listen for user state changes and token refresh
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
    user.getIdToken(true); // Optionally force token refresh if needed
  } else {
    useAuthStore.getState().logout();
  }
});
