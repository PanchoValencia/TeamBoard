import * as React from 'react'
import styled from 'styled-components'

type Space = 'small' | 'medium' | 'large' | 'xlarge';

const StackContainer = styled.div<{ $space: Space }>`
    display: flex;
    flex-direction: column;
    gap: ${props => {
        switch (props.$space) {
            case 'small':
                return '0.5rem';
            case 'large':
                return '1.5rem';
            case 'xlarge':
                return '2rem';
            default:
                return '1rem';
        }
    }};
`;

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    readonly children: React.ReactNode
    readonly space?: Space
}

export const Stack: React.FC<StackProps> = ({ children, space = 'medium', ...htmlProps }) => {
    return (
        <StackContainer $space={space} {...htmlProps}>
            {children}
        </StackContainer>
    )
}