import * as React from 'react'
import styled from 'styled-components'

interface ButtonContainerProps {
    readonly $isDisabled?: boolean
}

const ButtonContainer = styled.button<ButtonContainerProps>`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 1rem;
    color: var(--foreground);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    transition: all 0.2s ease-in-out;
    border: 1px solid var(--border);
    background-color: var(--background-secondary);
    cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
    &:hover {
        border-color: ${props => props.$isDisabled ? 'var(--border)' : 'var(--primary)'};
    }
`;

interface ButtonProps {
    readonly children: React.ReactNode | string
    readonly onClick: () => void
    readonly isDisabled?: boolean
    readonly isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    isDisabled,
    isLoading,
 }) => {
    return (
        <ButtonContainer onClick={onClick} disabled={isDisabled || isLoading} $isDisabled={isDisabled || isLoading} >
            {children}
        </ButtonContainer>
    )
}