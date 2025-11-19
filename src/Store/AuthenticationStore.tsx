import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../TeamBoard.types.tsx'

type AuthenticationStoreState = {
    authenticatedUser: User | null
    login: (user: User) => void
    logout: () => void
}

const AUTHENTICATION_LOCAL_STORAGE_KEY = 'authenticatedUser';

export const useAuthenticationStore = create<AuthenticationStoreState>()(
    persist(
        (set) => ({
            authenticatedUser: null,
            login: (authenticatedUser) => set(() => ({ authenticatedUser })),
            logout: () => set(() => ({ authenticatedUser: null })),
        }),
        {
            name: AUTHENTICATION_LOCAL_STORAGE_KEY,
        }
    )
)