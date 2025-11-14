import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../TeamBoard.types.tsx'

const USERS_LOCAL_STORAGE_KEY = 'users';
const SELECTED_USERS_LOCAL_STORAGE_KEY = 'selectedUsers';


type UserStoreState = {
    users: Array<User>
    addUser: (user: User) => void
    deleteUser: (userId: string) => void
    updateUser: (user: User) => void
}

type SelectedUserStoreState = {
    selectedUsers: Array<string>
    selectUsers: (userId: string) => void
}

export const useUserStore = create<UserStoreState>()(
    persist(
        (set) => ({
            users: [],
            addUser: (user) => set((state) => ({ users: [...state.users, user] })),
            deleteUser: (userId) => set((state) => ({ users: state.users.filter((user) => user.id !== userId) })),  
            updateUser: (user) => set((state) => ({ users: state.users.map((u) => u.id === user.id ? user : u) })),
        }),
        {
            name: USERS_LOCAL_STORAGE_KEY,
        }
    )
)

export const useSelectedUserStore = create<SelectedUserStoreState>()(
    persist(
        (set) => ({
            selectedUsers: [],
            selectUsers: (userId) => set((prevState) => {
                if (prevState.selectedUsers.includes(userId)) {
                    return {
                        selectedUsers: prevState.selectedUsers.filter((u) => u !== userId),
                    }
                } else {
                    return {
                        selectedUsers: [...prevState.selectedUsers, userId],
                    }
                }
            }),
        }),
        {
            name: SELECTED_USERS_LOCAL_STORAGE_KEY,
        }
    )
)
