import * as React from 'react'
import styled from 'styled-components'

const AvatarContainer = styled.div<{ $isSelected?: boolean, $isSmall?: boolean, $isClickable?: boolean }>`
    border: 2px solid ${props => props.$isSelected ? 'var(--primary)' : 'var(--secondary)'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: 1rem;
    border-radius: 50%;
    background-color: var(--background);
    font-size: ${props => props.$isSmall ? '0.7rem' : '1rem'};
    width: ${props => props.$isSmall ? '30px' : '40px'};
    height: ${props => props.$isSmall ? '30px' : '40px'};
    z-index: ${props => props.$isSelected ? '100000000 !important' : '0'};
    cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
    &:hover {
        border-color: ${props => props.$isClickable ? 'var(--primary)' : 'var(--secondary)'};
    }
`;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>  {
    readonly name: string
    readonly isSelected?: boolean
    readonly onClick?: () => void
    readonly isSmall?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({ name, isSelected, onClick, isSmall, ...htmlProps }) => {
    const getInitials = () => {
        const names = name.split(' ');
        const firstName = names[0];
        const lastName = names[names.length - 1];
        return firstName[0] + lastName[0];
    }

    return (
        <AvatarContainer $isSelected={isSelected} onClick={onClick} $isSmall={isSmall} $isClickable={Boolean(onClick)} {...htmlProps}>
            {getInitials()}
        </AvatarContainer>
    )
}