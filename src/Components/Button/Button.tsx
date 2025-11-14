import * as React from 'react'
import styled from 'styled-components'

interface ButtonContainerProps {
    readonly $isDisabled?: boolean
    readonly $forceLightColor?: boolean
}

const ButtonContainer = styled.button<ButtonContainerProps>`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 1rem;
    color: ${props => props.$forceLightColor ? 'var(--form-text)' : 'var(--foreground)'};
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    transition: all 0.2s ease-in-out;
    border: 1px solid var(--border);
    background-color: ${props => props.$forceLightColor ? 'var(--form-background)' : 'var(--background)'};
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
    readonly forceLightColor?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    isDisabled,
    isLoading,
    forceLightColor,
 }) => {
    return (
        <ButtonContainer onClick={onClick} disabled={isDisabled || isLoading} $isDisabled={isDisabled || isLoading} $forceLightColor={forceLightColor} >
            {children}
        </ButtonContainer>
    )
}