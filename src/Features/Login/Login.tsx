import * as React from 'react'
import styled from 'styled-components'
import { Button } from '../../Components/Button/Button'
import { TextInput } from '../../Components/TextInput/TextInput'
import { useUserStore } from '../../Store/UsersStore'
import { useAuthenticationStore } from '../../Store/AuthenticationStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../Platform/Routes'
import { Stack } from '../../Components/Stack/Stack'
import { Header } from '../Header/Header'

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height: 100vh;
`;

const LoginCard = styled(Stack)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 5px;
    background-color: var(--background-secondary);
    color: var(--foreground);
    min-width: 400px;
    margin: 0 auto;
    max-width: 600px;

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

export const Login: React.FC = () => {
    const {users} = useUserStore()
    const {login} = useAuthenticationStore()
    const navigate = useNavigate()

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')

    const disableLogin = React.useMemo(() => {
        return !email || !password;
    }, [email, password]);

    const handleLogin = () => {
        const user = users.find((user) => user.email === email && user.password === password)
        if (user) {
            login(user);
            navigate(ROUTES.dashboard)
        } else {
            setError('Invalid email or password')
        }
    }

    return (
        <LoginContainer>
            <Header />
            <LoginCard space="xlarge">
                <Title>Login</Title>
                {error && <Error>{error}</Error>}
                <Stack>
                    <TextInput label="Email" value={email} onChange={setEmail} placeholder="Enter email" />
                    <TextInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter password" />
                </Stack>
                <Button onClick={handleLogin} isDisabled={disableLogin} forceLightColor>Login</Button>
                <Button onClick={() => navigate(ROUTES.register)} forceLightColor>Register</Button>
            </LoginCard>
        </LoginContainer>

    )
}