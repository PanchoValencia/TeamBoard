import * as React from 'react'
import styled from 'styled-components'
import { Stack } from '../Stack/Stack'

const TextInputLabel = styled.label`
    font-size: 1rem;
    color: var(--foreground);
`;

const TextInputInput = styled.input`
    height: 40px;
    border-radius: 5px;
    padding: 1rem;
    color: var(--foreground);
    font-size: 1rem;
    border: 1px solid var(--border);
    background-color: var(--background-secondary);
    outline: none;
`;

interface TextInputInterface extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    readonly label: string
    readonly value: string
    readonly placeholder?: string
    readonly onChange: (value: string) => void
}

export const TextInput: React.FC<TextInputInterface> = ({ label, value, onChange, placeholder, ...htmlProps }) => {
    return (
        <Stack space="small">
            <TextInputLabel>{label}</TextInputLabel>
            <TextInputInput value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} {...htmlProps} />
        </Stack>
    )
}