import { create } from 'zustand'

type GlobalStoreState = {
    searchQuery: string
    setSearchQuery: (query: string) => void
    modal: string | null
    modalProps: any
    openModal: (name: string, props?: any) => void
    closeModal: () => void
}

export const useGlobalStore = create<GlobalStoreState>()((set) => ({
    searchQuery: '',
    modal: null,
    modalProps: {},
    openModal: (name, props = {}) => set({ modal: name, modalProps: props }),
    closeModal: () => set({ modal: null, modalProps: {} }),
    setSearchQuery: (query) => set(() => ({ searchQuery: query })),
}))
