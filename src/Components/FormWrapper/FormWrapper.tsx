import * as React from 'react'
import styled from 'styled-components'
import { Stack } from '../Stack/Stack'

const FormWrapperContainer = styled.div`
    position: relative;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin: 0 20px;
    background-color: var(--background-secondary);
    color: var(--foreground);
    opacity: none;
    border-radius: 5px;
    padding: 0 1rem 1rem;
    max-height: 60vh;
    overflow-y: auto;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100000000;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    color: var(--foreground);
`;

interface FormWrapperProps {
    readonly children: React.ReactNode
    readonly title: string
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ children, title }) => {
    return (
        <FormWrapperContainer>
            <Stack space="xlarge">
                <Title>{title}</Title>
                {children}
            </Stack>
        </FormWrapperContainer>
    )
}