import * as React from 'react'
import styled from 'styled-components'

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
`;

const SwitchLabel = styled.label`
    font-size: 1rem;
    color: var(--foreground);
`;

const SwitchInput = styled.input`
    height: 20px;
    width: 40px;
    border-radius: 10px;
    border: 1px solid var(--primary);
    background-color: var(--background-secondary);
    outline: none;
    cursor: pointer;
    position: relative;
    appearance: none;
    transition: all 0.2s ease-in-out;

    &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--primary);
        transition: all 0.2s ease-in-out;
    }

    &:checked {
        background-color: var(--secondary);

        &::before {
            transform: translateX(18px);
        }
    }
`;

interface SwitchProps {
    readonly label: string
    readonly onChange: (value: boolean) => void
    readonly isChecked: boolean
}

export const Switch: React.FC<SwitchProps> = ({ label, onChange, isChecked }) => {
    return (
        <SwitchContainer>
            <SwitchLabel>{label}</SwitchLabel>
            <SwitchInput type="checkbox" onChange={(e) => onChange(e.target.checked)} checked={isChecked} />
        </SwitchContainer>
    )
}