import * as React from 'react'
import styled from 'styled-components'
import { Stack } from '../Stack/Stack'

const SelectLabel = styled.label`
    font-size: 1rem;
    color: var(--foreground);
`;

const SelectContainer = styled.div`
    position: relative;
`;

const SelectButton = styled.button<{ $isOpen: boolean }>`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding: 0 1rem;
    color: var(--foreground);
    font-size: 1rem;
    border: 1px solid var(--border);
    background-color: var(--background-secondary);
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;

    &:hover {
        border-color: var(--primary);
    }

    &::after {
        content: "";
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid var(--border);
        transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform 0.2s ease;
    }
`;

const DropdownList = styled.ul<{ $isOpen: boolean; $openUpward: boolean }>`
    position: absolute;
    ${props => props.$openUpward ? 'bottom: 100%;' : 'top: 100%;'}
    left: 0;
    right: 0;
    background-color: var(--background-secondary);
    border: 1px solid var(--border);
    border-radius: 5px;
    ${props => props.$openUpward ? 'border-bottom: none; border-bottom-left-radius: 0; border-bottom-right-radius: 0;' : 'border-top: none; border-top-left-radius: 0; border-top-right-radius: 0;'}
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000000;
    list-style: none;
    margin: 0;
    padding: 0;
    display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.li<{ $isSelected: boolean; $isFirst?: boolean; $isLast?: boolean }>`
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: var(--foreground);
    background-color: ${props => props.$isSelected ? 'var(--primary)' : 'var(--background-secondary)'};
    z-index: 100000000;

    &:hover {
        background-color: var(--primary);
    }

    ${props => props.$isFirst && `
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    `}
    
    ${props => props.$isLast && `
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    `}
`;

interface SelectProps {
    readonly label: string
    readonly value: any
    readonly onChange: (value: any) => void
    readonly options: Array<{ label: string, value: any }>
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [openUpward, setOpenUpward] = React.useState(false)
    const selectRef = React.useRef<HTMLDivElement>(null)

    const selectedOption = options.find(option => option.value === value)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleToggle = () => {
        if (!isOpen && selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            const dropdownHeight = Math.min(200, options.length * 48) // Approximate height
            
            setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight)
        }
        setIsOpen(!isOpen)
    }

    const handleSelect = (optionValue: string) => {
        onChange(optionValue)
        setIsOpen(false)
    }

    return (
        <Stack space="small">
            <SelectLabel>{label}</SelectLabel>
            <SelectContainer ref={selectRef}>
                <SelectButton 
                    type="button"
                    $isOpen={isOpen} 
                    onClick={handleToggle}
                >
                    {selectedOption?.label || 'Select an option'}
                </SelectButton>
                <DropdownList $isOpen={isOpen} $openUpward={openUpward}>
                    {options.map((option, index) => (
                        <DropdownItem
                            key={option.value}
                            $isSelected={option.value === value}
                            $isFirst={openUpward ? index === options.length - 1 : index === 0}
                            $isLast={openUpward ? index === 0 : index === options.length - 1}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            </SelectContainer>
        </Stack>
    )
}
