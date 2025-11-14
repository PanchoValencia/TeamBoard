import * as React from 'react'
import styled from 'styled-components'
import { FormWrapper } from '../../Components/FormWrapper/FormWrapper'
import { Stack } from '../../Components/Stack/Stack'
import { useUserStore } from '../../Store/UsersStore'
import { useGlobalStore } from '../../Store/GlobalStore'
import { User, Roles } from '../../TeamBoard.types'
import { TextInput } from '../../Components/TextInput/TextInput'
import { Button } from '../../Components/Button/Button'
import { Select } from '../../Components/Select/Select'

const ManageUserModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const mapToRoleOptions: Record<Roles, { label: string, value: Roles }> = {
    [Roles.admin]: { label: 'Admin', value: Roles.admin },
    [Roles.member]: { label: 'Member', value: Roles.member },
}

const roleOptions = Object.values(Roles).map((role) => mapToRoleOptions[role])

interface ManageUserModalProps {
    readonly userId?: string
}

export const ManageUserModal: React.FC<ManageUserModalProps> = ({ userId }) => {
    const {users, addUser, updateUser } = useUserStore()
    const {closeModal} = useGlobalStore()
    const currentUser = users.find((user: User) => user.id === userId)
    const isEdit = Boolean(currentUser);

    const [name, setName] = React.useState(currentUser?.name || '')
    const [email, setEmail] = React.useState(currentUser?.email || '')
    const [role, setRole] = React.useState(currentUser?.role || Roles.member)
    
    const isDisabled = React.useMemo(() => {
        return !name || !email || !role;
    }, [name, email, role]);

    const handleSave = () => {
        if (isEdit) {
            updateUser({
                id: currentUser!.id,
                name,
                email,
                role,
            })
        } else {
            addUser({
                id: users.length ? String(Number(users[users.length - 1].id) + 1) : '1',
                name,
                email,
                role,
            })
        }
        closeModal()
    }

    return (
        <FormWrapper title={isEdit ? 'Edit User' : 'Add User'}>
            <Stack space="xlarge">
                <Stack>
                    <TextInput label="Name" value={name} onChange={setName} placeholder="Add name" />
                    <TextInput label="Email" value={email} onChange={setEmail} placeholder="Add email" />
                    <Select label="Role" value={role} onChange={(value) => setRole(value as Roles)} options={roleOptions} />
                </Stack>
                <ManageUserModalFooter>
                    <Button forceLightColor onClick={closeModal}>Cancel</Button>
                    <Button forceLightColor onClick={handleSave} isDisabled={isDisabled}>Save</Button>
                </ManageUserModalFooter>
            </Stack>
        </FormWrapper>
    )
}