import * as React from 'react'
import styled from 'styled-components'
import { Button } from '../../Components/Button/Button'
import { TextInput } from '../../Components/TextInput/TextInput'
import { useUserStore } from '../../Store/UsersStore'
import { useAuthenticationStore } from '../../Store/AuthenticationStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../Platform/Routes'
import { Stack } from '../../Components/Stack/Stack'
import { Roles } from '../../TeamBoard.types'
import { Select } from '../../Components/Select/Select'
import { Header } from '../Header/Header'

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height: 100vh;
`;

const RegisterCard = styled(Stack)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 5px;
    background-color: var(--background-secondary);
    color: var(--foreground);
    min-width: 400px;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
    color: var(--foreground);
`;

const Error = styled.p`
    color: red;
`;

const MapToRoleOptions: Record<Roles, { label: string, value: Roles }> = {
    [Roles.admin]: { label: 'Admin', value: Roles.admin },
    [Roles.member]: { label: 'Member', value: Roles.member },
}

export const Register: React.FC = () => {
    const {users, addUser} = useUserStore()
    const {login} = useAuthenticationStore()
    const navigate = useNavigate()

    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [role, setRole] = React.useState<Roles>(Roles.member)
    const [error, setError] = React.useState<string>('')

    const disableRegister = React.useMemo(() => {
        return !name || !email || !password;
    }, [name, email, password]);

    const handleRegister = () => {
        if (users.find((user) => user.email === email)) {
            setError('Email already exists')
            return
        }

        const newUser = {
            id: users.length ? String(Number(users[users.length - 1].id) + 1) : '1',
            name,
            email,
            password,
            role,
        }
        addUser(newUser)
        login(newUser)
        navigate(ROUTES.dashboard)
    }

    return (
        <RegisterContainer>
            <Header />
            <RegisterCard space="xlarge">
                <Title>Register</Title>
                {error && <Error>{error}</Error>}
                <Stack>
                    <TextInput label="Name" value={name} onChange={setName} placeholder="Enter name" />
                    <TextInput label="Email" value={email} onChange={setEmail} placeholder="Enter email" />
                    <TextInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter password" />
                    <Select label="Role" value={role} onChange={(value: Roles) => setRole(Roles[value])} options={Object.values(Roles).map((role) => MapToRoleOptions[role])} />
                </Stack>
                <Button onClick={handleRegister} isDisabled={disableRegister} forceLightColor>Register</Button>
                <Button onClick={() => navigate(ROUTES.login)} forceLightColor>Login</Button>
            </RegisterCard>
        </RegisterContainer>
    )
}