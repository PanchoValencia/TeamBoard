import * as React from 'react'
import styled from 'styled-components'
import { Profile } from '../Profile/Profile'
import { useAuthenticationStore } from '../../Store/AuthenticationStore'

const HeaderContainer = styled.header`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-bottom: 1px solid var(--border);
    padding: 1rem;
    @media (max-width: 768px) {
        h1 {
            font-size: 1rem;
        }
            img {
            width: 20px;
        }
    }
`;

const ProfileWrapper = styled.div`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
`; 

export const Header: React.FC = () => {
    const { authenticatedUser } = useAuthenticationStore();

    return (
        <HeaderContainer>
            <img src="/vite.svg" alt="Brillio Logo" />
            <h1>BBB - Brillio Bench Board</h1>
            {
                authenticatedUser ? (
                    <ProfileWrapper>
                        <Profile />
                    </ProfileWrapper>
                ) : null
            }
        </HeaderContainer>
    )
}
