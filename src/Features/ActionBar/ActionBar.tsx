import * as React from 'react'
import styled from 'styled-components'
import { SearchBox } from '../../Components/SearchBox/SearchBox'
import { Avatar } from '../../Components/Avatar/Avatar'
import { useUserStore } from '../../Store/UsersStore'
import { useSelectedUserStore } from '../../Store/UsersStore'
import { useGlobalStore } from '../../Store/GlobalStore'
import { Button } from '../../Components/Button/Button'
import { Switch } from '../../Components/Switch/Switch'
import { useThemeStore } from '../../Store/ThemeStore'
import { ModalIds, Roles } from '../../TeamBoard.types'
import { useAuthenticationStore } from '../../Store/AuthenticationStore'

const ActionBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1rem;
`;

const AvatarsContainer = styled.div`
    display: flex;
    row-gap: 7px;
    flex-wrap: wrap;
    margin-left: 7px;

    div {
        margin-left: -7px;
    }
`;

const ActionBarItem = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const ActionBar: React.FC = () => {
    const {users} = useUserStore()
    const {searchQuery, setSearchQuery, openModal} = useGlobalStore()
    const {selectedUsers, selectUsers} = useSelectedUserStore()
    const {theme, setTheme} = useThemeStore()
    const {authenticatedUser} = useAuthenticationStore()

    const isAdmin = authenticatedUser?.role === Roles.admin

    const handleAddUser = () => {
        openModal(ModalIds.addUser, {})
    }

    const handleAddCard = () => {
        openModal(ModalIds.addCard, {})
    }

    return (
        <ActionBarContainer>
            <ActionBarItem>
                <SearchBox value={searchQuery} onSearch={setSearchQuery} />
                <AvatarsContainer>
                    {
                        users.map((user, idx) => (
                            <Avatar
                                key={user.id}
                                name={user.name}
                                isSelected={selectedUsers.includes(user.id)}
                                onClick={() => selectUsers(user.id)}
                                style={{zIndex: idx}}
                            />
                        ))
                    }
                </AvatarsContainer>
            </ActionBarItem>
            <ActionBarItem>
                {isAdmin ? (
                    <Button onClick={handleAddUser} >Add User</Button>
                ) : null}
                <Button onClick={handleAddCard}>Add Card</Button>
                <Switch label="Dark Mode" onChange={setTheme} isChecked={theme === 'dark'} />
            </ActionBarItem>
        </ActionBarContainer>
    )
}