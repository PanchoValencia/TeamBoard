import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeStoreState = {
    theme: 'light' | 'dark'
    setTheme: () => void
}

const THEME_LOCAL_STORAGE_KEY = 'theme';

export const useThemeStore = create<ThemeStoreState>()(
    persist(
        (set) => ({
            theme: 'light',
            setTheme: () => set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light'
                document.body.setAttribute('data-theme', newTheme)
                return { theme: newTheme }
            }),
        }),
        {
            name: THEME_LOCAL_STORAGE_KEY,
        }
    )
)
