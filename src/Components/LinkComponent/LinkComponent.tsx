import * as React from 'react'
import styled from 'styled-components'

const LinkContainer = styled.a`
    color: var(--secondary);
    text-decoration: none;
    cursor: pointer;
    &:hover {
        color: var(--primary);
    }
`;

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    readonly children: React.ReactNode
    onClick?: () => void
}

export const LinkComponent: React.FC<LinkProps> = ({ children, ...htmlProps }) => {
    return (
        <LinkContainer {...htmlProps} onClick={htmlProps.onClick}>
            {children}
        </LinkContainer>
    )
}