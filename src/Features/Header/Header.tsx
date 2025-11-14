import * as React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
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

export const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <img src="/vite.svg" alt="Brillio Logo" />
            <h1>BBB - Brillio Bench Board</h1>
        </HeaderContainer>
    )
}
