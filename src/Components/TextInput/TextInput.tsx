import * as React from 'react'
import styled from 'styled-components'
import { Stack } from '../Stack/Stack'

const TextInputLabel = styled.label`
    font-size: 1rem;
    color: var(--form-text);
`;

const TextInputInput = styled.input`
    height: 40px;
    border-radius: 5px;
    padding: 1rem;
    color: var(--form-text);
    font-size: 1rem;
    border: 1px solid var(--border);
    background-color: var(--background-form);
    outline: none;
`;

interface TextInputProps {
    readonly label: string
    readonly value: string
    readonly placeholder?: string
    readonly onChange: (value: string) => void
}

export const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder }) => {
    return (
        <Stack space="small">
            <TextInputLabel>{label}</TextInputLabel>
            <TextInputInput type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        </Stack>
    )
}